import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function SingleStockView({ticker, setMode}){

    const [newStockTickerData, setNewStockTickerData] = useState(null)

    useEffect(function(){
            //make api call for ticker and display data below (aka update state for whatever)
    },[ticker])

    function onInteractionHandler(action){
        //is called after user has bought or sold

        // add the new ticker/stock into the global state (where all previous ones are)// or if this is happening on the backend just redirect to the normal view, and the component will 
        // remount which will pull the new stock from the db alongside the others


        setMode('dv')
    }

    if(!newStockTickerData){
        return <div> Loading... </div>
    }



    return <div>

        {/* setSelectedStock
         the user has selected {props.ticker}

         {newStockTickerData.name}
         {newStockTickerData.price}
         {newStockTickerData.company} */}

         <div>


             Options to interact
             <button onClick={()=>{
                 onInteractionHandler('buy')
             }}>Buy</button>
             <button>Sell</button>
         </div>





    </div>
}