import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

// إنشاء الـ context
export const WishlistContext = createContext(null);

// Hook للاستخدام بسهولة في أي مكون
export function useWishlist() {
  return useContext(WishlistContext);
}

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);

 


 
  async function getLoggedUserWishlist() {
    try {
      
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setWishlist(data.data);
        setWishlistCount(data.data.length);
    } catch (err) {
      console.log("Wishlist fetch error:", err);
      toast.error("Failed to load wishlist");
    }
  }

 
  async function addProductToWishlist(productId) {
    try {
      
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      await getLoggedUserWishlist();  
      toast.success("Added to wishlist");
         getLoggedUserWishlist();
    } catch (err) {
      console.log("Add to wishlist error:", err);
      toast.error("Failed to add to wishlist");
    }
  }

  
  async function removeProductFromWishlist(productId) {
    try {
      
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      await getLoggedUserWishlist(); 
      toast.success("Removed from wishlist");
      getLoggedUserWishlist();
    } catch (err) {
      console.log("Remove from wishlist error:", err);
      toast.error("Failed to remove from wishlist");
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        getLoggedUserWishlist,
        addProductToWishlist,
        removeProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}






