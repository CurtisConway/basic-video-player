import {html} from 'lit-html';
import Screenfull from "screenfull";

export default function Progress(element){
    const fullscreen = {
        handleEvent(event){
            if(Screenfull.enabled){
                Screenfull.toggle(element);
            }
        },
        capture: true
    };

    return html`
        <div class="bv__flex-column bv__flex-auto bv__pad">
            <button id="bv__fullscreen" class="bv__button" @click="${fullscreen}">
                <i class="fas fa-expand"></i>
            </button>
        </div>
    `;
}