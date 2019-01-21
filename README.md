# basic-video-player
A custom HTML5 Video Player extending the [basic-video](https://github.com/CurtisConway/basic-video) API with rich, accessible controls.

https://curtisconway.github.io/basic-video-player/

```html
<div id="player"></div>
```

```javascript
import BasicVideoPlayer from './basic-video-player';

const videoContainer = document.getElementById('player');
const basicVideoPlayer = new BasicVideoPlayer({
    element: videoContainer,
    id: 'BasicVideoPlayer',
    BasicVideoOptions: {
        poster: 'https://d292x7cpdimrbp.cloudfront.net/video/poster.jpg',
        sources: [
            {
                src: 'https://d292x7cpdimrbp.cloudfront.net/video/1080.mp4',
                type: 'video/mp4',
                label: '1080'
            },
            {
                src: 'https://d292x7cpdimrbp.cloudfront.net/video/720.mp4',
                type: 'video/mp4',
                label: '720'
            },
            {
                src: 'https://d292x7cpdimrbp.cloudfront.net/video/480.mp4',
                type: 'video/mp4',
                label: '480'
            },
        ],
        hlsManifestUrl: 'https://d292x7cpdimrbp.cloudfront.net/video/video.m3u8'
    }
});
```
