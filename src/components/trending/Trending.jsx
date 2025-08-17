import './trending.css'
import Card from "../../UI/Card";
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../api/productsApi';
export default function Trending() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  if (error) console.log(error.message);

  const [trending, setTrending] = useState([])
  useEffect(() => {
    if (products) {
      const getTrending = products.filter(product => product.is_trending === true)
      setTrending(getTrending)
    }
  }, [products])
  return (
    <section className="trending-container">
      <h2 className="trending-header">Trending Products</h2>
      <p className="trending-descripation">Follow the most popular trends and get exclusive items from Foesta shop.</p>
      <div className="product-card-container">
        {trending.map((product) => (
          <Card id={product.id} image={product.images[0]} price={product.price} title={product.title} key={product.id} />
        ))}
      </div>
    </section>
  );
}
