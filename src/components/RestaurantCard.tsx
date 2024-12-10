import { Restaurant } from "../types/restaurant";
import { Star, MapPin, Car } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const navigate = useNavigate();

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
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            // This will be implemented later for ride booking
            console.log("Book ride to", restaurant.location.address);
          }}
        >
          <Car className="w-4 h-4" />
          Book Ride Here
        </Button>
      </div>
    </div>
  );
};