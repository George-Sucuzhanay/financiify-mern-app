import {useState, useEffect} from 'react'
import axios from 'axios'
import { Form } from "./Form";


export const StockPurchase = ({symbol, price}) => {
    const [quantity, setQuantity] = useState(1)
   
    const createTransacationsData = async (action) => {
        const data = {
            symbol,
            action,
            price,
            qty: quantity,
            total: quantity * price
        }
        await axios({
            url: `${process.env.REACT_APP_API_TRANSACTIONS}`,
            method: "POST",
            data: data,
        });
    };
 
    const handleRenderingClick = (event) => {
        if (event.target.name === "buy") {
            createTransacationsData("buy");
        } else if (event.target.name === "sell") {
            createTransacationsData("sell");
        } else if (event.target.name === "cancel") {
            setQuantity(0)
        }
    };  

    return(
        <div className=''>
             {/* <button
                className="return-button"
                onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
                }}
                >
                Return to Previous Page
              </button>  */}
              <div className='subheadingTransaction2 '>
                  <div className='transaction-column'>
                      <h1>Enter Quantity</h1>
                  </div>
                  <div className='transaction-column'>
                    <h1>Stock Price</h1>
                  </div>
                  <div className='transaction-column'>
                    <h1>Stock Purchase</h1>
                  </div>
              </div>
                <Form
                handleSubmit={() => {}}
                currentValue={quantity}
                handleInputValueChange={(e) => setQuantity(e.target.value)}
                selectedStock={{stock_price: price}}
                currentTotalPrice={quantity * price}
                />
                <div className="transaction-row2 transaction-corners" >
                    <div className="stock-buttons">
                    <button
                        onClick={(e) => handleRenderingClick(e)}
                        name="buy"
                        className="buy"
                        style={{
                        }}
                    >
                        Buy
                    </button>
                    <button
                        onClick={(e) => handleRenderingClick(e)}
                        name="cancel"
                        className="cancel"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={(e) => handleRenderingClick(e)}
                        name="sell"
                        className="sell"
                    >
                        Sell
                    </button>
                    </div>
                </div>

                
        </div>
  );
};
