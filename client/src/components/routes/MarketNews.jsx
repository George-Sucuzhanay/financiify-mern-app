import { useEffect, useState } from "react"
import axios from "axios";
import { Card, Button } from "react-bootstrap";

export const MarketNews = () => {

    const [news, setNews] = useState([])

    useEffect(() =>{
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
          const marketNews = await axios
            .get(`https://finnhub.io/api/v1/news?category=general&token=${process.env.REACT_APP_FINN_HUB}`)
            .then(marketNews=> {
              setNews(marketNews.data)
            });
        } catch (error) {
          console.log(error)
        }
    };


    return (
        <div className="row">

            
        {(news).slice(0, 6).map((market, key) => {
            return (
            <Card className=""style={{ width: '20rem' , padding:"10px", alignItems: "center"}}>
                <Card.Img variant="top" style={{width: '70%', textAlign: 'center'}} src={market.image}/>
                <Card.Body key={market.key}>
                    <Card.Title style={{fontSize: '18px'}}>{market.headline}</Card.Title>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            )
        })}
           
        </div>
    )
}