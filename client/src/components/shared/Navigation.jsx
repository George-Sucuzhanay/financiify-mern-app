import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png"
export const Navigation = () => {
  return (
    <header>
      <img id="navbar-logo"src={logo} alt=""></img>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/learn-more">Learn More</NavLink>
    </header>
  );
};
