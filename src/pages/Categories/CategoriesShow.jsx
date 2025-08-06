import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/productCard/productCard';
import Loading from '../../components/Loading/Loading';

export default function CategoriesShow() {
  const { id } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    async function fetchCategoryProducts() {
      setLoading(true);
      try {
        // Fetch category details first
        const categoryResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        setCategoryName(categoryResponse.data.data.name);
        
        // Fetch all products and filter by category
        const productsResponse = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        const allProducts = productsResponse.data.data;
        
        // Filter products by category ID
        const filteredProducts = allProducts.filter(product => product.category._id === id);
        setCategoryProducts(filteredProducts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategoryProducts();
  }, [id]);

if(loading){
  return <Loading/>
}





  return (
    <div className="containerr mx-auto py-8">
      <h2 className="text-2xl font-bold text-primary mb-8 text-center">{categoryName} Products</h2>
      {
        !loading && categoryProducts.length === 0 ? (
          <div className="text-center my-20">
            <h3 className="text-xl text-gray-600">Sorry, no products found for this category.</h3>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {categoryProducts.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )
      }
    </div>
  );
}
