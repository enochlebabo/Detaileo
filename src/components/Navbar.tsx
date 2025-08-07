import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Calendar, MapPin, Phone, User, LogOut, X, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { UserMenu } from "./UserMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin, isManager, isStaff } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Signed out successfully!',
      });
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-smooth">
            <div className="text-4xl font-luxury font-black text-transparent bg-gradient-to-r from-accent via-rose-gold to-accent bg-clip-text tracking-wider drop-shadow-2xl">
              DETAILEO
            </div>
          </Link>

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
            {(isAdmin || isManager || isStaff) && (
              <Link to="/admin" className="text-foreground hover:text-accent transition-smooth flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
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
            
            {user ? (
              <UserMenu />
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#services" className="text-foreground hover:text-accent block px-3 py-2 text-base font-medium">
                Services
              </a>
              <a href="#locations" className="text-foreground hover:text-accent block px-3 py-2 text-base font-medium">
                Locations
              </a>
              <a href="#about" className="text-foreground hover:text-accent block px-3 py-2 text-base font-medium">
                About
              </a>
              <a href="#contact" className="text-foreground hover:text-accent block px-3 py-2 text-base font-medium">
                Contact
              </a>
              
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="hero" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center space-x-1"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" className="w-full">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;