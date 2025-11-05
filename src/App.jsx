import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { NewNote } from "./components/new-note/NewNote";
import { EditNote } from "./components/editNote/EditNote";
import { AppRouter } from "./routes/AppRouter";
import { UserContext } from "./context/userContext";
import "./App.css";
function App() {
  const { editNoteModal } = useContext(UserContext);
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar></Navbar>
        <NewNote />
        {editNoteModal && <EditNote />}
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
