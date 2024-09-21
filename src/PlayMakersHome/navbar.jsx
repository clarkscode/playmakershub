import { menuItem } from '../menuItem';

const Navbar = () => {
  return (
    <nav className="desktop-nav">
      <ul className="menus">
        {menuItem.map((menu, index) => {
          return (
            <li className="menu-items" key={index}>
              <a href={menu.url}>{menu.title}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;