import React, { useEffect, useState } from "react";
import axios from "axios";


export default function FriendInfo(props) {
  const [prefs, setPrefs] = useState('')
  useEffect(() => {
    axios.get(`/api/friend${props.friend}/genres`)
    .then(res => {   
      setPrefs(res.data)
    })
    .catch(error => {console.log(error)})
  }, [])
  let loves=[]
  let hates=[]
  for (let each in prefs["love"]){
    loves.push(`images/genreicons/${prefs["love"][each]}.svg`.replace(' ', ''))
  }
  for (let each in prefs["hate"]){
    hates.push(`images/genreicons/${prefs["hate"][each]}.svg`.replace(' ', ''))
  }

  return(
  <main className="friend-info-form">
    <a className="close-modal" onClick={props.close}>
      &times;
    </a>
    <h4>{props.friend}</h4>
    {loves.length>0? <p>Loves</p> : ""}
      {loves.map(pref => <img className="friend-info-image" src={pref} alt={pref}/>)}
    {loves.length>0 && hates.length>0?  <hr></hr> :'' }
    {hates.length>0? <p>Hates</p> : ""}
      {hates.map(pref => <img className="friend-info-image" src={pref} alt={pref}/> )}
  </main>
  )
}
