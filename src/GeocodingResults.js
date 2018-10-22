import React, { Component } from 'react';

class GeocodingResults extends Component {
  render() {
    return (
      <div>
        <div className="tabs is-boxed">
          <ul>
            <li className="is-active">
              <a>
                <span className="icon is-small">
                  <i className="fas fa-list-ul" aria-hidden="true" />
                </span>
                <span>Results</span>
              </a>
            </li>
            <li>
              <a>
                <span className="icon is-small">
                  <i className="fas fa-globe-americas" aria-hidden="true" />
                </span>
                <span>Map</span>
              </a>
            </li>
            <li>
              <a>
                <span className="icon is-small">
                  <i className="fab fa-js" aria-hidden="true" />
                </span>
                <span>JSON Result</span>
              </a>
            </li>
          </ul>
        </div>
        <article className="message">
          <div className="message-body">
            <ol>
              {this.props.results.map((result, index) => {
                return (
                  <li key={index}>
                    {result.annotations.flag} {result.formatted}
                    <br />
                    {result.geometry.lat} {result.geometry.lng}
                  </li>
                );
              })}
            </ol>
          </div>
        </article>
      </div>
    );
  }
}

export default GeocodingResults;
