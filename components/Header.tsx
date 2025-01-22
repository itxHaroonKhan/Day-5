'use client';  // Add this at the top to mark it as a client-side component

import { useState, useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { CgArrowBottomLeft } from "react-icons/cg";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  // Cart count state
  const [cartCount, setCartCount] = useState(0);

  // Function to increase cart count
  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  // Sync state with localStorage or other client-side logic if needed
  useEffect(() => {
    // Example: You can sync cartCount with localStorage, or update it as needed
    const storedCartCount = localStorage.getItem('cartCount');
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount));
    }
  }, []);

  return (
    <div>
      {/* Top bar */}
      <section className="flex items-center justify-between w-full bg-[#272343] px-4 py-2">
        {/* Free Shipping Banner */}
        <div className="flex items-center">
          <CgArrowBottomLeft className="text-slate-400 text-xl" />
          <p
            className="text-gray-400 ml-2 hover:text-white transition duration-300 ease-in-out"
            aria-label="Free Shipping Info"
          >
            Free shipping on all orders over $50
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Language Selector */}
          <select
            id="language-selector"
            className="bg-[#272343] text-white border border-slate-600 hover:border-slate-400 py-1 px-2 rounded transition duration-300 ease-in-out"
            aria-label="Language Selector"
          >
            <option value="english">English</option>
            <option value="urdu">Urdu</option>
            <option value="arabic">Arabic</option>
            <option value="french">French</option>
            <option value="persian">Persian</option>
            <option value="spanish">Spanish</option>
          </select>

          {/* FAQs */}
          <div className="relative group">
            <p
              className="text-white cursor-pointer hover:underline transition duration-300 ease-in-out"
              aria-label="FAQs"
            >
              FAQs
            </p>
            <div className="absolute hidden group-hover:block bg-white text-black p-4 rounded shadow-lg w-56">
              <ul className="space-y-2">
                <li>
                  <Link href="/faq/shipping">
                    <span className="hover:text-blue-500">Shipping Information</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq/returns">
                    <span className="hover:text-blue-500">Returns and Refunds</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq/orders">
                    <span className="hover:text-blue-500">Managing Your Orders</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Need Help */}
          <div className="relative group">
            <div className="flex items-center cursor-pointer">
              <BiErrorCircle className="text-white text-2xl" />
              <p
                className="text-white ml-2 hover:underline transition duration-300 ease-in-out"
                aria-label="Need Help"
              >
                Need Help
              </p>
            </div>
            <div className="absolute hidden group-hover:block bg-white text-black p-4 rounded shadow-lg w-64">
              <p className="font-bold mb-2">How can we assist you?</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/support/chat">
                    <span className="hover:text-blue-500">Live Chat</span>
                  </Link>
                </li>
                <li>
                  <Link href="/support/contact">
                    <span className="hover:text-blue-500">Contact Support</span>
                  </Link>
                </li>
                <li>
                  <Link href="/support/faq">
                    <span className="hover:text-blue-500">Visit FAQ Page</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Middle bar with logo */}
      <section className="flex items-center justify-between w-full px-4 py-2 h-[84px] bg-[#F0F2F3]">
        <div className="flex items-center">
          <Image
            src="/Logo Icon.png"
            alt="Logo"
            className="ml-4 sm:ml-14"
            width={40}
            height={40}
          />
          <h2 className="text-[20px] sm:text-[26px] font-medium ml-2">Comforty</h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="px-4 sm:px-6 py-3 flex items-center bg-white gap-3 hover:bg-gray-200 rounded-lg shadow"
            onClick={addToCart} // Add product to cart
          >
            <PiShoppingCartSimpleBold className="text-2xl sm:text-xl text-gray-700" />
            <Link
              href="/shop"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              Cart
              <span className="bg-[#007580] text-white rounded-full w-8 h-8 sm:w-7 sm:h-7 flex items-center justify-center text-sm font-semibold">
                {cartCount} {/* Display current cart count */}
              </span>
            </Link>
          </button>
        </div>
      </section>

      {/* Navigation Bar */}
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center">
            <Link href="/" className="mr-5 hover:text-gray-900">Home</Link>
            <Link href="/shop" className="mr-5 hover:text-gray-900">Shop</Link>
            <Link href="/project" className="mr-5 hover:text-gray-900">Products</Link>
            <Link href="/page6" className="mr-5 hover:text-gray-900">Pages</Link>
            <Link href="/about" className="mr-5 hover:text-gray-900">About</Link>
          </nav>
          <Link href="/contact" className="inline-flex items-center border-0 py-1 px-3 focus:outline-none text-base mt-4 md:mt-0">
            Contact: <span className="ml-3 text-black">(808) 555-0111</span>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
