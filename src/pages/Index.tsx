import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Locations from "@/components/Locations";
import BookingInterface from "@/components/BookingInterface";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Locations />
      <BookingInterface />
      <Footer />
    </div>
  );
};

export default Index;
