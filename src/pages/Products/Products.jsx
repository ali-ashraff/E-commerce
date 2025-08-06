import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/productCard/productCard';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAllProducts() {
      setLoading(true);
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setProducts(data.data);
      } catch (err) {
        console.log(err);
      }finally {
        setLoading(false);
      }
    }
    getAllProducts();
  }, []);

  // Filter products based on search input (title, category, or brand)
  // ... existing code ...
  // Filter products based on search input (title, category, or brand) - only those that START with the search term
  const filteredProducts = products.filter((item) => {
    const searchTerm = search.toLowerCase();
    return (
      item.title.toLowerCase().startsWith(searchTerm) ||
      item.category.name.toLowerCase().startsWith(searchTerm) ||
      item.brand.name.toLowerCase().startsWith(searchTerm)
    );
  });

  if (loading){
    return <Loading/>
  }
// ... existing code ...
  return (
    <div className="containerr mx-auto">
      <h3 className='text-primary font-extrabold text-2xl mt-5'>Search by products</h3>
      <div className=' h-0.5 w-53 bg-primary'></div>
      <div className="my-6 mx-auto">
        <input
          type="text"
          placeholder="search"
          className="w-80 max-w-sm p-2 border rounded-full  text-center text-darkprimary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {filteredProducts.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
