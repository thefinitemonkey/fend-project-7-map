import React, {Component} from 'react';
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './MapDisplay';

class App extends Component {
  state = {
    lat: 29.7844913,
    lon: -95.7800231,
    zoom: 13,
    all: locations,
    mapScriptAvailable: true
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });  
  }

  filterLocations = (locations, query) => {
    return locations.filter(location => location.name.includes(query));
  }

  render = () => {
    console.log("mapScriptAvailable: ", this.state.mapScriptAvailable);
    return (
      <div className="App">
        <MapDisplay
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.filtered}/>
      </div>
    );
  }
}

export default App;
