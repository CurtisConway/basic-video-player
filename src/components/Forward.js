import {html} from 'lit-html';

export default function Forward(BasicVideo = {}){
    const fastForward = {
        handleEvent(event){
            BasicVideo.currentTime = BasicVideo.currentTime + 10;
        },
        capture: true
    };

    return html`
        <div class="bv__flex-column bv__flex-auto bv__pad">
            <button 
                class="bv__button" 
                title="Fast Forward 10 Seconds" @click="${fastForward}">
                <i class="fas fa-redo"></i>
            </button>
        </div>
    `;
}