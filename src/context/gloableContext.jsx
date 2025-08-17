import { createContext, useState } from "react";

export const OureContext = createContext();


export const OurePtovider = ({ children }) => {
    const [openShopAside, setOpenShopAside] = useState(false);
    const [selectByCategory , setSelectByCategory] = useState(0);
    const [openCartDrawer, setOpenCartDrawer] = useState(false);
    const [addProductForm, setAddProductForm] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
    const [openFormUpdate ,setOpenFormUpdate] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null);





    return (
        <OureContext.Provider value={{
            openShopAside,
            setOpenShopAside,
            selectByCategory,
            setSelectByCategory,
            openCartDrawer,
            setOpenCartDrawer,
            addProductForm,
            setAddProductForm,
            deleteDialog,
            setDeleteDialog,
            openFormUpdate,
            setOpenFormUpdate,
            currentProduct,
            setCurrentProduct
        }}>
            {children}
        </OureContext.Provider>
    )
}