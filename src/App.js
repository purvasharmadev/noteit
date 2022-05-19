import "./App.css";
import URLRoutes from "./routes";

function App() {
  const apiKey = process.env.REACT_APP_JWT_SECRET;
  console.log(apiKey);
  return (
    <>
      <URLRoutes />
    </>
  );
}

export default App;
