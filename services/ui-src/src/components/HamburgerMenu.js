import React, { useState, useEffect, useRef } from "react";
import { Button } from "@cmsgov/design-system";
import ClosingXLight from "../assets/images/closingXlight30x30.svg";
import HamburgerMenuIcon from "../assets/images/HamburgerMenuIcon.svg";
import DotsVector from "../assets/images/dotsvector.svg";

function HamburgerMenu({ linksToDisplay }) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  useEffect(() => {
    const listenToWidth = () => {
      let widthToHideFrom = 933;
      const winWidth = window.innerWidth;
      if (winWidth < widthToHideFrom) {
        isMenuExpanded && setIsMenuExpanded(true);
      } else {
        setIsMenuExpanded(false);
      }
    };
    window.addEventListener("resize", listenToWidth);
    return () => window.removeEventListener("resize", listenToWidth);
  }, [isMenuExpanded]);

  // const hamburgerWrapperRef = useRef(null);
  // useOutsideAlerter(hamburgerWrapperRef);

  // function useOutsideAlerter(ref) {
  //   useEffect(() => {
  //     /**
  //      * Alert if clicked on outside of element
  //      */
  //     function handleClickOutside(event) {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         setIsMenuExpanded(false);
  //       } else {
  //         setIsMenuExpanded(true);
  //       }
  //     }

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [ref]);
  // }

  const hamburgerWrapperRef = useRef(null);
  console.log(hamburgerWrapperRef);

  useEffect(() => {
    const listenToClick = (event) => {
      let ignoreClickElement = hamburgerWrapperRef;
      if (ignoreClickElement) {
        isMenuExpanded && setIsMenuExpanded(false);
      } else {
        setIsMenuExpanded(true);
      }
    };
    window.addEventListener("click", listenToClick);
    return () => window.removeEventListener("click", listenToClick);
  });

  function renderOpenMenu() {
    return (
      <div
        id="hamburgerNav"
        className="hamburger-content"
        ref={hamburgerWrapperRef}
      >
        <Button
          onClick={() => setIsMenuExpanded(false)}
          type="button"
          id="close-hamburger-menu"
          className="to-close-hamburger"
          inversed
        >
          <img
            aria-label="Close Hamburger Navigation"
            alt="Close Hamburger Navigation"
            src={ClosingXLight}
          />
        </Button>
        <ul
          role="navigation"
          aria-controls="link-list"
          className="hamburger-nav-links-list"
        >
          {linksToDisplay &&
            linksToDisplay.map((link, index) => {
              return <li key={index}>{link}</li>;
            })}
        </ul>
        <img className="dots-vector" alt="dots vector" src={DotsVector} />
      </div>
    );
  }

  function renderMenuButton() {
    return (
      <nav className="nav-left-burger">
        <button
          onClick={() => setIsMenuExpanded(true)}
          type="button"
          aria-label="Hamburger Menu"
          id="hamburger-menu"
          className="closed-hamburger"
          aria-controls="link-list"
          aria-expanded="false"
          transparent="true"
        >
          <img
            aria-label="hamburger-icon-closed-nav"
            alt="Open Hamburger Navigation"
            src={HamburgerMenuIcon}
          />
        </button>
      </nav>
    );
  }

  return <>{isMenuExpanded ? renderOpenMenu() : renderMenuButton()}</>;
}

export default HamburgerMenu;
