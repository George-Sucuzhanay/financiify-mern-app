import { useState, useEffect } from "react";
import axios from "axios";

export const TrendStocks = () => {

    const [trends, setTrends] = useState([])

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
      }, [])
    
    const fetchData = async() => {
        try{
          const trendingStocks = await axios.get(`https://cloud.iexapis.com/stable/stock/market/collection/list?collectionName=mostactive&token=${process.env.REACT_APP_IEXCLOUD_TOKEN}`)
          .then((trendingStocks) => setTrends(trendingStocks.data))
          console.log(trendingStocks)
        }catch(error){
          console.log(error)
        }
    }

    return (
        <div>
            {/* change div container and row to mao into columns */}
            <h1>Trending Stocks!</h1>
            {(trends || []). map((trend, index) => {
            return (
            <div className="container" key={index}>
                <div className="row">
                    <h1>{trend.companyName}</h1>
                    <h3>{trend.delayedPrice}</h3>
                </div>
                
            </div>
                )
             })}
        </div>
    )
}