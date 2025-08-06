import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import  toast from 'react-hot-toast';



export const CartContext = createContext(null);

export default function cartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setloading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false)
  const cartCount = cart?.numOfCartItems || 0;


  async function AddProductToCart(productId) {
    try { 
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("Cart response:", data);
      setCart(data.data);
        await getLoggedUserCart();
       toast.success('Cart updated successfully');
       
    } catch (err) {
      console.log(err);
    }
  }

  async function getLoggedUserCart() {
    setloading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    

      setCart(data);

    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  }

  async function removeCartItem(cartItemId) {
    setloading(true);
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Delated from the cart");
      setCart(data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  }

  async function clearCart() {
    setloading(true);
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Deleted");
      setCart(data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  }

  async function updateCartItem(count, cartItemId) {
    setDisabledBtn(true);
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Updated");
      setCart(data);
    } catch (err) {
      console.log(err);
    } finally {
      setDisabledBtn(false);
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
      cartCount,
        AddProductToCart,
        getLoggedUserCart,
        loading,
        removeCartItem,
        clearCart,
        updateCartItem,
        setDisabledBtn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
