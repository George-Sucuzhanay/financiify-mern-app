import { Layout } from "../shared/Layout";
import { DisplayStock } from "./DisplayStock";
import { DisplayStocks } from "./DisplayStocks";
import { TrendStocks } from "./TrendStocks";
import portfolioImage from "../../assets/portfolio.png"
import axios from "axios";
import { useState, useEffect } from "react";
import { MarketNews } from "./MarketNews";
export const Dashboard = () => {
  const [currentTransactionData, setCurrentTransactionData] = useState([]);
  const [currentAccountValue, setCurrentAccountValue] = useState(1000000);
  const [currentBuyingPower, setCurrentBuyingPower] = useState(1000000);
  
  const fetchAllStocks = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/api/stocks`,
      method: "GET",
    });
    // console.log(response);
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

  const handleUpdatingOverviewValues = () => {
    let updatedValue = parseFloat(currentBuyingPower);
    currentTransactionData.forEach((data) => {
      if (data.action === "buy") {
        return (updatedValue = updatedValue - parseFloat(data.total));
      } else {
        return (updatedValue = updatedValue + parseFloat(data.total));
      }
    });
    setCurrentBuyingPower(updatedValue.toFixed(2));
  };

  useEffect(() => {
    handleUpdatingOverviewValues();
  }, [currentTransactionData]);

  return (
    <Layout>
      <div className="dashboard-container">
      <div className="trending-stocks">
          <TrendStocks />
        </div>
        <div className="dashboard-left-elements">
          <div className="overview myParent">
            <div className="myChild overview-values">
              <p>ACCOUNT VALUE</p>
              <h1>${currentAccountValue}</h1>
              <p>BUYING POWER</p>
              <h1>${currentBuyingPower}</h1>
            </div>
            <div className="myChild">
              <img id="portfolioImage"src={portfolioImage} alt=""></img>
            </div>
          </div>

          <div className="latest-transactions">
            <h1>Latest Transactions</h1>
            <div className="subheadingTransaction">
              <div className="transaction-column">
                <p>Symbol</p>
        
              </div>
              <div className="transaction-column">
                <p>Action</p>

              </div>
              <div className="transaction-column">
                <p>QTY</p>
              </div>
              <div className="transaction-column">
                <p>Price</p>
              </div>
              <div className="transaction-column">
                <p>Total</p>
              </div>
            </div>

            {currentTransactionData
              .slice(0)
              .reverse()
              .map((data, key) => {
                return (
                  <div className="transaction-row" key={key}>
                    <div className="transaction-column">
                      <p>{data.symbol}</p>
                    </div>
                    <div className="transaction-column">
                      <p>{data.action.toUpperCase()}</p>
                    </div>
                    <div className="transaction-column">
                      <p>{data.qty}</p>
                    </div>
                    <div className="transaction-column">
                      <p>${data.price}</p>
                    </div>
                    <div className="transaction-column">
                      <p>${parseFloat(data.total).toFixed(2)}</p>
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
          {/* <MarketNews/> */}
        </div>

        
      </div>
    </Layout>
  );
};