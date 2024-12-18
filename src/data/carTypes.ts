export const carTypes = [
  {
    id: "economy",
    name: "Economy",
    basePrice: 5,
    pricePerMile: 2,
    image: "/placeholder.svg",
  },
  {
    id: "comfort",
    name: "Comfort",
    basePrice: 8,
    pricePerMile: 3,
    image: "/placeholder.svg",
  },
  {
    id: "premium",
    name: "Premium",
    basePrice: 12,
    pricePerMile: 4,
    image: "/placeholder.svg",
  },
];

export const calculateRidePrice = (carType: string, distance: string) => {
  const car = carTypes.find((c) => c.id === carType);
  if (!car) return 0;
  
  const numericDistance = parseFloat(distance.replace(/[^0-9.]/g, ''));
  return car.basePrice + (car.pricePerMile * numericDistance);
};