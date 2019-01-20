import {html} from 'lit-html';

export default function PlayPause(BasicVideo = {}){
    let isPlaying = BasicVideo.isPlaying || false;
    const playPause = {
        handleEvent(event){
            if(BasicVideo){
                BasicVideo.isPlaying ? BasicVideo.pause() : BasicVideo.play();
                isPlaying = BasicVideo.isPlaying;
            }
        },
        capture: true
    };

    return html`
        <div class="bv__flex-column bv__flex-auto bv__pad">
            <button class="bv__button bv__play__pause ${isPlaying ? 'bv__playing' : ''}" 
                    title="Play" 
                    @click="${playPause}">
                    
                <i class="fas fa-play"></i>
                
                <i class="fas fa-pause"></i>
            </button>
        </div>
    `;
}