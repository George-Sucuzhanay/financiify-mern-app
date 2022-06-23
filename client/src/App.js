import "./App.css";
import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./components/routes/LandingPage";
import { Home } from "./components/routes/Home";
import { FinancialLiteracy } from "./components/routes/FinancialLiteracy";
import { Dashboard } from "./components/routes/Dashboard";
import { Stock } from "./components/routes/Stock";
// import { PurchaseStock } from "./components/routes/PurchaseStock";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<LandingPage />}></Route> */}
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/learn-more" element={<FinancialLiteracy />}></Route> */}
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/:id" element={<Stock />}></Route>
        {/* <Route
          path="/dashboard/create-stock"
          element={<PurchaseStock />}
        ></Route> */}
      </Routes>
    </div>
  );
}

export default App;
