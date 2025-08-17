// src/pages/Products.jsx

import { useContext } from "react";
import Form from "../../../UI/FormAdd";
import { OureContext } from "../../../context/gloableContext";

import { useProducts } from "../../../hooks/useProducts";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteProductMutation } from "../../../api/productsApi";
import { Dialog } from "@headlessui/react";
import Modal from "../../../UI/Dialog";
import { GrEdit } from "react-icons/gr";
import FormUpdate from "../../../UI/FormUpdate";

const DashbordProducts = () => {
    const { products, isLoading, error } = useProducts()
    const {
        addProductForm,
        setAddProductForm,
        setDeleteDialog,
        openFormUpdate,
        setOpenFormUpdate,
        currentProduct,
        setCurrentProduct
    } = useContext(OureContext);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products</p>;


    return (
        <>
            <div className="flex justify-end mb-5"><button className="p-3 bg-black text-white" onClick={() => setAddProductForm(!addProductForm)}>Add Products</button></div>
            <div className="relative">

                {
                    openFormUpdate ? (
                        <div className="fixed z-40 inset-0 bg-gray-700 opacity-90 w-full flex flex-col justify-center items-center">
                            <FormUpdate product={currentProduct} />
                        </div>
                    ) : (
                        ''
                    )
                }
                {
                    addProductForm ? (
                        <div className="fixed z-40 inset-0 bg-gray-700 opacity-90 w-full flex flex-col justify-center items-center">
                            <Form btnText={'Add Product'} formDesc={'add new product in web site'} formTitle={'NEW PRODUCT'} />
                        </div>
                    ) : ''
                }

                <Modal onClick={() => setOpenDialog(true)} />
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border p-4 rounded shadow">
                            <img src={product.images[0]} alt={product.title} className=" w-full object-cover mb-2" />
                            <h3 className="font-bold">{product.title}</h3>
                            <p>${product.price}</p>
                            <div className="flex justify-between items-center">
                                <AiOutlineDelete onClick={() => { setDeleteDialog({ open: true, id: product.id }) }} size={25} className="cursor-pointer" />
                                <GrEdit onClick={() => {
                                    setCurrentProduct(product)
                                    setOpenFormUpdate(true)
                                }
                                } size={25} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DashbordProducts;
