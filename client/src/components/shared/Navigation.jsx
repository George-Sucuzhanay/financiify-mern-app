import { NavLink } from "react-router-dom";
export const Navigation = () => {
  return (
    <header>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/learn-more">Learn More</NavLink>
    </header>
  );
};
