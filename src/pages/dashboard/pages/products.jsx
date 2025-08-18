import { useContext } from "react";
import Form from "../../../UI/FormAdd";
import { OureContext } from "../../../context/gloableContext";
import { useProducts } from "../../../hooks/useProducts";
import { AiOutlineDelete } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import Modal from "../../../UI/Dialog";
import FormUpdate from "../../../UI/FormUpdate";

import "./dashpoard.css"; 

const DashbordProducts = () => {
  const { products, isLoading, error } = useProducts();
  const {
    addProductForm,
    setAddProductForm,
    setDeleteDialog,
    openFormUpdate,
    setOpenFormUpdate,
    currentProduct,
    setCurrentProduct,
  } = useContext(OureContext);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      <div className="btn-add-product">
        <button
          className="dashboard-btn"
          onClick={() => setAddProductForm(!addProductForm)}
        >
          Add Products
        </button>
      </div>

      <div className="dashboard-container">
        {openFormUpdate && (
          <div className="dashboard-overlay">
            <FormUpdate product={currentProduct} />
          </div>
        )}

        {addProductForm && (
          <div className="dashboard-overlay">
            <Form
              btnText={"Add Product"}
              formDesc={"Add new product to website"}
              formTitle={"NEW PRODUCT"}
            />
          </div>
        )}

        <Modal onClick={() => setOpenDialog(true)} />

        <div className="dashboard-grid">
          {products.map((product) => (
            <div key={product.id} className="dashboard-card">
              <img
                src={product.images[0]}
                alt={product.title}
                className="dashboard-img"
              />
              <h3 className="dashboard-title">{product.title}</h3>
              <p className="dashboard-price">${product.price}</p>
              <div className="dashboard-actions">
                <AiOutlineDelete
                  onClick={() => setDeleteDialog({ open: true, id: product.id })}
                  size={25}
                  className="icon-action"
                />
                <GrEdit
                  onClick={() => {
                    setCurrentProduct(product);
                    setOpenFormUpdate(true);
                  }}
                  size={25}
                  className="icon-action"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashbordProducts;
