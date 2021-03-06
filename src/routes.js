import { Routes, Route } from "react-router-dom";
import MockAPI from "./mockman";
// Context
import { useAuth } from "./Auth/auth-context";

// Auth Routes
import { Login } from "./Auth/Login/login";
import { Signin } from "./Auth/Signup/signup";
import { PrivateRoute } from "./Auth/AuthRoutes/PrivateRoutes";
import { RestrictedRoute } from "./Auth/AuthRoutes/RestrictedRoutes";

import { HomePage } from "./Pages/Home/home-page";
import { Notes } from "./Pages/Notes/notes";
import { EditNote } from "./Component/EditNote/edit-note";
import { Archive } from "./Pages/Archive/archive";
import { Trash } from "./Pages/Trash/trash";
export default function URLRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* MockMan */}
      <Route path="/mockman" element={<MockAPI />} />

      {/* Public route */}
      <Route path="/" element={<HomePage />} />

      {/* Auth */}
      <Route path="/" element={<RestrictedRoute login={isLoggedIn} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
      </Route>

      {/* private routes */}
      <Route path="/" element={<PrivateRoute login={isLoggedIn} />}>
        <Route path="/notes" element={<Notes />} />
        <Route path="/edit/:id" element={<EditNote />} replace={true} />
        <Route path="/archives" element={<Archive />} replace={true} />
        <Route path="/trash" element={<Trash />} replace={true} />
      </Route>
    </Routes>
  );
}
