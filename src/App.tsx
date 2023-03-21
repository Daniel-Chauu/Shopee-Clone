import useRouteElement from "./useRouteElement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
function App() {
  const routeElements = useRouteElement();

  return (
    <div className="App">
      {routeElements}
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;