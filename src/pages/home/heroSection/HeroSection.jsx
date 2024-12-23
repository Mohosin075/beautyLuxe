// HeroSection.js

import { NavLink } from "react-router";

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/cosmetic-series-with-pomegranate-fruit_88138-193.jpg?t=st=1734946680~exp=1734950280~hmac=61e91279844985e1a5b488ebae57c2fb2030455c46e5198c9131f42e14533f01&w=900')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4 md:px-10 lg:px-20">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-300">
            Welcome to Beauty Luxe
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-light max-w-xl mx-auto">
            Explore premium beauty products to enhance your natural glow
          </p>

          <div className="inline-block">
            <NavLink
              to="/products"
              className="my-btn mt-6 w-full py-3 px-6 bg-primary-dark text-white text-lg font-semibold rounded-md shadow-md hover:bg-purple-300 hover:text-purple-900 transition duration-300 ease-in-out"
            >
              Shop Now
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
