/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const axios = require("axios");
// log the user data when ever the user is created
exports.createChatEngineUser = functions.auth.user().onCreate((user) => {
    console.log("create", user);
    axios.post(
        "https://api.chatengine.io/users/",
        {
          username: user.email,
          secret: user.uid,
          email: user.email,
          first_name: user.displayName,
        },
        { headers: { "Private-Key": "55b59326-029e-4a5b-a8eb-962a069ab54f" } }
      );
   
  });
  
  exports.deleteChatEngineUser = functions.auth.user().onDelete((user) => {
    console.log("delete", user);
    axios.delete("https://api.chatengine.io/users/me/", {
        headers: {
          "Project-ID": "0d614fab-813f-42ca-840f-bb4bcc4ce20e",
          "User-Name": user.email,
          "User-Secret": user.uid,
        },
      });
  });