import { Restaurant } from "../types/restaurant";
import { Star, MapPin, Car } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LocationPicker } from "./LocationPicker";
import { useToast } from "./ui/use-toast";
import { RideBooking } from "./RideBooking";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleBookRide = () => {
    if (!selectedLocation) {
      toast({
        title: "Select Location",
        description: "Please select your location first",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/restaurant/${restaurant.id}`, {
      state: { selectedLocation }
    });
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{restaurant.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm">{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">{restaurant.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{restaurant.location.distance} away</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>{restaurant.deliveryTime}</span>
          <span>Min. ${restaurant.minimumOrder}</span>
        </div>
        <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
};
