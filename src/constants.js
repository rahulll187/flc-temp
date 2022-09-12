import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

// export const Fonts = {
//   light: {
//     fontFamily: Platform.OS === 'android' ? 'meraasaktiv_light' : 'Meraas Aktiv App',
//     fontWeight: Platform.OS === 'android' ? 'normal' : '300'
//   },
//   normal: {
//     fontFamily: Platform.OS === 'android' ? 'meraasaktiv_normal' : 'Meraas Aktiv App',
//     fontWeight: Platform.OS === 'android' ? 'normal' : '400'
//   },
//   bold: {
//     fontFamily: Platform.OS === 'android' ? 'meraasaktiv_bold' : 'Meraas Aktiv App',
//     fontWeight: Platform.OS === 'android' ? 'normal' : '700'
//   },
//   extrabold: {
//     fontFamily: Platform.OS === 'android' ? 'meraasaktiv_extrabold' : 'Meraas Aktiv App',
//     fontWeight: Platform.OS === 'android' ? 'normal' : '800'
//   }
// };

export const COLOR = {
  ACTIVE_COLOR: '#fa952f',
  DEFAULT_COLOR: '#eee',
  DISABLE_COLOR: '#aaa',
  FONT_COLOR: '#999',
  UNDERLAY_COLOR: 'rgba(249, 246, 241, 0.31)'
};

export const SVG = {
  STAR: 'M 0.000 10.000 L 11.756 16.180 L 9.511 3.090 L 19.021 -6.180 L 5.878 -8.090 L 0.000 -20.000 L -5.878 -8.090 L -19.021 -6.180 L -9.511 3.090 L -11.756 16.180 L 0.000 10.000'
};

export const FontSize = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 28,
  xxl: 30
};

export const isCrashReportEnabled = true
export const appEnviroment ='UAT'
export const pushNotificationSenderId = '644028507751'
export const Colors = {
  darkGray: '#edecea',
  blue: '#6ec0e7',
  orange: "#F04E29",
  white: '#FFF',
  black: '#000',
  green : "#345b53",
  lightGray:"#949394",
  borderColor: '#6B6B6B',
  appThemeColor:'#E46F3E', //Active8
  //appThemeColor:'#BE1F26' // FLCTheme
};

// FLC
// export const applicationName = 'FieldForce'
// export const APP_URL = 'http://flcuat.arowanaconsulting.com/FLCAPI/api/'
// export const SENTRY_URL = 'https://47d446e5b77f425db9c959327b1483b2@sentry.io/1370096'

// PRODUCTION URL FLC
export const applicationName = 'FieldForce'
export const APP_URL = 'https://flcapi.azurewebsites.net/api/'
export const SENTRY_URL = 'https://47d446e5b77f425db9c959327b1483b2@sentry.io/1370096'


// ACTIVATE8
// export const applicationName = 'Active8'
// export const APP_URL = 'http://flcuat.arowanaconsulting.com/ACTIVEAPI/api/'
// export const SENTRY_URL = 'https://36a6f39cbf6f426b9ad1757f3b2f42a9@sentry.io/1370524'


// PRODUCTION URL ACTIVATE8
// export const applicationName = 'Active8'
// export const APP_URL = 'https://activeapiprd.azurewebsites.net/api/'
// export const SENTRY_URL = 'https://36a6f39cbf6f426b9ad1757f3b2f42a9@sentry.io/1370524'



export const deviceDetails = {
  appName: applicationName,
  appVersion: DeviceInfo.getVersion(),
  deviceId: DeviceInfo.getUniqueId(),
  pnToken: 'GoogleID',
  device: DeviceInfo.getModel(),
  platform: Platform.OS === 'android' ? 'Android' : 'iOS',
  bundleId:  DeviceInfo.getBundleId(),
  deviceUDID: DeviceInfo.getDeviceId()
};
