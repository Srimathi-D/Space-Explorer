import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Your NASA API key is read from the .env.local file.
// Do NOT type your real key here.
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

const planets = [
  {
    name: "Mercury",
    image: "https://images-assets.nasa.gov/image/PIA15162/PIA15162~orig.jpg",
    type: "Terrestrial Planet",
    description: "Mercury is the smallest planet and the closest planet to the Sun.",
    diameter: "4,879 km",
    distance: "57.9 million km",
    day: "59 Earth days",
    year: "88 Earth days",
    moons: "0",
    atmosphere: "Very thin exosphere",
    temperature: "-180°C to 430°C",
    fact: "Mercury is the fastest planet to orbit the Sun.",
  },
  {
    name: "Venus",
    image: "https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg",
    type: "Terrestrial Planet",
    description: "Venus is the second planet from the Sun and has a thick atmosphere.",
    diameter: "12,104 km",
    distance: "108.2 million km",
    day: "243 Earth days",
    year: "225 Earth days",
    moons: "0",
    atmosphere: "Mostly carbon dioxide",
    temperature: "About 465°C",
    fact: "Venus is the hottest planet in our solar system.",
  },
  {
    name: "Earth",
    image: "https://images-assets.nasa.gov/image/PIA18033/PIA18033~orig.jpg",
    type: "Terrestrial Planet",
    description: "Earth is our home planet. It has liquid water and supports life.",
    diameter: "12,742 km",
    distance: "149.6 million km",
    day: "24 hours",
    year: "365 days",
    moons: "1",
    atmosphere: "Nitrogen and oxygen",
    temperature: "Average about 15°C",
    fact: "Earth is the only planet currently known to support life.",
  },
  {
    name: "Mars",
    image: "https://images-assets.nasa.gov/image/PIA04591/PIA04591~orig.jpg",
    type: "Terrestrial Planet",
    description: "Mars is called the Red Planet because of the reddish colour of its surface.",
    diameter: "6,779 km",
    distance: "227.9 million km",
    day: "24.6 hours",
    year: "687 Earth days",
    moons: "2",
    atmosphere: "Mostly carbon dioxide",
    temperature: "Average about -65°C",
    fact: "Scientists study Mars to learn about its past environment.",
  },
  {
    name: "Jupiter",
    image: "https://images-assets.nasa.gov/image/PIA02873/PIA02873~orig.jpg",
    type: "Gas Giant",
    description: "Jupiter is the largest planet in our solar system.",
    diameter: "139,820 km",
    distance: "778.6 million km",
    day: "About 10 hours",
    year: "11.86 Earth years",
    moons: "Many known moons",
    atmosphere: "Mostly hydrogen and helium",
    temperature: "Cloud tops about -110°C",
    fact: "Jupiter has a giant storm called the Great Red Spot.",
  },
  {
    name: "Saturn",
    image: "https://images-assets.nasa.gov/image/PIA01364/PIA01364~orig.jpg",
    type: "Gas Giant",
    description: "Saturn is famous for its beautiful rings made of ice and rocky particles.",
    diameter: "116,460 km",
    distance: "1.43 billion km",
    day: "About 10.7 hours",
    year: "29.4 Earth years",
    moons: "Many known moons",
    atmosphere: "Mostly hydrogen and helium",
    temperature: "Cloud tops about -140°C",
    fact: "Saturn's rings are made of countless small particles.",
  },
  {
    name: "Uranus",
    image: "https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg",
    type: "Ice Giant",
    description: "Uranus is a blue-green ice giant with an unusual sideways rotation.",
    diameter: "50,724 km",
    distance: "2.87 billion km",
    day: "About 17 hours",
    year: "84 Earth years",
    moons: "Many known moons",
    atmosphere: "Hydrogen, helium and methane",
    temperature: "About -195°C on average",
    fact: "Uranus rotates on its side compared with most planets.",
  },
  {
    name: "Neptune",
    image: "https://images-assets.nasa.gov/image/PIA01492/PIA01492~orig.jpg",
    type: "Ice Giant",
    description: "Neptune is the eighth planet and is known for its deep blue colour.",
    diameter: "49,244 km",
    distance: "4.5 billion km",
    day: "About 16 hours",
    year: "165 Earth years",
    moons: "Many known moons",
    atmosphere: "Mostly hydrogen, helium and methane",
    temperature: "About -200°C on average",
    fact: "Neptune has extremely powerful winds.",
  },
];

