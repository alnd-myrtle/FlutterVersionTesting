import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./../../assets/images/1.png";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import routes from "../../routes";

export function Sidenav({ brandImg, brandName }) {
  const navigate = useNavigate();

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-[#080a54] to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-[-100%]"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 `}
    >
      <div className={`relative border-b ${"border-blue-gray-50"} bg-white`}>
        <Link to="/dashboard/home" className="flex items-center gap-4 p-2">
          <img src={logo} />
        </Link>
        <IconButton
          variant="text"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none bg-[#080a54] text-black xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {routes.map(({ name, path, icon }) => (
            <li key={name}>
              <NavLink to={`/dashboard/${path}`}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 font-speda capitalize"
                    fullWidth
                  >
                    {icon}
                    <div  className="font-medium text-[16px]">
                      {name}
                    </div>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={async () => {
            let res = window.confirm("Are you sure you want to logut?");
            if (!res) return;
            await localStorage.clear();
            navigate("/sign-in");
          }}
        >
          چوونەدەرەوە
        </button>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Slava and warin",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
