import { isValidNumber } from 'libphonenumber-js'

export const required = value => {
  return ( value ? undefined : 'Field is required' )
}


  function isValidNumberTemp(obj1,obj2) {
   const value = obj1 + obj2
   const status = (value && !isValidNumber(value) ? 'Invalid phone number': undefined)
   return  status
 }

 function isValidEmail(value) {
   if (value.indexOf('@') > -1 && value.indexOf('.') > -1){
     return undefined
   }
   return 'Invalid email address'
 }

export const phoneValidation = (obj1, obj2) => (status1) => {
    const value = obj1 + obj2
    const status = (value && !isValidNumber(value) ? 'Invalid phone number': undefined)
    return  status
  }


export const phoneNumber = (value) =>

  // value = countrycode + value;
  (value && !isValidNumber(value)
    ? 'Invalid phone number'
    : undefined);

export const password = value =>
  (value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(.{8,})$/.test(value)
    ? 'Passwords must contain at least 8 characters, including uppercase, lowercase letters, and numbers'
    : undefined);

    export const email = value =>
      isValidEmail(value)



// export const email = value =>
//   (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test((value || '').trim())
//     ? 'Invalid email address'
//     : undefined);


    export const phoneNumber1 = (value, code,phone) =>
      isValidNumberTemp(code , phone)


export const match = (value, tomatch) =>
  (value === tomatch
    ? undefined
    : 'Passwords mismatched');

  export const onlyNumber = value =>
  (value && !/^[0-9]*$/.test((value || '').trim())
    ? 'Incorrect formate'
    : undefined);
