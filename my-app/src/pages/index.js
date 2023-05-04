import { useEffect, useRef, useState } from "react"



const Main = () =>{
  const [wether,setWether] = useState({})
  const cityRef = useRef()
  const [city,setCity] = useState()
  const [wind,setWind] =useState()
  const [cloud ,setCloud] = useState()
  const [sunRiseSet , setSunRiseSet] = useState()
  const [image,setImage] = useState("/sun.png")
  const [name ,setName] = useState()
  const [coord ,setCoord] = useState({})
  const [loader,setLoader] = useState(true)
  const [weatherArray,setWeatherArray] = useState([])
  let data = new Date()
  useEffect(()=>{
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address"
    const token = "f7e6caa4b08d7aefaf7901ee21d86ef1d33cc0b4";
    let apiKey = "40759716c1dab656b13f7d153a2535ef";
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
       let query = {lat:position.coords.latitude, lon:position.coords.longitude}

        try{
          const options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify(query)
        }
          fetch(url, options)
          .then(response => response.json())
          .then(result => setCity(result.suggestions[0].data.city_with_type.substring(2)))
        }catch(error){
          console.log(error)
        }finally{
          setLoader(false)
        }
      }); 
      
    } else {
      console.log("Не доступно")
    }
    
  },[])
  useEffect(()=>{
      let apiKey = "40759716c1dab656b13f7d153a2535ef";
      try{
       (async()=>{
     let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`)
     let data =  await response.json()
     setWether( data.main)
     setWind(data.wind)
     setCloud(data.weather)
     setSunRiseSet(data.sys)
     setName(data.name)
      })() 
      // (async()=>{
      //   let response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=40759716c1dab656b13f7d153a2535ef`)
      //   let data =  await response.json()
      //   setWeatherArray(data)
      //  })()
      }catch(error){
        console.log(error)
      }
  },[city])
  // useEffect(()=>{
  //   (async()=>{
  //    let response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${coord?.[0]}&lon=${coord?.[1]}&appid=40759716c1dab656b13f7d153a2535ef`)
  //    let data =  await response.json()
  //    setWeatherArray(data)
  //   })()
  // },[coord])
  useEffect(()=>{
    if(cloud?.[0]?.main === "Snow"){
      setImage("/snow.png")
     }else if (cloud?.[0]?.main === "Rain"){
      setImage("/rain.png")
     }else if (cloud?.[0]?.main === "Clouds" ){
      setImage("/clouds.png")
     }else if (cloud?.[0]?.main === "Clear"){
      setImage("/sun.png")
     }
  },[cloud])
  function formSubmit(e){
    e.preventDefault()
    let apiKey = "40759716c1dab656b13f7d153a2535ef";
    try{
      (async()=>{
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityRef.current.value}&lang=ru&units=metric&appid=${apiKey}`)
    let data =  await response.json()
    setWether( data.main)
    setWind( data.wind)
    setCloud(data.weather)
    setSunRiseSet(data.sys)
    setName(data.name)
    setCoord(data.coord)
     })() 
     }catch(error){
       console.log(error)
     }
  }
  if(loader){
    return (<div className="h-screen w-screen flex-col flex justify-center items-center">
      <img src="/Plant.gif" alt="" />
      <h1>Please turn on your geoposition</h1>
      </div>)
  }else
  return (
    <div className="min-h-screen Comic Sans MS bg-cover bg-[url('../images/sunset.jpg')] flex justify-center items-center">
      <div className=" w-[960px] flex flex-col items-center h-[500px] ">
        <div>
      <form className="mt-10" onSubmit={formSubmit}>
          <div className="flex">
            <p className="bg-white flex justify-center items-center shadow-3xl rounded-l-xl w-6"><img src="/search.png"  className=" w-4 h-4"/></p>
            <input placeholder="Moscow" className="rounded-r-xl outline-none  shadow-3xl w-[400px] h-7"  name="city" type="text" ref={cityRef} />
          </div>     
      </form>
      </div>
      <div className="flex w-full h-full">
        <div className=" flex items-center w-1/2">
          <div className="w-full h-2/3 ">
            <div className="h-1/4">
              <h1 className="text-white text-[35px] font-bold">{name}, {sunRiseSet?.country}</h1>
              <p className="text-white">{data.toString().substring(0,11)}</p>
            </div>
            <div className="flex  h-2/4 justify-center items-center">
              <div className="text-white flex">
                <div className="flex mr-5"><img src={image} className="h-[100px] w-[130px]"/></div>
                <div className="flex flex-col items-center">
                  <p className="text-[45px] ">{wether !== undefined &&`${wether.temp}`}&#176;</p>
                 <p className="text-[20px]">{cloud?.[0]?.main} wether</p>
                </div>
                 
                </div>
            </div>
          </div>
          
        </div>
      <div className=" flex items-center w-1/2">
        <div className="flex rounded-xl shadow-xl  w-full h-1/3 bg-slate-50 bg-opacity-25">
          <div className="flex items-center flex-col w-1/3">
          {wether !== undefined && <h2 className="mt-3 flex items-center text-white  flex flex-col">{`${wether.temp_max} ` }&#176;<p>Hight</p></h2>}
            {wether !== undefined &&<h2 className=" mt-5 flex items-center text-white flex-col">{ `${wether.temp_min} ` }&#176;<p>Low</p></h2>}
          </div>
          <div className="flex items-center flex-col w-1/3">
          {wind !== undefined &&<h2 className="mt-3 text-white flex items-center  flex flex-col">{  `${wind.speed} KmH` }<p>Wind</p></h2>}
          {cloud !== undefined &&<h2 className=" mt-5 flex items-center text-white flex-col">{  `${cloud?.[0]?.main} `}<p>Wether</p></h2>}
          </div>
          <div className="flex items-center flex-col w-1/3">
          {sunRiseSet !== undefined &&<h2 className="mt-3 text-white flex items-center  flex flex-col">{  `${new Date(sunRiseSet?.sunrise * 1000 ).getHours()}:${new Date( sunRiseSet?.sunrise * 1000 ).getMinutes()}` }<p>Sunrise</p></h2>}
          {sunRiseSet !== undefined &&<h2 className=" mt-5 flex items-center text-white flex-col">{ `${new Date(sunRiseSet?.sunset * 1000 ).getHours()}:${new Date( sunRiseSet?.sunset * 1000).getMinutes()} `}<p>Sunset</p></h2>}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 )  
}
export default Main