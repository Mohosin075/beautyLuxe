import { NavLink } from "react-router";

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-1">
      <img
        className="w-10 rounded-full"
        src="https://styles.redditmedia.com/t5_2ub9j/styles/communityIcon_ljzse76o3u861.png"
        alt=""
      />
      <h2 className="text-xl font-semibold text-purple-700">
        Beauty<span className="text-sky-800">Luxe</span>
      </h2>
    </NavLink>
  );
}

export default Logo;
