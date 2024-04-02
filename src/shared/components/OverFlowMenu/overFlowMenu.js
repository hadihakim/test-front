import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import "./overFlowMenu.css";

const OverflowMenu = ({setAutoPlay, options }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
      if(setAutoPlay) setAutoPlay(!isMenuOpen);
  }, [isMenuOpen]);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (option) => {
    setIsMenuOpen(false);
    option.action(); // Execute the provided action function
  };

  return (
    <div className="overflow-menu" ref={menuRef} onClick={handleMenuClick}>
      <FontAwesomeIcon
        icon={faEllipsisV}
        className="overflow-menu-icon"
      />
      {isMenuOpen && (
        <div className="menu-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="menu-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverflowMenu;
