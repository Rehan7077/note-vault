import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
