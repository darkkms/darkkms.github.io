class Game {
	constructor(config) {
		this.config = config;
		this.fps = 1000/30;
		this.Vector = null;
		this.fullScreen();
	}
	
	init() {
		this.createCanvas();
		this.createVector();
		this.createCallback();
		this.createListener();
		this.loop();
	}
	
	fullScreen() {
		let e = "fullscreenchange";
		
		if (this.config.el.requestFullscreen) this.config.el.requestFullscreen();
		else if (this.config.el.mozRequestFullscreen) {
			this.config.el.mozRequestFullscreen();
			e = "mozfullscreenchange";
		}
		else if (this.config.el.webkitRequestFullscreen) {
			this.config.el.webkitRequestFullscreen();
			e = "webkitfullscreenchange";
		}
		else if (this.config.el.msRequestFullscreen) {
			this.config.el.msRequestFullscreen();
			e = "msfullscreenchange";
		}
		else alert('Your browser not support fullscreen mode');
		
		screen.orientation.lock("landscape-primary")
			.then(() => {
				document.getElementById('menu').style.display = "none";
				setTimeout(() => this.init(), 300);
			})
			.catch(err => alert(err));
	}
	
	createCanvas() {
		this.width = innerWidth;
		this.height = innerHeight;
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.background = this.config.bg;
		this.config.el.innerHTML = "";
		this.config.el.appendChild(this.canvas);
	}
	
	createCallback() {
		this.ball = new Ball(this);
		this.player = new Player(this);
		this.joy = new Joystick(this);
	}
	
	loop() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.update();
		this.draw();
		setTimeout(() => this.loop(), this.fps);
	}
	
	update() {
		this.joy.update();
		this.ball.update();
		this.player.update();
	}
	
	draw() {
		this.ball.draw();
		this.player.draw();
		this.joy.draw();
	}
	
	createListener() {
		window.addEventListener('resize', () => {
			this.width = innerWidth;
			this.height = innerHeight;
			this.canvas.width = this.width;
			this.canvas.height = this.height;
		});
	}
	
	createVector() {
		this.Vector = function(root, angle, length) {
			return {
				r: root,
				a: angle,
				l: length
			};
		}
	}
}