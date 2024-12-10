import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { LocationPicker } from "@/components/LocationPicker";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { PaymentForm } from "@/components/PaymentForm";

const Checkout = () => {
  const { items, total } = useCart();
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLocationSelect = (location: string) => {
    setDeliveryLocation(location);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => navigate("/")} variant="secondary">
          Back to Restaurants
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Delivery Location</h2>
            <LocationPicker
              onLocationSelect={handleLocationSelect}
              defaultLocation={deliveryLocation}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Payment Details</h2>
          {deliveryLocation ? (
            <PaymentForm />
          ) : (
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Please select a delivery location first
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;