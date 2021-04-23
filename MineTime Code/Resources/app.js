
var win1 = Ti.UI.createWindow({
    backgroundColor:'#fff',
    backgroundImage:'graphics/bg-sunrise.png'
});

// To disable screen sleep
Ti.App.idleTimerDisabled = true;

//start variables
var count = 0;
var running = false;
var daylength = 1200;

var sunrise = 0;
var day = 91;
var sunset = 692;
var night = 783;

var daytime;
//end variables


//start functions
//
//
function timeOfDay()
{
	if (count >= sunrise && count < day){
		daytime = "Sunrise";
		clockIcon.image = 'graphics/clock-r.png';
		win1.backgroundImage = 'graphics/bg-sunrise.png';
	} else if (count >= day && count < sunset){
		daytime = "Day";
		clockIcon.image = 'graphics/clock-d.png';
		win1.backgroundImage = 'graphics/bg-sunrise.png';
	} else if (count >= sunset && count < night){
		daytime = "Sunset";
		clockIcon.image = 'graphics/clock-s.png';
		win1.backgroundImage = 'graphics/bg-sunrise.png';
	} else if (count >= night){
		daytime = "Night";
		clockIcon.image = 'graphics/clock-n.png';
		win1.backgroundImage = 'graphics/bg-sunrise.png';
	}
	currentlyDayText.text = daytime;
}
//

//
function timedCount()
{
	timeOfDay();
	if(count == daylength){
		count = 0
	} 
	else {
		count++;
	}
	return count;
}
//

//
function doTimer()
{
if (!running)
  {
  running=true;
  var timeInterval = setInterval(function(){ currentSecondText.text=timedCount(); },1000);
  }
}
//

//
function setTimer(){
	if (timeset == "sunrise"){
		count = sunrise;
	} else if (timeset == "day"){
		count = day;
	} else if (timeset == "sunset"){
		count = sunset;
	} else if (timeset == "night"){
		count = night;
	}
}
//
//
//end functions


//Curretly Text. Static text displaying 'Currently:'
var currentlyText = Ti.UI.createLabel({
  text: 'Currently:',
  textAlign:'left',
  font:{
  	fontSize:25,
  	fontFamily:'Minecraft'
  },
  height:'auto',
  width:'auto',
  color:'#CCCCCC',
  left:20,
  top:10,
});

//Dynamic text to show what time of day it is by calliing 'daytime' variable
var currentlyDayText = Ti.UI.createLabel({
  text:daytime,
  textAlign:'left',
  font:{
    fontSize:25,
    fontFamily:'Minecraft',
    fontWeight:'bold',
  },
  height:'auto',
  width:'auto',
  color:'#CCCCCC',
  left:185,
  top:10,
});

//Clock icon. Changed dynamically by the 'timeOfDay' function.
var clockIcon = Titanium.UI.createImageView({
	image:'graphics/clock.png',
	height:150,
	width:150,
	top:60,
})

//Bed icon that is a button. When clicked it sets the time to 'day'.
var wakeButton = Titanium.UI.createButton({
   title: '',
   backgroundImage:'graphics/bed.png',
   width:75,
   height:75,
   top:275,
});

//Event listener for wake up button. Sets time to 'day'.
wakeButton.addEventListener('click',function()
{
   count=day;
});

//Button bar to manually set the time of day
var buttonBar = Titanium.UI.createButtonBar({
    labels:['Sunrise', 'Day', 'Sunset', 'Night'],
    backgroundColor:'#336699',
    bottom:50,
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:50,
    width:300
});

//Location of static footer
var footer = Titanium.UI.createView({
   backgroundImage:'graphics/footer.png',
   width:'100%',
   height:40,
   bottom:0
});

//Event listener for button bar
buttonBar.addEventListener('click', function(e)
{
	if (e.index == 0){
		count = sunrise;
	} else if (e.index == 1){
		count = day;
	} else if (e.index == 2){
		count = sunset;
	} else if (e.index == 3){
		count = night;
	}
});

//Current second count text. Dyanmic label that changes to time of day based on 'timeOfDay' function.
var currentSecondText = Ti.UI.createLabel({
  text:count,
  textAlign:'right',
  font:{
    fontSize:14,
    fontFamily:'Minecraft',
  },
  height:'auto',
  width:'auto',
  color:'#CCCCCC',
  right:6,
  bottom:6,
});

//info button
var infoButton = Ti.UI.createButton({
	style:Titanium.UI.iPhone.SystemButton.INFO_LIGHT,
	bottom:6,
	left:6
});

//Event listener for info button to load overlay
infoButton.addEventListener('click',function()
{
	Ti.API.log('info button pressed');
	
	//Overlay view used to fill with overlay image
	var overlay = Titanium.UI.createView({ 
    	backgroundImage:'graphics/overlay.png',
   		width:'100%',
    	height:'100%',
	});
	win1.add(overlay);
		//Event listener used to detect single tap and remove the overlay view from screen. Dismiss overlay help.
		overlay.addEventListener('click',function()
		{
			win1.remove(overlay);
		});

});

//Event listener to call doTimer function. Gets the show going!
win1.addEventListener('open', doTimer);


//Background service to continue counting while app is running in background
//Titanium.App.iOS.registerBackgroundService();


//Notification for telling the user that it is day time when they have the app running in the background
//Titanium.App.iOS.scheduleLocalNotification();


//win1 adds
win1.open();
win1.add(currentlyText);
win1.add(wakeButton);
win1.add(buttonBar);
win1.add(currentlyDayText);
win1.add(clockIcon);
win1.add(footer);

//footer adds
footer.add(currentSecondText);
footer.add(infoButton);
