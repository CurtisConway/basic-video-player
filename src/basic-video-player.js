import BasicVideo from 'basic-video/src/basic-video.js';
// import './icons.js';

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
        hlsManifestUrl: 'https://d292x7cpdimrbp.cloudfront.net/video/video.m3u8'
    });
    const videoProgress = document.getElementById('bv__progress');
    const videoProgressRail = document.getElementById('bv__current__progress');
    const videoBufferedRail = document.getElementById('bv__current__buffered');
    const playbackRateSelector = document.getElementById('bv__rate');
    const playbackSourceSelector = document.getElementById('bv__sources');
    const currentTimeDisplay = document.getElementById('bv__currentTime');
    const durationDisplay = document.getElementById('bv__duration');
    const volumeButton = document.getElementById('bv__volume__button');
    const volumeRange = document.getElementById('bv__volume__range');
    const volumeTimeRail = document.querySelector('.bv__range__handle');
    const settingsButton = document.getElementById('bv__settings');
    const settingsDrawer = document.getElementById('bv__settings__drawer');

    document.addEventListener('click', event => {
        const elementClicked = event.target;

        if(elementClicked.matches('#bv__play__pause')){
            if(basicVideo.isPlaying){
                basicVideo.pause();
                elementClicked.classList.remove('bv__playing');
                elementClicked.setAttribute('title', 'Play');
            }
            else {
                basicVideo.play();
                elementClicked.classList.add('bv__playing');
                elementClicked.setAttribute('title', 'Pause');
            }
        }
        if(elementClicked.matches('#bv__forward')){
            basicVideo.currentTime += 10;
        }
        if(elementClicked.matches('#bv__backward')){
            basicVideo.currentTime -= 10;
        }
        if(elementClicked.matches('#bv__volume__button')){
            basicVideo.isMuted = !basicVideo.isMuted;

            volumeRange.value = basicVideo.isMuted ? 0 : basicVideo.currentVolume * 100;
            volumeTimeRail.style.width = (basicVideo.isMuted ? 0 : basicVideo.currentVolume * 100) + '%';
            volumeButton.classList.toggle('muted');
        }

        if(elementClicked.matches('#bv__settings')){
            settingsDrawer.classList.toggle('bv__hidden');
        }
        // else {
        //     settingsDrawer.classList.add('bv__hidden');
        // }
    });

    basicVideo.MediaElement.controls = false;

    basicVideo.MediaElement.addEventListener('timeupdate', event => {
        videoProgress.setAttribute('value', basicVideo.currentProgress * 100);
        // videoProgressRail.style.transform = 'translateX(-' + (100 - (basicVideo.currentProgress * 100)) + '%)';
        currentTimeDisplay.innerHTML = parseTime(Math.floor(basicVideo.currentTime));
        durationDisplay.innerHTML = parseTime(basicVideo.totalDuration);
    });

    setInterval(() => {
        if(basicVideo.isPlaying){
            videoProgressRail.style.transform = 'translateX(-' + (100 - (basicVideo.currentProgress * 100)) + '%)';
        }

    }, 100);

    setInterval(() => {
        if(basicVideo.buffered.length){
            videoBufferedRail.style.transform = 'translateX(-' + (100 - basicVideo.buffered.end(0)) + '%)';
        }
    }, 250);

    playbackRateSelector.addEventListener('change', event => {
        basicVideo.playbackRate = event.target.value;
    });

    volumeRange.value = basicVideo.currentVolume * 100;
    volumeTimeRail.style.width =  basicVideo.currentVolume * 100 + '%';
    volumeRange.addEventListener('input', event => {
        if(event.target.value > 0){
            basicVideo.currentVolume = event.target.value / 100;
            basicVideo.isMuted = false;
            volumeButton.classList.remove('muted');
        }
        else {
            basicVideo.currentVolume = 0;
            basicVideo.isMuted = true;
            volumeButton.classList.add('muted');
        }

        volumeTimeRail.style.width = event.target.value + '%';

        if(basicVideo.currentVolume < 0.3 && basicVideo.currentVolume > 0){
            volumeButton.classList.add('low');
        }
        else {
            volumeButton.classList.remove('low');
        }
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

function parseTime(time){
    const _time = Number(time);
    const sections = {
        hours: Math.floor(_time / 3600),
        minutes: Math.floor(_time % 3600 / 60),
        seconds: Math.floor(_time % 3600 % 60)
    };
    let parsedTime = '';

    function padZeroes(num){
        return num > -1 && num < 10 ? ('0' + num) : num;
    }

    Object.keys(sections).forEach(section => {
        if(sections[section] > 0 || section !== 'hours'){
            if(section !== 'seconds'){
                parsedTime += padZeroes(sections[section]) + ':';
            }
            else {
                parsedTime += padZeroes(sections[section]);
            }
        }
    });

    return parsedTime;
}