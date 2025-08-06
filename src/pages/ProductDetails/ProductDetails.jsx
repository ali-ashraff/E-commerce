import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from '../../components/productCard/productCard';
import { CartContext } from './../../components/Context/CartContext';
import { useContext } from "react";







export default function ProductDetails() {

let {id}=useParams()
const[product,setProduct]=useState(null)
const[loading,setLoading]=useState(false)
const[related,setRelated]=useState(null)


const{AddProductToCart}=useContext(CartContext)
function handleAddToCart(productId) {
    AddProductToCart(productId); // هيعمل كل حاجة تلقائي: إضافة + toast + تحديث العدد
  }


async function getProductDetails(){
setLoading(true)
    try{
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        console.log(data.data);
        getRelatedProducts(data.data.category._id)
        setProduct(data.data)
    }catch(err){
        console.log(err)
    }finally{
        setLoading(false)
    }
}


async function getRelatedProducts(categoryId){
    try{
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/?category[in]=${categoryId}`)
        console.log(data.data);
        setRelated(data.data)
    }catch(err){
        console.log(err)
    }
}










useEffect(()=>{
    getProductDetails()
}, [id] )


if(loading){
    return(
        <section className="py-8 bg-white md:py-16 container mx-auto mt-5 dark:bg-gray-900 antialiased animate-pulse">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* صورة المنتج والسلايدر */}
          <div className="shrink-0 w-2xs max-w-md lg:max-w-lg mx-auto space-y-4">
            <div className="w-full h-96 bg-gray-300 rounded"></div>
            <div className="flex gap-2">
              <div className="w-20 h-20 bg-gray-300 rounded"></div>
              <div className="w-20 h-20 bg-gray-300 rounded"></div>
              <div className="w-20 h-20 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* التفاصيل */}
          <div className="mt-6 sm:mt-8 lg:mt-0 space-y-6">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/4"></div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-yellow-300 rounded"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="h-10 w-40 bg-gray-300 rounded"></div>
              <div className="h-10 w-40 bg-gray-300 rounded"></div>
            </div>

            <div className="h-1 bg-gray-300 rounded my-6"></div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}















  return (
    <div className='containerr mx-auto'>
       <section className="py-8 bg-white md:py-16  mt-5 dark:bg-gray-900 antialiased">
  <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
      <div className="shrink-0 w-2xs max-w-md lg:max-w-lg mx-auto">
        <img className="w-full dark:hidden" src={product?.imageCover} alt />
        <div>
            <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
     {product?.images.map((image)=>(
        <SwiperSlide >
            <img src={image} alt="Product Image"  />
        </SwiperSlide>
     ))}
      
    </Swiper>
        </div>
        
      </div>
      <div className="mt-6 sm:mt-8 lg:mt-0">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          {product?.title}
        </h1>
        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
          <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
           {product?.price}$
          </p>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </div>
            <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
              {product?.ratingsAverage} of 5
            </p>
            <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
              345 Reviews
            </a>
          </div>
        </div>
        <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
          <a href="#" title className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-primary rounded-lg border border-gray-200 hover:bg-darkprimary hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" role="button">
            <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
            Add to favorites
          </a>
          <a href="#" title className="text-white mt-4 sm:mt-0 bg-primary hover:bg-darkprimary focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center" role="button" onClick={() => handleAddToCart(product._id)}>
            <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
            </svg>
            Add to cart
          </a>
        </div>
        <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
       
        <p className="text-gray-500 dark:text-gray-400">
          {product?.description}
        </p>
      </div>
    </div>
  </div>
</section>

<div className='w-full h-1 my-12 bg-primary'/>
        <h3 className='text-3xl mt-4 font-extrabold'>Related Products</h3>
        <div className='w-1/4 h-1 my-12 bg-primary'/>
       <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
         {related?.map((item)=>(
            <ProductCard key={item._id} item={item} />
        ))}</div>
       </div>
  
    
  )
}
