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
];