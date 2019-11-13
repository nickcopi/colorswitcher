class Game{
	static SIZE = 500;
	canvas;
	ctx;
	grid;
	interval;
	constructor(){
		this.initGrid();
		this.initCanvas();
		this.initInterval();
		this.initClick();

	}
	initClick(){
		this.canvas.addEventListener('click',this.handleClick.bind(this));
	}
	initInterval(){
		this.interval = setInterval(()=>{
			this.render();
		},1000/60);

	}
	initGrid(){
		this.grid = new Array();
		for(let i = 0; i < Game.SIZE/Square.SIZE;i++){
			this.grid.push(new Array());
			for(let j = 0; j < Game.SIZE/Square.SIZE;j++){
				this.grid[i][j] = new Square(i,j);
			}
		}
	}
	initCanvas(){
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = Game.SIZE;
		this.canvas.height = Game.SIZE;
		this.canvas.style.cursor = 'pointer';
	}
	handleClick(e){
		let x = e.offsetX;
		let y = e.offsetY;
		x = Math.floor(x/Square.SIZE);
		y = Math.floor(y/Square.SIZE);
		//this.grid[x][y].toggleSet();
		this.doGridClick(x,y);
		
	}
	doGridClick(x,y){
		if(x-1 >= 0) this.grid[x-1][y].toggleSet();
		if(y-1 >= 0) this.grid[x][y-1].toggleSet();
		if(x+1 < this.grid.length) this.grid[x+1][y].toggleSet();
		if(y+1 < this.grid.length) this.grid[x][y+1].toggleSet();
		this.grid[x][y].toggleSet();
		this.checkWin();
	}
	checkWin(){
		if(this.isWinState()){
			alert('wow!');
		}
	}
	isWinState(){
		let allSet = true;
		let allUnset = true;
		this.grid.forEach(col=>{
			col.forEach(square=>{
				if(square.set) allUnset = false;
				if(!square.set) allSet = false;
			});

		});
		return allSet || allUnset;

	}
	update(){

	}
	render(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.grid.forEach(col=>{
			col.forEach(square=>{
				square.render(this.ctx);
			});

		});

	}
}

class Square{
	static SIZE = 100;
	static SET_COLOR = 'red';
	static UNSET_COLOR = 'blue';
	set;
	x;
	y;
	constructor(x,y){
		this.x = x*Square.SIZE;
		this.y = y*Square.SIZE;
		this.set = Math.random() > 0.33?false:true;
	}
	render(ctx){
		ctx.fillStyle = this.set?Square.SET_COLOR:Square.UNSET_COLOR;
		ctx.fillRect(this.x,this.y,Square.SIZE,Square.SIZE);
	}
	toggleSet(){
		this.set = !this.set;
	}
}

window.addEventListener('load',()=>{
	game = new Game();
});
let game;
