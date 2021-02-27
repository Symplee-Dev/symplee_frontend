import * as Comlink from 'comlink';

import * as appUtilities from '@symplee-dev/app-utilities';

/* eslint-disable import/no-webpack-loader-syntax */
import Worker from 'worker-loader!./worker.ts';

const worker = new Worker();

export default Comlink.wrap<typeof appUtilities>(worker);
