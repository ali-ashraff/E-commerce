import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/productCard/productCard';
import Loading from '../../components/Loading/Loading';

export default function BrandsShow() {
  const { id } = useParams();
  const [brandProducts, setBrandProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    async function fetchBrandProducts() {
      setLoading(true);
      try {
        // Fetch brand details first
        const brandResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
        setBrandName(brandResponse.data.data.name);
        
        // Fetch all products and filter by brand
        const productsResponse = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        const allProducts = productsResponse.data.data;
        
        // Filter products by brand ID
        const filteredProducts = allProducts.filter(product => product.brand._id === id);
        setBrandProducts(filteredProducts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBrandProducts();
  }, [id]);

if(loading){
  return <Loading/>
}



  return (
    <div className="containerr mx-auto py-8">
      <h2 className="text-2xl font-bold text-primary mb-8 text-center">{brandName} Products</h2>
      {
        !loading && brandProducts.length === 0 ? (
          <div className="text-center my-20">
            <h3 className="text-xl text-gray-600">Sorry, no products found for this brand.</h3>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {brandProducts.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )
      }
    </div>
  );
}
