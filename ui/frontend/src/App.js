import logo from './logo.svg';
import './App.css';
import { Component } from "react";

class App extends Component {
  state = {
    cities: [] // Initialize state with an empty array for cities
  };

  // Use componentDidMount to fetch data after the component mounts
  async componentDidMount() {
    const response = await fetch('http://localhost:8080/api/city/all'); // Fetch data from the API
    const body = await response.json(); // Parse the JSON response
    this.setState({ cities: body }); // Update state with the fetched data
  }

  render() {
    const { cities } = this.state; // Destructure cities from state

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
            <div className="App-intro">
              <h2>Cities</h2>
              {cities.length > 0 ? (
                  cities.map((city) => (
                      <div key={city.id}>
                        {city.name} ({city.zipcode})
                      </div>
                  ))
              ) : (
                  <p>Loading cities...</p>
              )}
            </div>
          </header>
        </div>
    );
  }
}

export default App;
