import logo from "../assets/Seasonal.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-42 flex fixed ">
      <Link to="/">
        <img src={logo} alt="logo" className="h-8 ml-5 mt-5 pb-5 " />
      </Link>
    </div>
  );
};

export default Navbar;
