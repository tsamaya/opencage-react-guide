import React, { Component } from 'react';

class GeocodingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLocating: false,
    };
    this.handleGeoLocation = this.handleGeoLocation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = props.onSubmit;
  }

  handleGeoLocation() {
    const geolocation = navigator.geolocation;
    const p = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Not Supported'));
      }
      this.setState({
        isLocating: true,
      });

      geolocation.getCurrentPosition(
        position => {
          console.log('Location found');
          resolve(position);
        },
        () => {
          console.log('Location : Permission denied');
          reject(new Error('Permission denied'));
        }
      );
    });
    p.then(location => {
      this.setState({
        isLocating: false,
      });
      this.props.onChange(
        'query',
        location.coords.latitude + ', ' + location.coords.longitude
      );
    });
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // console.log(name, value);
    // this.setState({
    //   [name]: value,
    // });
    this.props.onChange(name, value);
  }

  handleSubmit(event) {
    console.log('Form was submitted with state: ', this.state);
    event.preventDefault();
  }

  render() {
    const { apikey, isSubmitting, query } = this.props;
    const { isLocating } = this.state;
    return (
      <div className="box">
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          {/* <!-- API KEY --> */}
          <div className="field">
            <label className="label">API key</label>
            <div className="control has-icons-left">
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
              <input
                name="apikey"
                className="input"
                type="text"
                placeholder="YOUR-API-KEY"
                value={apikey}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="help">
              Your OpenCage Geocoder API Key (
              <a href="https://opencagedata.com/users/sign_up">register</a>
              ).
            </div>
          </div>
          {/* <!-- ./API KEY --> */}
          {/* <!-- Query --> */}
          <div className="field">
            <label className="label">Address or Coordinates</label>
            <div className="control has-icons-left">
              <span className="icon is-small is-left">
                <i className="fas fa-map-marked-alt" />
              </span>
              <input
                name="query"
                className="input"
                type="text"
                placeholder="location"
                value={query}
                onChange={this.handleInputChange}
              />
              <div className="help">
                Address, place name
                <br />
                Corrdinates as <code>latitude, longitudde</code> or{' '}
                <code>y, x</code>.
              </div>
            </div>
          </div>
          {/* <!-- ./Query --> */}

          <div className="field">
            <label className="label">Show my location</label>
            <div className="control" onClick={this.handleGeoLocation}>
              {!isLocating && (
                <button className="button is-static">
                  <span className="icon is-small">
                    <i className="fas fa-location-arrow" />
                  </span>
                </button>
              )}
              {isLocating && (
                <button className="button is-static">
                  <span className="icon is-small">
                    <i className="fas fa-spinner fa-pulse" />
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* <!-- Button Geocode --> */}
          <button
            className="button is-success"
            onClick={this.handleSubmit}
            disabled={isLocating || isSubmitting}
          >
            Geocode
          </button>
          {/* <!-- ./Button Geocode --> */}
        </form>
      </div>
    );
  }
}

export default GeocodingForm;
