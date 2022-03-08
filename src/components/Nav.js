import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libIsOpening, setLibIsOpening }) => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <h3>Waves</h3>
        <span>~ Lofi Music ~</span>
      </div>
      <button onClick={() => setLibIsOpening(!libIsOpening)}>
        Library
        <FontAwesomeIcon className="nav-icon" icon={faMusic} />
      </button>
    </nav>
  );
};
export default Nav;
