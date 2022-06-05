import axios from "axios";
import { useState, useEffect } from "react";
import Select from 'react-select';


export const DisplayStock = ({setMode, setTicker}) => {
  const [searchWord, setSearchWord] = useState("");
  const [symbols, setSymbols] = useState([]);
  // const [name, setName] = useState("")
  // const [price, setPrice] = useState("")
  // let symbol = "APPL"
  


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const stockTicker = await axios
        .get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchWord}&apikey=${process.env.REACT_APP_ALFA_TOKEN}`
        )
        .then((stockTicker) => setSymbols(stockTicker.data.bestMatches));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProfile = async (symbol) => {
    try {
      const stockProfile = await axios
        .get(
          `https://cloud.iexapis.com/stable/stock/${symbol.toLowerCase()}/quote?&token=${
            process.env.REACT_APP_IEXCLOUD_TOKEN
          }`
        )
        .then((stockProfile) => {
          // console.log(stockProfile.data)
          // setName(stockProfile.data)}
        });
    } catch (error) {}
  };

  const setTickerAndFetch = (symbol) => {
    setTicker(symbol);
    fetchProfile(symbol);
  };
  // console.log(symbols)
  // console.log(ticker)
  
  // understanding what onSelectHandler does to change the view of the right side component
  function onSelectHandler(){
    setMode('sss')
  }

  return (
    <div>
    
        {/* use display stockand purchase stock */}


        <div className="search">
                <h1>Search Stocks</h1>
                        <input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} className="myInput" placeholder="Enter Stock Name"/>

                        <button id="searchButton" onClick={fetchData}type="button">Click Me!</button> 

                         {(symbols || []). map((sym, index) => {
                          return (
                            <div className= "container"key={index}>
                              <div className="row">
                                <h1>{sym["1. symbol"]}</h1>
                                <h3>{sym["2. name"]}</h3>
                                <button id="tickerButton" onClick={() => setTickerAndFetch(sym["1. symbol"])} type="button">Click Me!</button> 
                              </div>
                            
                              
                            </div>
                          )
                        })}
                        <br></br>

                      

                           
           
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
