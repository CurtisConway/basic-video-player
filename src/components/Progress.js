import {html} from 'lit-html';
import Utils from '../utils';

export default function Progress(BasicVideo = {}, BasicVideoPlayer = {}){
    const progressBarWidth = BasicVideoPlayer.seeking ?
        BasicVideoPlayer.currentMouseX / 100 :
        BasicVideo.currentProgress;
    const hoverTime = Utils.parseTime(BasicVideo.totalDuration * (BasicVideoPlayer.currentMouseX / 100));
    let translatePositionInPixels = BasicVideoPlayer.bvContainer.clientWidth * (BasicVideoPlayer.currentMouseX / 100);

    if(translatePositionInPixels < 30){
        translatePositionInPixels = 30;
    } else if(translatePositionInPixels > (BasicVideoPlayer.bvContainer.clientWidth - 50)){
        translatePositionInPixels = (BasicVideoPlayer.bvContainer.clientWidth - 50);
    }

    const mouseUp = {
        handleEvent(event){
            if(event.which === 1){
                const offset = Utils.getTimeRailMouseEventOffsetPercentage(
                    event,
                    BasicVideoPlayer.bvContainer
                ) / 100;

                BasicVideoPlayer.seeking = false;
                BasicVideo.currentTime = BasicVideo.totalDuration * offset;
                BasicVideo.play();
            }
        },
        capture: true
    };

    const mouseDown = {
        handleEvent(event){
            if(event.which === 1) {
                BasicVideoPlayer.seeking = true;
                BasicVideo.pause();
            }
        },
        capture: true
    };

    const mouseMove = {
        handleEvent(event){
            BasicVideo.MediaElement.dispatchEvent(new CustomEvent('seeking'));
        },
        capture: true
    };

    const preventDefault = {
        handleEvent(event){
            event.preventDefault();
            return false;
        }
    };

    return html`
        <div class="bv__flex-column bv__progress__column bv__flex-grow ${BasicVideoPlayer.seeking ? 'active' : ''}"
             @dragstart="${preventDefault}"
             @dragend="${preventDefault}"
             @mouseup="${mouseUp}" 
             @mousedown="${mouseDown}" 
             @mousemove="${mouseMove}">
            <div class="bv__progress__bar" >
                <span class="bv__current__progress" 
                      style="transform:scaleX(${progressBarWidth});"></span>
                    
                <span class="bv__current__buffered"></span>
                
                <progress class="bv__progress" 
                          value="${(BasicVideo.currentProgress * 100) || 0}" 
                          max="100"></progress>
            </div>
            
            <div class="bv__text bv__hover__time bv__flex-center" 
                 style="transform:translateX(${translatePositionInPixels}px);">
                ${hoverTime}
            </div>
        </div>
    `;
}