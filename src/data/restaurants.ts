import { Restaurant } from "../types/restaurant";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Palace",
    description: "Gourmet burgers made with premium ingredients",
    image: "/placeholder.svg",
    rating: 4.5,
    deliveryTime: "20-30 min",
    minimumOrder: 15,
    location: {
      address: "123 Main St, Downtown",
      distance: "1.2 miles"
    },
    menu: [
      {
        id: "1",
        name: "Classic Burger",
        description: "Beef patty with lettuce, tomato, and special sauce",
        price: 12.99,
        image: "/placeholder.svg",
        category: "Burgers",
      },
      {
        id: "2",
        name: "Cheese Fries",
        description: "Crispy fries topped with melted cheese",
        price: 5.99,
        image: "/placeholder.svg",
        category: "Sides",
      },
    ],
  },
  {
    id: "2",
    name: "Pizza Paradise",
    description: "Authentic Italian pizzas baked in wood-fired ovens",
    image: "/placeholder.svg",
    rating: 4.8,
    deliveryTime: "25-35 min",
    minimumOrder: 20,
    location: {
      address: "456 Oak Ave, Westside",
      distance: "0.8 miles"
    },
    menu: [
      {
        id: "3",
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, and basil",
        price: 14.99,
        image: "/placeholder.svg",
        category: "Pizzas",
      },
      {
        id: "4",
        name: "Garlic Bread",
        description: "Freshly baked bread with garlic butter",
        price: 4.99,
        image: "/placeholder.svg",
        category: "Sides",
      },
    ],
  },
  {
    id: "3",
    name: "Sushi Master",
    description: "Fresh and authentic Japanese sushi and sashimi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    rating: 4.9,
    deliveryTime: "30-40 min",
    minimumOrder: 25,
    location: {
      address: "789 Sakura St, Eastside",
      distance: "1.5 miles"
    },
    menu: [
      {
        id: "5",
        name: "California Roll",
        description: "Crab, avocado, and cucumber roll",
        price: 12.99,
        image: "/placeholder.svg",
        category: "Sushi Rolls",
      },
      {
        id: "6",
        name: "Salmon Nigiri",
        description: "Fresh salmon over seasoned rice",
        price: 8.99,
        image: "/placeholder.svg",
        category: "Nigiri",
      },
    ],
  },
  {
    id: "4",
    name: "Taco Fiesta",
    description: "Authentic Mexican street tacos and more",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
    rating: 4.7,
    deliveryTime: "15-25 min",
    minimumOrder: 12,
    location: {
      address: "321 Salsa Ave, Downtown",
      distance: "0.5 miles"
    },
    menu: [
      {
        id: "7",
        name: "Street Tacos Trio",
        description: "Three authentic street tacos with your choice of meat",
        price: 10.99,
        image: "/placeholder.svg",
        category: "Tacos",
      },
      {
        id: "8",
        name: "Guacamole & Chips",
        description: "Fresh made guacamole with crispy tortilla chips",
        price: 7.99,
        image: "/placeholder.svg",
        category: "Sides",
      },
    ],
  },
];

export const carTypes = [
  {
    id: "economy",
    name: "Economy",
    basePrice: 10,
    pricePerMile: 2,
    image: "/placeholder.svg",
  },
  {
    id: "comfort",
    name: "Comfort",
    basePrice: 15,
    pricePerMile: 3,
    image: "/placeholder.svg",
  },
  {
    id: "premium",
    name: "Premium",
    basePrice: 25,
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
