import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home  from './pages/Home/Home';    
import Categories from './pages/Categories/Categories';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Brands from './pages/Brands/Brands';

import Layout from './pages/Layout/Layout';
import { Toaster } from 'react-hot-toast';

import ProtectedRoutes from './Protected/ProtectedRoutes';
import AuthContextProvider from './components/Context/AuthContext';
import LoginProtected from './Protected/LoginProtected';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import WishList from './pages/WishList/WishList';



import BrandsShow from './pages/Brands/BrandsShow';
import CategoriesShow from './pages/Categories/CategoriesShow';
import CartContextProvider from './components/Context/CartContext';
import WishlistContextProvider from './components/Context/wishListContext';
import Checkout from './pages/Checkout/Checkout';
import AllOrders from './pages/allOrders/AllOrders';








export default function App() {
let[theme,setTheme]=useState(localStorage.getItem('theme'||'light'))

function toggleTheme(){
  if(theme=='light'){
    setTheme('dark')
localStorage.setItem('theme','dark')
  }else{
    setTheme('light')
    localStorage.setItem('theme','light')
  }
}



let routes=createBrowserRouter([
  {path:'/', element:<Layout/> , children:[
    {path:'/', element:<ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:'/Products', element:<ProtectedRoutes><Products/></ProtectedRoutes>},
      {path:'/ProductDetails/:id', element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
    {path:'/Categories', element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
    {path:'/Cart', element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
     {path:'/Brands', element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
     {path:'/WishList', element:<ProtectedRoutes><WishList/></ProtectedRoutes>},
     {path:'/brands/:id', element:<ProtectedRoutes><BrandsShow/></ProtectedRoutes>},
    {path:'/CategoriesShow/:id', element:<ProtectedRoutes><CategoriesShow/></ProtectedRoutes>},
     {path:'/Checkout', element:<ProtectedRoutes><Checkout/></ProtectedRoutes>},
 {path:'/allOrders', element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},





    {path:'/Login', element:<LoginProtected><Login/></LoginProtected>},
    {path:'/Register', element:<LoginProtected><Register/></LoginProtected>},

  ]}
])
 
  return (
    <div className={theme} >
      
 <AuthContextProvider>   
  <WishlistContextProvider>  
      <CartContextProvider>
           <RouterProvider router={routes}></RouterProvider>
        <Toaster position='top-center' reverseOrder={false}/>

      </CartContextProvider>
      </WishlistContextProvider> 
      
        </AuthContextProvider>
      
    </div>
  )
}
