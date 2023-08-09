import React from "react";
import { Navigate } from "react-router-dom";

function RouteProtection({ children }) {
  const userData = localStorage.getItem("userData");
  
  if (userData == null) {
    console.log("login please");
    return <Navigate to={"/sign-in"} />;
  }
  return <div>{children}</div>;
}

export default RouteProtection;
