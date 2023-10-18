import React from 'react';
import axios from 'axios';

class Explorer extends React.Component {

constructor(props) {
      super(props);
      this.state = {
        latitude: null,
        longitude: null,
        mapImageUrl: null,
        errorMessage: null,
        forcast: null,
      };
    }

handleSearch = () => {
  const keyword = document.getElementById('keyword').value;
  const apiKey = 'pk.4995faaadeef3569e8b22f23098a6a71';

axios
  .get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${keyword}&format=json`)
  .then((response) => {
  const { lat, lon } = response.data[0];
  this.setState({ latitude: lat, longitude: lon });
   if (keyword) {

    const mapImageUrl = `https://maps.locationiq.com/v3/staticmap?key=${apiKey}&center=${lat},${lon}&zoom=14&size=600x400`;

    this.setState({ mapImageUrl });  

  } else {this.setState({ errorMessage: "Unable to geocode"});
  }
  })
  .catch((error) => {
  console.error('Error fetching data:', error);
  });
};

handleGetWeather = () => {
  const { latitude, longitude } = this.state;

  if (latitude && longitude) {
    axios
      .get(`http://localhost:3001/weather?lat=${latitude}&lon=${longitude}&searchQuery=${this.state.keyword}`)
      .then((response) => {
        this.setState({ forecast: response.data });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        this.setState({ errorMessage: 'Failed to retrieve weather data' });
      });
  } else {
    this.setState({ errorMessage: 'Latitude and longitude are required for weather data' });
  }
};

render() {
  return (
  <main>   
    <section>
      <button id="btnSearch" onClick={this.handleSearch}>Search</button>
        <h2>Location Details</h2>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
      </section>
    <section>
    {this.state.errorMessage ? <p className="error-message">{this.state.errorMessage}</p> : this.state.mapImageUrl ? (
          <img src={this.state.mapImageUrl} alt="City Map" />
        ) : (
          <img src="https://placehold.co/600x400" alt="placeholder map image" />
        )}
    </section>
    <section>
        <h2>Weather Details</h2>
        <button id="btnWeather" onClick={this.handleGetWeather}>Get Weather</button>
        <p>{this.state.forcast}</p>
      </section>
        </main>
      )
    }
  }

export default Explorer;
