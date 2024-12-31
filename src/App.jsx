import { useEffect } from "react";
import initStore from "./utils/initStore";

function App() {

  useEffect(() => {
    initStore();
  }, []);

  return (
    <>
    <h1>Hello</h1>
    </>
  )
}

export default App;
