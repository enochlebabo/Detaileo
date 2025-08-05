import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-detailing.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional car detailing service" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="animate-fade-in">
            <div className="flex items-center mb-6 space-x-2">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-primary-foreground font-medium">
                Trusted by 10,000+ customers
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Premium Car
              <span className="block text-accent">Detailing</span>
              <span className="block">Excellence</span>
            </h1>

            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
              Experience luxury automotive care with our professional detailing services. 
              From premium spa treatments to essential maintenance, we deliver excellence 
              at every location.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="accent" size="lg" className="group">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Service
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
                <MapPin className="w-5 h-5 mr-2" />
                Find Locations
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-md">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">50+</div>
                <div className="text-sm text-primary-foreground/80">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">24/7</div>
                <div className="text-sm text-primary-foreground/80">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">100%</div>
                <div className="text-sm text-primary-foreground/80">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;