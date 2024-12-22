/* eslint-disable react/prop-types */
function SectionTitle({ title, description }) {
  return (
    <div>
      <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-center">
        {title}
      </h2>
      <div className="divider"></div>
      <p className="text-sm lg:text-lg mb-4 font-semibold">{description}</p>
    </div>
  );
}

export default SectionTitle;
