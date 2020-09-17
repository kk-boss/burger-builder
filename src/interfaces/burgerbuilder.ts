interface burgerStateType {
    ingredients: {
        [key: string]: number
    };
    totalPrice: number;
    error: boolean;
}

export default burgerStateType;