import React from "react"

function Home() {
  React.useEffect(() => {
    console.log("The Home Page has mounted")
  }, [])

  return (
    <section className="hero is-fullheight-with-navbar is-danger">
      <div className="hero-body has-text-centered">
        <div className="container">
          <figure className="">
            <img src="https://media.istockphoto.com/photos/concept-depicting-the-issue-of-carbon-dioxide-emissions-and-its-on-picture-id1340519929?k=20&m=1340519929&s=612x612&w=0&h=2-d7NMT-cqO6gjR52x0Gw06TLS6cavR_3itjfp0n7rM="></img>
          </figure>
          <div className="carbonTitle"> 
            <img src="https://cdn-icons-png.flaticon.com/512/1350/1350120.png" className="image is-24x24 airIcon"></img>
            <p className="title">
                  Carbon Flight Calculator   
            </p>
            <img src="https://cdn-icons-png.flaticon.com/512/1350/1350120.png" className="image is-24x24 airIcon"></img>
          </div>
        </div>
      </div>
    </section>
    
  )
}

export default Home
