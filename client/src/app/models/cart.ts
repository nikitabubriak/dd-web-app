export interface Cart {
    id: number;
    customerId: string;
    items: CartItem[];
}

export interface CartItem {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    type: string;
    brand: string;
    quantity: number;
}