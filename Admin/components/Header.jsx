import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { userService } from "service/user.service";
import { useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import QuickMenu from "layouts/QuickMenu";
import {
	Nav,
  Navbar
} from 'react-bootstrap';

function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [isLoggedIn, setisLoggedIn] = useState("");

  useEffect(() => {
    setisLoggedIn(userService.userValue);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="container-fluid">
      <div className="clsx-header">
        <div className="clsx-header-left-section">
          <img
            onClick={() => router.push("/")}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/deb58642934da2e57a2b90bb4f2f6960f741abd7589e73b25d1faca5f9199b4a?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
            className="clsx-logo"
          />
          <div className="clsx-header-menu-section">
            <div className="clsx-menu-item clsx-menu-item-active">Home</div>
            <div className="clsx-menu-item">Products</div>
            <div className="clsx-menu-item">Why us</div>
            <div className="clsx-menu-item">Blog</div>
            <div className="clsx-menu-item">Support</div>
          </div>
        </div>
        {!isLoggedIn ? (
          <div className="clsx-header-right-section">
          <div className="">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="btn clsx-login-btn"
            >
              Login
            </button>
          </div>
          <div className="">
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="btn clsx-freetrial-btn"
            >
              Get Free Trial{" "}
              <span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/549fef92bbd34bc417aa71de1652192740d333d9eb9fbced3b008a13cae537bd?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                  className=""
                />
              </span>
            </button>
          </div>
        </div>
        ) : (
          // clsx-header-right-section 
          <div className="">
            <Navbar expanded="lg" className="navbar-classic navbar navbar-expand-lg mt-2">
              <Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
                <QuickMenu showNotify={false} />
              </Nav>
            </Navbar>
          </div>
        )}
        <div className="clsx-hamburgur-menu">
          <div className="">
            <MenuIcon onClick={toggleDrawer(true)} />
          </div>
          <Drawer anchor={"right"} open={open} className="clsx-drawermenu">
            <div className="container">
              <div className="d-flex w-100 justify-content-end mt-4 clsx-closeicon-container">
                <CancelIcon onClick={toggleDrawer(false)} />
              </div>
              <div>
                <div className="clsx-firstdrawer-section">
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => router.push("/login")}
                      className="btn clsx-banner-request"
                    >
                      Login
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => router.push("/register")}
                      type="button"
                      className="btn clsx-freetrialbanner-btn"
                    >
                      Get Free Trial{" "}
                      <span>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/549fef92bbd34bc417aa71de1652192740d333d9eb9fbced3b008a13cae537bd?apiKey=c63ca89c448d4ad59d0bb05b98d93ef5&"
                          className=""
                        />
                      </span>
                    </button>
                  </div>
                </div>
                <Divider className="mt-5 mb-5 clsx-headersection-divider" />
                <div className="clsx-seconddrawer-section">
                  <div className="clsx-menu-item clsx-menu-item-active">
                    Home
                  </div>
                  <div className="clsx-menu-item">Products</div>
                  <div className="clsx-menu-item">Why us</div>
                  <div className="clsx-menu-item">Blog</div>
                  <div className="clsx-menu-item">Support</div>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Header;
