import { Link } from "react-router-dom";
import appImage from "../assets/app-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faUser } from '@fortawesome/free-solid-svg-icons';
export function Sidebar() {
  return (
    // Main Sidebar Container
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="#" className="brand-link">
        <img
          src={appImage}
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">PCA WEB</span>
      </a>

      {/** Sidebar **/}
      <div className="sidebar">
        {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image">
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div> */}

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
                    {/* <i className="right fas fa-angle-left"></i> */}
                    <FontAwesomeIcon className="right" icon={faTachometerAlt} />
                  </p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/devicemgt" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Device Management
                    <FontAwesomeIcon className="right" icon={faTv} />
                  </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    User Profile
                    <FontAwesomeIcon className="right" icon={faUser} />
                  </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
