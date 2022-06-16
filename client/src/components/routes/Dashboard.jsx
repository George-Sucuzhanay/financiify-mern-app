import { Layout } from "../shared/Layout";
import { DisplayStock } from "./DisplayStock";
import { DisplayStocks } from "./DisplayStocks";
import { TrendStocks } from "./TrendStocks";

import axios from "axios";
import { useState, useEffect } from "react";

export const Dashboard = () => {
  const [currentTransactionData, setCurrentTransactionData] = useState([]);
  // const [mode, setMode] = useState('dv')
  // const [ticker, setTicker] = useState("");

  const fetchAllStocks = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/api/stocks`,
      method: "GET",
    });
  };

  useEffect(() => {
    fetchAllStocks();
  }, []);

  const fetchAllTransactions = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_TRANSACTIONS}`,
      method: "GET",
    });
    setCurrentTransactionData(response.data.transactions);
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  // console.log(currentTransactionData.slice(0).reverse());
  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-left-elements">
          <div className="overview">
            <p>Overview</p>
            <p>Account Value: $1000000</p>
            <p>Buying Power: $1000000</p>
          </div>

          <div className="latest-transactions">
            <h1>Latest Transactions</h1>

            {currentTransactionData
              .slice(0)
              .reverse()
              .map((data, key) => {
                return (
                  <div className="transaction-row" key={key}>
                    <div className="transaction-column">
                      <p>Symbol</p>
                      <p>{data.symbol}</p>
                    </div>
                    <div className="transaction-column">
                      <p>Action</p>
                      <p>{data.action.toUpperCase()}</p>
                    </div>
                    <div className="transaction-column">
                      <p>QTY</p>
                      <p>{data.qty}</p>
                    </div>
                    <div className="transaction-column">
                      <p>Price</p>
                      <p>${data.price}</p>
                    </div>
                    <div className="transaction-column">
                      <p>Total</p>
                      <p>${data.total}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {/* We are using lifting state up to track the stockTicker acrossFrom com1 into com2 */}
        {/* We are using another useState for the different screens of the right-side of the dashboard */}

        {/* {mode === 'dv' &&<div className="dashboard-right-elements">
          <div className="api-stocks">
            <DisplayStock setMode={setMode} setTicker={setTicker}/>
          </div>
          <DisplayStocks />
        </div>}
        {mode === 'sss' && <SingleStockView ticker={ticker} setMode={setMode} />} */}
        <div className="dashboard-right-elements">
          <div className="api-stocks">
            <DisplayStock />
          </div>
          <DisplayStocks />
        </div>

        <div className="trending-stocks">
          <TrendStocks />
        </div>
      </div>
    </Layout>
  );
};

// console.log("test");
