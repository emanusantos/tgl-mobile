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

export interface Bet {
    id: string;
    game_id: number;
    numbers: string;
    price: number;
    color: string;
    type: string;
};

export interface BetResponse {
    id: number;
    user_id: number;
    game_id: number;
    game: GameResponse;
    numbers: string;
    price: number;
    updated_at: string;
    created_at: string;
};

export type User = {
    id?: number;
    name: string;
    email: string;
    password?: string;
    token?: string;
    token_created_at?: string;
    created_at?: string;
    updated_at?: string;
};