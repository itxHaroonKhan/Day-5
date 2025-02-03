
"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import CheckoutForm from "@/components/CheckoutForm";

interface CartItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error("Error parsing cart data", error);
        setCart([]);
      }
    }
    setLoading(false);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add items before checking out.");
      return;
    }
    setShowCheckout(true);
  };

  const handleFormSubmit = (formData: { name: string; email: string; address: string; phone: string; zipCode: string; country: string }) => {
    const orderData = {
      ...formData,
      orderItems: cart,
      totalPrice: parseFloat(totalPrice),
      status: "pending",
    };
    console.log("Order submitted:", orderData);
    alert("Order Submitted Successfully!");
    setCart([]);
    localStorage.removeItem("cart");
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Your Shopping Bag</h1>
        {loading ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">Loading your cart...</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg font-semibold text-gray-600">Your cart is empty</p>
                  <button
                    className="mt-6 px-6 py-3 bg-[#029FAE] text-white rounded-full font-semibold hover:bg-[#027b89] transition-all duration-300"
                    onClick={() => (window.location.href = "/shop")}
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                cart.map((product, index) => (
                  <div key={`${product._id}-${index}`} className="border-b border-gray-300 py-6 flex flex-col lg:flex-row items-center gap-6">
                    <div className="w-32 h-32 flex-shrink-0">
                      <Image src={product.imageUrl} alt={product.title} width={128} height={128} className="rounded-lg object-cover" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
                      <p className="text-gray-500">{product.description}</p>
                      <div className="text-gray-500 mt-4 flex gap-6">
                        <p className="text-lg font-semibold"><strong>Price:</strong> ${product.price}</p>
                        <div className="flex gap-4">
                          <button title="Save for later"><FaRegHeart className="text-gray-500 hover:text-red-500" /></button>
                          <button title="Remove from cart" onClick={() => removeFromCart(product._id)}>
                            <RiDeleteBin6Line className="text-gray-500 hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Order Summary</h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <p>Subtotal</p>
                <p>${totalPrice}</p>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <p>Estimated Delivery & Handling</p>
                <p>Free</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-black font-bold mb-6">
                <p>Total</p>
                <p>${totalPrice}</p>
              </div>

              {showCheckout && <CheckoutForm onSubmit={handleFormSubmit} onCancel={() => setShowCheckout(false)} cart={cart} totalPrice={totalPrice} />}

              {cart.length > 0 && (
                <button onClick={handleCheckout} className="w-full bg-[#029FAE] text-white py-3 rounded-full font-semibold">
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
