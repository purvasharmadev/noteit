import "./App.css";
import URLRoutes from "./routes";
import {Nav} from "./Pages/Nav/nav";
import {Footer} from "./Pages/Footer/footer";


function App() {
  // eslint-disable-next-line 
  const apiKey = process.env.REACT_APP_JWT_SECRET;
  return (
    <>
    <Nav/>
      <URLRoutes />
    <Footer/>
    </>
  );
}

export default App;
