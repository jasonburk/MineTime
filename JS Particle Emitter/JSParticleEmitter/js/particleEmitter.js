/** Begin Classes **/

function Emitter(canvasId, startX, startY)
{
	this.startX = startX;
	this.startY = startY;
	this.color = new Array(87, 202, 255);
	this.size = 10;
	this.gravity = .5;
	this.friction = .97;
	this.particles = new Array();
	this.maxParticles = 200;
	this.maxBlastParticles = 80;
	this.canvasContext = document.getElementById(canvasId).getContext("2d")

	this.createParticle = function()
	{
		if(this.particles.length > this.maxParticles)
		{
			this.particles[0].lifeSpan = 1;
			this.particles[0].velocityX = (Math.random() * 40) - 20;
			this.particles[0].velocityY = (Math.random() * 30) - 15;
			this.particles[0].x = this.startX;
			this.particles[0].y = this.startY;
			this.particles.push(this.particles.shift());
		}
		else
		{
			var particle = new Particle();
			particle.x = this.startX;
			particle.y = this.startY;
			particle.velocityX = (Math.random() * 40) - 20;
			particle.velocityY = (Math.random() * 30) - 15;
			
			this.particles.push(particle);
		}
	}
	
	this.step = function()
	{
		for(i = 0; i < this.particles.length; i++)
		{			
			this.particles[i].x -= this.particles[i].velocityX;
			this.particles[i].y -= this.particles[i].velocityY;
			this.particles[i].velocityX *= this.friction;
			this.particles[i].velocityY *= this.friction;
			this.particles[i].velocityY -= this.gravity;
			this.particles[i].lifeSpan -= .02;	
			
			if(this.particles[i].lifeSpan < 0) 
			{
				this.particles.splice(i, 1);
			}
		}
	}
	
	this.draw = function()
	{
		this.canvasContext.clearRect(0, 0, 800, 600);
		
		for(i = 0; i < this.particles.length; i++)
		{
			this.canvasContext.fillStyle = 'rgba('+this.color[0]+','+this.color[1]+','+this.color[2]+','+this.particles[i].lifeSpan+')'; 
			this.canvasContext.beginPath();
			this.canvasContext.arc(this.particles[i].x, this.particles[i].y, this.size*this.particles[i].lifeSpan, 0, Math.PI*2, true); 
			this.canvasContext.fill();
		}
	}
	
	
}

function Particle()
{	
	this.x = 0;
	this.y = 0;
	this.velocityY = 0;
	this.velocityX = 0;
	this.lifeSpan = 1;
}

/** Begin Base Class **/

$(document).ready(createEmitter);

var emitter;
var delay = 1000;
var maxBlastParticles = 10;

function createEmitter()
{
	emitter = new Emitter('emitter-canvas', 400, 250);
	
	$('#color-selector').ColorPicker({
		color: '#57caff',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#color-selector').css('backgroundColor', '#' + hex);
			emitter.color = [rgb.r, rgb.g, rgb.b];
		}
	});
	
	document.body.onmouseup = checkControls;
	
	fireParticle();
	setInterval('stepEmitter()', 10);
	
	checkControls();
}

function checkControls()
{	
	delay = (carpesliders[0].value == undefined) ? 1000 : carpesliders[0].value;
	maxBlastParticles = (carpesliders[1].value == undefined) ? 10 : carpesliders[1].value;
	emitter.gravity = (carpesliders[2].value == undefined) ? 1 : carpesliders[2].value * .1;
	emitter.size = (carpesliders[3].value == undefined) ? 10 : carpesliders[3].value;
}

function stepEmitter()
{
	emitter.step();
	emitter.draw();
}

function fireParticle()
{
	for(i = 0; i < maxBlastParticles; i++) { 
		emitter.createParticle(); 
	}
	setTimeout("fireParticle()", Math.random() * delay);
}