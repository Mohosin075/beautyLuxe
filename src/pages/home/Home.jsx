import Contact from "../contact/Contact";
import FAQs from "./FAQs/FAQs";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import HeroSection from "./heroSection/HeroSection";
import Testimonials from "./testimonials/Testimonials";

function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Testimonials />
      <FAQs />
      <Contact />
    </div>
  );
}

export default Home;
