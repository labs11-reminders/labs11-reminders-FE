# WhatsApp Learning Demo

https://www.twilio.com/console/sms/whatsapp/learn


1. Set Up Your Testing Sandbox
To send messages with WhatsApp in production, you have to wait for WhatsApp to formally approve your account. But, that doesn't mean you have to wait to start building. Twilio Sandbox for WhatsApp lets you test your app in a developer environment.

To begin testing, connect to your sandbox by sending a WhatsApp message from your device to <TWILIO NUMBER> with code join <wore-pine>.

## Node.js Request
const accountSid = 'AC17e701b23d40b393a419e5b360281925'; 
const authToken = 'e7ec9c3b88bc0159b920d651ef95f425'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Your next class is coming up on Friday May 3 at 5 PM', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+13472633943' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

## Curl Request
curl 'https://api.twilio.com/2010-04-01/Accounts/AC17e701b23d40b393a419e5b360281925/Messages.json' -X POST \
--data-urlencode 'To=whatsapp:+13472633943' \
--data-urlencode 'From=whatsapp:+14155238886' \
--data-urlencode 'Body=Your next class is coming up on Friday May 3 at 5 PM' \
-u AC17e701b23d40b393a419e5b360281925:e7ec9c3b88bc0159b920d651ef95f425

## Response
201 - CREATED - The request was successful. We created a new resource and the response body contains the representation.
{
    "sid": "SM6f4211d479334da2bc904ecafb460a83",
    "date_created": "Fri, 26 Apr 2019 02:31:36 +0000",
    "date_updated": "Fri, 26 Apr 2019 02:31:36 +0000",
    "date_sent": null,
    "account_sid": "AC17e701b23d40b393a419e5b360281925",
    "to": "whatsapp:+13472633943",
    "from": "whatsapp:+14155238886",
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
    "uri": "/2010-04-01/Accounts/AC17e701b23d40b393a419e5b360281925/Messages/SM6f4211d479334da2bc904ecafb460a83.json",
    "subresource_uris": {
        "media": "/2010-04-01/Accounts/AC17e701b23d40b393a419e5b360281925/Messages/SM6f4211d479334da2bc904ecafb460a83/Media.json"
    }
}

3. Two-Way Messaging
Now that you've used a template to send a one-way WhatsApp message, let's learn about Two-Way Messaging.

In real-world scenarios, when a user replies to your outbound WhatsApp message, or sends you a direct message, a 24-hour, two-way conversation window is created. You can freely converse with the customer during that time, without the use of templates.

To test this, simply reply to the WhatsApp notification you just received on your device to start a 24-hour conversation window.