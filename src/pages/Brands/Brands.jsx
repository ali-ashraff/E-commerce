import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
        setBrands(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);


  if(loading){
    return <Loading/>
  }

  return (
    <div className="containerr mx-auto py-8">
      <h2 className="text-2xl font-bold text-primary mb-8 text-center"> Shop by Brands</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
        {brands.map((brand) => (
          <div key={brand._id} className="flex flex-col items-center">
            <button
              className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-125 bg-white focus:outline-none cursor-pointer"
              onClick={() => navigate(`/brands/${brand._id}`)}
              title={brand.name}
            >
              <img src={brand.image} alt={brand.name} className="object-contain w-20 h-20" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