function App() {
  const [page, setPage] = useState("welcome");
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  

  // ISS Live Location states
  const [issData, setIssData] = useState(null);
  const [issLoading, setIssLoading] = useState(true);
  const [issError, setIssError] = useState(false);

  

  // ISS Live Location (runs only on the planets page, updates every 10 seconds)
  useEffect(() => {
    if (page !== "planets") return;

    const fetchIss = () => {
      axios
        .get("https://api.wheretheiss.at/v1/satellites/25544")
        .then((response) => {
          setIssData(response.data);
          setIssError(false);
        })
        .catch((error) => {
          console.error("ISS API Error:", error);
          setIssError(true);
        })
        .finally(() => {
          setIssLoading(false);
        });
    };

    fetchIss();
    const timer = setInterval(fetchIss, 10000);

    // Stops the timer when you leave the planets page
    return () => clearInterval(timer);
  }, [page]);

  const showPlanetDetails = (planet) => {
    setSelectedPlanet(planet);
  };

  const closeDetails = () => {
    setSelectedPlanet(null);
  };

  return (
    <div className="app">
      {page === "welcome" && (
        <section className="welcome-screen">
          <div className="welcome-content">
            <div className="space-icon">🪐</div>
            <h1>SPACE EXPLORER</h1>
            <h2>Discover the Wonders of Our Universe</h2>

            <p>
              Travel through our solar system and discover amazing
              planets, fascinating facts and the mysteries of space.
            </p>

            <button
              className="primary-btn"
              onClick={() => setPage("intro")}
            >
              Get Started 🚀
            </button>

            <div className="welcome-footer">
              ✨ Your journey through space begins here ✨
            </div>
          </div>
        </section>
      )}

      {page === "intro" && (
        <section className="intro-section">
          <div className="space-icon">🌌</div>

          <h1>Welcome to Space Explorer</h1>

          <p>
            Our solar system has eight amazing planets.
            Each planet has its own unique features,
            atmosphere and interesting facts.
          </p>

          <p>Are you ready to discover them?</p>

          <button
            className="primary-btn"
            onClick={() => setPage("planets")}
          >
            Explore Planets 🪐
          </button>

          <br />

          <button
            className="back-btn"
            onClick={() => setPage("welcome")}
          >
            ← Back
          </button>
        </section>
      )}

      {page === "planets" && (
        <>
          <header className="header">
            <h1>🪐 Explore Planets</h1>

            <p>Select a planet to discover its amazing features!</p>

            <button
              className="back-btn"
              onClick={() => setPage("intro")}
            >
              ← Back
            </button>
          </header>

          <main className="planet-container">
            {planets.map((planet) => (
              <article className="planet-card" key={planet.name}>
                <img src={planet.image} alt={planet.name} />

                <h2>{planet.name}</h2>
                <p className="planet-type">{planet.type}</p>
                <p>{planet.description}</p>

                <button
                  className="explore-btn"
                  onClick={() => showPlanetDetails(planet)}
                >
                  View Details →
                </button>
              </article>
            ))}
          </main>

          <footer className="footer">
            <p>
              🌌 Space Explorer | Discover the Wonders of Our Solar System
            </p>
          </footer>

          
          <section className="iss-section">
            <h2>🛰️ ISS Live Location</h2>

            {issLoading ? (
              <p className="nasa-message">Finding the space station...</p>
            ) : issError && !issData ? (
              <p className="nasa-message nasa-error">
                Oops! We could not find the International Space Station
                right now. Please check your internet connection and try
                again later.
              </p>
            ) : (
              <>
                <p className="iss-intro">
                  The International Space Station is travelling around
                  Earth right now. This updates every 10 seconds.
                </p>

                <div className="iss-grid">
                  <p>
                    <strong>Latitude</strong>
                    {Number(issData.latitude).toFixed(2)}°
                  </p>
                  <p>
                    <strong>Longitude</strong>
                    {Number(issData.longitude).toFixed(2)}°
                  </p>
                  <p>
                    <strong>Altitude</strong>
                    {Number(issData.altitude).toFixed(0)} km
                  </p>
                  <p>
                    <strong>Speed</strong>
                    {Number(issData.velocity).toFixed(0)} km/h
                  </p>
                </div>

                {issError && (
                  <p className="nasa-message nasa-error">
                    Could not refresh just now. Showing the last known
                    location.
                  </p>
                )}
              </>
            )}
          </section>
        </>
      )}

      {selectedPlanet && (
        <div className="overlay" onClick={closeDetails}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPlanet.name} details`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={closeDetails}
              aria-label="Close details"
            >
              ×
            </button>

            <img
              src={selectedPlanet.image}
              alt={selectedPlanet.name}
            />

            <h2>{selectedPlanet.name}</h2>
            <p className="planet-type">{selectedPlanet.type}</p>
            <p>{selectedPlanet.description}</p>

            <div className="planet-details">
              <p><strong>Diameter: </strong>{selectedPlanet.diameter}</p>
              <p><strong>Distance from Sun: </strong>{selectedPlanet.distance}</p>
              <p><strong>Length of Day: </strong>{selectedPlanet.day}</p>
              <p><strong>Length of Year: </strong>{selectedPlanet.year}</p>
              <p><strong>Moons: </strong>{selectedPlanet.moons}</p>
              <p><strong>Atmosphere: </strong>{selectedPlanet.atmosphere}</p>
              <p><strong>Temperature: </strong>{selectedPlanet.temperature}</p>
              <p><strong>Interesting Fact ⭐: </strong>{selectedPlanet.fact}</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;