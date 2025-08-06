import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Navigation, Calendar } from "lucide-react";

const Locations = () => {
  const locations = [
    {
      id: 1,
      name: "Detaileo Maseru Elite",
      type: "Luxury",
      address: "Kingsway Avenue, Maseru Central, Lesotho",
      phone: "(555) 123-4567",
      rating: 4.9,
      reviews: 245,
      hours: "7 AM - 8 PM",
      distance: "2.1 miles",
      features: ["Premium Lounge", "Valet Service", "Express Lane"],
      image: "luxury-location"
    },
    {
      id: 2,
      name: "Detaileo Thaba-Bosiu Premium",
      type: "Economy",
      address: "Ha Thetsane Industrial Area, Maseru, Lesotho",
      phone: "(555) 987-6543",
      rating: 4.7,
      reviews: 189,
      hours: "6 AM - 10 PM",
      distance: "3.8 miles",
      features: ["Quick Service", "Self-Service", "Family Friendly"],
      image: "economy-location"
    },
    {
      id: 3,
      name: "Detaileo Roma Luxury Spa",
      type: "Luxury",
      address: "Roma Valley Road, Roma, Lesotho",
      phone: "(555) 456-7890",
      rating: 4.8,
      reviews: 312,
      hours: "8 AM - 7 PM",
      distance: "5.2 miles",
      features: ["Spa Services", "Concierge", "Premium Wait Area"],
      image: "luxury-westside"
    }
  ];

  const getTypeColor = (type: string) => {
    return type === "Luxury" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground";
  };

  return (
    <section id="locations" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            Our Locations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-wide">
            Discover Your Exclusive
            <span className="block bg-gradient-luxury bg-clip-text text-transparent">Detaileo Sanctuary</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Experience unparalleled luxury at our meticulously curated locations across Lesotho. 
            Each Detaileo sanctuary offers bespoke automotive excellence tailored for the elite.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              <Navigation className="w-5 h-5 mr-2" />
              Find Nearest Location
            </Button>
            <Button variant="outline" size="lg">
              <MapPin className="w-5 h-5 mr-2" />
              View All Locations
            </Button>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <Card key={location.id} className="group hover:shadow-card-custom transition-smooth animate-slide-up border-border/50">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge className={getTypeColor(location.type)}>
                    {location.type}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {location.distance}
                  </div>
                </div>
                
                <CardTitle className="text-xl mb-2">{location.name}</CardTitle>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-accent mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(location.rating) ? 'fill-current' : ''}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {location.rating} ({location.reviews} reviews)
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-muted-foreground mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm text-foreground">{location.address}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-foreground">{location.phone}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-foreground">{location.hours}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-medium text-foreground mb-2">Features:</div>
                  <div className="flex flex-wrap gap-2">
                    {location.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Here
                  </Button>
                  <Button variant="outline" size="sm">
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-secondary/50 p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Don't see your area?
            </h3>
            <p className="text-muted-foreground mb-6">
              We're expanding rapidly. Join our waitlist to be notified when we open in your neighborhood.
            </p>
            <Button variant="accent" size="lg">
              Join Expansion Waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;