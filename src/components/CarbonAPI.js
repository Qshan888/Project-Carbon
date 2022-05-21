import React from 'react'
// var redis = require("redis").createClient();


function CarbonIndex() {
  const [airport, setAirport] = React.useState(undefined)
  const [selectDeparture, setSelectedDeparture] = React.useState(undefined)
  const [selectDestination, setSelectedDestination] = React.useState(undefined)
  const [carbonflight, setCarbonflight] = React.useState(undefined)
  // const [requestData, setRequestData] = React.useState(undefined)


  

  React.useEffect(() => {
    async function getData() {


      // API for Airport

      const resAirport = await fetch('https://airlabs.co/api/v9/airports?city=London&api_key=bc1bb645-371a-4d5b-b95e-0aebe3ec1829')
      const data = await resAirport.json()
      
      const airportfiltered = data.response.map((item) => {
        return { code: item.iata_code, name: item.name, country: item.country_code }
      })

      const uniqueAirports = []

      airportfiltered.forEach((airports) => {
        // ! If an object with the airport name is already inside our uniqueAirports, don't push. 
        if (!uniqueAirports.find(
          (existingAirport) => airports.name === existingAirport.name)
        ) {
          uniqueAirports.push(airports)
        }
      })
  
      console.log(uniqueAirports)

      setAirport(uniqueAirports)

      

      
          

    }
    getData()
  }, [])


  async function getCarbon() {

    // API for Carbon

    console.log(selectDeparture)
    console.log(selectDestination)

    const requestdata = JSON.stringify({
        "type": "flight",
        "passengers": 2,
        "legs": [
          {"departure_airport": selectDeparture, "destination_airport": selectDestination},
          {"departure_airport": selectDeparture, "destination_airport": selectDestination}
        ]
      })

    const respCarbonFlight = await fetch ("https://www.carboninterface.com/api/v1/estimates", {
      method: "POST",
      headers: {
        "Authorization": "Bearer l4XLYhurbson9dFUOoRw",
        "Content-Type": "application/json"
      },
      body: requestdata
    })

    const carbonestimate = await respCarbonFlight.json()

    setCarbonflight(carbonestimate)
    console.log(carbonestimate)
    console.log(carbonestimate.data.attributes.carbon_kg)
    console.log(carbonestimate.data.attributes.distance_value)

  }


  // function findTarget(e) {
  //   console.log(airport[e.target.selectedIndex].code)
  // }



  return <>

  <div className="container">
    <h1 className="title">Check the emission impact of your flight and save the planet!</h1>
    <label className="label">Departure Airport</label>
    <select className="select is-success" onChange={(e) => {setSelectedDeparture(airport[e.target.selectedIndex].code)}}>
      <option>All</option>
      {airport ?
        airport.map((item, index) => {
          return <option key={`Departure${item.name}${index}`} id={item.code}>{item.name}</option>
        })
        : <option>Data is Loading...</option>
      }
    </select>
    <label className="label">Destination Airport</label>
    <select className="select is-success" onChange={(e) => {setSelectedDestination(airport[e.target.selectedIndex].code)}}>
      <option>All</option>
      {airport ?
        airport.map((item, index) => {
          return <option key={`Destination${item.name}${index}`} id={item.code}>{item.name}</option>
        })
        : <option>Data is Loading...</option>
      }
    </select>
    <button onClick={getCarbon} className="button is-danger">Search Carbon</button>
  </div> 


  <div className="container">
    <div>
      {carbonflight ? 
        <div>
          <p>Your Flight will hurt the enviroment with Carbon Emissions of {carbonflight.data.attributes.carbon_kg}kg</p>
          <p>The distance for your flight is {carbonflight.data.attributes.distance_value}km</p>
        </div>
          : <p>Calculate your flight emission and distance</p>
      }
    </div>
  </div>


</>
}

export default CarbonIndex

