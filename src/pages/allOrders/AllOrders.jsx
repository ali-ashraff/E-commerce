import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUserOrders() {
   
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17", 
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("🟡 token:", localStorage.getItem("token"));

         console.log("🟢 Orders response:", data);  
      

   setOrders([...data].reverse()); 
 
    } catch (err) {
      toast.error("Failed to load orders");
      console.error("Error fetching orders", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) return <p className="text-center text-lg py-10">Loading orders...</p>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-primary">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">You have no orders yet.</div>
      ) : (
        <div className="space-y-5">
  {orders.map((order) => (
    <div
      key={order._id}
      className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg duration-300 flex items-center justify-between gap-5"
    >
      {/* ✅ صورة أول منتج */}
      <div className="w-28 h-28 shrink-0">
        <img
          src={order.cartItems?.[0]?.product?.imageCover}
          alt={order.cartItems?.[0]?.product?.title}
          className="w-full h-full object-cover rounded-md border"
        />
      </div>

      {/* ✅ باقي التفاصيل */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-green-600">
            Order #{order._id.slice(-6).toUpperCase()}
          </h3>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              order.status === "delivered"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="text-sm text-gray-700">
          <p>
            <span className="font-medium text-black">Total:</span>{" "}
            {order.totalOrderPrice} EGP
          </p>
          <p>Payment Method: {order.paymentMethodType}</p>
          <p>Ordered at: {new Date(order.createdAt).toLocaleString()}</p>
        </div>

        <div className="mt-2 text-sm">
          <p className="font-semibold text-black">Shipping Address:</p>
          <p>
            {order.shippingAddress?.city},{" "}
            {order.shippingAddress?.phone}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

      )}
    </section>
  );
}
