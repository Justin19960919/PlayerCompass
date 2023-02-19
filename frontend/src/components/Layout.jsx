import React from 'react';
import { Link } from 'react-router-dom';
// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketball } from '@fortawesome/free-solid-svg-icons';


const Layout = ({ children }) => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <FontAwesomeIcon
            className="d-inline-block align-bottom"
            icon={faBasketball}
            color="orange"
            size="3x"
            style={{ paddingLeft: '20px' }}
          />
          <span style={{
            paddingLeft: '20px',
            fontSize: '30px',
            color: "#202020", // change color later
          }}>
            PlayerCompass
          </span>
        </Link>
      </nav>
      {children}
    </>
  );
}


export default Layout;
