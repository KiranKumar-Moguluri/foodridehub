import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Car } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { carTypes } from "../data/restaurants";
import { useToast } from "./ui/use-toast";

interface RideBookingProps {
  distance: string;
  onBook: () => void;
}

export const RideBooking = ({ distance, onBook }: RideBookingProps) => {
  const [selectedCar, setSelectedCar] = useState("");
  const [price, setPrice] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedCar && distance) {
      const numericDistance = parseFloat(distance.replace(/[^0-9.]/g, ''));
      const carType = carTypes.find(car => car.id === selectedCar);
      if (carType) {
        const basePrice = carType.pricePerMile;
        const totalPrice = (basePrice * numericDistance) + carType.basePrice;
        setPrice(totalPrice);
      }
    }
  }, [selectedCar, distance]);

  const handleBooking = () => {
    if (!selectedCar) {
      toast({
        title: "Select a Car",
        description: "Please select a car type before booking",
        variant: "destructive",
      });
      return;
    }

    const selectedCarType = carTypes.find(car => car.id === selectedCar);
    toast({
      title: "Ride Booked",
      description: `Your ${selectedCarType?.name} has been booked. Total: $${price.toFixed(2)}`,
    });
    onBook();
  };

  return (
    <div className="space-y-4">
      <Select value={selectedCar} onValueChange={setSelectedCar}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select car type" />
        </SelectTrigger>
        <SelectContent>
          {carTypes.map((car) => (
            <SelectItem key={car.id} value={car.id}>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                <span>{car.name}</span>
                <span className="text-muted-foreground">
                  (${car.pricePerMile}/mile + ${car.basePrice} base)
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {selectedCar && (
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <span>Estimated Price:</span>
          <span className="font-semibold">${price.toFixed(2)}</span>
        </div>
      )}
      
      <Button
        variant="secondary"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleBooking}
        disabled={!selectedCar}
      >
        <Car className="w-4 h-4" />
        Book Ride
      </Button>
    </div>
  );
};