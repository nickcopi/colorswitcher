class Game{
	public static SIZE = 500;
	private canvas : any;
	private ctx : CanvasRenderingContext2D;
	private grid : Square[][];
	private interval : number;
	public constructor(){
		this.initGrid();
		this.initCanvas();
		this.initInterval();
		this.initClick();

	}
	private initClick() : void {
		this.canvas.addEventListener('click',this.handleClick.bind(this));
	}
	private initInterval() : void{
		this.interval = setInterval(()=>{
			this.render();
		},1000/60);

	}
	private initGrid() : void{
		this.grid = new Array();
		for(let i : number = 0; i < Game.SIZE/Square.SIZE;i++){
			this.grid.push(new Array());
			for(let j : number = 0; j < Game.SIZE/Square.SIZE;j++){
				this.grid[i][j] = new Square(i,j);
			}
		}
	}
	private initCanvas() : void{
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = Game.SIZE;
		this.canvas.height = Game.SIZE;
		this.canvas.style.cursor = 'pointer';
	}
	private handleClick(e : MouseEvent): void{
		let x : number = e.offsetX;
		let y : number = e.offsetY;
		x = Math.floor(x/Square.SIZE);
		y = Math.floor(y/Square.SIZE);
		this.doGridClick(x,y);
		
	}
	private doGridClick(x : number,y : number) : void{
		if(x-1 >= 0) this.grid[x-1][y].toggleSet();
		if(y-1 >= 0) this.grid[x][y-1].toggleSet();
		if(x+1 < this.grid.length) this.grid[x+1][y].toggleSet();
		if(y+1 < this.grid.length) this.grid[x][y+1].toggleSet();
		this.grid[x][y].toggleSet();
		this.checkWin();
	}
	private checkWin() : void{
		if(this.isWinState()){
			alert('wow!');
		}
	}
	private isWinState() : boolean{
		let allSet : boolean = true;
		let allUnset : boolean = true;
		this.grid.forEach(col=>{
			col.forEach(square=>{
				if(square.isSet()) allUnset = false;
				if(!square.isSet()) allSet = false;
			});

		});
		return allSet || allUnset;

	}
	private update() : void{

	}
	private render() : void{
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.grid.forEach(col=>{
			col.forEach(square=>{
				square.render(this.ctx);
			});

		});

	}
}

class Square{
	public static SIZE = 100;
	public static SET_COLOR = 'red';
	public static UNSET_COLOR = 'blue';
	private set : boolean;
	private x : number;
	private y : number;
	public constructor(x,y){
		this.x = x*Square.SIZE;
		this.y = y*Square.SIZE;
		this.set = Math.random() > 0.33?false:true;
	}
	public render(ctx) : void{
		ctx.fillStyle = this.set?Square.SET_COLOR:Square.UNSET_COLOR;
		ctx.fillRect(this.x,this.y,Square.SIZE,Square.SIZE);
	}
	public toggleSet(): void{
		this.set = !this.set;
	}
	public isSet() : boolean {
		return this.set;
	}
}

window.addEventListener('load',()=>{
	game = new Game();
});
let game : Game;
