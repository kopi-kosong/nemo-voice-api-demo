# nexmo Voice API practice 
My playground of coding and demo. 

This is a simple IVR. The IVR firstly announce current system date & time. 

Then, a recording audio file will be played. This is NOT TTS, but a mp3 file.

Option 1 will transfer your call to a number, which you need to configure a mobile or a landline number.

# Run the App Locally

## Prerequisites
* You have registered an Nexmo Account. If not, please kindly go to https://dashboard.nexmo.com/ to register an account.
* Rent a number from Nexmo. A Swedish mobile number is good to be used for Singapore mobile number.
* Download the source from git.

## Prerequisites
Run the following command to install dependencies.

```bash
npm install
```

## Configuring the application

Hard code the following values in ivr.js.

const origin_phone_number = 'YOUR Nexmo Vitural Number';
const sales_office_number = 'the mobile you use';  -- you need to have 2 test numbers, 1 is used to dial the virtual number; the other one will be used as sales office number. 
const base_url = 'your application's URL ';  -- This URL needs have access via internet, you may want to use a proxy like Ngrok to use a tunnel to expose your application to internet.

## Use ngrok 
ngrok provides introspectable tunnels to localhost, so that your webhook can be access through Internet. 

## Link Your Virtual Number with a Voice Application
* Create a voice test application. Please kindly go to https://dashboard.nexmo.com/ to create the application.
* Link your virtual number to this app.

## Configure webhook URL at Your voice application

* Configure the Event URL: "https://'your public domain'/webhooks/events" 
* Configure the Answer URL: "https://'your public domain'/webhooks/answer" 
* Configure the Fallback answer URL: "https://'your public domain'/webhooks/answer" 
  
## Running the application
```
 node ivr.js
```

## Test the Application

1. Dial your virutal number.

2. you should be able to hear current date and time, followed by a menu with 3 options.

3. choose 1, then your call will be transfered to your 2nd mobile, which you used to simulate as sales officer number.
