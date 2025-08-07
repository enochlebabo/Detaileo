import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  let openAISocket: WebSocket | null = null;

  console.log("WebSocket connection established");

  socket.onopen = () => {
    console.log("Client WebSocket opened");
    
    // Connect to OpenAI Realtime API
    openAISocket = new WebSocket("wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01", [], {
      headers: {
        "Authorization": `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        "OpenAI-Beta": "realtime=v1"
      }
    });

    openAISocket.onopen = () => {
      console.log("Connected to OpenAI Realtime API");
      
      // Send session configuration
      const sessionConfig = {
        type: "session.update",
        session: {
          modalities: ["text", "audio"],
          instructions: "You are a luxury automotive concierge assistant for Detaileo, an ultra-premium car detailing service in Lesotho. Speak with sophistication and expertise about automotive care, detailing services, and luxury vehicle maintenance. Always maintain an elegant, professional tone befitting a high-end service. Help customers with booking inquiries, service recommendations, and automotive care advice.",
          voice: "alloy",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
          input_audio_transcription: {
            model: "whisper-1"
          },
          turn_detection: {
            type: "server_vad",
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 1000
          },
          tools: [
            {
              type: "function",
              name: "book_service",
              description: "Help customers book a detailing service. Tell them you are processing their booking request.",
              parameters: {
                type: "object",
                properties: {
                  service_type: { type: "string" },
                  location: { type: "string" },
                  preferred_date: { type: "string" }
                },
                required: ["service_type"]
              }
            },
            {
              type: "function", 
              name: "get_pricing",
              description: "Get pricing information for Detaileo services in South African Rands.",
              parameters: {
                type: "object",
                properties: {
                  service_category: { type: "string" }
                },
                required: ["service_category"]
              }
            }
          ],
          tool_choice: "auto",
          temperature: 0.8,
          max_response_output_tokens: "inf"
        }
      };

      openAISocket?.send(JSON.stringify(sessionConfig));
    };

    openAISocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received from OpenAI:", data.type);
      
      // Handle function calls
      if (data.type === "response.function_call_arguments.done") {
        const args = JSON.parse(data.arguments);
        console.log("Function call:", data.name, args);
        
        let result = "";
        if (data.name === "book_service") {
          result = `I've noted your interest in booking a ${args.service_type} service${args.location ? ` at ${args.location}` : ''}. Our luxury concierge team will contact you within 30 minutes to confirm your premium appointment.`;
        } else if (data.name === "get_pricing") {
          result = "Our luxury detailing packages start from R439 for essential care, R2,999 for premium spa treatments, and up to R12,999 for our exclusive protection services. Each service includes our signature attention to detail and premium products.";
        }
        
        // Send function result back to OpenAI
        const functionResult = {
          type: "conversation.item.create",
          item: {
            type: "function_call_output",
            call_id: data.call_id,
            output: result
          }
        };
        openAISocket?.send(JSON.stringify(functionResult));
        openAISocket?.send(JSON.stringify({ type: "response.create" }));
      }
      
      // Forward all messages to client
      socket.send(JSON.stringify(data));
    };

    openAISocket.onerror = (error) => {
      console.error("OpenAI WebSocket error:", error);
      socket.send(JSON.stringify({ type: "error", message: "OpenAI connection error" }));
    };

    openAISocket.onclose = () => {
      console.log("OpenAI WebSocket closed");
      socket.send(JSON.stringify({ type: "session.ended" }));
    };
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received from client:", data.type);
    
    // Forward client messages to OpenAI
    if (openAISocket && openAISocket.readyState === WebSocket.OPEN) {
      openAISocket.send(event.data);
    }
  };

  socket.onclose = () => {
    console.log("Client WebSocket closed");
    if (openAISocket) {
      openAISocket.close();
    }
  };

  socket.onerror = (error) => {
    console.error("Client WebSocket error:", error);
    if (openAISocket) {
      openAISocket.close();
    }
  };

  return response;
});