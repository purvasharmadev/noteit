import "./home-page.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/auth-context";

export function HomePage() {
  const { isLoggedIn,logOut } = useAuth();
  return (
    <div className="Home">
      <header className="Home-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Tomboy_logo.svg/1200px-Tomboy_logo.svg.png"
          alt="mockBee logo"
          width="180"
          height="180"
        />
        <h1 className="brand-title">
          Welcome to <span>NoteIt</span>
        </h1>
        <p className="brand-description">Organise your days!!</p>
        <div className="links">
          {isLoggedIn ? (
              <>
            <Link to="/notes">Add now!</Link>
            <button onClick={logOut}>Logout!</button>
              </>

          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
