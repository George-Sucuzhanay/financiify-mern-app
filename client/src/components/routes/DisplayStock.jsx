import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AsyncSelect from 'react-select/async'
import { StockProfiles } from "./StockProfiles";

export const DisplayStock = () => {

  // const [symbols, setSymbols] = useState([]);


  // const [searchWord, setSearchWord] = useState("");

  const [symbol, setSymbol] = useState("")
  // const [items, setItems] = useState([])
  const [inputValue, setValue] = useState(" ")
  const [selectedValue, setSelectedValue] = useState(null)


  // const [name, setName] = useState("")
  // const [price, setPrice] = useState("")
  // let symbol = "APPL"
  


  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line
  // }, []);

  // const fetchData = async (searchWord) => {
  //   try {
  //     const stockTicker = await axios
  //       .get(
  //         `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchWord}&apikey=${process.env.REACT_APP_ALFA_TOKEN}`
  //       )
  //       .then((stockTicker) => setSymbols(stockTicker.data.bestMatches));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const fetchProfile = async (symbol) => {
  //   try {
  //     const stockProfile = await axios
  //       .get(
  //         `https://cloud.iexapis.com/stable/stock/${symbol.toLowerCase()}/quote?&token=${
  //           process.env.REACT_APP_IEXCLOUD_TOKEN
  //         }`
  //       )
  //       .then((stockProfile) => {
  //         // console.log(stockProfile.data)
  //         // setName(stockProfile.data)}
  //       });
  //   } catch (error) {}
  // };


  
  // const setTickerAndFetch = (symbol) => {
  //   setTicker(symbol);
  //   fetchProfile(symbol);
  // };
  // console.log(symbols)
  // console.log(ticker)
  
  // understanding what onSelectHandler does to change the view of the right side component

    // work in progresss
  // function onSelectHandler(){
  //   setMode('sss')
  // }

  const handleInputChange = value => {
    setValue(value)

  }

  const handleChange = value => {
    // setTickerAndFetch(value["1. symbol"])
    setSelectedValue(value)
  }
  // useEffect(() => {
  //   loadOptions()
  // })

  
  const loadOptions = () => { 
    
      return axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${process.env.REACT_APP_ALFA_TOKEN}`)
    
    // .then(setTimeout(() => {
    //   console.log("Delayed for 1 second.");
    // }, "1000"))  
    
    .then((tickers) => {
        // setTest(res.data.bestMatches)
        const res = tickers.data.bestMatches
        return res
    })
    
    
  }
  // console.log(items)

  // if(selectedValue){
  //   setItems(selectedValue)
  // }

  // if(selectedValue){
  //   return (
  //     <div>
  //       <AsyncSelect
  //                   cacheOptions
  //                   defaultOptions
  //                   value={selectedValue}
  //                   getOptionLabel={e => e["2. name"] + ' '  +  e["1. symbol"]}
  //                   getOptionValue={e => e["2. name"]}
  //                   loadOptions={loadOptions}
  //                   onInputChange={handleInputChange}
  //                   onChange={handleChange}
  //                   />
  //       <StockProfiles selectedValue={selectedValue}/>
  //     </div>
  //   )
  // }
  
  const retrieveSymbol = () => {
    if(selectedValue){
      let mysymbol = selectedValue["1. symbol"]
      setSymbol(mysymbol)
    }
  }
  
   return (
    <div>
    
        {/* use display stockand purchase stock */}


        <div className="search">
                <h1>Search Stocks</h1>

                <div className="row alert alert-info">Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</div>

                  <AsyncSelect
                    cacheOptions
                    defaultOptions
                    value={selectedValue}
                    getOptionLabel={e => e["2. name"] + ' '  +  e["1. symbol"]}
                    getOptionValue={e => e["2. name"]}
                    loadOptions={loadOptions}
                    onInputChange={ handleInputChange}
                    onChange={handleChange}
                    />
                    {/* {selectedValue} */}
                    <StockProfiles symbol={() => retrieveSymbol}/>
                    
                    {}
                        {/* <input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} className="myInput" placeholder="Enter Stock Name"/>

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
                        })} */}
                    

                      

                           
           
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
