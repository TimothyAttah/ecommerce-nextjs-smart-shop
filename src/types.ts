import Stripe from "stripe";

export interface ProductsProps {
  products: Stripe.Product[];
}

export interface ProductProps {
  product: Stripe.Product;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}
