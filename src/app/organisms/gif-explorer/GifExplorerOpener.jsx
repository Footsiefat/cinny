import { logger } from 'matrix-js-sdk/lib/logger';
import React, { useEffect, useRef } from 'react';

import cons from '../../../client/state/cons';
import navigation from '../../../client/state/navigation';
import settings from '../../../client/state/settings';

import ContextMenu from '../../atoms/context-menu/ContextMenu';
import GifExplorer from './GifExplorer';

let requestCallback = null;
let isGifExplorerVisible = false;

function GifExplorerOpener() {
  const openerRef = useRef(null);
  const searchRef = useRef(null);
  function openGifExplorer(cords) {
    logger.info('Opening gif explorer');
    if (requestCallback !== null || isGifExplorerVisible) {
      requestCallback = null;
      if (cords.detail === 0) openerRef.current.click();
      return;
    }

    openerRef.current.style.transform = `translate(${cords.x}px, ${cords.y}px)`;
    openerRef.current.click();
  }

  function afterGifExplorerToggle(isVisible) {
    isGifExplorerVisible = isVisible;
    /*
    if (isVisible) {
      if (!settings.isTouchScreenDevice) searchRef.current.focus();
    } else {
      setTimeout(() => {
        if (!isGifExplorerVisible) requestCallback = null;
      }, 500);
    } */
  }

  useEffect(() => {
    navigation.on(cons.events.navigation.GIFEXPLORER_OPENED, openGifExplorer);
    return () => {
      navigation.removeListener(cons.events.navigation.GIFEXPLORER_OPENED, openGifExplorer);
    };
  }, []);

  return (
    <ContextMenu
      content={<GifExplorer searchRef={searchRef} />}
      afterToggle={afterGifExplorerToggle}
      render={(toggleMenu) => (
        <input
          ref={openerRef}
          onClick={toggleMenu}
          type="button"
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            padding: 0,
            border: 'none',
            visibility: 'hidden',
          }}
        />
      )}
    />
  );
}

export default GifExplorerOpener;
