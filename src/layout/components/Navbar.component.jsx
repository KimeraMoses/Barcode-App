import { Link, useLocation } from "react-router-dom";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./Navbar.styles.scss";
import { useNavigate } from "react-router-dom";
import { logout } from "store/Slices/authSlice";

const links = [
  { path: "/dashboard/onsite-users", text: "On-Site Users" },
  { path: "/dashboard/check-in", text: "Check-Ins & Check-Outs" },
  { path: "/dashboard/barcodes", text: "Barcodes" },
  { path: "/dashboard/settings", text: "Settings" },
];

const adminLinks = [
  { path: "/dashboard/onsite-users", text: "On-Site Users" },
  { path: "/dashboard/all-users", text: "All Users" },
  { path: "/dashboard/all-admins", text: "All Admins" },
  { path: "/dashboard/check-in", text: "Check-Ins & Check-Outs" },
  { path: "/dashboard/barcodes", text: "Barcodes" },
  { path: "/dashboard/settings", text: "Settings" },
];

export function Navbar() {
  const liveCount = useSelector((state) => state.users.liveCount);
  const { webSettings } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);
  const isSupperAdmin = user && user.role === "super-admin" ? true : false;
  const [visible, setVisible] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  const toggleHover = ({ path }) => setLinkHovered(path);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //====LOGOUT HANDLER====
  const LogoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const { pathname } = useLocation();
  const { primaryColor } = useSelector((state) => state.theme);

  const linkHoverStyles = {
    color: primaryColor,
    border: `1px solid ${primaryColor}`,
  };
  return (
    <div className="navbar">
      <div className="navbar__logo-wrapper">
        <div className="navbar__logo" style={{ background: primaryColor }}>
          <img src={webSettings.site_logo} alt={webSettings.site_name} />
          {/* <img src="/img/logo.png" alt="logo" /> */}
        </div>
        <div className="navbar__site_name">
          <h4 style={{ color: `#8c8c8c` }}>{webSettings.site_name}</h4>
        </div>
      </div>

      <div className="navbar__links-container">
        {(isSupperAdmin ? adminLinks : links).map((link) => {
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__links-container-el ${
                pathname === link.path
                  ? "navbar__links-container-el-active"
                  : ""
              }`}
              style={
                linkHovered === link.path || pathname === link.path
                  ? linkHoverStyles
                  : {}
              }
              onMouseEnter={() => toggleHover(link)}
              onMouseLeave={() => setLinkHovered(false)}
            >
              {link?.text}
            </Link>
          );
        })}
      </div>
      <div className="navbar__links-right">
        <div className="navbar__links-right-lc" style={{ color: primaryColor }}>
          Live Count : {liveCount}
        </div>
        <Button
          type="primary"
          size="small"
          onClick={LogoutHandler}
          style={{
            background: primaryColor,
            border: `1px solid ${primaryColor}`,
          }}
        >
          Sign Out
        </Button>
      </div>

      <div className="navbar__hamburger">
        <Button
          type="primary"
          size="small"
          style={{
            background: primaryColor,
            border: `1px solid ${primaryColor}`,
          }}
          onClick={showDrawer}
          icon={<MenuOutlined />}
        />
        <Drawer
          title="Menu"
          placement="right"
          onClose={onClose}
          visible={visible}
          width="100%"
          className="navbar__drawer"
        >
          <div className="navbar__drawer-links">
            {(isSupperAdmin ? adminLinks : links).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`navbar__links-container-el ${
                  pathname === link.path
                    ? "navbar__links-container-el-active"
                    : ""
                }`}
                style={
                  linkHovered === link.path || pathname === link.path
                    ? linkHoverStyles
                    : {}
                }
                onMouseEnter={() => toggleHover(link)}
                onMouseLeave={() => setLinkHovered(false)}
              >
                {link?.text}
              </Link>
            ))}
            <div className="navbar__drawer-links-right">
              <div
                className="navbar__drawer-links-right-lc"
                style={{ color: primaryColor }}
              >
                Live Count : {liveCount}
              </div>
              <Button
                onClick={LogoutHandler}
                type="primary"
                size="small"
                style={{
                  background: primaryColor,
                  border: `1px solid ${primaryColor}`,
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
