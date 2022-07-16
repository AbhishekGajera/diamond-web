import Barcode from "./Barcode/Barcode";
import Home from "./Home"
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Party from "./Party/Party";
import Stock from "./Stock/Stock";
import PartyList from "./Party/PartyList";
import StockList from "./Stock/StockList";
import ExportList from "./Stock/ExportList";

import StockListById from "./Stock/StockListById";

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
          <Route path="/party/:partyId" element={<Party />} />
          <Route path="/partylist" element={<PartyList />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/stock/:stockId" element={<Stock />} />
          <Route path="/stocklist" element={<StockList />} />
          <Route path="/exportlist" element={<ExportList />} />

          <Route path="/stocklist/:id/:name" element={<StockListById />} />
        </Routes>
      </div>
  );
}

export default App;
