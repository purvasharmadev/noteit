import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function RestrictedRoute({ login }) {
  const { navigateTo } = useNavigate();
  return login ? navigateTo("/") : <Outlet />;
}

export { RestrictedRoute };
