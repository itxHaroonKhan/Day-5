
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  category: {
    _id: string;
    title: string;
  };
  tags: string[];
  badge: string;
  imageUrl: string;
  description: string;
  inventory: number;
}

const ITAMM = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = `
      *[_type == "products5"] {
        _id,
        title,
        price,
        priceWithoutDiscount,
        category -> {
          _id,
          title
        },
        tags,
        badge,
        "imageUrl": image.asset->url,
        description,
        inventory
      }
    `;

    client.fetch(query)
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>; // Just show loading text without Looder component
  if (error) return <div>{error}</div>;

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {/* Left side: Image with vertical text */}
            <div className="p-4 w-full md:w-1/2 lg:w-1/2 relative flex">
              <span className="text-gray-900 font-bold text-[37px] tracking-wide transform -rotate-90 whitespace-nowrap absolute top-1/2 -left-0 origin-bottom-left md:mt-56 sm:mt-4">
                Explore new and popular styles
              </span>
              <Link href={`/products/${products[0]?._id}`}>
                <div className="block relative h-[648px]">
                  <Image
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={products[0]?.imageUrl || "/default-image.jpg"}
                    width={648}
                    height={648}
                  />
                </div>
              </Link>
            </div>

            {/* Right side: 4 images in a grid */}
            <div className="w-full md:w-1/2 lg:w-1/2">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                {products.slice(1).map((product) => (
                  <div key={product._id} className="p-4">
                    <Link href={`/products/${product._id}`}>
                      <div className="block relative lg:w-[312px] lg:h-[312px]">
                        <Image
                          alt="ecommerce"
                          className="object-cover object-center w-full h-full block"
                          src={product.imageUrl || "/default-image.jpg"}
                          width={312}
                          height={312}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ITAMM;
// This component fetches products from Sanity and displays them in a grid layout. The first product is displayed on the left side with a vertical text overlay, and the remaining products are displayed in a 2x2 grid on the right side. Each product image is a clickable link to the product details page.
