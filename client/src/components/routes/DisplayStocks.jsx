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
      url: `https://financify-backend.herokuapp.com/api/stocks`,
      method: "GET",
    });
    console.log(response.data.stocks);
    setCurrentStocks(response.data.stocks);
  };

  useEffect(() => {
    fetchAllStocks();
  }, [isRendered]);

  const HandleRendering = () => {
    if (!isRendered) {
      return (
        <div className="dashboard-right-elements">
          {currentStocks.map((data, key) => {
            return (
              <div
                className="purchasable-stock"
                key={key}
                defaultValue={data._id}
              >
                <p>{data.stock_name}</p>
                <p>{data.stock_price}</p>
                <p>{data.stock_symbol}</p>
                <p>{data.quantity}</p>
                <p>{data.totalCashValue}</p>
                <NavLink to={`/dashboard/${data._id}`}>Buy & Sell</NavLink>
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
