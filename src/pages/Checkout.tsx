import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { LocationPicker } from "@/components/LocationPicker";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLocationSelect = (location: string) => {
    setDeliveryLocation(location);
  };

  const handlePayment = async () => {
    if (!deliveryLocation) {
      toast({
        title: "Error",
        description: "Please select a delivery location",
        variant: "destructive",
      });
      return;
    }

    // Here we would integrate with a payment gateway
    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully!",
    });
    clearCart();
    navigate("/");
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
        <div>
          <Button
            className="w-full"
            size="lg"
            onClick={handlePayment}
            disabled={!deliveryLocation}
          >
            Pay ${total.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;