import { data } from "react-router";
import { useGetAllPromoCodeQuery } from "../api/promoCodeApi";

   export const usePromoCode = () => {
     const { data=[],error, isLoading } = useGetAllPromoCodeQuery();
     return ({promoCode:data , error , isLoading});
   }
