import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
  return (
    <div>
      <NavLink to="/dashboards">Dashboards</NavLink>
      <NavLink to="/tables">Tables</NavLink>
      <Outlet />
    </div>
  );
}

export default Menu;
