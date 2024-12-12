import { Restaurant } from "../types/restaurant";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { MapPin, Car, Star } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useCart } from "../contexts/CartContext";
import { Cart } from "./Cart";
import { LocationPicker } from "./LocationPicker";
import { RideBooking } from "./RideBooking";
import { useState } from "react";

interface RestaurantDetailProps {
  restaurant: Restaurant;
}

export const RestaurantDetail = ({ restaurant }: RestaurantDetailProps) => {
  const { toast } = useToast();
  const { addItem } = useCart();
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleAddToCart = (itemId: string) => {
    const item = restaurant.menu.find((i) => i.id === itemId);
    if (item) {
      addItem(item);
      toast({
        title: "Added to cart",
        description: "This item has been added to your cart",
      });
    }
  };

  const handleBookRide = () => {
    if (!selectedLocation) {
      toast({
        title: "Select Location",
        description: "Please select your location first",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Ride booking",
      description: `Booking ride from ${selectedLocation} to ${restaurant.location.address}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <Cart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
          <p className="text-gray-600 mb-4">{restaurant.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-500 mr-1" />
              <span className="text-gray-500">
                {restaurant.location.distance}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <LocationPicker
              onLocationSelect={setSelectedLocation}
              defaultLocation={selectedLocation}
            />
            <RideBooking 
              distance={restaurant.location.distance}
              onBook={handleBookRide}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6">Menu</h2>
          {restaurant.menu.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-primary font-semibold mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAddToCart(item.id)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
