import axios from "axios";
import { useEffect, useState } from "react";

export const StockProfiles = ({symbol}) => {

    // const mySym = (JSON.stringify(selectedValue["1. symbol"] || {}, null, 2))
    // console.log(typeof(mySym))

    const [profile, setProfile] = useState([])
    const [photo, setPhoto] = useState([])

    useEffect(() => {
      if(symbol) {
        fetchProfile()
        fetchPhoto()
      }
    }, [])
   
   
    const fetchProfile = async () => {
          try {
            const stockProfile = await axios
              .get(
                `https://cloud.iexapis.com/stable/stock/${symbol.toLowerCase()}/company?&token=${process.env.REACT_APP_IEXCLOUD_TOKEN}`
              )
              .then(stockProfile => {
                setProfile(stockProfile.data)
              });
          } catch (error) {
            console.log(error)
          }
    };

    const fetchPhoto = async () => {
      try {
        const stockPicture = await axios
          .get(`https://cloud.iexapis.com/stable/stock/${symbol.toLowerCase()}/logo?&token=${process.env.REACT_APP_IEXCLOUD_TOKEN}`)
          .then(stockPicture => {
            setPhoto(stockPicture.data)
          })
      }
      catch(error){
        console.log(error)
      }
    }

    return(
        <div className="myParent">
          <div className="myChild">
            <img src={photo.url} alt=""></img>
            <h1>CEO: {profile.CEO}</h1>
            <h2>{profile.city}, {profile.state}</h2>
            <a href={profile.website}><p>{profile.website}</p></a>
            <br></br>
            <h2>Industries: </h2>
              
              <ul className="industries">
                {(profile.tags || []).map((tag, key) => {
                  return (
                    <li key={key}>{tag}</li>
                  )

                    
                })}
              </ul>
          </div>

          <div className="myChild">
            <p>{profile.description}</p>
          </div>
           

            

  
        

        </div>
    )
}