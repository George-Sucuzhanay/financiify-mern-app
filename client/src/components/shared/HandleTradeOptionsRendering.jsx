import { StockProfiles } from "../routes/StockProfiles";
import { Form } from "../routes/Form";

export const HandleTradeOptionsRendering = (props) => {
  if (!props.isRendered) {
    console.log(props.selectedStock.stock_symbol);
    return <StockProfiles symbol={props.selectedStock.stock_symbol} />;
  } else {
    // console.log(props.currentValue);
    return (
      <div className="transaction-options">
        <div className="transaction-titles">
          <h2>Quantity</h2>
          <h2>Market Price</h2>
          <h2>Total</h2>
        </div>
        <Form
          handleSubmit={props.handleSubmit}
          currentValue={props.currentValue}
          transactionType={props.transactionType}
          handleInputValueChange={props.handleInputValueChange}
          selectedStock={props.selectedStock}
          currentTotalPrice={props.currentTotalPrice}
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
