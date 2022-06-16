import axios from "axios";
import { useEffect, useState } from "react";

export const StockProfiles = ({symbol}) => {

    // const mySym = (JSON.stringify(selectedValue["1. symbol"] || {}, null, 2))
    // console.log(typeof(mySym))

    const [stock, setStock] = useState([])

   
    const fetchProfile = async (symbol) => {
          try {
            const stockProfile = await axios
              .get(
                `https://cloud.iexapis.com/stable/stock/${symbol}.toLowerCase()}/quote?&token=${
                  process.env.REACT_APP_IEXCLOUD_TOKEN
                }`
              )
              .then((stockProfile) => {
                // console.log(stockProfile.data)
                setStock(stockProfile.data)
                
              });
          } catch (error) {}
    };


    return(
        <div>
            <h1>Rendering my Stock Profile component</h1>
            <h2>{`${symbol}`}</h2>
            <h3>ee</h3>
            <h3>{stock}</h3>
            {/* <h3>{JSON.stringify(props.selectedValue["1. symbol"] || {}, null, 2)}</h3> */}

        </div>
    )
}