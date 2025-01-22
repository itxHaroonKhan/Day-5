"use client"; // Client-side component

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";

// TypeScript type for product details
type Product = {
  _id: string;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  inventory: number;
};

const ProductDetailsPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };

    getSlug();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const query = `*[_type == "products" && _id == $slug][0] {
          _id,
          title,
          price,
          description,
          "imageUrl": image.asset->url,
          inventory
        }`;

        const result = await client.fetch(query, { slug });
        if (result) {
          setProduct(result);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const addToCart = () => {
    if (product) {
      const cartItem = {
        _id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
      };

      // Get current cart from localStorage
      const existingCart = localStorage.getItem("cart");
      const updatedCart = existingCart ? JSON.parse(existingCart) : [];

      // Add the new product to the cart
      updatedCart.push(cartItem);

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      alert("Added to cart!");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-full transition hover:bg-blue-600"
          onClick={() => router.push("/")}
        >
          Go Back to Home
        </button>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-12">
      {product && (
        <div className="flex flex-col lg:flex-row items-center lg:items-start bg-white p-6 rounded-lg shadow-xl space-y-6 lg:space-y-0 lg:space-x-12">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0 flex justify-center">
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={400} // Reduced image size
              height={400} // Reduced image size
              className="rounded-lg shadow-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.description}</p>
            <p className="text-3xl font-semibold text-blue-600 mb-6">${product.price}</p>
            <p className="text-sm text-gray-500 mb-4">
              Inventory:{" "}
              {product.inventory > 0
                ? `${product.inventory} available`
                : "Out of stock"}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
