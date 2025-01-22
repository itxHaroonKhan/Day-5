"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Link from "next/link"; // Importing Link component from Next.js

// Define a more specific type for products
export interface Product {
  _id: string;
  title: string;
  imageUrl: string;
  productCount: number;  // Assuming 'productCount' will be fetched from Sanity
}

const Pro = () => {
  const [products, setProducts] = useState<Product[]>([]); // Explicit type for the state
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState<string | null>(null);  // State for errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "categories"]{
          _id,
          title,
          "imageUrl": image.asset->url,
          productCount  // Assuming 'productCount' is available in your Sanity dataset
        }`;

        const data = await client.fetch(query);
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);  // Log errors for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>; // Just show loading text
  if (error) return <div>{error}</div>; // Display error state inside a <div>

  return (
    <div>
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-[32px] font-bold text-black mb-10">Top Categories</h1>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10">
            {products.map((product) => (
              <div key={product._id} className="p-4 md:w-1/3 sm:mb-0 mb-6">
                <div className="rounded-lg overflow-hidden relative">
                  <Link href={`/categories/${product._id}`}> {/* Link to dynamic category page */}
                    <Image
                      alt={product.title}
                      className="object-cover object-center w-full h-[424px]"
                      src={product.imageUrl}
                      width={424}
                      height={424}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/80 to-transparent p-6">
                      <p className="text-white text-xl font-bold">{product.title}</p>
                      <p className="text-slate-300 text-sm">
                        {product.productCount} Products
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pro;
