import axios from "axios";
import { useEffect, useState } from "react";

export const StockProfiles = ({selectedValue}) => {

    // const mySym = (JSON.stringify(selectedValue["1. symbol"] || {}, null, 2))
    // console.log(typeof(mySym))

    const [stock, setStock] = useState([])

    const fetchProfile = async (mySym) => {
          try {
            const stockProfile = await axios
              .get(
                `https://cloud.iexapis.com/stable/stock/${mySym}.toLowerCase()}/quote?&token=${
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
            {/* {selectedValue} */}
            {/* {selectedValue} */}
            <h1>Rendering my Stock Profile component</h1>
            {/* <h3>{JSON.stringify(props.selectedValue["1. symbol"] || {}, null, 2)}</h3> */}

        </div>
    )
}