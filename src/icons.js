import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { faCompress } from '@fortawesome/free-solid-svg-icons/faCompress';
import { faExpand } from '@fortawesome/free-solid-svg-icons/faExpand';
import { faVolumeDown } from '@fortawesome/free-solid-svg-icons/faVolumeDown';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons/faVolumeMute';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

export default (function(){
    library.add(faPlay, faPause, faRedo, faCompress, faExpand, faVolumeDown, faVolumeUp, faVolumeMute, faCog, faSpinner);

    dom.watch();
})();
