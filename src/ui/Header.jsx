import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { removeUser } from "../features/auth/userSlice";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },

  {
    label: "Carts",
    icon: InboxArrowDownIcon,
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const adminMenu = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },

  {
    label: "Products",
    icon: InboxArrowDownIcon,
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];


function ProfileMenu({ user }) {
  const menuItems = user?.role === "admin" ? adminMenu : profileMenuItems;
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const nav = useNavigate();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {menuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                if (label === "Sign Out") {
                  dispatch(removeUser());
                } else if (label === "Products") {
                  nav("/admin-products");
                } else if (label === "Carts") {
                  nav("/cart-page");
                } else if (label === "My Profile") {
                  nav("/user-profile");
                }
                closeMenu();
              }}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}



const Header = () => {

  const nav = useNavigate();
  const { user } = useSelector((state) => state.userSlice);


  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <NavLink to={'/'} replace>
          <Typography

            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
            Material Tailwind
          </Typography>
        </NavLink>


        {user ? <ProfileMenu user={user} /> :
          <Button onClick={() => nav('/login')} size="sm" variant="text">
            <span>Log In</span>
          </Button>}

      </div>

    </Navbar>
  );
}

export default Header