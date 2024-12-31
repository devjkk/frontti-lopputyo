import { useEffect } from "react";
import initStore from "./utils/initStore";
import ListNotes from "./comps/ListNotes";
import AddNotes from "./comps/AddNotes";
import AddCourses from "./comps/AddCourses";

function App() {

  useEffect(() => {
    initStore();
  }, []);

  return (
    <>
    <h1>Hello</h1>
    <ListNotes />
    <AddNotes />
    <AddCourses />
    </>
  )
}

export default App;
