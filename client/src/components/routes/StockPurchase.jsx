import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "./Form";
import { HandleTransactionConfirmation } from "../shared/HandleTransactionConfirmation";

export const StockPurchase = ({ symbol, price, company }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [transactionType, setTransactionType] = useState("buy");
  const [currentValue, setCurrentValue] = useState(1);
  const [updatedValue, setUpdatedValue] = useState(0);
  const [updatedAssetValue, setUpdatedAssetValue] = useState();
  const [currentTotalPrice, setCurrentTotalPrice] = useState();
  const [isConfirmationHidden, setIsConfirmationHidden] = useState("none");
  const [currentStockQuantity, setCurrentStockQuantity] = useState(1);
  const [currentObjectData, setCurrentObjectData] = useState({
    symbol: null,
    action: null,
    qty: null,
    price: null,
    total: null,
  });
  const [currentAssetTotal, setCurrentAssetTotal] = useState(0);
  const [currentAssetObjectData, setCurrentAssetObjectData] = useState({
    totalCashValue: 0,
  });
  const [currentTransactionObject, setCurrentTransactionObject] = useState({
    stock_name: null,
    stock_price: price,
    stock_symbol: null,
    quantity: null,
    totalCashValue: null,
  });

  const handleRenderingClick = (event) => {
    event.preventDefault();

    if (event.target.name === "buy") {
      setIsRendered(true);
      setTransactionType("buy");
    }
  };

  const handleInputValueChange = (event) => {
    event.preventDefault();
    if (event.target.name === "plus") {
      // console.log("plus");
      setCurrentValue(currentValue + 1);
      setCurrentTotalPrice(currentTotalPrice + price);
    } else if (event.target.name === "minus" && currentValue >= 2) {
      setCurrentValue(currentValue - 1);
      setCurrentTotalPrice(currentTotalPrice - price);
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

  const closeModal = (event) => {
    event.preventDefault();
    if (event.target.name === "yes") {
      setIsConfirmationHidden("none");
      if (!updated && transactionType === "buy") {
        console.log(currentTotalPrice);
        setUpdated(true);
        setUpdatedValue(currentStockQuantity + currentValue);
        setUpdatedAssetValue(
          (currentAssetTotal + currentTotalPrice).toFixed(2)
        );
        const updatedFieldName = { stock_name: company.companyName };
        const updatedFieldPrice = { stock_price: price };
        const updatedFieldSymbol = { stock_symbol: symbol };
        const updatedFieldQty = { quantity: currentValue };
        const updatedFieldTotal = { totalCashValue: currentTotalPrice };

        const editedFieldName = Object.assign(
          currentTransactionObject,
          updatedFieldName
        );

        const editedFieldPrice = Object.assign(
          currentTransactionObject,
          updatedFieldPrice
        );

        const editedFieldSymbol = Object.assign(
          currentTransactionObject,
          updatedFieldSymbol
        );

        const editedFieldQty = Object.assign(
          currentTransactionObject,
          updatedFieldQty
        );

        const editedFieldTotal = Object.assign(
          currentTransactionObject,
          updatedFieldTotal
        );

        setCurrentTransactionObject(
          editedFieldName,
          editedFieldPrice,
          editedFieldSymbol,
          editedFieldQty,
          editedFieldTotal
        );
      }
      setCurrentValue(1);
      setCurrentTotalPrice(0);
    } else {
      return setIsConfirmationHidden("none");
    }
    console.log(currentTransactionObject);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(currentTransactionObject);
    setIsConfirmationHidden("flex");
  };

  useEffect(() => {
    const handleUpdating = async () => {
      console.log(currentTransactionObject);
      await axios({
        url: `${process.env.REACT_APP_API_URL}/api/stocks/`,
        method: "POST",
        data: currentTransactionObject,
      });

      setCurrentObjectData({ quantity: 0 });
      setCurrentAssetObjectData({ totalCashValue: 0 });
    };

    const updatedFieldAction = { action: "buy" };
    const updatedFieldPrice = {
      stock_price: currentTransactionObject.stock_price,
    };
    const updatedFieldSymbol = {
      symbol: currentTransactionObject.stock_symbol,
    };
    const updatedFieldQty = {
      qty: currentTransactionObject.stock_symbol,
    };
    const updatedFieldTotal = {
      totalCashValue: currentTransactionObject.totalCashValue,
    };

    setUpdatedValue(0);
    const editedAction = Object.assign(currentObjectData, updatedFieldAction);
    const editedPrice = Object.assign(currentObjectData, updatedFieldPrice);
    const editedSymbol = Object.assign(currentObjectData, updatedFieldSymbol);
    const editedQty = Object.assign(currentObjectData, updatedFieldQty);
    const editedTotal = Object.assign(currentObjectData, updatedFieldTotal);

    setCurrentObjectData(
      editedAction,
      editedPrice,
      editedSymbol,
      editedQty,
      editedTotal
    );

    const handleCreatingTransactionData = async () => {
      await axios({
        url: `${process.env.REACT_APP_API_TRANSACTIONS}`,
        method: "POST",
        data: currentObjectData,
      });
    };

    if (updated) {
      handleUpdating();
      handleCreatingTransactionData();
      setUpdated(false);
    }
  }, [currentStockQuantity, currentObjectData, updated, updatedValue]);

  return (
    <div className="transactions">
      <div className="subheadingTransaction2 ">
        <div className="transaction-column">
          <h1>Enter Quantity</h1>
        </div>
        <div className="transaction-column">
          <h1>Stock Price</h1>
        </div>
        <div className="transaction-column">
          <h1>Total Price</h1>
        </div>
      </div>
      <div className="form">
        <Form
          handleSubmit={handleSubmit}
          currentValue={currentValue}
          transactionType={transactionType}
          handleInputValueChange={handleInputValueChange}
          selectedStock={currentTransactionObject}
          currentTotalPrice={currentTotalPrice}
        />
      </div>
      <div className="transaction-row2 transaction-corners">
        <div className="stock-buttons">
          <button
            onClick={(e) => handleRenderingClick(e)}
            name="buy"
            className="buy"
            style={{}}
          >
            Buy
          </button>
        </div>
      </div>

      <HandleTransactionConfirmation
        closeModal={closeModal}
        isConfirmationHidden={isConfirmationHidden}
        transactionType={transactionType}
      />
    </div>

  );
};
