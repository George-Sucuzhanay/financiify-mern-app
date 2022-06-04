import axios from "axios";
import { useState, useEffect } from "react";
import { PurchaseStock } from "./PurchaseStock";

export const DisplayStock = () => {

  const [searchWord, setSearchWord] = useState("")
  const [symbol, setSymbol] = useState([]);
  const [name, setName] = useState("")
  // const [price, setPrice] = useState("")
  const [ticker, setTicker] = useState("")
  // let symbol = "APPL"

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const fetchData = async() => {
    try{
      const stockTicker = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchWord}&apikey=${process.env.REACT_APP_ALFA_TOKEN}`)
      .then((stockTicker) => setSymbol(stockTicker.data.bestMatches))
     

    }catch(error){
      console.log(error)
    }
  }
  const fetchProfile = async() => {
    try{
      const stockProfile = await axios.get(`https://cloud.iexapis.com/stable/stock/${ticker.toLowerCase()}/quote?&token=${process.env.REACT_APP_IEXCLOUD_TOKEN}`)
      .then((stockProfile) => setName(stockProfile.data))
      console.log(stockProfile.data)
      
    }
    catch(error){

    }
  }
  console.log(symbol)
  console.log(ticker)
  // console.log(price)
  return (
    <div>
    
        {/* use display stockand purchase stock */}


        <div className="search">
                <h1>Search Stocks</h1>
                        <input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} className="myInput" placeholder="Enter College Name"/>

                        <button id="searchButton" onClick={fetchData}type="button">Click Me!</button>

                        {(symbol || []). map((sym, index) => {
                          return (
                            <div key={index}>
                              <h1>{sym["1. symbol"]}</h1>
                              <h3>{sym["2. name"]}</h3>
                              <button id="tickerButton" onClick={() => setTicker(sym["1. symbol"])}type="button">Click Me!</button>
                              
                            </div>
                          )
                        })}


           
        </div>
        
                  {/* {(symbols || []).map((symbol, index) => { */}
                    
                      {/* <PurchaseStock
                        symbols={symbols}
                        price={price}
                      /> */}
                    
                  {/* })} */}
      
    </div>
  );
};
