import SectionTitle from "../../components/SectionTitle";

const About = () => {
  return (
    <div>
      <div className="flex justify-around  gap-7 bg-primary-light min-h-screen py-8">
        <div className="p-10 rounded-md bg-primary-light w-9/12">
          <div className="w-full flex items-start justify-center">
            <div>
              <SectionTitle title={"About Us"} description={"Who We Are"} />
              <div className="divider"></div>
              <p className="mt-5 text-center text-sm lg:text-lg text-secondary-dark">
                Welcome to Beauty Luxe! We are dedicated to providing the best
                beauty products that enhance your natural glow. Our mission is
                to empower individuals through self-expression and confidence.
              </p>
              <p className="mt-5 text-center">
                Discover our story and join the journey of self-care and beauty.{" "}
                <a
                  href="/products"
                  className="text-secondary-dark underline font-semibold"
                >
                  Browse Products
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
