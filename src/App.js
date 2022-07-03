import "./App.css";
import URLRoutes from "./routes";
import {Nav} from "./Pages/Nav/nav";
import {Footer} from "./Pages/Footer/footer";

// import toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,
// it is compulsory method.
toast.configure();

function App() {
  // eslint-disable-next-line 
  const apiKey = process.env.REACT_APP_JWT_SECRET;
  return (
    <>
    <Nav/>
    <div>
    <URLRoutes />
    </div>
    <Footer/>
    </>
  );
}

export default App;
