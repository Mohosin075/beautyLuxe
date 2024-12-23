import SectionTitle from "../../../components/SectionTitle";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sophia Williams",
      feedback:
        "Beauty Luxe has transformed my skincare routine. The products are top-notch, and the service is fantastic!",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQi2Mm5P8j09P4hPKa1B-t9eIOHzHmR7IBkw&s",
    },
    {
      id: 2,
      name: "James Taylor",
      feedback:
        "Absolutely love the quality of their products. The makeup collection is a game-changer!",
      image: "https://c.stocksy.com/a/UMV200/z9/597214.jpg",
    },
    {
      id: 3,
      name: "Emily Johnson",
      feedback:
        "Great products and amazing support. I always find what I need for my beauty essentials!",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s",
    },
  ];

  return (
    <section className="bg-primary-light py-12">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="What Our Customers Say"
          description="Hear directly from our customers about their experience with our products."
        />
        <div className="divider"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {testimonials.map(({ id, name, feedback, image }) => (
            <div
              key={id}
              className="p-6 bg-white shadow-lg rounded-md text-center"
            >
              <div className="flex justify-center mb-4">
                {/* <img
                  src={image}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover"
                /> */}

                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    <img src={image} />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{name}</h3>
              <p className="text-gray-600 italic">{feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
