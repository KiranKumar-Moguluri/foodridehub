export const FOOD_TAX_RATE = 0.13;
export const RIDE_PRICE_PER_MILE = 2;
export const FOOD_RIDE_SURCHARGE = 0.20;
export const RIDE_FOOD_SURCHARGE = 0.30;

export const calculateFoodPrice = (basePrice: number): {
  subtotal: number;
  tax: number;
  total: number;
} => {
  const tax = basePrice * FOOD_TAX_RATE;
  return {
    subtotal: basePrice,
    tax,
    total: basePrice + tax,
  };
};

export const calculateRidePrice = (distance: number): {
  subtotal: number;
  total: number;
} => {
  const basePrice = distance * RIDE_PRICE_PER_MILE;
  return {
    subtotal: basePrice,
    total: basePrice,
  };
};

export const calculateCombinedPrice = (
  foodPrice: number,
  distance: number,
  primaryService: "food" | "ride"
): {
  foodSubtotal: number;
  foodTax: number;
  rideSubtotal: number;
  rideSurcharge: number;
  total: number;
} => {
  const foodCalculation = calculateFoodPrice(foodPrice);
  const rideCalculation = calculateRidePrice(distance);

  let rideSurcharge = 0;
  if (primaryService === "food") {
    rideSurcharge = rideCalculation.subtotal * RIDE_FOOD_SURCHARGE;
  } else {
    rideSurcharge = foodCalculation.total * FOOD_RIDE_SURCHARGE;
  }

  return {
    foodSubtotal: foodCalculation.subtotal,
    foodTax: foodCalculation.tax,
    rideSubtotal: rideCalculation.subtotal,
    rideSurcharge,
    total: foodCalculation.total + rideCalculation.total + rideSurcharge,
  };
};