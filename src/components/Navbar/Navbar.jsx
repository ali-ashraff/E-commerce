import React, { useContext } from 'react'
import { Menu, MenuIcon, Moon, ShoppingCart, Sun, } from 'lucide-react';
import { Link } from "react-router-dom";
import { authContext } from '../Context/AuthContext';
import wishList from './../../pages/WishList/WishList';
import { CartContext } from './../Context/CartContext';
import { useWishlist } from "../../components/Context/wishListContext";


export default function Navbar({ toggleTheme,theme} ) {

const{cartCount}=useContext(CartContext)
const { wishlistCount } = useWishlist();
console.log("wishlistCount in navbar:", wishlistCount);



let{token,setToken}=useContext(authContext)


const logout=()=>{
  localStorage.removeItem('token')
  setToken(null)
}
  
  return (
    <div className='py-5 shadow-xl bg-mainlight'>
        <div className='containerr flex justify-between items-center gap-6 mx-auto'>
          <div className='flex justify-between items-center gap-3'>
            <ShoppingCart className='text-primary' />
             <h1 className='font-extrabold text-2xl text-darkprimary'>Fresh Cart</h1>
            
          </div>
           
            {/*links pages*/}
         
            {token?(
               <ul className=' hidden lg:flex justify-between items-center gap-6'>
                <li className=' relative linkHover afterEffect text-base'>
                  <Link to="/">Home</Link>
                </li>
                <li className='text-base relative linkHover afterEffect'>
                  <Link to="/Products">Products</Link>
                </li>
                <li className='text-base relative linkHover afterEffect '>
                  <Link to="/Categories">Categories</Link>
                </li>
                <li className='text-base relative linkHover afterEffect '>
                  <Link to="/Brands">Brands</Link>
                </li>
                
            </ul>
            ):null}
           
            {/*Auth links*/}
            <ul className=' hidden lg:flex justify-between items-center gap-x-3'>
              {token?(
                <>
                <li className='text-base relative linkHover afterEffect' >
                  <Link to={"/wishList"}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
   {wishlistCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {wishlistCount}
      </span>
    )}

                  </Link>
                </li>
                <li className='text-base relative linkHover afterEffect '>
                  <Link to="/Cart"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
{cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
</Link>
                </li>
                </>
              ):null}
              {!token?(
                <>
                <li className='text-base relative linkHover afterEffect '>
                  <Link to="/Login">Login</Link>
                </li>





            <li className='text-base relative  linkHover afterEffect '>
              <Link to="/Register">Register</Link>
            </li>
            </>
              ):  <li className='text-base relative  linkHover afterEffect cursor-pointer ' onClick={logout}>
              <span>Logout</span>
            </li>}



                
           
           <li className='btn' onClick={toggleTheme}>
            {theme=='light'?<Moon/>:<Sun/>}
           </li>
            
            </ul>

           <Menu className='lg:hidden'/>


     
           

        </div>




    </div>
  )
}
