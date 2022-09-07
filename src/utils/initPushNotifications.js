import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native'
import { pushNotificationSenderId } from '../constants'

const initPushNotification = (tokenCallback, notificationCallback ) => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister(token) {
      console.log('initPushNotification......',token);
      tokenCallback(token);
    },

    onNotification(notification) {
      try{
        let incidentId;
        if (Platform.OS === 'ios') {
          incidentId = notification.data.rows[0];
          notificationId = notification.data.rows[3];
        } else if (Platform.OS === 'android') {
          incidentId = notification.data.custom.rows[0];
          notificationId = notification.data.custom.rows[3];

        }
        notificationCallback(incidentId , notification.foreground , notification.userInteraction ,notificationId);
        PushNotification.setApplicationIconBadgeNumber(0);
      }
      catch(ex){
        console.log(ex);
      }
    },
    // ANDROID ONLY: GCM Sender ID
    senderID: pushNotificationSenderId,

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
  });
};

export default initPushNotification;
