import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const listenToClick = () => {
      let ignoreClickElement = renderOpenMenu();
      console.log(ignoreClickElement);
      if (ignoreClickElement) {
        isMenuExpanded && setIsMenuExpanded(false);
      } else {
        setIsMenuExpanded(true);
      }
    };
    window.addEventListener("click", listenToClick);
    return () => window.removeEventListener("click", listenToClick);
  }, [isMenuExpanded]);

  function renderOpenMenu() {
    return (
      <div id="hamburgerNav" className="hamburger-content">
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
        <img className="dots-vector" src={DotsVector} />
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
