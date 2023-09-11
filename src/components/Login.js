// import { useContext,  } from "react";
// import { TeamsFxContext } from "./Context";

// import {   PublicClientApplication } from "@azure/msal-browser"
// import msal from "https://alcdn.msauth.net/browser/2.30.0/js/msal-browser.js";
// console.log("MSAL File",msal);
// const LogIn=()=>{
//     const { themeString } = useContext(TeamsFxContext);
  
// const msalConfig  = {
//     auth: {
       
//         clientId: "b2b7f414-0fed-4a45-8101-5a036e320699",
//         // Full directory URL, in the form of https://login.microsoftonline.com/<tenant-id>
//         authority: "https://login.microsoftonline.com/47165d17-0fdb-4f2a-a567-116783fae3a5",
//         // Full redirect URL, in form of http://localhost:3000
//         redirectUri: "http://localhost:3001",
//     },
//     cache: {
//         cacheLocation: "sessionStorage", // This configures where your cache will be stored
//         storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
//     },
// };
// //     system: {	
// //         loggerOptions: {	
// //             loggerCallback: (level, message, containsPii) => {	
// //                 if (containsPii) {		
// //                     return;		
// //                 }		
// //                 switch (level) {		
// //                     case msal.LogLevel.Error:		
// //                         console.error(message);		
// //                         return;		
// //                     case msal.LogLevel.Info:		
// //                         console.info(message);		
// //                         return;		
// //                     case msal.LogLevel.Verbose:		
// //                         console.debug(message);		
// //                         return;		
// //                     case msal.LogLevel.Warning:		
// //                         console.warn(message);		
// //                         return;	
                    	
// //                 }	
// //             }	
// //         }	
// //     }
// // };


// const loginRequest = {
//     scopes: ["User.Read"]
// };

// const tokenRequest = {
//     scopes: ["User.Read", "Mail.Read"],
//     forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
// };
// ////// graph
// const graphConfig = {
//     graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
//     graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages"


// };
// /////authpopup
// // Create the main myMSALObj instance
// // configuration parameters are located at authConfig.js
// const myMSALObj = new PublicClientApplication(msalConfig);

// let username = "";

// function selectAccount() {

//     /**
//      * See here for more info on account retrieval: 
//      * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
//      */

//     const currentAccounts = myMSALObj.getAllAccounts();
//     if (currentAccounts.length === 0) {
//         return;
//     } else if (currentAccounts.length > 1) {
//         // Add choose account code here
//         console.warn("Multiple accounts detected.");
//     } else if (currentAccounts.length === 1) {
//         username = currentAccounts[0].username;
        
//     }
// }

// function handleResponse(response) {

//     /**
//      * To see the full list of response object properties, visit:
//      * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
//      */
//     console.log("Response in handle",response);
//     if (response !== null) {
//         username = response.account.username;
        
//     } else {
//         selectAccount();
//     }
// }

// function signIn() {
//     console.log("We are at singin f")

//     /**
//      * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
//      * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
//      */

//     myMSALObj.loginPopup(loginRequest)
//         .then(handleResponse)
//         .catch(error => {
//             console.error(error);
//         });
// }

// function signOut() {

//     /**
//      * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
//      * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
//      */

//     const logoutRequest = {
//         account: myMSALObj.getAccountByUsername(username),
//         postLogoutRedirectUri: msalConfig.auth.redirectUri,
//         mainWindowRedirectUri: msalConfig.auth.redirectUri
//     };

//     myMSALObj.logoutPopup(logoutRequest);
// }

// function getTokenPopup(request) {

//     /**
//      * See here for more info on account retrieval: 
//      * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
//      */
//     request.account = myMSALObj.getAccountByUsername(username);
    
//     return myMSALObj.acquireTokenSilent(request)
//         .catch(error => {
//             console.warn("silent token acquisition fails. acquiring token using popup");
//             if (error instanceof msal.InteractionRequiredAuthError) {
//                 // fallback to interaction when silent call fails
//                 return myMSALObj.acquireTokenPopup(request)
//                     .then(tokenResponse => {
//                         console.log(tokenResponse);
//                         return tokenResponse;
//                     }).catch(error => {
//                         console.error(error);
//                     });
//             } else {
//                 console.warn(error);   
//             }
//     });
// }



// selectAccount();

//     return (<div><button onClick={signIn}>LogIn</button></div>)

// }
// export default LogIn