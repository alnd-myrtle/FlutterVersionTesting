import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import LoginPage from "./pages/auth/sign-in";
import Villas from "./pages/dashboard/villas";
import VillasCase from "./pages/dashboard/villasCase";
import Appartments from "./pages/dashboard/appartment";
import ApartmentCasesPage from "./pages/dashboard/appartmentCase";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  // {
  //   icon: <HomeIcon {...icon} />,
  //   name: "داشبۆڕد",
  //   path: "home",
  //   element: <Home />,
  // },
  // {
  //   icon: <UserCircleIcon {...icon} />,
  //   name: "پڕۆفایل",
  //   path: "profile",
  //   element: <Profile />,
  // },
  // {
  //   icon: <TableCellsIcon {...icon} />,
  //   name: "خشتە",
  //   path: "tables",
  //   element: <Tables />,
  // },
  // {
  //   icon: <TableCellsIcon {...icon} />,
  //   name: "شوقەکان",
  //   path: "appartment",
  //   element: <Appartments />,
  // },
  {
    icon: <TableCellsIcon {...icon} />,
    name: "کەیسی شوقەکان",
    path: "appartmentCase",
    element: <ApartmentCasesPage />,
  },
  // {
  //   icon: <TableCellsIcon {...icon} />,
  //   name: "ڤێلاکان",
  //   path: "villa",
  //   element: <Villas />,
  // },
  // {
  //   icon: <TableCellsIcon {...icon} />,
  //   name: "کەیسی ڤێلاکان",
  //   path: "villa_case",
  //   element: <VillasCase />,
  // },
  // {
  //   icon: <BellIcon {...icon} />,
  //   name: "ئاگادارکردنەوەکان",
  //   path: "notifactions",
  //   element: <Notifications />,
  // },
];

export default routes;
