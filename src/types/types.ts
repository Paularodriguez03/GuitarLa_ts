export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

export type CartItem = Guitar &{
    quantity: number;
}

// export type IdCart = Pick<CartItem, "id">
export type IdCart = Guitar["id"]
