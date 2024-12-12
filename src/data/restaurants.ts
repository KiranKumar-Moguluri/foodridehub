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
  {
    id: "5",
    name: "Thai Spice",
    description: "Authentic Thai cuisine with a modern twist",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
    rating: 4.6,
    deliveryTime: "25-35 min",
    minimumOrder: 20,
    location: {
      address: "567 Spice Lane, Eastside",
      distance: "2.1 miles"
    },
    menu: [
      {
        id: "9",
        name: "Pad Thai",
        description: "Classic rice noodles with shrimp, tofu, and peanuts",
        price: 15.99,
        image: "/placeholder.svg",
        category: "Noodles",
      },
      {
        id: "10",
        name: "Green Curry",
        description: "Spicy coconut curry with bamboo shoots and basil",
        price: 16.99,
        image: "/placeholder.svg",
        category: "Curries",
      },
    ],
  },
  {
    id: "6",
    name: "Mediterranean Delight",
    description: "Fresh Mediterranean and Greek specialties",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947",
    rating: 4.7,
    deliveryTime: "20-30 min",
    minimumOrder: 25,
    location: {
      address: "890 Olive St, Downtown",
      distance: "1.8 miles"
    },
    menu: [
      {
        id: "11",
        name: "Gyros Plate",
        description: "Seasoned lamb and beef with pita and tzatziki",
        price: 17.99,
        image: "/placeholder.svg",
        category: "Plates",
      },
      {
        id: "12",
        name: "Greek Salad",
        description: "Fresh vegetables, feta cheese, and olives",
        price: 12.99,
        image: "/placeholder.svg",
        category: "Salads",
      },
    ],
  },
  {
    id: "7",
    name: "Indian Curry House",
    description: "Traditional Indian curries and tandoori specialties",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    rating: 4.8,
    deliveryTime: "30-40 min",
    minimumOrder: 30,
    location: {
      address: "123 Curry Lane, Westside",
      distance: "2.5 miles"
    },
    menu: [
      {
        id: "13",
        name: "Butter Chicken",
        description: "Creamy tomato curry with tender chicken",
        price: 18.99,
        image: "/placeholder.svg",
        category: "Curries",
      },
      {
        id: "14",
        name: "Garlic Naan",
        description: "Fresh baked bread with garlic butter",
        price: 3.99,
        image: "/placeholder.svg",
        category: "Breads",
      },
    ],
  },
  {
    id: "8",
    name: "Pho Express",
    description: "Authentic Vietnamese pho and banh mi",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43",
    rating: 4.5,
    deliveryTime: "20-30 min",
    minimumOrder: 15,
    location: {
      address: "456 Noodle St, Eastside",
      distance: "1.3 miles"
    },
    menu: [
      {
        id: "15",
        name: "Special Pho",
        description: "Rice noodles in beef broth with various cuts of beef",
        price: 13.99,
        image: "/placeholder.svg",
        category: "Soups",
      },
      {
        id: "16",
        name: "Banh Mi",
        description: "Vietnamese sandwich with grilled pork",
        price: 8.99,
        image: "/placeholder.svg",
        category: "Sandwiches",
      },
    ],
  },
  {
    id: "9",
    name: "BBQ Smokehouse",
    description: "Authentic Texas-style BBQ and sides",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
    rating: 4.9,
    deliveryTime: "35-45 min",
    minimumOrder: 35,
    location: {
      address: "789 Smoke Ring Rd, Northside",
      distance: "3.0 miles"
    },
    menu: [
      {
        id: "17",
        name: "Brisket Plate",
        description: "Slow-smoked beef brisket with two sides",
        price: 24.99,
        image: "/placeholder.svg",
        category: "Plates",
      },
      {
        id: "18",
        name: "Pulled Pork Sandwich",
        description: "Tender pulled pork with house BBQ sauce",
        price: 14.99,
        image: "/placeholder.svg",
        category: "Sandwiches",
      },
    ],
  },
  {
    id: "10",
    name: "Seafood Harbor",
    description: "Fresh seafood and raw bar selections",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62",
    rating: 4.7,
    deliveryTime: "30-40 min",
    minimumOrder: 40,
    location: {
      address: "321 Harbor View, Seaside",
      distance: "2.8 miles"
    },
    menu: [
      {
        id: "19",
        name: "Lobster Roll",
        description: "Fresh lobster meat with light mayo on toasted roll",
        price: 29.99,
        image: "/placeholder.svg",
        category: "Sandwiches",
      },
      {
        id: "20",
        name: "Fish & Chips",
        description: "Beer-battered cod with crispy fries",
        price: 19.99,
        image: "/placeholder.svg",
        category: "Plates",
      },
    ],
  }
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
