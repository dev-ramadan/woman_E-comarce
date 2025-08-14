import ShopAside from "../../components/shopAside/ShopAside"
import ShopHeader from "../../components/shopHeader/ShopHeader"
import { useContext} from "react";
import { OureContext } from "../../context/gloableContext";
import Card from "../../UI/Card";
import { useProducts } from "../../hooks/useProducts";
const Shop = () => {
  const { selectByCategory } = useContext(OureContext);

const {products , error , isLoading} = useProducts()

  const filterProduct = selectByCategory === 0 ? products :
    products.filter(product => product.category_id === selectByCategory)

    if(error) console.log(error);
    
  return (
    <>
      {isLoading ? 'loading........' :
        <div className="container mx-auto relative h-auto mb-16">
          <ShopHeader />
          <div className="flex  justify-between">
            <ShopAside />
            <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto  lg:grid-cols-3 mt-8 gap-7">
              {filterProduct.map((product) => (
                <Card id={product.id} image={product.images[0]} price={product.price} title={product.title} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default Shop