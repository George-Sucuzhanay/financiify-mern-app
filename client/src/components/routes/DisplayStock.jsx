import axios from "axios";
import { useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AsyncSelect from 'react-select/async'
import { StockProfiles } from "./StockProfiles";

export const DisplayStock = () => {


  const [inputValue, setValue] = useState(" ")
  const [selectedValue, setSelectedValue] = useState("")



  const handleInputChange = value => {
    setValue(value)

  }

  const handleChange = value => {
    setSelectedValue(value)
  }
 
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
  
   return (
    <div>
        <div className="search">
                <h1>Search Stocks</h1>
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

                    { selectedValue ? <StockProfiles symbol={selectedValue["1. symbol"]}/> : null}
                        
                      
                     
        </div>
        
                 
    </div>
  );
};
