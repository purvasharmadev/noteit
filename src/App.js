import "./App.css";
import URLRoutes from "./routes";

function App() {
  const apiKey = process.env.REACT_APP_JWT_SECRET;
  return (
    <>
      <URLRoutes />
    </>
  );
}

export default App;
