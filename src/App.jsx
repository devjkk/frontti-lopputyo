import { useEffect } from "react";
import initStore from "./utils/initStore";
import ListNotes from "./comps/ListNotes";

function App() {

  useEffect(() => {
    initStore();
  }, []);

  return (
    <>
    <h1>Hello</h1>
    <ListNotes />
    </>
  )
}

export default App;
