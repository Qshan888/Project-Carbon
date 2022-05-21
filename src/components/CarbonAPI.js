import React from 'react'
// var redis = require("redis").createClient();


function CarbonIndex() {
  const [airport, setAirport] = React.useState(undefined)
  const [selectPassenger, setSelectedPassenger] = React.useState(undefined)
  const [selectDeparture, setSelectedDeparture] = React.useState(undefined)
  const [selectDestination, setSelectedDestination] = React.useState(undefined)
  const [carbonflight, setCarbonflight] = React.useState(undefined)
  // const [requestData, setRequestData] = React.useState(undefined)

  const [productCarbon, setProductCarbon] = React.useState(undefined)
  const [selectedProduct, setSelectedProduct] = React.useState(undefined)



  

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
    console.log(selectPassenger)

    const requestdata = JSON.stringify({
        "type": "flight",
        "passengers": selectPassenger,
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

  React.useEffect(() => {

    async function getProductCarbon() {

      const respProductCarbon = await fetch ("https://api.carboncloud.com/v0/search", {
        method: "GET",
        headers: {
          "X-API-KEY": "95NOSm7wU24EJ3zqf7IN99yFRQkWyhmcThAIwew3",
        }
      })

      const productEstimate = await respProductCarbon.json()


      const productFiltered = productEstimate.hits.map((item) => {
        return { name: item.contents[1].productName, location: item.contents[1].location, footprint: item.contents[1].totalCo2ClimateFootprint }
      })

      const uniqueProducts = []

      productFiltered.forEach((items) => {
        if (!uniqueProducts.find(
          (existingProduct) => items.name === existingProduct.name)
        ) {
          uniqueProducts.push(items)
        }
      })

      console.log(uniqueProducts)
      setProductCarbon(uniqueProducts)

    }

    getProductCarbon()
  }, [])

  // function findTarget(e) {
  //   console.log(airport[e.target.selectedIndex].code)
  // }


  function calculateProduct(e) {
    console.log(e.target.value)
    console.log(productCarbon[e.target.selectedIndex])
    setSelectedProduct(productCarbon[e.target.selectedIndex])
  }



  return <>

  <div className="container CarbonDiv">
    <h1 className="title">Check the emission impact of your Departure and Return Flight and save the planet!</h1>
    <label className="label">Number of Passengers for example (1 or 2)</label>
    <input 
        value={selectPassenger} 
        placeholder={"# Passenger"}
        onChange={(e) => setSelectedPassenger(e.target.value)} 
      />
    <label className="label">Departure Airport</label>
    <select className="select is-success" onChange={(e) => {setSelectedDeparture(airport[e.target.selectedIndex].code)}}>
      {airport ?
        airport.map((item, index) => {
          return <option key={`Departure${item.name}${index}`} id={item.code}>{item.name}</option>
        })
        : <option>Data is Loading...</option>
      }
    </select>
    <label className="label">Destination Airport</label>
    <select className="select is-success" onChange={(e) => {setSelectedDestination(airport[e.target.selectedIndex].code)}}>
      {airport ?
        airport.map((item, index) => {
          return <option key={`Destination${item.name}${index}`} id={item.code}>{item.name}</option>
        })
        : <option>Data is Loading...</option>
      }
    </select>
    <button onClick={getCarbon} className="button is-danger">Search Carbon</button>
  </div> 


  <div className="container CarbonDiv">
    <div>
      {carbonflight ? 
        <div>
          <p className='title'>Your Flight will hurt the enviroment with Carbon Emissions of {carbonflight.data.attributes.carbon_kg}kg</p>
          <p className='title'>The distance for your departure and return Flight is {carbonflight.data.attributes.distance_value}km</p>
        </div>
          : <p>Calculate your flight emission and distance</p>
      }
    </div>
  </div>

  <div className="container CarbonDiv">
    <select className="select is-success" onChange={(e) => {calculateProduct(e)}}>
      {productCarbon ?
        productCarbon.map((item, index) => {
          return <option key={`${item.name}${index}`}>{item.name}</option>
        })
        : <option>Data is Loading...</option>
      }
    </select>

  </div>

  <div className="container CarbonDiv">
    <div>
      {selectedProduct ? 
        <div>
          <p className='title'>Your Flight Emission equals to {selectedProduct.name} produced in {selectedProduct.location} with a Carbon footprint of {selectedProduct.footprint}kg</p>
          <div>
            {carbonflight ?
              <p>Your flight equals to the footprint of {carbonflight.data.attributes.carbon_kg/selectedProduct.footprint} {selectedProduct.name} </p>
              : <p> Please compute flight Carbon Emission to compare</p>
            }
          </div>
        </div>
          : <p>Compare your flight emission to the footprint of a product of your choice</p>
      }
    </div>
  </div>


</>
}

export default CarbonIndex

