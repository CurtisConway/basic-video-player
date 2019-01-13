import BasicVideo from 'basic-video/src/basic-video.js';
import './icons.js';

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

document.addEventListener('DOMContentLoaded', function () {
    const mediaElement = document.getElementById('player');
    const basicVideo = new BasicVideo(mediaElement, {
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
        // hlsManifestUrl: 'https://d292x7cpdimrbp.cloudfront.net/video/video.m3u8'
    });
    const videoProgress = document.getElementById('bv__progress');
    const playbackRateSelector = document.getElementById('bv__rate');
    const playbackSourceSelector = document.getElementById('bv__sources');
    const currentTimeDisplay = document.getElementById('bv__currentTime');
    const durationDisplay = document.getElementById('bv__duration');

    document.body.addEventListener('click', event => {
        const elementClicked = event.target;

        if(elementClicked.matches('#bv__play__pause')){
            if(basicVideo.isPlaying){
                basicVideo.pause();
                elementClicked.classList.remove('bv__playing');
            }
            else {
                basicVideo.play();
                elementClicked.classList.add('bv__playing');
            }
        }
        if(elementClicked.matches('#bv__pause')){
            basicVideo.pause();
        }
        if(elementClicked.matches('#bv__forward')){
            basicVideo.currentTime += 10;
        }
        if(elementClicked.matches('#bv__backward')){
            basicVideo.currentTime -= 10;
        }
    });

    basicVideo.MediaElement.controls = false;

    basicVideo.MediaElement.addEventListener('timeupdate', event => {
        videoProgress.setAttribute('value', basicVideo.currentProgress * 100);
        currentTimeDisplay.innerHTML = Math.floor(basicVideo.currentTime);
        durationDisplay.innerHTML = basicVideo.totalDuration;
    });

    playbackRateSelector.addEventListener('change', event => {
        basicVideo.playbackRate = event.target.value;
    });

    basicVideo.MediaElement.addEventListener('init', event => {

        setTimeout(() => {
            document.querySelector('.bv__container').classList.remove('bv__loading');
        }, 200);

        basicVideo.playbackQualities.forEach(source => {
            let option = document.createElement('option');
            option.setAttribute('value', source.src);
            option.innerHTML = source.label;

            let currentQuality = basicVideo.currentPlaybackQuality === -1 ?
                basicVideo.HLSInstance.startLevel :
                basicVideo.currentPlaybackQuality;

            if(source.src === currentQuality){
                option.setAttribute('selected', 'selected');
            }

            playbackSourceSelector.appendChild(option);
        });

        playbackSourceSelector.addEventListener('change', event => {
            basicVideo.currentPlaybackQuality = event.target.value;
        });
    });
});