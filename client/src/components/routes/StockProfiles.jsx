import axios from "axios";
import { useEffect, useState } from "react";
import { Stock } from './Stock'
export const StockProfiles = ({symbol}) => {
  
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
            <div className="myParent">
              <div className="myChild">
              <img src={photo.url} alt=""></img>
              </div>

              <div className="myChild">
                <h2>CEO: {profile.CEO}</h2>
                <h3>{profile.city}, {profile.state}</h3>
                <a href={profile.website}><p>{profile.website}</p></a>
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
          </div>

          <div className="myChild">
            <p id="profileDescription">{profile.description}</p>
          </div>
          {/* <Stock/> */}
           

            

  
        

        </div>
    )
}