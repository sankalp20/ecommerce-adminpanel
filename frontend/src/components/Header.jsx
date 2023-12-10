import React from 'react';
import { BsPersonFill } from 'react-icons/bs';
import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <div style={headerStyle}>
      <div style={leftSideStyle}>
        <img
          src= {Logo}
          alt="Logo"
          style={imageStyle}
        />
      </div>

      {/* Right side - User Icon */}
      <div style={rightSideStyle}>
        <BsPersonFill style={iconStyle} />
      </div>
    </div>
  );
};

// Styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
  backgroundColor: '#eee',
};

const leftSideStyle = {
  flex: '1',
};

const rightSideStyle = {
  display: 'flex',
  alignItems: 'center',
};

const imageStyle = {
  width: '50px', // Adjust the width as needed
  height: '50px', // Adjust the height as needed
};

const iconStyle = {
  fontSize: '24px', // Adjust the font size as needed
  color: '#333', // Adjust the color as needed
};

export default Header;
