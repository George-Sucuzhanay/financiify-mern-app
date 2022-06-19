import axios from "axios";
import { useEffect, useState } from "react";
import { StockPurchase } from "./StockPurchase";
export const StockProfiles = ({symbol}) => {

    const [company, setCompany] = useState([])
    const [photo, setPhoto] = useState([])
    const [quote, setQuote] = useState([])
    // const [news, setNews] = useState([])

    useEffect(() => {
      if(symbol) {
        fetchProfile()
      }
    }, [])
   
   
    const fetchProfile = async () => {
          try {
            const stockProfile = await axios
              .get(`https://cloud.iexapis.com/stable/stock/${symbol.toLowerCase()}/batch?types=quote,company,logo,news&range=1m&last=5&token=${process.env.REACT_APP_IEXCLOUD_TOKEN}`)
              .then(stockProfile => {
                setCompany(stockProfile.data.company)
                setPhoto(stockProfile.data.logo)
                setQuote(stockProfile.data.quote)
                // setNews(stockProfile.data.news)
              });
          } catch (error) {
            console.log(error)
          }
    };

    return(
        <div className="">
              <div className="profileInfoParent">
                <div className="profileInfo">
                  <img id="stockImage"src={photo.url} alt=""></img>
                </div>
                <div className="profileInfo">
                  <h1>{company.symbol}</h1>
                  <h4>{company.companyName} <img id="stockImage2"src="https://s3-symbol-logo.tradingview.com/country/US.svg" alt=""></img> {company.exchange}</h4>
                  {/* <h4>CEO: {company.CEO}</h4>
                  <h4>{company.city}, {company.state}</h4>
                  <a href={company.website}><p>{company.website}</p></a> */}
                </div>
              </div>

            <div>
              <h1>{quote.latestPrice} {quote.currency} +-{quote.change} ({quote.changePercent}%)</h1>
            </div>
            <div className="myParent">
              <div className="myChild left-align">
                <h3>Volume</h3>
                <h3>Day's High ($)</h3>
                <h3>Day's Low ($)</h3>
              </div>
              <div className="myChild left-align">
                <h3>{quote.volume}</h3>
                <h3>{quote.high}</h3>
                <h3>{quote.low}</h3>
              </div>
              <div className="myChild left-align">
                <h3>Market Cap</h3>
                <h3>52 Week High ($)</h3>
                <h3>52 Week Low ($)</h3>
              </div>
              <div className="myChild left-align">
                <h3>{quote.marketCap}</h3>
                <h3>{quote.week52High}</h3>
                <h3>{quote.week52Low}</h3>
              </div>
            </div>
            <br></br>
                {/* <h2>Industries: </h2>
                  
                  <ul className="industries">
                    {(profile.tags || []).map((tag, key) => {
                      return (
                        <li key={key}>{tag}</li>
                      )
                    })}
                  </ul> */}


                  {/* <h2>Industries: </h2>
                  
                  <ul className="industries">
                    {(news || []).map((tag, key) => {
                      return (
                        <div>
                          <h3 key={key}>{tag.headline}</h3>
                          <h5 key={key}>{tag.summary}</h5>

                        </div>
                      )   
                    })}
                  </ul> */}
          

          {/* <div className="myChild">
            <p id="profileDescription">{company.description}</p>
          </div> */}
          <StockPurchase symbol={quote.symbol} price={quote.delayedPrice} />
 
        </div>
    )
}