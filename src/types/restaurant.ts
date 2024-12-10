export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  minimumOrder: number;
  menu: MenuItem[];
  location: {
    address: string;
    distance: string;
  };
}