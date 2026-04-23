import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <div className="min-h-screen w-full">
        <Outlet />
      </div>{" "}
      <div className="flex items-center justify-center bg-rose-400 py-3 text-lg text-white">
        copyright @ taha mahmoud 
      </div>
    </div>
  );
}

export default App;
