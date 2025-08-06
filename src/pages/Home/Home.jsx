import React, {  useEffect, useState } from 'react'
import ProductCard from '../../components/productCard/productCard'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import slider1 from '../../assets/images/slide-1.jpg';
import slider2 from '../../assets/images/slider-2.jpg';
import Loading from '../../components/Loading/Loading';
import { useRef } from 'react';

import banner1 from "../../assets/images/grocery-banner.png";
import banner2 from "../../assets/images/grocery-banner-2.jpg";

export default function Home() {

  let[product,setProducts]=useState([])
  const [loading, setLoading] = useState(false);

const productsRef = useRef(null);

const scrollToProducts = () => {
  productsRef.current?.scrollIntoView({ behavior: 'smooth' });
};




async function getAllProduct(){
  setLoading(true);
  
  try{
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    setProducts(data.data)
  }catch(err){
    console.log(err);
  }finally{
    setLoading(false);
  }
}

useEffect(()=>{
  getAllProduct()
},[])


if(loading){
  return <Loading/>
}

  return (
    <div className='containerr mx-auto'>
      {/* Slider Section */}
      <div className="mb-8 mt-8">
        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          allowTouchMove={false}
        >
          <SwiperSlide >
            <div className='relative'>
                 <img src={slider1} alt="Slider 1" className="w-full h-[25rem] md:h-[31rem] object-cover rounded-xl shadow-lg " />
                  <div className='absolute  top-1/2 transform -translate-y-1/2 md:left-14 left-5'>
                   <span className=" p-1  bg-yellow-400 font-medium text-[10px] text-center  inline-block text-gray-900  rounded-[4px]">
                    Opening Sale Discount 50%
                  </span>
                  <h2 className="lg:text-5xl md:text-[40px] text-3xl leading-tight  font-bold mt-6 lg:w-[60%]  md:w-[80%]  w-[90%]">
                    SuperMarket for Everything You Need
                  </h2>
                  <p className="text-slate-500 mt-5 mb-3 text-lg font-medium md:w-[65%] w-[90%]">
                    Introduced a new model for online grocery shopping and
                    convenient home delivery.
                  </p>
                    <button
                    type="submit"
                    className="text-white mt-4 mb-2 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  px-6 py-2.5 text-center"
                    onClick={scrollToProducts}
                  >
                    Shop Now
                    <i className="fa-solid fa-arrow-right text-[11px] ms-2 text-white"></i>
                  </button>
           
            </div>
            </div>
         
           
          </SwiperSlide>
          <SwiperSlide>
            <div className='relative'>
               <img src={slider2} alt="Slider 2" className="w-full h-[25rem] md:h-[31rem] object-cover rounded-xl shadow-lg" />
                <div className="absolute top-1/2 transform -translate-y-1/2 md:left-14 left-5 ">
                  <span className=" p-1  bg-yellow-400 font-medium text-[10px] text-center  inline-block text-gray-900  rounded-[4px]">
                    Free Shipping - orders over 299 EGP
                  </span>
                  
                  <h2 className="lg:text-5xl md:text-[40px] text-3xl leading-tight font-bold mt-6 lg:w-[60%]  md:w-[80%]  w-[90%]">
                    Free Shipping on orders over{" "}
                    <span className="text-emerald-600">299 EGP</span>
                  </h2>
                  <p className="text-slate-500 mt-5 mb-3 text-lg font-medium md:w-[65%] w-[90%]">
                    Free Shipping to First-Time Customers Only, After promotions
                    and discounts are applied.
                  </p>

                  <button
                    type="submit"
                    className="text-white mt-4 mb-2 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  px-6 py-2.5 text-center"
                     onClick={scrollToProducts}
                  >
                    Shop Now
                    <i className="fa-solid fa-arrow-right text-[11px] ms-2 text-white"></i>
                  </button>
                </div>
            </div>
           
          </SwiperSlide>
        </Swiper>
      </div>
      <div >
         <section>
        <div className="md:container my-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="lg:w-[49%] md:w-[48%]  w-full">
              <div className="img1 relative">
                <img
                  src={banner1}
                  alt="banner 1"
                  className="  w-full h-[25vh] md:h-[18vh] lg:h-auto object-cover rounded-lg "
                />
                  <div className="absolute md:top-12  top-9 left-9 ">
                  <h2 className="text-2xl font-bold  text-gray-800">
                  Fruits & Vegetables
                  </h2>
                  <p className="text-gray-500 font-semibold mt-1">
                 Get Upto 30% Off


                  </p>
                 
               <button
                    type="submit"
                    className="text-white mt-5 mb-2 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  px-4 py-2.5 text-center"
                    onClick={scrollToProducts}
                  >
                    Shop Now
                            
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:w-[49%] md:w-[48%] w-full">
             <div className="img1 relative">
                <img
                  src={banner2}
                  alt="banner 1"
           className="  w-full h-[25vh] md:h-[18vh] lg:h-auto object-cover rounded-lg "
                />
                  <div className="absolute md:top-12  top-9 left-9 ">
                  <h2 className="text-2xl font-bold  text-gray-800">
               Freshly Baked Buns

                  </h2>
                  <p className="text-gray-500 font-semibold mt-1">
             Get Upto 25% Off


                  </p>
                 
               <button
                    type="submit"
                    className="text-white mt-5 mb-2 bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  px-4 py-2.5 text-center"
                    onClick={scrollToProducts}
                  >
                    Shop Now
                            
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      

      <h1 className='text-primary font-extrabold text-3xl text-center mt-6'>Shope now by popular products</h1>
      <div ref={productsRef} className='bg-primary h-0.5 mx-auto w-55 mt-1'></div>
      {/* Products Section */}
      <div className='grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
       {product.map((item)=>
        <ProductCard key={item._id} item={item} />
       )}
      </div>
    </div>
  )
}
 