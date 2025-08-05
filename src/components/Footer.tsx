import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        "Luxury Spa Detailing",
        "Essential Care",
        "Protection Services",
        "Mobile Detailing",
        "Fleet Services"
      ]
    },
    {
      title: "Locations",
      links: [
        "Find Nearest Location",
        "Downtown Luxury",
        "Mall Express Centers",
        "Westside Premium",
        "All Locations"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Book Appointment",
        "Cancel/Reschedule",
        "Contact Support",
        "Service Guarantee"
      ]
    },
    {
      title: "Company",
      links: [
        "About Legacy",
        "Careers",
        "Franchise",
        "Press",
        "Blog"
      ]
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="text-3xl font-bold text-accent mb-4">
                Legacy Detailing
              </div>
              <p className="text-primary-foreground/80 mb-6 max-w-md">
                Premium automotive care with professional detailing services 
                across multiple locations. Excellence is our standard.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-accent" />
                  <span className="text-sm">(555) 123-LEGACY</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-accent" />
                  <span className="text-sm">info@legacydetailing.com</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-3 text-accent" />
                  <span className="text-sm">Mon-Sun: 7 AM - 8 PM</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent hover:bg-primary-glow">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent hover:bg-primary-glow">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent hover:bg-primary-glow">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent hover:bg-primary-glow">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Navigation Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h3 className="font-semibold text-lg mb-4 text-accent">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold mb-2 text-accent">
              Stay Updated
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              Get exclusive offers, detailing tips, and location updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button variant="accent">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-primary-foreground/80 mb-4 md:mb-0">
              © 2024 Legacy Detailing System. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-smooth">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;