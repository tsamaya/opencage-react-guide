import React, { Component } from 'react';

import Header from './Header';
import GeocodingForm from './GeocodingForm';
import GeocodingResults from './GeocodingResults';

import * as opencage from 'opencage-api-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      apikey: '',
      isSubmitting: false,
      response: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    opencage
      .geocode({ key: this.state.apikey, q: this.state.query })
      .then(response => {
        console.log(response);
        this.setState({ response, isSubmitting: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ reponse: {}, isSubmitting: false });
      });
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <div>
        <Header />

        <div className="columns">
          <div className="column is-one-third-widescreen">
            <GeocodingForm
              apikey={this.state.apikey}
              query={this.state.query}
              isSubmitting={this.state.isSubmitting}
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
            />
          </div>
          <div className="column">
            <GeocodingResults response={this.state.response} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
