import { IoMdOptions } from 'react-icons/io'
import './shopHeader.css'
import { useContext } from 'react'
import { OureContext } from '../../context/gloableContext'
const ShopHeader = () => {
    const { openShopAside, setOpenShopAside } = useContext(OureContext)
    return (
        <>
            <div className="product-header">
                <div className="menu-icon">
                    <IoMdOptions onClick={() => setOpenShopAside(!openShopAside)} />
                </div>
                <div className="product-header-right">
                    <div className="sortBy">
                        <span className="store-by">Sort By :</span>
                        <select id="sort" className="sort ">
                            <option value="Alphabetically">Alphabetically, Z-A</option>
                            <option value="Featured">Featured</option>
                            <option value="Bestselling">Best selling</option>
                        </select>
                    </div>
                    <span id="productCount"></span>
                </div>
            </div>
        </>
    )
}

export default ShopHeader