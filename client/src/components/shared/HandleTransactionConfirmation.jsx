export const HandleTransactionConfirmation = (props) => {
  return (
    <div
      className="confirmation-screen"
      style={{
        top: window.innerHeight / 5,
        display: props.isConfirmationHidden,
      }}
    >
      <span
        className="close-button"
        onClick={(e) => props.closeModal(e)}
      ></span>

      <p>Are you sure you want to {props.transactionType} amount?</p>

      <div className="stock-buttons">
        <button onClick={(e) => props.closeModal(e)} name="yes">
          Yes
        </button>
        <button onClick={(e) => props.closeModal(e)} name="no">
          No
        </button>
      </div>
    </div>
  );
};
