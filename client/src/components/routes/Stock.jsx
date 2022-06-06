import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const Stock = () => {
  const [selectedStock, setSelectedStock] = useState({});
  const [isRendered, setIsRendered] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [currentStockQuantity, setCurrentStockQuantity] = useState(
    selectedStock.quantity
  );
  const [transactionType, setTransactionType] = useState("buy");
  const [currentValue, setCurrentValue] = useState(1);
  const [updatedValue, setUpdatedValue] = useState(0);
  const [currentTotalPrice, setCurrentTotalPrice] = useState(0);
  const [currentObjectData, setCurrentObjectData] = useState({
    quantity: 0,
  });
  const { id } = useParams();
  let navigate = useNavigate();
  const destroy = () => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/stocks/${id}`,
      method: "DELETE",
    })
      .then(() => setDeleted(true))
      .catch(console.error);
  };

  const fetchSingleStock = async () => {
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/api/stocks/${id}`,
      method: "GET",
    });
    setSelectedStock(response.data.stock);
    setCurrentStockQuantity(response.data.stock.quantity);
    setCurrentTotalPrice(selectedStock.stock_price);
    if (selectedStock.quantity == 0) {
      destroy();
      return navigate("/dashboard");
    }
  };

  useEffect(() => {
    fetchSingleStock();
  }, [id]);

  const handleRenderingClick = (event) => {
    if (event.target.name === "buy") {
      setIsRendered(true);
      setTransactionType("buy");
    } else if (event.target.name === "sell") {
      setIsRendered(true);
      setTransactionType("sell");
    } else if (event.target.name === "cancel") {
      setIsRendered(false);
      setCurrentValue(1);
      setCurrentTotalPrice(selectedStock.stock_price);
    }
  };

  const handleInputValueChange = (event) => {
    event.preventDefault();
    if (event.target.name == "plus") {
      setCurrentValue(currentValue + 1);
      setCurrentTotalPrice(currentTotalPrice + selectedStock.stock_price);
    } else if (event.target.name == "minus" && currentValue >= 2) {
      setCurrentValue(currentValue - 1);
      setCurrentTotalPrice(currentTotalPrice - selectedStock.stock_price);
    } else if (event.target.name == "quantity" && currentValue >= 1) {
      const typedInValue = Number(event.target.value);
      setCurrentValue(typedInValue);
      if (currentValue > typedInValue) {
        setCurrentTotalPrice(currentTotalPrice / currentValue);
      } else {
        setCurrentTotalPrice(currentTotalPrice * typedInValue);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.name);
    if (!updated && event.target.name === "buy") {
      setUpdated(true);
      setUpdatedValue(currentValue + currentStockQuantity);
    } else {
      setUpdated(true);
      setUpdatedValue(currentStockQuantity - currentValue);
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
        url: `${process.env.REACT_APP_API_URL}/api/stocks/${id}`,
        method: "PUT",
        data: currentObjectData,
      });
      console.log("database is updated!!!");
      setCurrentObjectData({ quantity: 0 });
    };

    if (updated) {
      handleUpdating();
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
              name={transactionType}
            >
              <input
                type="button"
                value="-"
                className="minus"
                name="minus"
                onClick={(e) => handleInputValueChange(e)}
              />
              <input
                className="quantity"
                type="number"
                step="1"
                min="1"
                max=""
                name="quantity"
                defaultValue={currentValue}
                onChange={(e) => handleInputValueChange(e)}
                pattern=""
                inputMode=""
              />
              <input
                type="button"
                defaultValue="+"
                className="plus"
                name="plus"
                onClick={(e) => handleInputValueChange(e)}
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
        <p>Company: {selectedStock.stock_name}</p>
        <p>Symbol: {selectedStock.stock_symbol}</p>
        <p>Market Price: {selectedStock.stock_price}</p>
        <p>Amount Held: {selectedStock.quantity}</p>
        <p>
          Asset Total: $
          {(selectedStock.stock_price * selectedStock.quantity).toFixed(2)}
        </p>
      </div>

      <div className="selected-stock-info">
        <div className="stock-buttons">
          <button onClick={(e) => handleRenderingClick(e)} name="buy">
            Buy
          </button>
          <button onClick={(e) => handleRenderingClick(e)} name="cancel">
            Cancel
          </button>
          <button onClick={(e) => handleRenderingClick(e)} name="sell">
            Sell
          </button>
        </div>

        <HandleRendering />
      </div>
    </div>
  );
};
