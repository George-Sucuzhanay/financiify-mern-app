import "./App.css";
import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./components/routes/LandingPage";
import { Home } from "./components/routes/Home";
import { FinancialLiteracy } from "./components/routes/FinancialLiteracy";

import { PurchaseStock } from "./components/routes/PurchaseStock";
import { Dashboard } from "./components/routes/Dashboard";
import { DisplayStock } from "./components/routes/DisplayStock";
import { ManageStock } from "./components/routes/ManageStock";
import { SellStock } from "./components/routes/SellStock";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/learn-more" element={<FinancialLiteracy />}></Route>
        <Route
          path="/dashboard/create-stock"
          element={<PurchaseStock />}
        ></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/:id" element={<DisplayStock />}></Route>
        <Route
          path="/dashboard/:id/update-stock"
          element={<ManageStock />}
        ></Route>
        <Route path="/dashboard/:id" element={<SellStock />}></Route>
      </Routes>
    </div>
  );
}

export default App;
