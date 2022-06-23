import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const DisplayStocks = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [currentStocks, setCurrentStocks] = useState([]);

  const handleClick = () => {
    if (!isRendered) {
      setIsRendered(true);
    } else {
      setIsRendered(false);
    }
  };

  const fetchAllStocks = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/api/stocks`,
      method: "GET",
    });
    setCurrentStocks(response.data.stocks);
  };

  useEffect(() => {
    fetchAllStocks();
  }, [isRendered]);

  const HandleRendering = () => {
    if (!isRendered) {
      return (
        <div className="purchasable-stocks">
          {currentStocks.map((data, key) => {
            return (
              <div
                className="purchasable-stock"
                key={key}
                defaultValue={data._id}
              >
                <div className="purchasable-stock-left">
                  <p>Company: {data.stock_name}</p>
                  <p>Symbol: {data.stock_symbol}</p>
                  <p>Amount Held: {data.quantity}</p>
                </div>
                <div className="purchasable-stock-left">
                  <p>Market Price: ${data.stock_price}</p>
                  <p>
                    Asset Value: ${parseFloat(data.totalCashValue).toFixed(2)}
                  </p>
                </div>

                <NavLink to={`/dashboard/${data._id}`} className="trade-button">
                  Trade
                </NavLink>
              </div>
            );
          })}
        </div>
      );
    } else {
    }
  };

  return <HandleRendering />;
};
