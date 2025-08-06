import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Loading from '../../components/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import Checkout from './../Checkout/Checkout';
import { Formik, useFormik} from 'formik';
import *as Yup from 'yup';
import axios from "axios";
import AllOrders from '../allOrders/AllOrders';


export default function Cart() {


  let Navigate=useNavigate()
let {Cart }=useContext(CartContext)

let[pay,setPay]=useState('cash')





async function payOnline(values){
  try{
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:3000`,{
      shippingAddress:values,
    },{
      headers:{
        token:localStorage.getItem("token"),
      },
    });
    if(data.status=="success"){
     window.location.href= data.session.url
    }
  }catch(err){
    console.log(err)
  }

}


async function payCash(values){
  try{
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,{
      shippingAddress:values,
    },{
      headers:{
        token:localStorage.getItem("token"),
      },
    });
    if(data.status=="success"){
      Navigate("/AllOrders")
      getLoggedUserCart()
    
    }
  }catch(err){
    console.log(err)
  }

}








const validationSchema= Yup.object({

details:Yup.string().required("Must be required"),
phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone must start with 01 and contain 11 digits'),
city:Yup.string().required("must be required"),

}
);

  let formik=useFormik({
    initialValues: {
    details:"",
    phone:"",
    city:""
   

  },

  onSubmit:(x)=>{
    if(pay=='cash'){
      payCash(x)
    }else{
      payOnline(x)
    }
  },
  validationSchema
  

})











































  const { cart, removeCartItem, updateCartItem,getLoggedUserCart,loading } = useContext(CartContext);
  


  useEffect(() => {
    getLoggedUserCart(); 
  }, []);


  if(loading){
  return <Loading/>
}


  if ( !cart?.data?.products?.length) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-xl text-gray-700 dark:text-white">Your cart is empty.</h2>
      </div>
    );
  }
  

  return (
    <div className="container bg-mainlight mt-4 mx-auto">
     
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
          <div className='w-39 h-1 my-5 bg-primary' />

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart?.data?.products?.map((product) => (
             
                 <div key={product._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <img
                        className="h-20 w-20 object-cover"
                        src={product.product.imageCover}
                        alt={product.product.title}
                      />

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateCartItem(product.count - 1, product.product._id)}
                            className="h-5 w-5 rounded-md border bg-gray-100 hover:bg-gray-200 dark:bg-gray-700"
                          >
                            -
                          </button>
                          <input
                            readOnly
                            value={product.count}
                            className="w-10 text-center bg-transparent"
                          />
                          <button
                            onClick={() => updateCartItem(product.count + 1, product.product._id)}
                            className="h-5 w-5 rounded-md border bg-gray-100 hover:bg-gray-200 dark:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-end md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            {product.price*product.count} EGP
                          </p>
                        </div>
                      </div>

                      <div className="w-full space-y-2 md:max-w-md">
                        <h3 className="text-base font-medium text-gray-900 dark:text-white">
                          {product.product.title}
                        </h3>
                        <button
                          onClick={() => removeCartItem(product.product._id)}
                          className="bg-primary px-3 py-1 rounded-md text-white hover:bg-darkprimary"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                
      <div className="container  max-w-[535px] mt-12">
        <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>
        <h2 className="text-center my-2 font-bold text-lg Outfit">Check Out</h2>
        <span className="block  mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>

        <form
        onSubmit={formik.handleSubmit}
          id="checkOut"
          className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary   flex flex-col gap-6 mt-12"
        >
          <h3 className="font-bold text-lg -ml-2">Cart totals</h3>

          <div className="flex  gap-4 items-center">
            <span className="font-bold">Total :</span>
            <span className="text-primary font-semibold">
              ${cart?.data?.totalCartPrice}USD
            </span>
          </div>
          <div>
            <input
              className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
              autoComplete="off"
              type="text"
              placeholder="Enter Your City Name"
              name="city"
              value={formik.values.city}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.city && formik.touched.city && (
             <p className="text-gray-500 font-bold text-sm -my-3 ">
             {formik.errors.city}
          </p>
          )}

          <div>
            <input
              className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
              autoComplete="off"
              type="tel"
              placeholder="Enter Your Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
                onBlur={formik.handleBlur}
             
            />
          </div>
           {formik.errors.phone && formik.touched.phone && (
             <p className="text-gray-500 font-bold text-sm -my-3 ">
             {formik.errors.phone}
          </p>
          )}
         
          {/* )} */}
          <div>
            <textarea
              className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
              placeholder="Details"
              name="details"
              value={formik.values.details}
           onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             
            />
          </div>
        {formik.errors.details && formik.touched.details && (
             <p className="text-gray-500 font-bold text-sm -my-3 ">
           {formik.errors.details}
          </p>
          )}

          <div className=" flex max-md:flex-col  gap-4 justify-between items-center">
            <button
              onClick={() => {
                setPay('cash')
              }}
              type="submit"
              className="btn cursor-pointer bg-primary hover:bg-darkPrimary text-white w-full flex py-2 text-nowrap items-center justify-center gap-2"
            >
              {/* <img
                className="size-10"
                src={cashPaymentImg}
                alt="Cash Payment Img"
              /> */}
              <span> Cash Order</span>
            </button>
            <button
              onClick={() => {
                setPay('online')
              }}
              type="submit"
              className="btn cursor-pointer flex py-2 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-darkPrimary bg-white text-darkPrimary w-full"
            >
              {/* <img
                className="size-10 object-cover"
                src={onlinePaymentImg}
                alt="Online Payment Img"
              /> */}
              <span>Online Order</span>
            </button>
          </div>
        </form>
      </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
