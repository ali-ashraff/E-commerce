import { useEffect } from "react";
import { useWishlist } from "../../components/Context/wishListContext";
import { Link } from "react-router-dom";




export default function WishlistPage() {
  const {
    wishlist,
    getLoggedUserWishlist,
    removeProductFromWishlist,
  } = useWishlist();

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  if (!wishlist) return <p className="text-center mt-10 text-lg">Loading wishlist...</p>;

  if (wishlist.length === 0)
    return (
      <p className="text-center mt-10 text-lg text-gray-500">
        Your wishlist is empty 
      </p>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-4  containerr mx-auto">
      {wishlist.map((item) => (
        <article
        data-aos="fade-up"
        data-aos-duration="500"
        className="productCard group mt-5 flex flex-col gap-3   shadow-2xl  rounded-2xl overflow-hidden "
      >
        <header className="relative">
          <img
            src={item.imageCover}
            className="w-sm "
            //   alt={ratingsQuantity.description}
          />

          <div className="layer -translate-y-1/2  flex justify-center items-center gap-4 absolute top-1/2 left-1/2  -translate-x-1/2">
            <div
             onClick={() => removeProductFromWishlist(item._id)}
              className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100  hover:bg-darkPrimary duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

            </div>

          
            <Link
              to={`/ProductDetails/${item._id}`}
              className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100  hover:bg-darkPrimary duration-1000 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          </div>
        </header>
        <footer className="py-6 px-5">
          <header>
            <h2 className="line-clamp-1 text-primary">
              <Link
                className="hover:text-orange-500 duration-300"
                to={`/product/`}
              >
               {item.title}
              </Link>
            </h2>

            <h2 className="line-clamp-1 font-semibold my-1">
             {item.category.name}
            </h2>
            <div className="text-gray-500  text-sm">
              <span>{item.brand.name}</span>
              <span className="mx-1">|</span>

             
                {item.quantity>0? <span className="text-green-500">Available</span>:
                <span className="text-red-500">Sold Out</span>}
          
            </div>
          </header>
          <footer className="flex justify-between mt-2 items-center">
            <span className="text-primary flex  items-center">{item.price}</span>
            <div className="rating flex gap-2 items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </span>
              <span>{item.ratingsAverage}</span>
            </div>
          </footer>
        </footer>
      </article>
      ))}
    </div>
  );
}
