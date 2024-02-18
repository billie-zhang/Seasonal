import logo from "../assets/Seasonal.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-18 flex fixed ">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="h-16 ml-5 mt-5 pb-5 " />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
