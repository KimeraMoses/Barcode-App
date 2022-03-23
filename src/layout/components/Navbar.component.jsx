import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Navbar.styles.scss';
import { useState } from 'react';

const links = [
  { path: '/dashboard/onsite-users', text: 'On-Site Users' },
  { path: '/dashboard/all-users', text: 'All Users' },
  { path: '/dashboard/check-in', text: 'Check-Ins & Check-Outs' },
  { path: '/dashboard/barcodes', text: 'Barcodes' },
  { path: '/dashboard/settings', text: 'Settings' }
];

export function Navbar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src="/img/logo.png" alt="logo" />
      </div>

      <div className="navbar__links">
        <div className="navbar__links-container">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__links-container-el ${
                pathname === link.path ? 'navbar__links-container-el-active' : ''
              }`}>
              {link?.text}
            </Link>
          ))}
        </div>
        <div className="navbar__links-right">
          <div className="navbar__links-right-lc">Live Count : 100</div>
          <div className="navbar__links-right-btn">
            <Button type="primary" size="small">
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="navbar__hamburger">
        <Button type="primary" size="small" onClick={showDrawer} icon={<MenuOutlined />} />
        <Drawer
          title="Menu"
          placement="right"
          onClose={onClose}
          visible={visible}
          width="100%"
          className="navbar__drawer">
          <div className="navbar__drawer-links">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`navbar__links-container-el ${
                  pathname === link.path ? 'navbar__links-container-el-active' : ''
                }`}>
                {link?.text}
              </Link>
            ))}
            <div className="navbar__drawer-links-right">
              <div className="navbar__drawer-links-right-lc">Live Count : 100</div>
              <div className="navbar__drawer-links-right-btn">
                <Button type="primary" size="small">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
