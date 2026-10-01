import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" theme="dark" />
      <Navigation />
      <main className="min-h-screen pt-20">
        <Outlet />
      </main>
    </>
  );
};

export default App;
