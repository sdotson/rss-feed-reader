import React from 'react';
import axios from 'axios';

import SuccessBox from './SuccessBox';
import ErrorBox from './ErrorBox';

export default class RssForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const previous = JSON.parse(localStorage.getItem('cache'));

    if (previous) {
      previous.cached = true;
    }

    const defaults = {
      rssUrl: null,
      articles: [],
      title: null,
      link: null,
      status: 'neutral',
      message: null,
      cached: false
    };

    this.state = Object.assign({}, defaults, previous);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.rssUrl) {
      this.setState({
        status: 'error',
        message: 'The RSS feed URL must not be blank.'
      });
      localStorage.removeItem('cache');
    } else {
      axios.post('/api/v1/rss', {
        url: this.state.rssUrl
      }).then(({ data }) => {
        this.setState({
          title: data.title,
          articles: data.articles,
          link: data.link,
          status: 'success',
          message: null
        });
        localStorage.setItem('cache', JSON.stringify(data));
      }).catch((error) => {
        localStorage.removeItem('cache');
        if (error.response) {
          this.setState({
            status: 'error',
            cached: false,
            message: error.response.data.message
          });
        } else {
          this.setState({
            status: 'error',
            cached: false,
            message: error.message
          });
        }
      });
    }

  }

  handleChange(event) {
    this.setState({ rssUrl: event.target.value });
  }

  renderResults() {
    const { status, title, link, articles, message } = this.state;
    if (status === 'neutral') {
      return <p>Enter a valid RSS url to retrieve some results.</p>;
    } else if (status === 'success') {
      return (
        <SuccessBox
          title={title}
          link={link}
          articles={articles}
        />
      );
    } else if (status === 'error') {
      return <ErrorBox message={ message } />
    }
  }

  clearData() {
    localStorage.clear();
    this.setState({
      status: 'neutral',
      cached: false,
      title: null,
      link: null,
      articles: []
    })
  }

  renderCacheMessage() {
    if (this.state.cached) {
      return (
        <p>
          Welcome back! Your last query survived the browser refresh and is lurking below for your convenience. (<a href="#" onClick={this.clearData}>Whoa, I do not want this. Please delete this data.</a>)
        </p>
      );
    }
  }

  render() {
    return (
      <div>
      	<form onSubmit={this.handleSubmit} onChange={this.handleChange}>
      		<div>
      			<span>Feed URL:</span>
      			<input type="text" style={styles.input} />
      			<input type="submit" style={styles.button} value="fetch my feed!" />
      		</div>
      	</form>
        { this.renderCacheMessage() }
        <div id="feed_display">
          { this.renderResults() }
      	</div>
      </div>
    );
  }
}

const styles = {
  input: {
    backgroundColor: '#ddd',
    padding: '5px 10px'
  },
  button: {
    padding: '5px 10px',
    border: '2px solid #ddd'
  }
}
