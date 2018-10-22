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
      results: [],
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
        this.setState({ results: response.results, isSubmitting: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ results: [], isSubmitting: false });
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
          <div className="column">
            <GeocodingForm
              apikey={this.state.apikey}
              query={this.state.query}
              isSubmitting={this.state.isSubmitting}
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
            />
          </div>
          <div className="column">
            <GeocodingResults results={this.state.results} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
