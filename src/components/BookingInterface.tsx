import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Car, CreditCard, ArrowRight, CheckCircle } from "lucide-react";

const BookingInterface = () => {
  const bookingSteps = [
    { step: 1, title: "Select Service", icon: Car, completed: true },
    { step: 2, title: "Choose Location", icon: MapPin, completed: true },
    { step: 3, title: "Pick Date & Time", icon: Calendar, completed: false },
    { step: 4, title: "Payment", icon: CreditCard, completed: false }
  ];

  const timeSlots = [
    { time: "9:00 AM", available: true, popular: false },
    { time: "10:30 AM", available: true, popular: true },
    { time: "12:00 PM", available: false, popular: false },
    { time: "1:30 PM", available: true, popular: true },
    { time: "3:00 PM", available: true, popular: false },
    { time: "4:30 PM", available: true, popular: false },
    { time: "6:00 PM", available: true, popular: true }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            Book Your Service
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Easy Online
            <span className="block text-accent">Booking Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Schedule your car detailing appointment in just a few clicks. 
            Real-time availability and instant confirmation.
          </p>
        </div>

        {/* Booking Progress */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-8">
            {bookingSteps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  step.completed 
                    ? 'bg-accent border-accent text-accent-foreground' 
                    : 'border-border text-muted-foreground'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    step.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    Step {step.step}
                  </div>
                  <div className={`text-xs ${
                    step.completed ? 'text-accent' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < bookingSteps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    step.completed ? 'bg-accent' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Interface */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Service Summary */}
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="w-5 h-5 mr-2 text-accent" />
                  Selected Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg">Premium Wash & Wax</div>
                    <div className="text-sm text-muted-foreground">Legacy Downtown - Luxury</div>
                    <div className="text-sm text-muted-foreground">Duration: 2-3 hours</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">$199</div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Change Service
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Select Date
                </CardTitle>
                <CardDescription>
                  Choose your preferred appointment date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const isSelected = day === 15;
                    const isAvailable = day >= 12;
                    return (
                      <button
                        key={day}
                        disabled={!isAvailable}
                        className={`p-2 text-sm rounded-md transition-smooth ${
                          isSelected 
                            ? 'bg-accent text-accent-foreground font-semibold' 
                            : isAvailable
                            ? 'hover:bg-secondary text-foreground'
                            : 'text-muted-foreground cursor-not-allowed'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Select Time
                </CardTitle>
                <CardDescription>
                  Available time slots for March 15, 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border text-sm font-medium transition-smooth relative ${
                        slot.available
                          ? 'border-border hover:border-accent hover:bg-accent/10 text-foreground'
                          : 'border-border/50 text-muted-foreground cursor-not-allowed bg-muted/30'
                      }`}
                    >
                      {slot.time}
                      {slot.popular && slot.available && (
                        <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs">
                          Popular
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium">Premium Wash & Wax</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">Legacy Downtown</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">March 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">10:30 AM</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee:</span>
                    <span>$199.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>$15.92</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>Total:</span>
                    <span className="text-accent">$214.92</span>
                  </div>
                </div>

                <Button variant="hero" className="w-full" size="lg">
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="text-center">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <User className="w-4 h-4 mr-2" />
                    Sign in for faster booking
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="bg-secondary/50">
              <CardContent className="pt-6">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Free cancellation up to 24h</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    <span>Professional certified staff</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingInterface;