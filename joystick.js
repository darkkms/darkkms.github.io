class Joystick {
	constructor(game) {
		this.game = game;
		this.width = 250;
		this.height = 250;
		this.angle = 0;
		this.r = 60;
		this.r2 = 20;
		this.x = this.width / 2 - this.r2;
		this.y = this.height / 2 + this.r2;
		this.x2 = this.x;
		this.y2 = this.y;
		this.color = "rgba(255,255,255,.1)";
		
		this.createCanvas();
		this.createListener();
	}
	
	update() {
		let h = Math.sqrt(Math.pow((this.y2 - this.y), 2) + Math.pow((this.x2 - this.x), 2));
		if (h >= this.r) {
			this.x2 = this.x + Math.cos(this.angle) * this.r;
			this.y2 = this.y + Math.sin(this.angle) * this.r;
		}
	}
	
	draw() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		this.ctx.strokeStyle = this.color;
		this.ctx.lineWidth = .5;
		this.ctx.stroke();
		
		this.ctx.beginPath();
		this.ctx.arc(this.x2, this.y2, this.r2, 0, Math.PI*2);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}
	
	createCanvas() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.style.background = "none";
		this.canvas.style.position = "fixed";
		this.canvas.style.left = "0px";
		this.canvas.style.bottom = "0px";
		this.game.config.el.appendChild(this.canvas);
	}
	
	createListener() {
		this.canvas.addEventListener('touchstart', e => {
			this.x = this.getTouchPos(e).x;
			this.y = this.getTouchPos(e).y;
			this.color = "rgba(255,255,255,.3)";
			
			if (this.x + this.r + this.r2 >= this.width) this.x = this.width - this.r - this.r2;
			if (this.x <= this.r + this.r2) this.x = this.r + this.r2;
			if (this.y + this.r + this.r2 >= this.height) this.y = this.height - this.r - this.r2;
			if (this.y <= this.r + this.r2) this.y = this.r + this.r2;
			
			this.game.player.player.s.l = this.game.player.stat.speed;
		});
		this.canvas.addEventListener('touchmove', e => {
			this.x2 = this.getTouchPos(e).x;
			this.y2 = this.getTouchPos(e).y;
			this.angle = Math.atan2((this.y2 - this.y), (this.x2 - this.x));
			this.game.player.player.s.a = this.angle;
		});
		this.canvas.addEventListener('touchend', e => {
			this.x = this.width / 2 - this.r2;
			this.y = this.height / 2 + this.r2;
			this.x2 = this.width / 2 - this.r2;
			this.y2 = this.height / 2 + this.r2;
			this.color = "rgba(255,255,255,.1)";
			
			this.game.player.player.s.l = 0;
		});
	}
	
	getTouchPos(e) {
        let rect = this.canvas.getBoundingClientRect();
        return {
        	x: e.touches[0].clientX - rect.left,
        	y: e.touches[0].clientY - rect.top
		}
    }

}