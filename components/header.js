import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        {/* <ul> */}
          <div><Link to='/'>HOME</Link></div>
          <div><Link to='/list'>LIST</Link></div>
          <div><Link to='/new'>NEW</Link></div>
        {/* </ul> */}
    </header>
  );
};

export default Header;
