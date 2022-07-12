import "./Header.css";

import amazonLogo from "@assets/amazon_PNG11.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [search, setSearch] = useState("");
  return (
    <header
      className="header flex_row_align_center sticky__top sticky__bottom"
      data-testid="header"
    >
      <div className="header__logoAndSearch flex_row_align_center">
        <Link to="/">
          <img className="header__logo" src={amazonLogo} alt="Amazon logo" />
        </Link>
        <div className="header__search flex_row_align_center">
          <input
            className="header__searchInput"
            type="text"
            placeholder="Find Amazon.com"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="header__searchIcon"
            onClick={() => setSearch("")}
          />
        </div>
      </div>
    </header>
  );
}
