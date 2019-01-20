import {html} from 'lit-html';
import Utils from '../utils';

export default function Timestamps(BV){
    const BasicVideo = BV ? BV : {};
    const currentTime = Utils.parseTime(BasicVideo.currentTime ? BasicVideo.currentTime : 0);
    const totalDuration = Utils.parseTime(BasicVideo.totalDuration ? BasicVideo.totalDuration : 0);

    return html`
        <div class="bv__flex-column bv__flex-auto bv__flex-center bv__pad">
            <div class="bv__flex-row">
                <span id="bv__currentTime" class="bv__text bv__pad">${currentTime}</span>
                <span class="bv__text bv__pad">/</span>
                <span id="bv__duration" class="bv__text bv__pad">${totalDuration}</span>
            </div>
        </div>
    `;
}