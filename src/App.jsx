import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import initStore from "./utils/initStore";
import ListNotes from "./comps/ListNotes";
import AddNotes from "./comps/AddNotes";
import AddCourses from "./comps/AddCourses";

import MainLayout from "./views/LayoutMain";
import MainView from "./views/MainView";

function App() {

  useEffect(() => {
    initStore();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainView />} />
          <Route path="add-courses" element={<AddCourses />} />
          <Route path="add-notes" element={<AddNotes />} />
          <Route path="list-notes" element={<ListNotes />} />
        </Route>
      </Routes>
    </Router>
);
}

export default App;
