import React, {Component} from 'react';
import './App.css';
import locations from './data/locations.json';
import MapDisplay from './MapDisplay';
import ListDrawer from './ListDrawer';



class App extends Component {
  state = {
    lat: 29.7844913,
    lon: -95.7800231,
    zoom: 13,
    all: locations,
    mapScriptAvailable: true,
    open: false
  }

  styles = {
    menuButton: {
      marginLeft: -5,
      marginRight: 20,
      position: "absolute",
      left: 0,
      top: 60,
      background: "white", 
      padding: 10
    },
    hide: {
      display: 'none'
    }
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }

  toggleDrawer = () => {
    this.setState({open: !this.state.open});
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
        <button onClick={this.toggleDrawer} style={this.styles.menuButton}><i className="fa fa-bars"></i></button>
        <ListDrawer locations={this.state.filtered} open={this.state.open} toggleDrawer={this.toggleDrawer}/>
      </div>
    );
  }
}

export default App;
