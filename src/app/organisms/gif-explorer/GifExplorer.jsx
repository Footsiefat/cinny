/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { logger } from 'matrix-js-sdk/lib/logger';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './GifExplorer.scss';

import RawIcon from '../../atoms/system-icons/RawIcon';
import Input from '../../atoms/input/Input';

import SearchIC from '../../../../public/res/ic/outlined/search.svg';

const API_KEY = 'PLACEHOLDER_get_ur_own_its_easy';

function GifExplorer({ searchRef }) {
  const [results, setResults] = useState([]);

  const searchTenor = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${API_KEY}&client_key=Cinny&limit=5`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setResults(jsonData.results);
    } catch (error) {
      logger.error('Error fetching data:', error);
    }
  };

  function handleSearchChange(event) {
    const searchTerm = event.target.value;
    searchTenor(searchTerm);
    logger.info('Search changed');
  }

  return (
    <div id="gif-explorer" className="gif-explorer">
      {' '}
      <div className="gif-explorer__content">
        <div className="gif-explorer__content__search">
          <RawIcon size="small" src={SearchIC} />
          <Input onChange={handleSearchChange} forwardRef={searchRef} placeholder="Search" />
        </div>
        <div>
          {results.map((result) => (
            <div key={result.id}>
              <video autoPlay loop preload="auto">
                <source src={result.media_formats.loopedmp4.url} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

GifExplorer.propTypes = {
  searchRef: PropTypes.shape({}).isRequired,
};

export default GifExplorer;
