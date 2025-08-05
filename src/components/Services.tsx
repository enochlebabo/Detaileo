import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Sparkles, Shield, Clock, Star, ArrowRight } from "lucide-react";

const Services = () => {
  const serviceCategories = [
    {
      title: "Luxury Spa Detailing",
      description: "Premium treatment for your vehicle",
      icon: Sparkles,
      badge: "Most Popular",
      services: [
        { name: "Full Spa Treatment", price: "$299", duration: "4-6 hours" },
        { name: "Premium Wash & Wax", price: "$199", duration: "2-3 hours" },
        { name: "Interior Deep Clean", price: "$149", duration: "2 hours" },
        { name: "Paint Correction", price: "$399", duration: "6-8 hours" }
      ]
    },
    {
      title: "Essential Care",
      description: "Quality service at affordable prices",
      icon: Car,
      badge: "Best Value",
      services: [
        { name: "Basic Wash & Vacuum", price: "$29", duration: "30 mins" },
        { name: "Express Detail", price: "$59", duration: "1 hour" },
        { name: "Tire & Rim Care", price: "$39", duration: "30 mins" },
        { name: "Interior Cleaning", price: "$79", duration: "1.5 hours" }
      ]
    },
    {
      title: "Protection Services",
      description: "Long-term vehicle protection",
      icon: Shield,
      badge: "Recommended",
      services: [
        { name: "Ceramic Coating", price: "$599", duration: "8-10 hours" },
        { name: "Paint Protection Film", price: "$799", duration: "Full day" },
        { name: "Rust Prevention", price: "$199", duration: "2 hours" },
        { name: "Fabric Protection", price: "$129", duration: "1 hour" }
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Professional Detailing
            <span className="block text-accent">For Every Need</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From luxury spa treatments to essential maintenance, we offer comprehensive 
            detailing services at multiple locations with flexible pricing options.
          </p>
        </div>

        {/* Service Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {serviceCategories.map((category, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-card-custom transition-smooth animate-slide-up border-border/50">
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  {category.badge}
                </Badge>
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">{category.title}</CardTitle>
                <CardDescription className="text-base">
                  {category.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4 mb-6">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{service.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {service.duration}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-accent">{service.price}</div>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group"
                >
                  Book Service
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-hero p-8 rounded-2xl text-primary-foreground max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Not sure which service is right for you?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Speak with our experts for a personalized recommendation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg">
                Get Free Consultation
              </Button>
              <Button variant="outline" size="lg" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                View All Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;