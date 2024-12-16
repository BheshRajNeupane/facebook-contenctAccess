import { useEffect, useState } from "react";
import { AllPage } from "./components/allPages.jsx";
import { Comments } from "./components/Comments.jsx";

function App() {
  const [allPage, setAllPage] = useState(null); //  all Pages
  const [page, setPage] = useState(null); // Page details

  return (
    <>
      <AllPage />
    </>
  );
}

export default App;
