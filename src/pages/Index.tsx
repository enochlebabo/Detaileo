import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Locations from "@/components/Locations";
import BookingInterface from "@/components/BookingInterface";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Locations />
      <BookingInterface />
      <Footer />
      
      {/* Floating Chat Button */}
      {!showChat && (
        <Button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-luxury text-white shadow-elegant hover:shadow-glow transition-all duration-300 z-50"
          size="icon"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
      
      {/* Chat Interface Overlay */}
      {showChat && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <Button
              onClick={() => setShowChat(false)}
              variant="outline"
              size="icon"
              className="absolute -top-12 right-0 bg-background/90 hover:bg-background"
            >
              <X className="w-4 h-4" />
            </Button>
            <ChatInterface />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
