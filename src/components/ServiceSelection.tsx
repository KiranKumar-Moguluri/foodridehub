import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Car, Utensils } from "lucide-react";

interface ServiceSelectionProps {
  onServiceSelect: (service: "food" | "ride") => void;
}

export const ServiceSelection = ({ onServiceSelect }: ServiceSelectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <Card
        className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onServiceSelect("food")}
      >
        <div className="flex flex-col items-center space-y-4">
          <Utensils className="w-12 h-12 text-primary" />
          <h3 className="text-xl font-semibold">Food Order</h3>
          <p className="text-center text-muted-foreground">
            Order from nearby restaurants within 8 miles
          </p>
        </div>
      </Card>

      <Card
        className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onServiceSelect("ride")}
      >
        <div className="flex flex-col items-center space-y-4">
          <Car className="w-12 h-12 text-primary" />
          <h3 className="text-xl font-semibold">Book a Ride</h3>
          <p className="text-center text-muted-foreground">
            Book a ride to your destination
          </p>
        </div>
      </Card>
    </div>
  );
};