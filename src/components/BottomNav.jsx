import * as React from "react";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import MenuBookIcon from "@mui/icons-material/MenuBook";
// import PersonIcon from "@mui/icons-material/Person";
import { Outlet, Link } from "react-router-dom";
import { blue, red } from "@mui/material/colors";

export default function BottomNav() {
  const [value, setValue] = React.useState("scan");

  // eslint-disable-next-line
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="fixed w-full z-50 pt-8 bg-white">
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: "32px",
        }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link to="/">
            <BottomNavigationAction value="home" icon={<HomeIcon />} />
          </Link>
          <Link to="/search">
            <BottomNavigationAction value="search" icon={<SearchIcon />} />
          </Link>
          <Link to="/scan">
            <BottomNavigationAction value="scan" icon={<PhotoCameraIcon />} />
          </Link>
          <Link to="/in-season">
            <BottomNavigationAction value="recipes" icon={<MenuBookIcon />} />
          </Link>
          {/* <Link to="/profile">
          <BottomNavigationAction value="profile" icon={<PersonIcon />} />
        </Link> */}
          <Outlet />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
