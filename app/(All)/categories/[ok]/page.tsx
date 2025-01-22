"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { usePathname } from "next/navigation";

// Define a more specific type for categories
export interface Category {
  _id: string;
  title: string;
  imageUrl: string;
  productCount: number;
  description?: string;  // Optionally, you can include a description
}

const CategoryPage = () => {
  const [category, setCategory] = useState<Category | null>(null); // Explicit type for the category
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState<string | null>(null);  // State for errors
  const pathname = usePathname();  // Get the current pathname

  const id = pathname?.split('/').pop();  // Assuming the category ID is the last part of the path

  useEffect(() => {
    if (!id) return;  // Ensure the ID is available before making the request

    const fetchCategory = async () => {
      try {
        const query = `*[_type == "categories" && _id == $id]{
          _id,
          title,
          "imageUrl": image.asset->url,
          productCount,
          description
        }`;

        const data = await client.fetch(query, { id });  // Fetch category based on ID
        if (data.length > 0) {
          setCategory(data[0]);  // Set category data
        } else {
          setError("Category not found");  // Handle case where no category is found
        }
      } catch (err) {
        setError("Failed to fetch category");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>; // Display loading state without Looder
  if (error) return <p className="text-center text-red-500">{error}</p>; // Display error state

  if (!category) return <p className="text-center text-red-500">Category not found</p>;  // Handle case where category is null

  return (
    <div className="bg-gray-100">
      <section className="text-gray-400 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-3xl font-bold text-black mb-10 text-center">{category.title}</h1> {/* Centering title */}
          <div className="flex justify-center mb-10">
            <Image
              alt={category.title}
              className="object-cover object-center w-[300px] h-[300px] rounded-lg shadow-lg"  // Smaller size
              src={category.imageUrl}
              width={300}
              height={300}
            />
          </div>
          <p className="text-lg text-slate-300 mb-6 text-center">{category.description}</p> {/* Centering description */}
          <p className="text-xl text-black text-center">
            Total Products: <span className="font-semibold">{category.productCount}</span>
          </p> {/* Centering product count */}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
