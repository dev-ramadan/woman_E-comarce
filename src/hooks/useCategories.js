import { useGetCategoriesQuery } from "../ReduxTollkit/categoriesApi"

export const useCategoires = () => {
    const {isError , data : categories = [] , isLoading} = useGetCategoriesQuery();
    return ({
        categories ,
        isError ,
        isLoading
    })
}