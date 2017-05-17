/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import RssForm from '../../components/RssForm';

const HomePage = (props) => {
  return (
    <div>
      <h1>
        Enter the URL for a valid RSS feed.
      </h1>
      <RssForm />
    </div>
  );
};

export default HomePage;
