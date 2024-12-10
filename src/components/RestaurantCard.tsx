import { Restaurant } from "../types/restaurant";
import { Star } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (restaurant: Restaurant) => void;
}

export const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(restaurant)}
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
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{restaurant.deliveryTime}</span>
          <span>Min. ${restaurant.minimumOrder}</span>
        </div>
      </div>
    </div>
  );
};