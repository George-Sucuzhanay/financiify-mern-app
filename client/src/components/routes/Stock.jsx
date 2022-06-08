import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "./Form";

export const Stock = () => {
  const [selectedStock, setSelectedStock] = useState({});
  const [isRendered, setIsRendered] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [transactionType, setTransactionType] = useState("buy");
  const [currentValue, setCurrentValue] = useState(1);
  const [updatedValue, setUpdatedValue] = useState(0);
  const [updatedAssetValue, setUpdatedAssetValue] = useState(0);
  const [currentStockQuantity, setCurrentStockQuantity] = useState(
    selectedStock.quantity
  );
  const [currentObjectData, setCurrentObjectData] = useState({
    quantity: 0,
  });
  const [currentAssetTotal, setCurrentAssetTotal] = useState(
    selectedStock.totalCashValue
  );
  const [currentAssetObjectData, setCurrentAssetObjectData] = useState({
    totalCashValue: 0,
  });
  const [currentTotalPrice, setCurrentTotalPrice] = useState(0);
  const [currentBuyButtonColor, setCurrentBuyButtonColor] = useState("#edf2fb");
  const [currentCancelButtonColor, setCurrentCancelButtonColor] =
    useState("#edf2fb");
  const [currentSellButtonColor, setCurrentSellButtonColor] =
    useState("#edf2fb");
  const transactionButtonColors = ["green", "grey", "red"];
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
    setCurrentAssetTotal(response.data.stock.totalCashValue);
    setCurrentTotalPrice(selectedStock.stock_price);
    console.log(response.data.stock.totalCashValue);

    if (selectedStock.quantity <= 0) {
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
      setCurrentBuyButtonColor(transactionButtonColors[0]);
      setCurrentCancelButtonColor("#edf2fb");
      setCurrentSellButtonColor("#edf2fb");
    } else if (event.target.name === "sell") {
      setIsRendered(true);
      setTransactionType("sell");
      setCurrentBuyButtonColor("#edf2fb");
      setCurrentCancelButtonColor("#edf2fb");
      setCurrentSellButtonColor(transactionButtonColors[2]);
    } else if (event.target.name === "cancel") {
      setIsRendered(false);
      setCurrentValue(1);
      setCurrentTotalPrice(selectedStock.stock_price);
      setCurrentBuyButtonColor("#edf2fb");
      setCurrentCancelButtonColor(transactionButtonColors[1]);
      setCurrentSellButtonColor("#edf2fb");
    }
  };

  const handleInputValueChange = (event) => {
    event.preventDefault();
    if (event.target.name === "plus") {
      setCurrentValue(currentValue + 1);
      setCurrentTotalPrice(currentTotalPrice + selectedStock.stock_price);
    } else if (event.target.name === "minus" && currentValue >= 2) {
      setCurrentValue(currentValue - 1);
      setCurrentTotalPrice(currentTotalPrice - selectedStock.stock_price);
    } else if (event.target.name === "quantity" && currentValue >= 1) {
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
    // console.log(event.target.name);
    if (!updated && event.target.name === "buy") {
      setUpdated(true);
      setUpdatedValue(currentStockQuantity + currentValue);
      setUpdatedAssetValue((currentAssetTotal + currentTotalPrice).toFixed(2));
      console.log(currentTotalPrice);
    } else {
      setUpdated(true);
      setUpdatedValue(currentStockQuantity - currentValue);
      setUpdatedAssetValue((currentAssetTotal - currentTotalPrice).toFixed(2));
    }
    setCurrentValue(1);
    setCurrentTotalPrice(0);
  };

  useEffect(() => {
    const updatedField = { quantity: updatedValue };
    const updatedTotalAsset = { totalCashValue: updatedAssetValue };
    setUpdatedValue(0);
    console.log(updatedTotalAsset);
    const editedItem = Object.assign(currentObjectData, updatedField);
    const editedCashValue = Object.assign(
      currentAssetObjectData,
      updatedTotalAsset
    );
    setCurrentObjectData(editedItem);
    setCurrentAssetObjectData(editedCashValue);

    const handleUpdating = async () => {
      await axios({
        url: `${process.env.REACT_APP_API_URL}/api/stocks/${id}`,
        method: "PUT",
        data: currentObjectData,
      });

      await axios({
        url: `${process.env.REACT_APP_API_URL}/api/stocks/${id}`,
        method: "PUT",
        data: currentAssetObjectData,
      });
      console.log("database is updated!!!");
      setCurrentObjectData({ quantity: 0 });
      setCurrentAssetObjectData({ totalCashValue: 0 });
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
          <h1>Company Bio</h1>
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
          <Form
            handleSubmit={handleSubmit}
            currentValue={currentValue}
            transactionType={transactionType}
            handleInputValueChange={handleInputValueChange}
            selectedStock={selectedStock}
            currentTotalPrice={currentTotalPrice}
          />

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
        <p>Amount Held: {selectedStock.quantity}</p>
        <p>Market Price: {selectedStock.stock_price}</p>
        <p>
          Asset Total: ${selectedStock.totalCashValue}
          {/* {(selectedStock.stock_price * selectedStock.quantity).toFixed(2)} */}
        </p>
      </div>

      <div className="selected-stock-info">
        <div className="stock-buttons">
          <button
            onClick={(e) => handleRenderingClick(e)}
            name="buy"
            className="buy"
            style={{
              backgroundColor: currentBuyButtonColor,
            }}
          >
            Buy
          </button>
          <button
            onClick={(e) => handleRenderingClick(e)}
            name="cancel"
            className="cancel"
            style={{ backgroundColor: currentCancelButtonColor }}
          >
            Cancel
          </button>
          <button
            onClick={(e) => handleRenderingClick(e)}
            name="sell"
            className="sell"
            style={{ backgroundColor: currentSellButtonColor }}
          >
            Sell
          </button>
        </div>

        <HandleRendering />
      </div>
    </div>
  );
};
