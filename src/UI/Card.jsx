import { MdOutlineShoppingCart } from "react-icons/md"
import { Link } from "react-router"

const Card = ({ title, price, image, id }) => {
    return (
        <>
            <div className="h-auto w-fit overflow-hidden relative  transition-transform duration-[300] ease-in-out mx-auto">
                <div className="absolute top-1 right-3 bg-white p-2 flex justify-center items-center rounded-full z-30 hover:bg-black hover:text-white transition-all duration-[400]">
                    <MdOutlineShoppingCart size={20} />
                </div>
                <Link to={`/product/${id}`}>
                    <div className='h-80 overflow-hidden w-64'>
                        <img src={image} alt={title} className=" object-cover h-full block hover:scale-110 transition-all duration-1000" />
                    </div>
                </Link>
                <h3 className="mt-4 text-sm font-poppins">{title}</h3>
                <p className="text-sm font-poppins">${price}</p>
            </div>
        </>
    )
}
export default Card