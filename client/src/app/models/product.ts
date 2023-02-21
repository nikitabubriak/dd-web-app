export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    quantityInStock: number;
    genre: string;
    theme: string;
    developer: string;
    releaseDate: Date;
}

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    genres: string[];
    themes: string[];
    pageSize: number;
    pageNumber: number;
}