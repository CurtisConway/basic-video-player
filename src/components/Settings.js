import {html} from 'lit-html';

export default function Progress(BasicVideo = {}, BVP){
    let settingsDrawer = BVP.settings;
    let settingsDrawerClassList = !settingsDrawer ? 'bv__hidden fadeOutRight' : 'fadeInRight';

    const openSettings = {
        handleEvent(event){
            BVP.settings = !BVP.settings;
            BasicVideo.MediaElement.dispatchEvent(new CustomEvent('settings'));
        },
        capture: true
    };

    const stopPropagation = {
        handleEvent(event){
            event.stopPropagation();
        },
        capture: true
    };

    return html`
        <div class="bv__flex-column bv__flex-auto bv__pad bv__relative">
            <button class="bv__settings bv__button" @click="${openSettings}">
                <i class="fas fa-cog"></i>
            </button>

            <aside 
                class="bv__settings__drawer bv__aside bv__flex-column bv__pad bv__animated ${settingsDrawerClassList}" 
                @click="${stopPropagation}">
                
                <div class="bv__rate__group bv__input__group bv__flex-row bv__flex-center">
                    <div class="bv__flex-column bv__flex-grow">
                        <label for="bv__rate" class="bv__text">Playback Rate:</label>
                    </div>
                    <div class="bv__flex-column bv__select__column">
                        <select id="bv__rate" class="bv__select">
                            <option value="0.5">0.5</option>
                            <option value="0.75">0.75</option>
                            <option value="1" selected>1</option>
                            <option value="1.25">1.25</option>
                            <option value="1.5">1.5</option>
                        </select>
                    </div>
                </div>

                <div class="bv__sources__group bv__input__group bv__flex-row bv__flex-center">
                    <div class="bv__flex-column bv__flex-grow">
                        <label for="bv__sources" class="bv__text">Quality:</label>
                    </div>
                    <div class="bv__flex-column bv__select__column">
                        <select id="bv__sources" class="bv__select"></select>
                    </div>
                </div>
            </aside>
        </div>
    `;
}