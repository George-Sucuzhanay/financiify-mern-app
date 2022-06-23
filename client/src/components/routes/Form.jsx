export const Form = (props) => {
  console.log(props.currentValue);
  return (
    <div className="transaction-values">
      <form
        onSubmit={(e) => props.handleSubmit(e)}
        className="quantity-container"
        name={props.transactionType}
      >
        <input
          type="button"
          value="-"
          className="minus"
          name="minus"
          onClick={(e) => props.handleInputValueChange(e)}
        />
        <input
          className="quantity"
          type="number"
          step="1"
          min="1"
          max=""
          name="quantity"
          defaultValue={props.currentValue}
          onChange={(e) => props.handleInputValueChange(e)}
          pattern=""
          inputMode=""
        />
        <input
          type="button"
          defaultValue="+"
          className="plus"
          name="plus"
          onClick={(e) => props.handleInputValueChange(e)}
        />
      </form>
      
      <h2>${props.selectedStock.stock_price ?  props.selectedStock.stock_price : props.price}</h2>
      <h2>${parseFloat(props.currentTotalPrice).toFixed(2)}</h2>
    </div>
  );
};
