
var win1 = Ti.UI.createWindow({
    backgroundColor:'#fff',
    backgroundImage:'graphics/bg-sunrise.png',
});
win1.addEventListener('open', doTimer);

//start variables
var count=0;
var t;
var running=false;
var daylength=1200;

var sunrise=0;
var day=91;
var sunset=692;
var night=783;

var daytime;
//end variables


//start functions
//
//

function doTimer()
{
Titanium.API.info("function doTimer launched.");
if (!running)
  {
  running=true;
  timedCount();
  }
}
//

function timedCount()
{
win1.getElementById('currentSecondText').innerHTML=count;
	timeOfDay();
	if(count==daylength){
		count=0;
	} else {
		count++;
	}
t=setTimeout("timedCount()",1000);
}
//

function timeOfDay()
{
	if (count>=sunrise && count<day){
		daytime = "Sunrise";
	} else if (count>=day && count<sunset){
		daytime = "Day";
	} else if (count>=sunset && count<night){
		daytime = "Sunset";
	} else if (count>=night){
		daytime = "Night";
	}
	document.getElementById('day').innerHTML=daytime;
}
//
function resetTimer(){
	count = day;
}
//
function setTimer(){
	var timeset = document.getElementById('timepicker').value;
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
//end functions


//Curretly Text
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

//Clock icon
var clockIcon = Titanium.UI.createImageView({
	image:'graphics/clock.png',
	height:150,
	width:150,
	top:60,
})

//Wake Up counter set button
var wakeButton = Titanium.UI.createButton({
   title: '',
   backgroundImage:'graphics/bed50.png',
   width:75,
   height:75,
   top:275,
});
wakeButton.addEventListener('click',function(resetTimer)
{
   Titanium.API.info("You clicked the button");
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


//Current second count text
var currentSecondText = Ti.UI.createLabel({
  text:count,
  textAlign:'left',
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

win1.open();
win1.add(currentlyText);
win1.add(wakeButton);
win1.add(buttonBar);
win1.add(currentSecondText);
win1.add(currentlyDayText);
win1.add(clockIcon);

//win1.add(timedCount);
//win1.add(doTimer);
//win1.add(timeOfDay);
//win1.add(resetTimer);
//win1.add(setTimer);

