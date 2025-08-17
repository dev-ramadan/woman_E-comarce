import { useEffect, useState, useCallback } from "react";
import { useAddToCartMutation, useUpdateCartMutation } from "../api/cartApi";
import { useCart } from "../hooks/useCart";
import { supabase } from "../supabasae/createclient";

export const useAddToCart = () => {
  const [addToCart] = useAddToCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [userID, setUserID] = useState('');
  const { cartItems } = useCart(userID);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (user) setUserID(user.id);
    };
    fetchUser();
  }, []);

  const handelAdd = useCallback(
    async (productId) => {
      if (!userID) {
        console.log('Please log in first');
        return;
      }

      try {
        const existingItem = cartItems.find(item => item.product_id === productId);

        if (existingItem) {
          const { id, quantity } = existingItem;
          await updateCart({
            id,
            quantity: quantity + 1
          }).unwrap();
        } else {
          await addToCart({
            product_id: productId,
            user_id: userID,
            quantity: 1
          }).unwrap();
          alert('تمت الإضافة بنجاح!');
        }
      } catch (error) {
        console.log(error);
      }
    },
    [userID, cartItems, addToCart, updateCart]
  );

  return handelAdd;
};
