/* eslint-disable no-unused-vars */

import admin  from 'firebase-admin';
import accountService from "../accounts/services/index.js";
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
    await readFile(
      new URL('../../serviceAccount.json', import.meta.url)
    )
  );
console.log("HERE");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://msc-mobile-dev-default-rtdb.firebaseio.com"
});


export default () => {



    const verify = async (request, response, next) => {
        try { 
            // Input
            const authHeader = request.headers.authorization;
            // Treatment
            const accessToken = authHeader.split(" ")[1];
            const user = await verifyToken(accessToken);
            //output
            next();
        }catch(err){
            //Token Verification Failed
            next(new Error(`Verification Failed ${err.message}`));
            }
        };

    const verifyUid = async (request, response, next) => {
            try { 
                // Input
                const authHeader = request.headers.authorization;
                // Treatment
                const accessToken = authHeader.split(" ")[1];
                // console.log("#### - " + accessToken);
                const user = await verifyToken(accessToken);
                //output
                next();
            }catch(err){
                //Token Verification Failed
                next(new Error(`Verification Failed ${err.message}`));
                }
            };


    const verifyToken = async (accessToken) => {
        let token;
        const response = await admin.auth().verifyIdToken(accessToken).then((decodedToken) => {
            token = decodedToken.uid;
        });
        if(response == false) {
            throw new Error('Bad Token');
        }
        else return token;
    };

    return {
        verify, 
        verifyToken,
        verifyUid
    };
};
