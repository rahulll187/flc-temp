import Moment from 'moment';

export default value => {
  if (!value) {
    return null;
  }

  const moment = Moment(value.replace(/'/g, ''), 'DD-MM-YYYY hh:mm:ss');
  if (!moment.isValid) {
    return null;
  }

  return moment.toDate();
};
