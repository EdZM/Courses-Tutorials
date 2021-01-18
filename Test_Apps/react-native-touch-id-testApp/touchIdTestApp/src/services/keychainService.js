import * as Keychain from 'react-native-keychain';
import { Platform } from "react-native";

export const setCredentials = async (username, password) => {
   return new Promise((resolve, reject) => {
       // Store the credentials
       Keychain.setGenericPassword(username, password)
           .then(resp => {
               resolve(true)
           })
           .catch(err => {
               console.log("err: ", err);
               reject(err);
           });
   });
}

export const getCredentials = async () => {
   return new Promise((resolve, reject) => {
       Keychain.getGenericPassword()
           .then((credentials) => {
               if (credentials && credentials.username) {
                   // console.log('Credentials successfully loaded for user ' + credentials.username);
                   resolve(credentials);
               } else {
                   // console.log('No credentials stored');
                   resolve(null);
               }
           })
           .catch(err => {
               console.log("err: ", err);
               reject(err);
           });
   });
}