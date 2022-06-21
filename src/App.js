import Barcode from "./Barcode/Barcode";
import Home from "./Home"
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Party from "./Party/Party";
import Stock from "./Stock/Stock";

function App() {
  return (
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/barcode" element={<Barcode />} />
          <Route path="/party" element={<Party />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </div>
  );
}

export default App;
