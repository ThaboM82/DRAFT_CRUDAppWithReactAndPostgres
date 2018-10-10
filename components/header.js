import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
          <div><Link to='/'>HOME</Link></div>
          <div><Link to='/list'>LIST</Link></div>
          <div><Link to='/new'>NEW</Link></div>
    </header>
  );
};

export default Header;
