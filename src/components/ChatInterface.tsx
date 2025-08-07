import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { Mic, MicOff, Send, Phone, PhoneOff, MessageSquare, Volume2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isAudio?: boolean;
}

const ChatInterface: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [textInput, setTextInput] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const chatRef = useRef<RealtimeChat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createConversation = async () => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: user.id,
          title: 'Detaileo Voice Assistant'
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
  };

  const saveMessage = async (role: 'user' | 'assistant', content: string, isAudio = false) => {
    if (!conversationId) return;

    try {
      await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          role,
          content,
          audio_url: isAudio ? 'audio_message' : null
        });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const addMessage = (role: 'user' | 'assistant', content: string, isAudio = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      isAudio
    };
    setMessages(prev => [...prev, newMessage]);
    saveMessage(role, content, isAudio);
  };

  const handleMessage = (event: any) => {
    console.log('Chat event:', event.type);
    
    switch (event.type) {
      case 'connection.established':
        setIsConnected(true);
        setIsListening(true);
        addMessage('assistant', 'Welcome to Detaileo! I\'m your luxury automotive concierge. How may I assist you with your premium vehicle care needs today?');
        break;
        
      case 'response.audio.delta':
        setIsSpeaking(true);
        break;
        
      case 'response.audio.done':
        setIsSpeaking(false);
        break;
        
      case 'response.audio_transcript.delta':
        // Handle AI response transcript
        if (event.delta) {
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.role === 'assistant' && lastMessage.isAudio) {
              return [
                ...prev.slice(0, -1),
                { ...lastMessage, content: lastMessage.content + event.delta }
              ];
            } else {
              const newMessage: Message = {
                id: Date.now().toString(),
                role: 'assistant',
                content: event.delta,
                timestamp: new Date(),
                isAudio: true
              };
              return [...prev, newMessage];
            }
          });
        }
        break;
        
      case 'conversation.item.input_audio_transcription.completed':
        // Handle user speech transcript
        if (event.transcript) {
          addMessage('user', event.transcript, true);
        }
        break;
        
      case 'response.done':
        setIsSpeaking(false);
        // Save the complete assistant message
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant' && lastMessage.isAudio) {
          saveMessage('assistant', lastMessage.content, true);
        }
        break;
        
      case 'connection.closed':
        setIsConnected(false);
        setIsListening(false);
        setIsSpeaking(false);
        break;
        
      case 'error':
        toast({
          title: 'Connection Error',
          description: event.message || 'An error occurred',
          variant: 'destructive',
        });
        break;
    }
  };

  const startVoiceChat = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to use the voice assistant',
        variant: 'destructive',
      });
      return;
    }

    try {
      const newConversationId = await createConversation();
      if (!newConversationId) {
        throw new Error('Failed to create conversation');
      }
      
      setConversationId(newConversationId);
      
      chatRef.current = new RealtimeChat(
        handleMessage, 
        (error) => {
          toast({
            title: 'Voice Assistant Error',
            description: error,
            variant: 'destructive',
          });
        }
      );
      
      await chatRef.current.init();
      
      toast({
        title: 'Voice Assistant Ready',
        description: 'You can now speak with our luxury automotive concierge',
      });
    } catch (error) {
      console.error('Error starting voice chat:', error);
      toast({
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to start voice chat',
        variant: 'destructive',
      });
    }
  };

  const endVoiceChat = () => {
    chatRef.current?.disconnect();
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
    
    toast({
      title: 'Voice Chat Ended',
      description: 'Thank you for choosing Detaileo',
    });
  };

  const sendTextMessage = async () => {
    if (!textInput.trim() || !chatRef.current) return;

    const messageText = textInput.trim();
    setTextInput('');
    
    addMessage('user', messageText);
    
    try {
      await chatRef.current.sendTextMessage(messageText);
    } catch (error) {
      toast({
        title: 'Send Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant border-accent/20">
      <CardHeader className="bg-gradient-luxury text-white">
        <CardTitle className="flex items-center justify-between text-2xl font-luxury">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Detaileo AI Concierge
          </span>
          <div className="flex items-center gap-2">
            {isSpeaking && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground animate-pulse">
                <Volume2 className="w-3 h-3 mr-1" />
                Speaking
              </Badge>
            )}
            {isListening && (
              <Badge variant="secondary" className="bg-emerald text-emerald-foreground animate-pulse">
                <Mic className="w-3 h-3 mr-1" />
                Listening
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-background/50">
          {messages.length === 0 && !isConnected && (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-accent/50" />
              <p className="text-lg font-medium">Welcome to Detaileo AI Concierge</p>
              <p>Start a voice conversation or type your message</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card border border-border'
                }`}
              >
                <p className="text-sm font-medium mb-1">
                  {message.role === 'user' ? 'You' : 'Detaileo AI'}
                  {message.isAudio && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      <Mic className="w-2 h-2 mr-1" />
                      Voice
                    </Badge>
                  )}
                </p>
                <p className="font-elegant">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Controls */}
        <div className="border-t border-border p-4 space-y-3">
          {/* Voice Controls */}
          <div className="flex justify-center gap-4">
            {!isConnected ? (
              <Button
                onClick={startVoiceChat}
                className="bg-gradient-accent text-accent-foreground hover:opacity-90"
                size="lg"
              >
                <Phone className="w-4 h-4 mr-2" />
                Start Voice Chat
              </Button>
            ) : (
              <Button
                onClick={endVoiceChat}
                variant="destructive"
                size="lg"
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                End Call
              </Button>
            )}
          </div>
          
          {/* Text Input */}
          <div className="flex gap-2">
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isConnected ? "Type your message..." : "Start voice chat to begin"}
              disabled={!isConnected}
              className="flex-1"
            />
            <Button 
              onClick={sendTextMessage}
              disabled={!textInput.trim() || !isConnected}
              variant="outline"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;