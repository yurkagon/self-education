import React, { FC, useState, useEffect } from "react";
import Ripples from "react-ripples";
import { Link, useParams } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow_right.svg";
import { ReactComponent as SidebarIcon } from "../../assets/icons/fork_spoon_plate_icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close-icon.svg";
import { ReactComponent as BurgerMenuIcon } from "../../assets/icons/burger_menu_icon.svg";

import "./style.scss";

const Sidebar: FC<{}> = () => {
  const [sidebarOpen, setIsClosed] = useState(false);
  useEffect(() => {
    setIsClosed(false);
  }, [sidebarOpen]);

  const { restaurant_slug } = useParams<{ restaurant_slug: string }>();

  return (
    <Menu
      isOpen={sidebarOpen}
      className="sidebar"
      customCrossIcon={<CloseIcon />}
      customBurgerIcon={<BurgerMenuIcon />}
    >
      <SidebarIcon className="sidebar-icon" />
      <Ripples className="w-100">
        <Link
          onClick={() => {
            setIsClosed(true);
          }}
          id="home"
          className="menu-item w-100"
          to={`/r/${restaurant_slug}/order`}
        >
          Моє замовлення
          <ArrowRight />
        </Link>
      </Ripples>
      <Ripples className="w-100">
        <Link
          onClick={() => {
            setIsClosed(true);
          }}
          id="home"
          className="menu-item w-100"
          to={`/r/${restaurant_slug}/feedback`}
        >
          Залишити відгук
          <ArrowRight />
        </Link>
      </Ripples>
    </Menu>
  );
};
export default Sidebar;
