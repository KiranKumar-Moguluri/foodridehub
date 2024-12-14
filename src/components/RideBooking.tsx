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

interface RideBookingProps {
  distance: string;
  onBook: () => void;
}

export const RideBooking = ({ distance, onBook }: RideBookingProps) => {
  const [selectedCar, setSelectedCar] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (selectedCar && distance) {
      const numericDistance = parseFloat(distance.replace(/[^0-9.]/g, ''));
      const basePrice = 2; // $2 per mile
      const totalPrice = basePrice * numericDistance;
      setPrice(totalPrice);
    }
  }, [selectedCar, distance]);

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
                  (Base rate: $2/mile)
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
        onClick={onBook}
        disabled={!selectedCar}
      >
        <Car className="w-4 h-4" />
        Book Ride
      </Button>
    </div>
  );
};