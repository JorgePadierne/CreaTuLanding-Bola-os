import "./App.css";
import ItemsListContainer from "./components/ItemListContainer";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <ItemsListContainer message="Hola Mundo" />
    </>
  );
}

export default App;
