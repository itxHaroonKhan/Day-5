"use client"; // Client-side component

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define types for product and cart item
interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  description: string;
  category: { title: string };
  tags: string[];
  imageUrl: string;
  inventory: number;
}

const ProductDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params;
      setId(id);
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const query = `
        *[_type == "products5" && _id == $id][0] {
          _id,
          title,
          price,
          priceWithoutDiscount,
          description,
          category -> { title },
          tags,
          "imageUrl": image.asset->url,
          inventory
        }
      `;
      try {
        const fetchedProduct = await client.fetch(query, { id });
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          router.push("/404"); // Redirect to a 404 page if product not found
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/error"); // Redirect to an error page in case of failure
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]); // Add router to the dependency array

  const addToCart = (product: Product) => {
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    updatedCart.push(product);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (!product) return <div className="text-center text-xl text-red-500">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex justify-center">
          <Image
            src={product.imageUrl || "/default-image.jpg"}
            alt={product.title}
            width={500}
            height={500}
            className="object-cover rounded-lg shadow-xl"
          />
        </div>
        <div className="flex flex-col justify-start space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900">{product.title}</h1>
          <div className="flex items-center space-x-4">
            <p className="text-2xl text-gray-800">${product.price}</p>
            <p className="text-lg text-gray-500 line-through">${product.priceWithoutDiscount}</p>
          </div>
          <p className="text-lg text-gray-700">{product.description}</p>
          <p className="text-gray-600">Category: <span className="font-semibold">{product.category.title}</span></p>
          <p className="text-gray-600">Tags: <span className="font-semibold">{product.tags.join(", ")}</span></p>
          <p className="text-gray-600">Inventory: <span className="font-semibold">{product.inventory}</span></p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 px-8 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
