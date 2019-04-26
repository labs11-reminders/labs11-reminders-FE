# WhatsApp Learning Demo

https://www.twilio.com/console/sms/whatsapp/learn


1. Set Up Your Testing Sandbox
To send messages with WhatsApp in production, you have to wait for WhatsApp to formally approve your account. But, that doesn't mean you have to wait to start building. Twilio Sandbox for WhatsApp lets you test your app in a developer environment.

To begin testing, connect to your sandbox by sending a WhatsApp message from your device to process.env.REACT_APP_TWILIO_PHONE_NUMBER with code join process.env.REACT_APP_TWILIO_CODE

## Node.js Request
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Your next class is coming up on Friday May 3 at 5 PM', 
         from: `whatsapp:+${process.env.TWILIO_PHONE_NUMBER}`,       
         to: `whatsapp:+${process.env.DEVELOPER_PHONE_NUMBER}` 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

## Curl Request
curl `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json` -X POST \
--data-urlencode `To=whatsapp:+${process.env.DEVELOPER_PHONE_NUMBER}` \
--data-urlencode `From=whatsapp:+${process.env.TWILIO_PHONE_NUMBER}` \
--data-urlencode 'Body=Your next class is coming up on Friday May 3 at 5 PM' \
-u process.env.REACT_APP_TWILIO_ACCOUNT_SID

## Response
201 - CREATED - The request was successful. We created a new resource and the response body contains the representation.
{
    "sid": `${process.env.REACT_APP_TWILIO_SID}`,
    "date_created": "Fri, 26 Apr 2019 02:31:36 +0000",
    "date_updated": "Fri, 26 Apr 2019 02:31:36 +0000",
    "date_sent": null,
    "account_sid": `${process.env.REACT_APP_TWILIO_ACCOUNT_SID}`,
    "to": `whatsapp:+process.env.DEVELOPER_PHONE_NUMBER`,
    "from": `whatsapp:+${process.env.TWILIO_PHONE_NUMBER}`,
    "messaging_service_sid": null,
    "body": "Your next class is coming up on Friday May 3 at 5 PM",
    "status": "queued",
    "num_segments": "1",
    "num_media": "0",
    "direction": "outbound-api",
    "api_version": "2010-04-01",
    "price": null,
    "price_unit": null,
    "error_code": null,
    "error_message": null,
    "uri": `/2010-04-01/Accounts/${REACT_APP_TWILIO_ACCOUNT_SID}/Messages/SM6f4211d479334da2bc904ecafb460a83.json`,
    "subresource_uris": {
        "media": `/2010-04-01/Accounts/${REACT_APP_TWILIO_ACCOUNT_SID}/Messages/${REACT_APP_TWILIO_SID}/Media.json`
    }
}

3. Two-Way Messaging
Now that you've used a template to send a one-way WhatsApp message, let's learn about Two-Way Messaging.

In real-world scenarios, when a user replies to your outbound WhatsApp message, or sends you a direct message, a 24-hour, two-way conversation window is created. You can freely converse with the customer during that time, without the use of templates.

To test this, simply reply to the WhatsApp notification you just received on your device to start a 24-hour conversation window.