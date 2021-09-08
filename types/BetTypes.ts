export interface Game {
    type: string; 
    description: string;
    range: number;
    price: number;
    max_number: number;
    color: string;
    min_cart_value: number;
};

export interface GameResponse {
    color: string;
    created_at: string;
    description: string;
    id: number;
    max_number: number;
    min_cart_value: number;
    price: number;
    range: number;
    type: string;
    updated_at: string;
};