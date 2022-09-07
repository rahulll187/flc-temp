import { Actions } from 'react-native-router-flux';
import { store, persistor } from '../reducers/configureStore';


const logoutAndPurge = async () => {
  await persistor.flush();
  await persistor.purge();


  store.dispatch({ type: 'USER_LOGOUT' });
   Actions.reset('Login', { title: 'Login' });
};

export default logoutAndPurge;
