import Test from "../../Test";
import Contact from "../contact/Contact";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import FAQs from "./FAQs/FAQs";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import HeroSection from "./heroSection/HeroSection";
import Testimonials from "./testimonials/Testimonials";


function Home() {
  return (
    <div>
      <HeroSection />
      {/* <Test/> */}
      <FeaturedProducts />
      <Testimonials />
      <CategoriesSection />
      <FAQs />
      <Contact />
    </div>
  );
}

export default Home;
