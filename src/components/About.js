import React from "react"

function About() {
  React.useEffect(() => {
    console.log("The About Page has mounted")
  }, [])

  return (
    <section className="hero is-warning is-fullheight-with-navbar is-warning">
      <div className="hero-body has-text-centered">
        
        <div className="container">
          <progress class="progress is-small is-danger" value="2.1" max="100"></progress>
          <p className="title">
            The global aviation industry produces around 2.1% of all human-induced carbon dioxide (CO2) emissions.
          </p>
          <progress class="progress is-small is-danger" value="12" max="100"></progress>
          <p className="title">
            Aviation is responsible for 12% of CO2 emissions from all transport sources, compared to 74% from road transport.
          </p>
          <progress class="progress is-small is-danger" value="35" max="100"></progress>
          <p className="title">
            Air transport carriers 1% of the volume of world trade shipments, however it is over 35% by value, meaning that goods are high value commodities.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
