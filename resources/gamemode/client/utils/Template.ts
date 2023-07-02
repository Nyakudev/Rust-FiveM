import { sendNuiMessage } from '../nui';

export default class Template {
    static open() {
        SetNuiFocus(true, true);
        const name2 = 'template';
        const name = name2;
        sendNuiMessage('show-ui', { name2 });
    }

    static sendNotification(notification: string) {
        sendNuiMessage('notification', notification);
    }
}
