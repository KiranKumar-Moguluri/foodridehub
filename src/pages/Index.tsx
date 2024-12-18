import { useState } from "react";
import { Restaurant } from "../types/restaurant";
import { RestaurantCard } from "../components/RestaurantCard";
import { restaurants } from "../data/restaurants";
import { Search, Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocationPicker } from "@/components/LocationPicker";
import { ServiceSelection } from "@/components/ServiceSelection";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedService, setSelectedService] = useState<"food" | "ride" | null>(
    null
  );
  const { toast } = useToast();

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      parseFloat(restaurant.location.distance.replace(/[^0-9.]/g, "")) <= 8
  );

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location);
    toast({
      title: "Location Set",
      description: "You can now proceed with your order or booking.",
    });
  };

  const handleServiceSelect = (service: "food" | "ride") => {
    if (!currentLocation) {
      toast({
        title: "Location Required",
        description: "Please set your current location first",
        variant: "destructive",
      });
      return;
    }
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white py-6 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">Food & Ride</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1: Location Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Location</h2>
            <LocationPicker
              onLocationSelect={handleLocationSelect}
              defaultLocation={currentLocation}
            />
          </div>

          {/* Step 2: Service Selection */}
          {currentLocation && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Select a Service</h2>
              <ServiceSelection onServiceSelect={handleServiceSelect} />
            </div>
          )}

          {/* Step 3: Restaurant List (if food service selected) */}
          {selectedService === "food" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  Restaurants Within 8 Miles
                </h2>
                <div className="relative w-64">
                  <Input
                    type="text"
                    placeholder="Search restaurants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                Combining the best of food delivery and ride-sharing services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">Email: support@foodandride.com</p>
              <p className="text-gray-400">Phone: (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;