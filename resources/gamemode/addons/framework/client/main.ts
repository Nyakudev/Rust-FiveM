import { SendReactMessage, Notification, playerJoining, Delay } from './function';

setImmediate(() => {
    while (true) {
      Wait(0);
      if (NetworkIsPlayerActive(PlayerId())) {
            playerJoining();
        break;
      }
    }
});