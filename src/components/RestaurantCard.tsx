import { Restaurant } from "../types/restaurant";
import { Star, MapPin, Car } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LocationPicker } from "./LocationPicker";
import { useToast } from "./ui/use-toast";
import { RideBooking } from "./RideBooking";
import { calculateFoodPrice, calculateCombinedPrice } from "../utils/priceCalculations";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [includeRide, setIncludeRide] = useState(false);

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
      state: { selectedLocation, includeRide }
    });
  };

  const distance = parseFloat(restaurant.location.distance.replace(/[^0-9.]/g, ""));
  const basePrice = restaurant.menu[0]?.price || 0;
  const priceCalculation = includeRide
    ? calculateCombinedPrice(basePrice, distance, "food")
    : calculateFoodPrice(basePrice);

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
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
          <span>{restaurant.location.distance}</span>
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
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id={`includeRide-${restaurant.id}`}
              checked={includeRide}
              onChange={(e) => setIncludeRide(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor={`includeRide-${restaurant.id}`} className="text-sm">
              Include Ride Service
            </label>
          </div>
          {selectedLocation && (
            <div className="bg-gray-50 p-3 rounded-md mt-2">
              <h4 className="font-medium mb-2">Price Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Food Subtotal:</span>
                  <span>${priceCalculation.foodSubtotal?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (13%):</span>
                  <span>${priceCalculation.foodTax?.toFixed(2) || "0.00"}</span>
                </div>
                {includeRide && (
                  <>
                    <div className="flex justify-between">
                      <span>Ride Cost:</span>
                      <span>${priceCalculation.rideSubtotal?.toFixed(2) || "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ride Surcharge:</span>
                      <span>${priceCalculation.rideSurcharge?.toFixed(2) || "0.00"}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between font-medium pt-1 border-t">
                  <span>Total:</span>
                  <span>${priceCalculation.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          <RideBooking 
            distance={restaurant.location.distance}
            onBook={handleBookRide}
          />
        </div>
      </div>
    </div>
  );
};