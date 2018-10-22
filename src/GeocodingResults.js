import React, { Component } from 'react';
import classnames from 'classnames';

import './GeocodingResults.css';

class GeocodingResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResultActive: true,
      isJSONActive: false,
    };
  }
  render() {
    const { isResultActive, isJSONActive } = this.state;
    const results = this.props.response.results || [];

    return (
      <div className="box results">
        <div className="tabs is-boxed vh">
          <ul>
            <li className={classnames({ 'is-active': isResultActive })}>
              <a
                href="/"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ isJSONActive: false, isResultActive: true });
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-list-ul" aria-hidden="true" />
                </span>
                <span>Results</span>
              </a>
            </li>
            {results.length > 0 && (
              <li className={classnames({ 'is-active': isJSONActive })}>
                <a
                  href="/"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({
                      isJSONActive: true,
                      isResultActive: false,
                    });
                  }}
                >
                  <span className="icon is-small">
                    <i className="fab fa-js" aria-hidden="true" />
                  </span>
                  <span>JSON Result</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* List of results */}
        {isResultActive &&
          results.length > 0 && (
            <article className="message">
              <div className="message-body">
                <ol>
                  {results.map((result, index) => {
                    return (
                      <li key={index}>
                        {result.annotations.flag} {result.formatted}
                        <br />
                        <code>
                          {result.geometry.lat} {result.geometry.lng}
                        </code>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </article>
          )}
        {/* JSON result */}
        {isJSONActive &&
          results.length > 0 && (
            <article className="message">
              <div className="message-body">
                <pre>{JSON.stringify(this.props.response, null, 2)}</pre>
              </div>
            </article>
          )}
      </div>
    );
  }
}

export default GeocodingResults;
