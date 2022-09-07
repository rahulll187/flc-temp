/* global fetch */
import getFormData from "./getFormData";
// import logoutAndPurge from "./logoutAndPurge";
import { APP_URL } from "../constants";

const justFetch = ({ url, data, method = "GET", token, header }) =>
  new Promise((resolve, reject) => {
    console.log("HEADERS.........", header);
    let headers = {};
    if (header) {
      if (header.contentType == 1) {
        headers = {

          uat: {
            Authorization:"4d53bce03ec34c0a911182d4c228ee6c:90KblpnKyDskDGaJYmLIzW/rbcl+OeQkl/xh8BtKdvA=:e6aae1b7c7ba4ca09fd989b53dab88cf:1537029119",
            "Content-Type": "application/json",
          },

          dev: {
            Authorization:"4d53bce03ec34c0a911182d4c228ee6c:90KblpnKyDskDGaJYmLIzW/rbcl+OeQkl/xh8BtKdvA=:e6aae1b7c7ba4ca09fd989b53dab88cf:1537029119",
            "Content-Type": "application/json",
          },
          prod: {
            Authorization:"4d53bce03ec34c0a911182d4c228ee6c:90KblpnKyDskDGaJYmLIzW/rbcl+OeQkl/xh8BtKdvA=:e6aae1b7c7ba4ca09fd989b53dab88cf:1537029119",
            "Content-Type": "application/json",
          }
        };
      } else {
        headers = {

          uat: {
            Authorization:"4d53bce03ec34c0a911182d4c228ee6c:90KblpnKyDskDGaJYmLIzW/rbcl+OeQkl/xh8BtKdvA=:e6aae1b7c7ba4ca09fd989b53dab88cf:1537029119",
            "Content-Type": "application/json",
          },

          dev: {
            Authorization:"4d53bce03ec34c0a911182d4c228ee6c:90KblpnKyDskDGaJYmLIzW/rbcl+OeQkl/xh8BtKdvA=:e6aae1b7c7ba4ca09fd989b53dab88cf:1537029119",
            "Content-Type": "application/json",
          },
          prod: {
            Authorization:"4d53bce03ec34c0a911182d4c228ee6c:90KblpnKyDskDGaJYmLIzW/rbcl+OeQkl/xh8BtKdvA=:e6aae1b7c7ba4ca09fd989b53dab88cf:1537029119",
            "Content-Type": "application/json",
          }
        };
      }
    } else {
      headers = {

        uat: {
          'Accept': 'application/json',
          Authorization:"4d53bce03ec34c0a911182d4c228ee6c:90KblpnKyDskDGaJYmLIzW/rbcl+OeQkl/xh8BtKdvA=:e6aae1b7c7ba4ca09fd989b53dab88cf:1537029119",
          "Content-Type": "application/json",
        },

        dev: {
          'Accept': 'application/json',
          Authorization:"4d53bce03ec34c0a911182d4c228ee6c:90KblpnKyDskDGaJYmLIzW/rbcl+OeQkl/xh8BtKdvA=:e6aae1b7c7ba4ca09fd989b53dab88cf:1537029119",
          "Content-Type": "application/json",
        },
        prod: {
          'Accept': 'application/json',
          Authorization:"4d53bce03ec34c0a911182d4c228ee6c:90KblpnKyDskDGaJYmLIzW/rbcl+OeQkl/xh8BtKdvA=:e6aae1b7c7ba4ca09fd989b53dab88cf:1537029119",
          "Content-Type": "application/json",
        }
      };
    }

    const baseUrl = {
      uat: APP_URL,
      dev: APP_URL,
      prod: APP_URL
    };

    if (token) {
      headers.dev["x-access-token"] = token;
    }
    console.log('BaseURL:',baseUrl.dev);
    console.log('EndPoint:',url);
    console.log('Header:',headers.dev);
    console.log('Body:',data);
    fetch(`${baseUrl.dev}${url}`, {
      method,
      headers: headers.dev,
      body: JSON.stringify(data)
    }).then(resolve, reject);

     setTimeout(reject.bind(null, {ResponseStatus:{Message:'Request Timeout'}}), 60000);
  })
    .then(res => res.json())
    .then(res => {
       if (res.ResponseStatus.Code === "SUCCESS") {
      console.log("API Response:" + JSON.stringify(res));
         return Promise.resolve(res);
      } else {
        throw res;
      }
    })
    .catch(err => {
      console.log("API Response: Error:" + JSON.stringify(err));
      // if (err.message === "invalid-token") {
      //   //logoutAndPurge();
      // } else {
        throw err;
    //  }
    });

export default justFetch;
