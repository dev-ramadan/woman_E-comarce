import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useProducts } from "../../hooks/useProducts";
import "./ProductDetils.css";

const ProductDetils = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const singleProduct = products.find((product) => product.id === Number(id));

    const [count, setCount] = useState(1);
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        if (singleProduct && singleProduct.images.length > 0) {
            setMainImage(singleProduct.images[0]);
        }
    }, [singleProduct]);

    const handleIncrement = () => {
        setCount((prev) => (prev < 999 ? prev + 1 : prev));
    };

    const handleDecrement = () => {
        setCount((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= 999) {
            setCount(value);
        }
    };

    

    return (
        <main>
            <div className="container mx-auto p-6">
                {singleProduct ? (
                    <div className="productDetails grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* الصور */}
                        <div className="images flex flex-col items-center">
                            {/* الصورة الرئيسية */}
                            <img
                                id="product_image"
                                src={mainImage}
                                alt={singleProduct.title}
                                className="max-w-md object-cover rounded-lg shadow-lg mb-4 w-full "
                            />

                            {/* الصور المصغرة */}
                         
                            <div className="w-auto mx-auto h-20 thumbnails flex gap-3 items-start">
                                {singleProduct.images.map((img, index) => (
                                    <div key={index} className="w-16 h-16">
                                        <img
                                            src={img}
                                            alt={`thumbnail-${index}`}
                                            className={`w-full h-full object-cover rounded-lg border cursor-pointer transition ${mainImage === img
                                                    ? "border-blue-500 ring-2 ring-blue-400"
                                                    : "border-gray-300"
                                                }`}
                                            onClick={() => setMainImage(img)}
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* التفاصيل */}
                        <div className="details flex flex-col gap-4">
                            <span className="category_name text-sm text-gray-500 uppercase">
                                {singleProduct.slug_name}
                            </span>
                            <h2 className="product_name text-3xl font-semibold">
                                {singleProduct.title}
                            </h2>
                            <h3 className="product_price text-2xl text-green-600 font-bold">
                                ${singleProduct.price}
                            </h3>
                            <p className="product_des text-gray-600 leading-relaxed">
                                {singleProduct.description}
                            </p>

                            {/* الأزرار */}
                            <div className="buttons flex flex-col md:flex-row gap-4 mt-6">
                                {/* التحكم في الكمية */}
                                <div className="counts flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        id="minus"
                                        className="counts_btns px-4 py-2 bg-gray-100 hover:bg-gray-200"
                                        onClick={handleDecrement}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        name="productCount"
                                        min="1"
                                        step="1"
                                        max="999"
                                        className="product_count w-16 text-center border-x border-gray-300"
                                        id="productCount"
                                        value={count}
                                        onChange={handleChange}
                                    />
                                    <button
                                        id="plus"
                                        className="counts_btns px-4 py-2 bg-gray-100 hover:bg-gray-200"
                                        onClick={handleIncrement}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* زر الإضافة للسلة */}
                                <button
                                    id="btn_add"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 text-xl">
                        Loading product details...
                    </div>
                )}
            </div>
        </main>
    );
};

export default ProductDetils;
