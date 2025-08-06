import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if(loading){
    return <Loading/>
  }
  

  return (
    <div className="containerr mx-auto py-8">
      <h2 className="text-2xl font-bold text-primary mb-8 text-center"> Shop by Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
        {categories.map((cat) => (
          <div key={cat._id} className="flex flex-col items-center">
            <button
              className="w-28 h-28 overflow-hidden flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-125 bg-white focus:outline-none cursor-pointer rounded-lg"
              onClick={() => navigate(`/CategoriesShow/${cat._id}`)}
              title={cat.name}
            >
              <img src={cat.image} alt={cat.name} className="object-cover w-full h-full" />
            </button>
            <span className="mt-2 text-center font-medium text-gray-700 text-sm w-24 truncate" title={cat.name}>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
