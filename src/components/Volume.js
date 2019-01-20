import {html} from 'lit-html';

export default function Volume(BasicVideo = {}){
    const changeVolume = {
        handleEvent(event){
            BasicVideo.isMuted = false;
            let value = event.target.value;

            if(value <= 1){
                BasicVideo.isMuted = true;
            }

            BasicVideo.currentVolume = value / 100;
        },
        capture: true
    };
    const muteVolume = {
        handleEvent(event){
            BasicVideo.isMuted = !BasicVideo.isMuted;
        },
        capture: true
    };
    const rangeHandle = 'width:' + (BasicVideo.isMuted ? 0 : (BasicVideo.currentVolume * 100)) + '%;';
    const volumeButtonClass = BasicVideo.isMuted ? 'muted' : (BasicVideo.currentVolume < 0.3 ? 'low' : '');

    return html`
        <div class="bv__volume bv__flex-column bv__flex-auto">
            <div class="bv__flex-row">
                <div class="bv__flex-column bv__pad bv__flex-center">
                    <div class="bv__range">
                        <div class="bv__range__container">
                            <div class="bv__range__rail">
                                <span class="bv__range__handle" style="${rangeHandle}"></span>
                            </div>
                        </div>
                        
                        <input 
                            class="bv__volume__range" 
                            type="range" 
                            min="1" 
                            max="100" 
                            value="${BasicVideo.currentVolume}" 
                            @input="${changeVolume}">
                    </div>
                </div>
                <div class="bv__column bv__pad">
                    <button 
                        class="bv__button bv__volume__button ${volumeButtonClass}" 
                        @click="${muteVolume}">
                        <i class="fas fa-volume-up"></i>
                        <i class="fas fa-volume-down"></i>
                        <i class="fas fa-volume-mute"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}