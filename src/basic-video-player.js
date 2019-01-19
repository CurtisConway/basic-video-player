import BasicVideo from 'basic-video/src/basic-video.js';
import Screenfull from 'screenfull';
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

    const playPauseButton = document.getElementById('bv__play__pause');
    const videoProgress = document.getElementById('bv__progress');
    const videoTimeRail = document.querySelector('.bv__progress__column');
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
    const videoContainerElement = document.querySelector('.bv__container');
    const hoverTimeElement = document.getElementById('bv__hover__time');
    let progressInterval;

    document.addEventListener('click', event => {
        const elementClicked = event.target;

        if(elementClicked.matches('#bv__play__pause')){
            if(basicVideo.isPlaying){
                basicVideo.pause();
            }
            else {
                basicVideo.play();
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

            if(settingsDrawer.classList.contains('bv__hidden')){
                fadeInRight(settingsDrawer);
            }
            else {
                fadeOutRight(settingsDrawer);
            }
        }

        if(elementClicked.matches('#bv__fullscreen')){
            console.log(Screenfull.enabled);
            if(Screenfull.enabled){
                Screenfull.toggle(videoContainerElement);
            }
        }
        // else {
        //     settingsDrawer.classList.add('bv__hidden');
        // }
    });

    basicVideo.MediaElement.controls = false;

    basicVideo.MediaElement.addEventListener('timeupdate', event => {
        videoProgress.setAttribute('value', basicVideo.currentProgress * 100);

        currentTimeDisplay.innerHTML = parseTime(Math.floor(basicVideo.currentTime));
        durationDisplay.innerHTML = parseTime(basicVideo.totalDuration);
    });

    function setProgressInterval(){
        progressInterval = setInterval(() => {
            if(basicVideo.isPlaying){
                videoProgressRail.style.transform = 'scaleX(' + basicVideo.currentProgress + ')';
            }
        }, 100);
    }

    setProgressInterval();

    let mouseDown = false;
    // Video Time Rail Mouse Down
    ['dragstart', 'dragend'].forEach(eventName => {
        videoTimeRail.addEventListener(eventName, event => {
            event.preventDefault();
            return false;
        });
    });

    ['mousedown', 'touchstart'].forEach(eventName => {
        videoTimeRail.addEventListener(eventName, event => {
            basicVideo.pause();
            clearInterval(progressInterval);

            videoTimeRail.classList.add('active');

            ['mousemove', 'touchmove'].forEach(eventName => {
                document.addEventListener(eventName, timeRailMouseMoveEventListener)
            });

            ['mouseup', 'touchend'].forEach(eventName => {
                document.addEventListener(eventName, timeRailMouseUpEventListener);
            });
        });
    });

    document.addEventListener('mousemove', event => {
        const mouseOffsetPercentage = getTimeRailMouseEventOffsetPercentage(event) / 100;
        const durationAtHoverPercentage = basicVideo.totalDuration * mouseOffsetPercentage;
        const timeRailWidth = videoTimeRail.clientWidth;
        let pixelAmountToMoveTo = timeRailWidth * mouseOffsetPercentage;

        if(pixelAmountToMoveTo < 30){
            pixelAmountToMoveTo = 30;
        }
        else if(pixelAmountToMoveTo > (timeRailWidth - 30)){
            pixelAmountToMoveTo = timeRailWidth - 30;
        }

        hoverTimeElement.innerHTML = parseTime(durationAtHoverPercentage);
        hoverTimeElement.style.transform = 'translateX(' + pixelAmountToMoveTo + 'px)';
    });

    basicVideo.MediaElement.addEventListener('play', event => {
        playPauseButton.classList.add('bv__playing');
        playPauseButton.setAttribute('title', 'Pause');
    });

    basicVideo.MediaElement.addEventListener('pause', event => {
        playPauseButton.classList.remove('bv__playing');
        playPauseButton.setAttribute('title', 'Play');
    });

    // Video Time Rail Mouse Up
    function timeRailMouseUpEventListener(event) {
        const mouseOffsetPercentage = getTimeRailMouseEventOffsetPercentage(event) / 100;

        basicVideo.currentTime = Math.floor(basicVideo.totalDuration * mouseOffsetPercentage);
        basicVideo.play();
        setProgressInterval();

        videoTimeRail.classList.remove('active');

        ['mousemove', 'touchmove'].forEach(eventName => {
            document.removeEventListener(eventName, timeRailMouseMoveEventListener)
        });

        ['mouseup', 'touchend'].forEach(eventName => {
            document.removeEventListener(eventName, timeRailMouseUpEventListener);
        });
    }

    function timeRailMouseMoveEventListener(event){
        const mouseOffsetPercentage = getTimeRailMouseEventOffsetPercentage(event) / 100;

        videoProgressRail.style.transform = 'scaleX(' + mouseOffsetPercentage + ')';
    }

    function getTimeRailMouseEventOffsetPercentage(event){
        const mouseX = event.clientX || (event.touches[0] ? event.touches[0].clientX : event.changedTouches[0].clientX);


        function getPosition(el) {
            const positions = {
                x: 0,
                y: 0
            };

            while (el) {
                if (el.tagName === "BODY") {
                    // deal with browser quirks with body/window/document and page scroll
                    let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                    let yScroll = el.scrollTop || document.documentElement.scrollTop;

                    positions['x'] += (el.offsetLeft - xScroll + el.clientLeft);
                    positions['y'] += (el.offsetTop - yScroll + el.clientTop);
                } else {
                    // for all other non-BODY elements
                    positions['x'] += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                    positions['y'] += (el.offsetTop - el.scrollTop + el.clientTop);
                }

                el = el.offsetParent;
            }
            return positions;
        }

        return ((mouseX - getPosition(videoTimeRail).x) /  videoTimeRail.clientWidth * 100);
    }

    setInterval(() => {
        if(basicVideo.buffered.length){
            videoBufferedRail.style.transform = 'scaleX(' + (basicVideo.buffered.end(0) / 100) + ')';
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
            durationDisplay.innerHTML = parseTime(basicVideo.totalDuration);
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

function fadeInRight(element){
    element.classList.add('bv__animated', 'fadeInRight');
    element.classList.remove('bv__hidden');

    setTimeout(() => {
        element.classList.remove('bv__animated', 'fadeInRight');
    }, 400);
}

function fadeOutRight(element){
    element.classList.add('bv__animated', 'fadeOutRight');

    setTimeout(() => {
        element.classList.add('bv__hidden');
        element.classList.remove('bv__animated', 'fadeOutRight');
    }, 400);
}

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