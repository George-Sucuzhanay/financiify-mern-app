import { NavLink } from "react-router-dom";
import logo from "../../assets/black-logo.png";
export const Navigation = () => {
  return (
    <header>
      <NavLink to="/">
        <img id="navbar-logo" src={logo}></img>
      </NavLink>

      <NavLink to="/">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      {/* <NavLink to="/learn-more">Learn More</NavLink> */}
    </header>
  );
};
