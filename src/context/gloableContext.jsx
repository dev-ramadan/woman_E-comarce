import { createContext, useState } from "react";

export const OureContext = createContext();


export const OurePtovider = ({ children }) => {
    // تحكم  aside في shop page
    const [openShopAside, setOpenShopAside] = useState(false);
    // filter product in shop page
    const [selectByCategory, setSelectByCategory] = useState(0);
    // تحكم في cart aside
    const [openCartDrawer, setOpenCartDrawer] = useState(false);
    // تحكم في form add product in dashboard page
    const [addProductForm, setAddProductForm] = useState(false);
    // تحكم في delete product in dashboard page
    const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
    // تحكم في update product in dashboard page
    const [openFormUpdate, setOpenFormUpdate] = useState(false);
    // تحكم في  aside in dashboard page
    const [asideAdmin, setAsideAdmin] = useState(false);
    // لارسال تفاصيل المنتج في update form
    const [currentProduct, setCurrentProduct] = useState(null);
    // تحكم في كمية المنتج عند الاضافة
    const [selectQuantity, setSelectQuantity] = useState(1);
    // تحكم في modal quantity
    const [quantityDialog, setQuantityDialog] = useState(false);
    // تحكم في ارسال المتج ل modal quantity to select quantity
    const [currentProductId, setCurrentProductId] = useState(null);
    // تحكم في modal add Categorey
    const [addCategoreyForm , setAddCategoreyForm] = useState(false)






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
            setCurrentProduct,
            asideAdmin,
            setAsideAdmin,
            quantityDialog,
            setQuantityDialog,
            selectQuantity,
            setSelectQuantity,
            currentProductId,
            setCurrentProductId,
            addCategoreyForm,
            setAddCategoreyForm
        }}>
            {children}
        </OureContext.Provider>
    )
}