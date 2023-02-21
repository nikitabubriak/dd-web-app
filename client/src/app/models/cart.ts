export interface Cart {
    id: number;
    customerId: string;
    items: CartItem[];
}

export interface CartItem {
    productId: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    genre: string;
    theme: string;
}