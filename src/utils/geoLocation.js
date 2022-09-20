import React from 'react';

export default function geolocation() {
  return new Promise((resolve, reject) => {
    try {
      Geolocation.getCurrentPosition((position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        {console.log('latitude',latitude);}
        resolve(location);
      }, (error) => {
        reject(error);
      });
    } catch (err) {
      reject(err);
    }
  })
  .then((location) => {
    return location;
  })
  .catch(() => {
    return {
      latitude: -1,
      longitude: -1
    };
  });

}
