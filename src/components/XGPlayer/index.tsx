import React, { useEffect } from 'react';

import Player from 'xgplayer';

import './index.less';

interface IndexProps {
  poster: string;
  url: string;
}

const Index: React.FC<IndexProps> = ({ poster, url }) => {
  useEffect(() => {
    let player = new Player({
      id: 'mse',
      url: url,
      playsinline: true,
      // "width": 381,
      // "height": 226,
      poster: poster,
      volume: 0.6,
      // fluid: true,
      fitVideoSize: 'auto',
      'x5-video-player-fullscreen': true,
      // cssFullscreen: true
    });
    player.once('ready', () => {
      console.log('ready');
    });
    return () => {};
  }, [poster]);

  return (
    <>
      <div id="mse"></div>
    </>
  );
};

export default Index;
