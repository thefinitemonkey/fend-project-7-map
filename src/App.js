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
    open: false,
    selectedIndex: null
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
    this.setState({
      open: !this.state.open
    });
  }

  updateQuery = (query) => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, query)
    });
  }

  filterLocations = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  clickListItem = (index) => {
    this.setState({selectedIndex: index, open: !this.state.open})
  }

  render = () => {
    return (
      <div className="App">

        <MapDisplay
          lat={this.state.lat}
          lon={this.state.lon}
          zoom={this.state.zoom}
          locations={this.state.filtered}
          selectedIndex={this.state.selectedIndex}
          clickListItem={this.clickListItem}/>
        <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
          <i className="fa fa-bars"></i>
        </button>
        <ListDrawer
          locations={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
          filterLocations={this.updateQuery}
          clickListItem={this.clickListItem}/>
      </div>
    );
  }
}

export default App;
