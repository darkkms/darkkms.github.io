class Ball {
	constructor(game) {
		this.game = game;
		
		this.length = 20;
		this.balls = [];
		
		this.createBallsArr();
	}
	
	update() {
		this.balls.forEach(ball => {
			if (ball.x >= this.game.width - ball.r || ball.x <= ball.r) ball.s.a = ball.s.a + (((Math.PI / -2) - ball.s.a) * 2);
			if (ball.y >= this.game.height - ball.r || ball.y <= ball.r) ball.s.a = ball.s.a + ((Math.PI - ball.s.a) * 2);
			
			this.balls.forEach(b => {
				this.checkHit(ball, b);
			});
			
			ball.x += Math.cos(ball.s.a) * ball.s.l;
			ball.y += Math.sin(ball.s.a) * ball.s.l;
		});
	}
	
	draw() {
		this.balls.forEach(ball => {
			this.game.ctx.beginPath();
			this.game.ctx.fillStyle = ball.color;
			this.game.ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
			this.game.ctx.fill();
		});
	}
	
	createBallsArr() {
		for (let i = 0; i < this.length; i++) {
			let x = Math.floor(Math.random() * this.game.width);
			let y = Math.floor(Math.random() * this.game.height);
			
			this.balls.push({
				s: new this.game.Vector(
					{x: x, y: y},
					Math.floor(Math.random() * 2 * Math.PI),
					Math.floor(Math.random() * 5 + 1)
				),
				x: x,
				y: y,
				r: Math.floor(Math.random() * 10 + 3),
				color: "rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ")"
			});
		}
	}
	
	checkHit(a, b) {
		if (Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)) <= (a.r + b.r)) {
			a.s.a = a.s.a + ((b.s.a - a.s.a) * 2);
		}
	}
}