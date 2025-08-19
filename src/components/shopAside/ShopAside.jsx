import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './shopAside.css';
import { OureContext } from '../../context/gloableContext';
import { useCategoires } from '../../hooks/useCategories';

const ShopAside = () => {

    const { categories, isError, isLoading } = useCategoires()
    const {
        openShopAside,
        setSelectByCategory,
        setOpenShopAside ,
    } = useContext(OureContext);

    if (isError) console.log(isError);

    return (
        <>
            {
                isLoading ? (
                    <div>isLoading............</div>
                ) : (

                    <AnimatePresence>
                        {!openShopAside ? (
                            // desktop aside
                            <motion.div
                                key="desktop-aside"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="aside"
                            >
                                <h2 className="text-3xl mb-2">Categories</h2>
                                <div className="shop_categories">
                                    <li className="categories_link" onClick={() => setSelectByCategory(0)}>All</li>
                                    {
                                        categories.map(category => (
                                            <li key={category.id}
                                                className="categories_link"
                                                onClick={() => setSelectByCategory(category.id)}
                                            >
                                                {category.name}
                                            </li>
                                        ))
                                    }

                                </div>
                            </motion.div>
                        ) : (
                            // mobile aside
                            <motion.div
                                key="mobile-aside"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="w-full h-fit bg-[#f2f2f2] absolute z-40 p-5"
                            >
                                <h2 className="text-3xl mb-2">Categories</h2>
                                <div className="shop_categories">
                                    <li className="categories_link" onClick={() => {
                                        setSelectByCategory(0)
                                        setOpenShopAside(false)
                                    }}>
                                        All
                                    </li>

                                    {
                                        categories.map(category => (
                                            <li key={category.id}
                                                className="categories_link"
                                                onClick={() => {
                                                    setSelectByCategory(category.id)
                                                    setOpenShopAside(false)
                                                }}
                                            >
                                                {category.name}</li>
                                        ))
                                    }
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )
            }
        </>
    );
};

export default ShopAside;
