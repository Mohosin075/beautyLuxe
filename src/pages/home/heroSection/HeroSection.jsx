// HeroSection.js

import { NavLink } from "react-router";
import useTheme from "./../../../hooks/useTheme";

const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`relative w-full h-screen bg-cover bg-center ${
        theme === "dark" ? " text-textLight" : " text-textDark"
      }`}
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/cosmetic-series-with-pomegranate-fruit_88138-193.jpg?t=st=1734946680~exp=1734950280~hmac=61e91279844985e1a5b488ebae57c2fb2030455c46e5198c9131f42e14533f01&w=900')",
      }}
    >
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-backgroundDarkOverlay opacity-65"
            : "bg-backgroundDarkOverlay opacity-45"
        }`}
      ></div>

      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4 md:px-10 lg:px-20">
        <div
          className={`space-y-4 max-w-2xl `}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome to Beauty Luxe
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-light max-w-xl mx-auto">
            Explore premium beauty products to enhance your natural glow
          </p>

          <div className="inline-block">
            <NavLink to="/products" className="my-btn mt-6">
              Shop Now
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
