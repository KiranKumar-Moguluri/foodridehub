import { useParams, useNavigate } from "react-router-dom";
import { restaurants } from "../data/restaurants";
import { RestaurantDetail } from "../components/RestaurantDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
        <Button onClick={() => navigate("/")} variant="secondary">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white/80"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Restaurants
          </Button>
        </div>
      </div>
      <RestaurantDetail restaurant={restaurant} />
    </div>
  );
};

export default Restaurant;