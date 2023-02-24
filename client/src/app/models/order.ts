export interface OrderItem {
    productId: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: number;
    customerId: string;
    orderStatus: string;
    orderDate: string;
    total: number;
    paymentMethod: string;
    orderItems: OrderItem[];
}
