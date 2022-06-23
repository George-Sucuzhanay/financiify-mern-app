import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AsyncSelect from "react-select/async";
import { StockProfiles } from "./StockProfiles";

export const DisplayStock = () => {
  const [inputValue, setValue] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");


  const handleInputChange = (value) => {
    // setTimeout(5000) work on making a timeout for the stock ticker so that it wait some time before making api call
    setValue(value);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const loadOptions = () => {
    return (
      axios
        .get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${process.env.REACT_APP_ALFA_TOKEN}`
        )
        // .then(setTimeout(() => {
        //   console.log("Delayed for 1 second.");
        // }, "6000"))

        .then((tickers) => {
          const res = tickers.data.bestMatches;
          return res;
        })
    );
  };

  return (
    <div>
      <div className="search">
        <h1>Search Stocks</h1>
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={selectedValue}
          getOptionLabel={(e) => e["1. symbol"] + "      " + e["2. name"]}
          getOptionValue={(e) => e["2. name"]}
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={handleChange}
        />

        {selectedValue ? (
          <StockProfiles symbol={selectedValue["1. symbol"]} />
        ) : null}
      </div>
    </div>
  );
};
