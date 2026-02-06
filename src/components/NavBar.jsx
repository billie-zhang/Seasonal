import logo from "../assets/Seasonal.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-[110px] fixed flex bg-pale-green shadow-md">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="h-[70px] ml-7 mt-7 pb-6 " />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
