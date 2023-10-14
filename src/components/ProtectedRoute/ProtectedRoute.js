import React from "react";
import { Navigate } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default ProtectedRoute;