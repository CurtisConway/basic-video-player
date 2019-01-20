import BasicVideo from 'basic-video/src/basic-video.js';
import Screenfull from "screenfull";
import {html, render} from 'lit-html';
import Utils from './utils';
import Rewind from './components/Rewind';
import Spacer from './components/Spacer';
import Forward from './components/Forward';
import Progress from './components/Progress';
import PlayPause from './components/PlayPause';
import Timestamps from './components/Timestamps';
import Volume from './components/Volume';
import Settings from './components/Settings';
import Fullscreen from './components/Fullscreen';

export default class BasicVideoPlayer {
    /**
     * Construct a Basic Video Player
     *
     * @param {HTMLElement|HTMLVideoElement|HTMLAudioElement} element
     * @param {string} options - The options object to be passed to the BasicVideo instance
     */
    constructor(element, options){
        this.bvContainer = element;
        this.bvContainer.classList.add('bv__loading');
        this.currentMouseX = 0;
        this.seeking = false;
        this.settings = false;

        this.renderBasicVideo(options);

        this.trackMousePosition();

        this.documentClickEvents();

        // Remove loading state
        this.basicVideo.MediaElement.addEventListener('init', () => {
            this.bvContainer.classList.remove('bv__loading');
        });

        // Listen for all player events and trigger a rerender of any relevant component
        ['play', 'pause', 'timeupdate', 'init', 'volumechange', 'settings', 'seeking'].forEach(eventName => {
            this.basicVideo.MediaElement.addEventListener(eventName, () => {
                render(this.Controls(this.basicVideo), document.querySelector('.bv__controls'));
            })
        });
    }

    /**
     * Render the video player
     *
     * @param {string} options - The options object to be passed to the BasicVideo instance
     */
    renderBasicVideo(options){
        const videoElement = () => html`
            <video id="player2" preload="auto"></video>
            <div class="bv__loading_animation">
                <div class="loader">
                    <div class="square-1"></div>
                    <div class="square-2"></div>
                    <div class="square-3"></div>
                    <div class="square-4"></div>
                </div>
            </div>
            <div class="bv__controls bv__flex-column">
                ${ this.Controls(this.basicVideo) }
            </div>
        `;

        render(videoElement(), this.bvContainer);

        this.basicVideo = new BasicVideo(document.getElementById('player2'), options);
        this.basicVideo.MediaElement.controls = false;
    }

    /**
     * Controls Component
     *
     * @param BasicVideo - The BasicVideo instance
     */
    Controls(BasicVideo){
        return html`
            <div class="bv__flex-row">
                ${ Rewind(BasicVideo) }
                ${ Spacer() }
                ${ Forward(BasicVideo) }
            </div>
            
            <div class="bv__flex-row">
                ${ Progress(BasicVideo, this) }
            </div>
            
            <div class="bv__flex-row">
                ${ PlayPause(BasicVideo) }
                ${ Timestamps(BasicVideo) }
                ${ Spacer() }
                ${ Volume(BasicVideo) }
                ${ Settings(BasicVideo, this) }
                ${ Screenfull.enabled ? Fullscreen(this.bvContainer) : null }
            </div>
        `;
    };

    /**
     * Track the mouse position when a user hovers over the player
     * useful for different functions
     */
    trackMousePosition(){
        this.bvContainer.addEventListener('mousemove', event => {
            this.currentMouseX = Utils.getTimeRailMouseEventOffsetPercentage(
                event,
                this.bvContainer
            );

            if(this.seeking){
                this.basicVideo.MediaElement.dispatchEvent(new CustomEvent('seeking'));
            }
        });
    }

    /**
     * Track any document click events
     */
    documentClickEvents(){
        document.addEventListener('click', event => {
            const element = event.target;

            if(!element.matches('.bv__settings') && !element.matches('.bv__settings__drawer')){
                this.settings = false;
                this.basicVideo.MediaElement.dispatchEvent(new CustomEvent('settings'));
            }
        });
    }
}