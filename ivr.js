const app = require('express')()
const bodyParser = require('body-parser')
const origin_phone_number = '46765196116';
const sales_office_number = '6590110222';

const base_url = "https://749e1321.ngrok.io";

var path=require('path');
const express = require('express');
app.use(express.static(__dirname + '/public')); 

app.use(bodyParser.json())

//Add extra code that you create in this exercise here
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
    console.log('App listening on port', app.get('port'));
});

const onEvent =(request, response) =>{
    response.status(200).send();

}


const onInboundCall = (request, response) => {
	
	let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

var speechOutput = "<speak> Hello, welcome contacting us. Today's date is <say-as interpret-as='date' format='dmy'>" 
+ date+"/"+ month+ "/"+year+"."
+"</say-as>  Current time is <say-as interpret-as='time' format='hms24'> "
+hours+","+minutes
+ "</say-as> Singapore time.</speak>";
	
	
  const ncco = [
  
  {
      //action: 'talk',
      //text: 'Hello, welcome to Acme Systems Incorporated\'s Interactive Voice Response System. To speak with Sales press 1. For Customer Support press 2. For the press office, press 3',
	   action: 'talk',
	   text: speechOutput,
	   bargeIn: true
	   
      },
  
      {
	    "action": "stream",
        "streamUrl": ["http://749e1321.ngrok.io/ivr_menu.mp3"],	   
		 bargeIn: false
	  },
	   

	  
      {
        action: 'input',
        eventUrl: [`${base_url}/webhooks/dtmf`],
        maxDigits: 1
      }
    ]
  
    response.json(ncco)
}

const onInput = (request, response) => {
    const dtmf = request.body.dtmf
    var ncco;

    switch(dtmf){
        case "1":
            ncco = [
                {
                action: 'talk',
                text: `You have asked to speak with the Sales Department, Connecting you now.`
                },
                {
                    action: 'connect',
					"eventUrl": ["http://749e1321.ngrok.io/webhooks/events"],
                    from: origin_phone_number,
                    endpoint: 
                    [
                        {
                          "type": "phone",
                          "number": sales_office_number
                        }
                    ]

                }
            ]
            response.json(ncco)
            break;
        case "2":
            ncco = 
            [
                {
                    action: 'talk',
                    text: 'You have asked to speak with customer service, please input your 5 digit account number followed by the pound sign'
                },
                {
                    action: 'input',
                    eventUrl: [`${base_url}/webhooks/accountInput`],
                    timeOut: 10,
                    maxDigits: 6,
                    submitOnHash: true
                }
            ]
            response.json(ncco)
            break;
        case "3":
            ncco =
            [
                {
                    action: 'talk',
                    text: 'You have asked to speak with the press office. Unfortunately no one from the press office is currently available and the recording service has yet to be implemented, please try back later'
                }
            ]
            response.json(ncco)
            break;
        default:
            ncco = [
                {
                    action: 'talk',
                    text: 'I\'m sorry I didn\'t understand what you entered please try again'
                }
            ];
            response.json(ncco);
            break;
    }
}


const onAccountInput =(request, response) =>{
    const dtmf = request.body.dtmf
    const input = dtmf.split('').join(' ');
    const ncco = 
    [
        {
            action: 'talk',
            text: 'Your account number is: ' + input + ' your case has been added and is being actively triaged, you will be contacted with an update to your case in 24 hours'
        }
    ];
    response.json(ncco);
    response.status(200).send();
  }
  
  app
  .get('/webhooks/answer', onInboundCall)
  .post('/webhooks/dtmf', onInput)
  .post('/webhooks/events', onEvent)
  .post('/webhooks/accountInput', onAccountInput)

  
  
  app.get('/', (req, res) => {
   	//console.log("method: get '/' : [param] - session.user : " + req.session.user);

let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();




// prints date in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

// prints time in HH:MM format
console.log(hours + ":" + minutes);
	res.send('hello world') ;
})