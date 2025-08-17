import { useGetProductCartQuery } from "../api/cartApi";

export const useCart = (userID) => {
    const { isError, data: cartItems = [], isLoading } = useGetProductCartQuery(userID, { skip: !userID });

    return { cartItems, isError, isLoading };
};
