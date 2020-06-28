class Player {
	constructor(game) {
		this.game = game;
		
		this.x = this.game.width / 2;
		this.y = this.game.height / 2;
		this.r = 3;
		this.color = "#fff";
		
		this.player = {
			x: this.x,
			y: this.y,
			r: this.r,
			color: this.color,
			s: new this.game.Vector(
				{x: this.x, y: this.y},
				0,
				0
			)
		};
		this.game.ball.balls.push(this.player);
		
		this.stat = {
			speed: 3
		};
	}
	
	update() {
		
	}
	
	draw() {
		
	}
}