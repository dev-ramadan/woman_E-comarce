import { createContext, useState } from "react";

export const OureContext = createContext();


export const OurePtovider = ({ children }) => {
    const [openShopAside, setOpenShopAside] = useState(false);
    const [selectByCategory , setSelectByCategory] = useState(0)

    return (
        <OureContext.Provider value={{
            openShopAside,
            setOpenShopAside,
            selectByCategory,
            setSelectByCategory
        }}>
            {children}
        </OureContext.Provider>
    )
}