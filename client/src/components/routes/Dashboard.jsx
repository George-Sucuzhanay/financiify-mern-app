import { Layout } from "../shared/Layout";
import { DisplayStock } from "./DisplayStock";
import { DisplayStocks } from "./DisplayStocks";
import { TrendStocks } from "./TrendStocks";
import portfolioImage from "../../assets/portfolio.png"
import axios from "axios";
import { useState, useEffect } from "react";

export const Dashboard = () => {
  const [currentTransactionData, setCurrentTransactionData] = useState([]);

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
          <div className="overview myParent">
            <div className="myChild">
            <p>Overview</p>
            <p>Account Value: $1000000</p>
            <p>Buying Power: $1000000</p>
            </div>
            <div className="myChild">
              <img id="portfolioImage"src={portfolioImage} alt=""></img>
            </div>
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