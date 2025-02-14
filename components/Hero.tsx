import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:py-16">
          {/* Text Section */}
          <div className="mr-auto place-self-center lg:col-span-7">
            <p className="text-sm text-gray-500">Welcome to Chairy</p>
            <h1 className="max-w-3xl mb-4 text-4xl font-bold tracking-tight leading-none sm:text-5xl md:text-6xl lg:text-6xl mt-7">
              Best Furniture <br /> Collection for your <br /> interior.
            </h1>

            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium bg-teal-600 text-white border border-transparent rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 mt-12 transition"
            >
              Shop Now →
            </a>
          </div>

          {/* Image Section (Responsive) */}
          <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
            <Image
              src="/Product Image.png"
              alt="Furniture Collection"
              width={434}
              height={584}
              className="w-full h-auto max-w-[434px]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
