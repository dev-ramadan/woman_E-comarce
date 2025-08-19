import { useEffect, useState, useCallback, useContext } from "react";
import { useAddToCartMutation, useUpdateCartMutation } from "../api/cartApi";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { OureContext } from "../context/gloableContext";

export const useAddToCart = () => {
  const [addToCart] = useAddToCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [userID, setUserID] = useState(null);
  const { cartItems } = useCart(userID);
  const { setQuantityDialog, selectQuantity, setSelectQuantity, setCurrentProductId } = useContext(OureContext)
  const { user } = useSelector(state => state.auth)
  useEffect(() => {

    if (user) {
      setUserID(user.id)
    } else {
      setUserID(null)
    }

  }, [user]);

  const checkUser = () => {
    if (!userID) {
      toast.error('Please log in first');
      return;
    } else {
      setQuantityDialog(true)
    }
  }

  const handelAdd = useCallback(
    async (productId) => {
      try {
        const existingItem = cartItems.find(item => item.product_id === productId);

        if (existingItem) {
          const { id, quantity } = existingItem;
          await updateCart({
            id,
            quantity: quantity + selectQuantity
          }).unwrap();
        } else {
          await addToCart({
            product_id: productId,
            user_id: userID,
            quantity: selectQuantity
          }).unwrap();
          toast.success('Product Add Successfuly!');
          setQuantityDialog(false);
          setSelectQuantity(1)
          setCurrentProductId(null)

        }
      } catch (error) {
        console.log(error);
      }
    },
    [userID, cartItems, addToCart, updateCart, selectQuantity]
  );

  return { handelAdd, checkUser };
};
