import {html} from 'lit-html';

export default function Rewind(BasicVideo = {}){
    const rewind = {
        handleEvent(event){
            BasicVideo.currentTime = BasicVideo.currentTime - 10;
        },
        capture: true
    };

    return html`
        <div class="bv__flex-column bv__flex-auto bv__pad">
            <button 
                class="bv__button" 
                title="Rewind 10 Seconds" 
                @click="${rewind}">
                <i class="fas fa-redo fa-flip-horizontal"></i>
            </button>
        </div>
    `;
}