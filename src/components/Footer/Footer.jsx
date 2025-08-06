import React from 'react'
import amazonPay from '../../assets/images/Amazon_Pay_logo.png'
import masterCard from '../../assets/images/MasterCard-Logo.png'
import payPal from '../../assets/images/PayPal.png'
import googlePlay from '../../assets/images/get-it-on-google-play-badge.png'
import appleStore from '../../assets/images/get-it-on-apple-store.png'

export default function Footer() {
  return (
    <div className="bg-mainlight py-6 mt-10">
      <div className="containerr mx-auto px-4">
        <footer className="space-y-6">
          {/* Section: App Text */}
          <div>
            <h5 className="text-2xl font-semibold text-gray-800">Get the FreshCart app</h5>
            <h6 className="text-gray-600">We will send you a link, open it on your phone to download the app</h6>
          </div>

          {/* Section: Input and Button */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Email .."
              className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-main"
            />
            <button className="w-full md:w-auto bg-primary text-white px-6 py-2 rounded-md hover:bg-darkprimary">
              Share App Link
            </button>
          </div>

          <div className="border-t border-gray-300 my-4"></div>

          {/* Section: Payment and Stores */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Payment Partners */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-gray-700 font-medium">Payment Partners:</span>
              <img src={amazonPay} alt="Amazon Pay" className="h-8" />
              <img src={masterCard} alt="MasterCard" className="h-8" />
              <img src={payPal} alt="PayPal" className="h-8" />
            </div>

            {/* App Stores */}
            <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-end">
              <img src={appleStore} alt="Apple Store" className="h-10" />
              <img src={googlePlay} alt="Google Play" className="h-10" />
              <span className="text-gray-700">Get deliveries with FreshCart</span>
            </div>
          </div>

          <div className="border-t border-gray-300 my-4"></div>
        </footer>
      </div>
    </div>
  )
}
