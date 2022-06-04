import axios from "axios";
import { useState, useEffect, Children } from "react";
import { useParams } from "react-router-dom";

export const Stock = () => {
  const [selectedStock, setSelectedStock] = useState({});
  const [isRendered, setIsRendered] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [currentStockQuantity, setCurrentStockQuantity] = useState(
    selectedStock.quantity
  );
  const [currentValue, setCurrentValue] = useState(1);
  const [updatedValue, setUpdatedValue] = useState(0);
  const [currentTotalPrice, setCurrentTotalPrice] = useState(0);
  const [currentObjectData, setCurrentObjectData] = useState({
    quantity: 0,
  });
  const { id } = useParams();

  const fetchSingleStock = async () => {
    const response = await axios({
      url: `https://financify-backend.herokuapp.com/api/stocks/${id}`,
      method: "GET",
    });
    setSelectedStock(response.data.stock);
    setCurrentStockQuantity(response.data.stock.quantity);
    setCurrentTotalPrice(selectedStock.stock_price);
  };

  useEffect(() => {
    fetchSingleStock();
  }, [id]);

  const handleRenderingClick = () => {
    if (!isRendered) {
      setIsRendered(true);
    } else {
      setIsRendered(false);
    }
  };

  const handleButtonClicked = () => {
    if (!isButtonClicked) {
      setIsButtonClicked(true);
    } else {
      setIsButtonClicked(false);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.name == "plus") {
      setCurrentValue(currentValue + 1);
      setCurrentTotalPrice(currentTotalPrice + selectedStock.stock_price);
    } else if (event.target.name == "minus") {
      setCurrentValue(currentValue - 1);
    }
  };

  const handleSubmit = (event) => {
    console.log(`currentValue Input: ${currentValue}`);

    event.preventDefault();

    if (!updated) {
      setUpdated(true);
      setUpdatedValue(currentValue + currentStockQuantity);
    }
    setCurrentValue(1);
  };

  useEffect(() => {
    const updatedField = { quantity: updatedValue };
    setUpdatedValue(0);
    const editedItem = Object.assign(currentObjectData, updatedField);
    setCurrentObjectData(editedItem);

    const handleUpdating = async () => {
      await axios({
        url: `https://financify-backend.herokuapp.com/api/stocks/${id}`,
        method: "PUT",
        data: currentObjectData,
      });
      console.log("database is updated!!!");
      setCurrentObjectData({ quantity: 0 });
    };

    if (updated) {
      handleUpdating();
      console.log(`currentStockData:${currentStockQuantity}`);
      console.log(`updatedValue:${updatedValue}`);
      setUpdated(false);
    }
    fetchSingleStock();
  }, [currentStockQuantity, currentObjectData, id, updated, updatedValue]);

  const HandleRendering = () => {
    if (!isRendered) {
      return (
        <div className="stock-info">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            corporis fuga minus quasi praesentium nam, laudantium iure porro
            possimus aliquam facere nulla sequi? Laudantium excepturi neque
            voluptas doloribus omnis nostrum.
          </p>
        </div>
      );
    } else {
      return (
        <div className="transaction-options">
          <div className="transaction-titles">
            <h2>Quantity</h2>
            <h2>Market Price</h2>
            <h2>Total</h2>
          </div>
          <div className="transaction-values">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="quantity-container"
            >
              <input
                type="button"
                value="-"
                className="minus"
                name="minus"
                onClick={(e) => handleClick(e)}
              />
              <input
                className="quantity"
                type="number"
                step="1"
                min="1"
                max=""
                name="quantity"
                defaultValue={currentValue}
                pattern=""
                inputMode=""
              />
              <input
                type="button"
                defaultValue="+"
                className="plus"
                name="plus"
                onClick={(e) => handleClick(e)}
              />
            </form>

            <h2>${selectedStock.stock_price}</h2>
            <h2>${currentTotalPrice.toFixed(2)}</h2>
          </div>
          <div className="company-statistics">
            <h2>Market Cap</h2>
            <h2>Open Price</h2>
            <h2>Employees</h2>
            <h2>CEO</h2>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="selected-stock-container">
      <div className="purchasable-stock">
        <p>{selectedStock.stock_name}</p>
        <p>{selectedStock.stock_price}</p>
        <p>{selectedStock.stock_symbol}</p>
        <p>{selectedStock.quantity}</p>
        <p>{selectedStock.totalCashValue}</p>
      </div>

      <div className="selected-stock-info">
        <div className="stock-buttons">
          <button onClick={handleRenderingClick}>Buy</button>
          <button onClick={handleRenderingClick}>Sell</button>
        </div>

        <HandleRendering />
      </div>
    </div>
  );
};
