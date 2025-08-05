import { Button } from "@/components/ui/button";
import { Menu, Calendar, MapPin, Phone } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Legacy Detailing
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-foreground hover:text-accent transition-smooth">
              Services
            </a>
            <a href="#locations" className="text-foreground hover:text-accent transition-smooth">
              Locations
            </a>
            <a href="#about" className="text-foreground hover:text-accent transition-smooth">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-accent transition-smooth">
              Contact
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button variant="hero" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;