import React from 'react';
import axios from 'axios';

class Explorer extends React.Component {

constructor(props) {
      super(props);
      this.state = {
        keyword: null,
        latitude: null,
        longitude: null,
        mapImageUrl: null,
        errorMessage: null,
        forcast: null,
        movies: null,
      };
    }

handleSearch = () => {
  const keyword = document.getElementById('keyword').value;
  this.setState({keyword: keyword});
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
if (lat && lon) {
    // Make an Axios request to get weather data
    axios
      .get(`http://localhost:3001/weather?lat=${lat}&lon=${lon}&searchQuery=${keyword}`)
      .then((response) => {
        this.setState({ forecast: response.data });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        this.setState({ errorMessage: 'Failed to retrieve weather data' });
      });

    // Make an Axios request to get movie data
    axios
      .get(`http://localhost:3001/movies?searchQuery=${keyword}`)
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
        this.setState({ errorMessage: 'Failed to retrieve movie data' });
      });
  } else {
    this.setState({ errorMessage: 'Latitude and longitude are required for weather data' });
  }

  })
  .catch((error) => {
  console.error('Error fetching data:', error);
  }); 
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
        <p>{this.state.forcast}</p>
        <p>{this.state.movies}</p>
      </section>
        </main>
      )
    }
  }

export default Explorer;