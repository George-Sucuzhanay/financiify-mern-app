import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HandleTransactionConfirmation } from "../shared/HandleTransactionConfirmation";
import { HandleTradeOptionsRendering } from "../shared/HandleTradeOptionsRendering";

export const Stock = () => {
  const [selectedStock, setSelectedStock] = useState({}); // use selectedStock to render company info
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
  const [currentTransactionObject, setCurrentTransactionObject] = useState({
    symbol: null,
    action: null,
    qty: null,
    price: null,
    total: null,
  });
  const [currentTotalPrice, setCurrentTotalPrice] = useState(0);
  const [currentBuyButtonColor, setCurrentBuyButtonColor] = useState("#edf2fb");
  const [currentCancelButtonColor, setCurrentCancelButtonColor] =
    useState("#edf2fb");
  const [currentSellButtonColor, setCurrentSellButtonColor] =
    useState("#edf2fb");
  const transactionButtonColors = ["green", "grey", "red"];
  const [isConfirmationHidden, setIsConfirmationHidden] = useState("none");
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
    // make useState for stockSymbol to render
    if (selectedStock.quantity === 0) {
      destroy();
      return navigate("/dashboard");
    }
  };

  useEffect(() => {
    fetchSingleStock();
  }, [id]);

  const handleRenderingClick = (event) => {
    event.preventDefault();

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

  // console.log(currentValue);
  const closeModal = (event) => {
    event.preventDefault();
    if (event.target.name === "yes") {
      setIsConfirmationHidden("none");
      if (!updated && transactionType === "buy") {
        setUpdated(true);
        setUpdatedValue(currentStockQuantity + currentValue);
        setUpdatedAssetValue(
          (currentAssetTotal + currentTotalPrice).toFixed(2)
        );
        const updatedFieldSymbol = { symbol: selectedStock.stock_symbol };
        const updatedFieldAction = { action: transactionType };
        const updatedFieldQty = { qty: currentValue };
        const updatedFieldPrice = { price: selectedStock.stock_price };
        const updatedFieldTotal = { total: currentTotalPrice };

        const editedFieldSymbol = Object.assign(
          currentTransactionObject,
          updatedFieldSymbol
        );

        const editedFieldAction = Object.assign(
          currentTransactionObject,
          updatedFieldAction
        );

        const editedFieldQty = Object.assign(
          currentTransactionObject,
          updatedFieldQty
        );

        const editedFieldPrice = Object.assign(
          currentTransactionObject,
          updatedFieldPrice
        );

        const editedFieldTotal = Object.assign(
          currentTransactionObject,
          updatedFieldTotal
        );

        setCurrentTransactionObject(
          editedFieldSymbol,
          editedFieldAction,
          editedFieldQty,
          editedFieldPrice,
          editedFieldTotal
        );
      } else {
        setUpdated(true);
        setUpdatedValue(currentStockQuantity - currentValue);
        setUpdatedAssetValue(
          (currentAssetTotal - currentTotalPrice).toFixed(2)
        );
        const updatedFieldSymbol = { symbol: selectedStock.stock_symbol };
        const updatedFieldAction = { action: transactionType };
        const updatedFieldQty = { qty: currentValue };
        const updatedFieldPrice = { price: selectedStock.stock_price };
        const updatedFieldTotal = { total: currentTotalPrice };

        const editedFieldSymbol = Object.assign(
          currentTransactionObject,
          updatedFieldSymbol
        );

        const editedFieldAction = Object.assign(
          currentTransactionObject,
          updatedFieldAction
        );

        const editedFieldQty = Object.assign(
          currentTransactionObject,
          updatedFieldQty
        );

        const editedFieldPrice = Object.assign(
          currentTransactionObject,
          updatedFieldPrice
        );

        const editedFieldTotal = Object.assign(
          currentTransactionObject,
          updatedFieldTotal
        );

        setCurrentTransactionObject(
          editedFieldSymbol,
          editedFieldAction,
          editedFieldQty,
          editedFieldPrice,
          editedFieldTotal
        );
      }

      setCurrentValue(1);
      setCurrentTotalPrice(0);
    } else {
      return setIsConfirmationHidden("none");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsConfirmationHidden("flex");
  };

  useEffect(() => {
    const updatedField = { quantity: updatedValue };
    const updatedTotalAsset = { totalCashValue: updatedAssetValue };
    setUpdatedValue(0);
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

      setCurrentObjectData({ quantity: 0 });
      setCurrentAssetObjectData({ totalCashValue: 0 });
    };

    const handleCreatingTransactionData = async () => {
      await axios({
        url: `${process.env.REACT_APP_API_TRANSACTIONS}`,
        method: "POST",
        data: currentTransactionObject,
      });
    };

    if (updated) {
      handleUpdating();
      handleCreatingTransactionData();
      setUpdated(false);
    }
    fetchSingleStock();
  }, [currentStockQuantity, currentObjectData, id, updated, updatedValue]);

  return (
    <div className="selected-stock-container">
      <button
        className="return-button"
        onClick={(e) => {
          e.preventDefault();
          navigate("/dashboard");
        }}
      >
        Return to Previous Page
      </button>
      <div className="purchasable-stock">
        <p>Company: {selectedStock.stock_name}</p>
        <p>Symbol: {selectedStock.stock_symbol}</p>
        <p>Amount Held: {selectedStock.quantity}</p>
        <p>Market Price: {selectedStock.stock_price}</p>
        <p>Asset Total: ${selectedStock.totalCashValue}</p>
      </div>

      <div className="selected-stock-info">
        {/* <div className="stock-buttons">
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
        </div> */}

        <HandleTradeOptionsRendering
          isRendered={isRendered}
          handleSubmit={handleSubmit}
          currentValue={currentValue}
          transactionType={transactionType}
          handleInputValueChange={handleInputValueChange}
          selectedStock={selectedStock}
          currentTotalPrice={currentTotalPrice}
        />
        <HandleTransactionConfirmation
          closeModal={closeModal}
          isConfirmationHidden={isConfirmationHidden}
          transactionType={transactionType}
        />
      </div>
    </div>
  );
};
