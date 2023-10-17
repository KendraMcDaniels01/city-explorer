import React from 'react';
import axios from 'axios';

class Explorer extends React.Component {

constructor(props) {
      super(props);
      this.state = {
        latitude: null,
        longitude: null,
      };
    }

handleSearch = () => {
  const keyword = document.getElementById('keyword').value;

const apiKey = 'pk.4995faaadeef3569e8b22f23098a6a71';

// code from chatgpt
axios
  .get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${keyword}&format=json`)
  .then((response) => {
  const { lat, lon } = response.data[0];
  this.setState({ latitude: lat, longitude: lon });
  })
  .catch((error) => {
  console.error('Error fetching data:', error);
  });
};

render() {
  return (
  <main>   
    <section>
      <h2>Location Details</h2>
      <button id="btnSearch" onClick={this.handleSearch}>Search</button>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
      </section>
    <section>
      <h2>Maps</h2>
      <img src="https://placehold.co/600x400" alt="placeholder map image" />
    </section>
        </main>
      )
    }
  }

export default Explorer;
