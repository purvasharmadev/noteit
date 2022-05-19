import "./App.css";
import URLRoutes from "./routes"

function App() {
  const apiKey = process.env.REACT_APP_JWT_SECRET
  console.log(apiKey)
  return (
    <div className="App">
      <h1>NoteIt</h1>
      <URLRoutes/>
    </div>
  );
}

export default App;
