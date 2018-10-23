import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapDisplay extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: null,
        activeMarkerProps: null
    };

    componentDidUpate = (props) => {
        console.log("update props: ", props);
    }

    onMarkerClick = (props, marker, e) => {
        console.log("marker props: ", props);

        // Fetch the Yelp data for the selected restaurant
        let url = `https://api.foursquare.com/v2/venues/search?client_id=IGXZG543B3RW4HHAD1XVVWK03Y2JU3M3KIOTZ2KEMJH5BEUF&client_secret=3VKMH02ZDPJKMJIO5EEFJKJ3JCKO22SJAAOCPYGRBJHKVXVF&v=20180323&radius=50&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
        console.log("url: ", url);
        let headers = new Headers();
        let request = new Request(url, {
            method: 'GET',
            headers
        });
        let activeMarkerProps;
        fetch(request)
            .then(response => response.json())
            .then(result => {
                // Get just the business reference for the restaurant we want from the Yelp
                // return
                let restaurant = this.getBusinessInfo(props, result);
                activeMarkerProps = {
                    ...props,
                    foursquare: restaurant[0]
                };
                console.log("props with FourSquare: ", activeMarkerProps);

                // Get the list of images for the restaurant if we got FourSquare data
                if (activeMarkerProps.foursquare) {
                let url = `https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=IGXZG543B3RW4HHAD1XVVWK03Y2JU3M3KIOTZ2KEMJH5BEUF&client_secret=3VKMH02ZDPJKMJIO5EEFJKJ3JCKO22SJAAOCPYGRBJHKVXVF&v=20180323`;
                fetch(url)
                    .then(response => response.json())
                    .then(result => {
                        activeMarkerProps = {
                            ...activeMarkerProps,
                            images: result.response.photos
                        };
                        if (this.state.activeMarker) 
                            this.state.activeMarker.setAnimation(null);
                        marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                        this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
                        console.log("props with images: ", activeMarkerProps);
                    })
                } else {
                    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                    this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps});
                }
            })
    }

    getBusinessInfo = (props, data) => {
        console.log("foursquare data: ", data);
        return data
            .response
            .venues
            .filter(item => item.name.includes(props.name) || props.name.includes(item.name));
    }

    closeInfoWindow = () => {
        this.state.activeMarker && this
            .state
            .activeMarker
            .setAnimation(null);
        this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});
    }

    render = () => {
        const style = {
            width: '100%',
            height: '100%'
        }
        const center = {
            lat: this.props.lat,
            lng: this.props.lon
        }
        let amProps = this.state.activeMarkerProps;

        return (
            <Map
                google={this.props.google}
                zoom={this.props.zoom}
                style={style}
                initialCenter={center}
                onClick={this.closeInfoWindow}>
                {this
                    .props
                    .locations
                    .map((location, index) => <Marker
                        key={index}
                        index={index}
                        name={location.name}
                        position={location.pos}
                        url={location.url}
                        onClick={this.onMarkerClick}/>)}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.closeInfoWindow}>
                    <div>
                        <h3>{amProps && amProps.name}</h3>
                        {amProps && amProps.url
                            ? (
                                <a href={amProps.url}>See website</a>
                            )
                            : ""}
                        {amProps && amProps.images
                            ? (<div><img alt={amProps.name + " food picture"}
                                src={amProps.images.items[0].prefix + "100x100" + amProps.images.items[0].suffix}/></div>)
                            : ""
}
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({apiKey: "AIzaSyBSf2q0a4Umr65w17nKsfLOl6L99Vj2DsQ"})(MapDisplay)
