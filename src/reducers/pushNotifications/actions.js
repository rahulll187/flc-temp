export const SET_DEVICE_TOKEN = 'SET_DEVICE_TOKEN';


export const setDeviceToken = data => ({
  type: SET_DEVICE_TOKEN,
  payload: data
});


export const SET_CURRENT_NOTIFICATION = 'SET_CURRENT_NOTIFICATION';
export const setCurrentNotification = (incidentId , foreground , userInteraction,notificationId) => ({
  type: SET_CURRENT_NOTIFICATION,
  payload: {
    incidentId,
    foreground,
    userInteraction,
    notificationId
  }
});


export const RESET_CURRENT_NOTIFICATION = 'RESET_CURRENT_NOTIFICATION';
export const resetCurrentNotification = data => ({
  type: RESET_CURRENT_NOTIFICATION,
  payload: data
});
