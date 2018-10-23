import React, { Component } from 'react';
import L from 'leaflet';
// import Leaflet's CSS
import 'leaflet/dist/leaflet.css';
import './ResultMap.css';

const redIcon = L.icon({
  iconUrl: 'marker-icon-red.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
});

class ResultMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      layer: null,
      data: props.response.results,
    };
    this.mapNode = null;
  }
  componentDidMount() {
    // create the Leaflet map object
    if (!this.state.map) {
      this.initMap();
    }
  }
  componentWillUnmount() {
    // destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }
  initMap() {
    if (this.state.map) return;

    // creates the Leaflet map object
    // it is called after the Map component mounts
    const map = L.map(this.mapNode, {
      center: [45, 2],
      zoom: 4,
    });

    L.tileLayer(
      'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}',
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png',
      }
    ).addTo(map);

    const layer = L.featureGroup().addTo(map);

    const { results } = this.props.response;
    for (let i = 0; i < results.length; i++) {
      const marker = L.marker(results[i].geometry, { icon: redIcon });
      marker.addTo(layer);
    }

    map.fitBounds(layer.getBounds());

    // set the state
    this.setState({ map, layer });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.props.response.results) {
      const { results } = this.props.response;
      if (results && results.length > 0) {
        const { layer } = this.state;
        if (layer) {
          // const redIcon = new RedIcon();
          layer.clearLayers();
          for (let i = 0; i < results.length; i++) {
            const marker = L.marker(results[i].geometry, { icon: redIcon });
            marker.addTo(layer);
          }
          this.state.map.fitBounds(layer.getBounds());
        }
      }
    }
  }

  render() {
    // const results = this.props.response.results || [];

    return (
      <article className="message">
        <div
          ref={node => (this.mapNode = node)}
          id="map"
          data={this.props.data}
        />
      </article>
    );
  }
}

export default ResultMap;
