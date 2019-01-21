import BasicVideoPlayer from './basic-video-player';

// if (typeof Object.assign != 'function') {
//     // Must be writable: true, enumerable: false, configurable: true
//     Object.defineProperty(Object, "assign", {
//         value: function assign(target, varArgs) { // .length of function is 2
//             'use strict';
//             if (target == null) { // TypeError if undefined or null
//                 throw new TypeError('Cannot convert undefined or null to object');
//             }
//
//             var to = Object(target);
//
//             for (var index = 1; index < arguments.length; index++) {
//                 var nextSource = arguments[index];
//
//                 if (nextSource != null) { // Skip over if undefined or null
//                     for (var nextKey in nextSource) {
//                         // Avoid bugs when hasOwnProperty is shadowed
//                         if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
//                             to[nextKey] = nextSource[nextKey];
//                         }
//                     }
//                 }
//             }
//             return to;
//         },
//         writable: true,
//         configurable: true
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('player');
    const basicVideoPlayer = new BasicVideoPlayer({
            element: videoContainer,
            id: 'player_1',
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
});
