import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';
import Options from './Options.js';

const MAX_ROW = 50;
const MAX_COL = 70;

class App extends Component {
	constructor(props){
    super(props);
    
		this.state = {
      tickCount: 0,
			timer: "Start",
			color: [],
			neighCount: []
    }

		this.handleTickChange = this.handleTickChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleTimerTick = this.handleTimerTick.bind(this);
  }
  
  /** Intialize the board **/
  componentDidMount(){
    let tempColor = [];
    let neighChanges = [];

    /* Intialize every cell neighbor count to 0 */
    for(let i=0; i<MAX_ROW; i++){
      let cols=[];
      for(let j=0; j<MAX_COL; j++){
        cols[j]=0;
      }
      neighChanges[i]=cols;
    }

    /* Intialize cell colors by random */
    for(let i=0; i<MAX_ROW; i++){
      let colorCols=[];

      for(let j=0; j<MAX_COL; j++){
        if(Math.random()*100 < 15){
          neighChanges = this.countMyNeigh(i,j, neighChanges, 1);
          colorCols[j]="black";
        } else colorCols[j]="white";
      }

      tempColor[i] = colorCols;
    }

    this.setState({
      color: tempColor,
      neighCount: neighChanges
    })
  }

  handleCounterChange(){
    let currTickCount = this.state.tickCount;
    this.setState({tickCount: currTickCount+1});
  }

  countMyNeigh(row, col, neighMap, num) {

    // update the above
    if(row !== MAX_ROW-1 && col !== 0) neighMap[row+1][col-1] += num;

    if(row !== MAX_ROW-1) neighMap[row+1][col] += num;
    if(row !== MAX_ROW-1 && col !== MAX_COL-1) neighMap[row+1][col+1] += num;

    // update the sides
    if(col !== MAX_COL-1) neighMap[row][col+1] += num;
    if(col !== 0) neighMap[row][col-1] +=num;

    // update the bottom
    if(row !== 0 && col !== 0) neighMap[row-1][col-1] += num;
    if(row !== 0 ) neighMap[row-1][col] += num;
    if(row !== 0 && col !== MAX_COL-1) neighMap[row-1][col+1] += num;

    return neighMap;    
  }

	handleTickChange(tick){
    let neighbors = this.state.neighCount;
    let neighChanges = [];
    let ifBoardChanged = false;
    let colorTempMap = this.state.color;

    for(let i=0; i<MAX_ROW; i++){
      let cols=[];
      for(let j=0; j<MAX_COL; j++){
        cols[j]=0;
      }
      neighChanges[i]=cols;
    }

		for(let i=0; i<MAX_ROW; i++){
      for(let j=0; j<MAX_COL; j++){
 
        // Rule 1: Any live cell with than two live neighbors dies, as if caused by under population
        // Rule 3: Any live cell with more than three live neighbors dies, as if by overpopulation
        if(this.state.neighCount[i][j] <= 1 || this.state.neighCount[i][j] >= 4){
          if(this.state.color[i][j] === "black"){
            colorTempMap[i][j]="white";
            neighChanges = this.countMyNeigh(i,j, neighChanges, -1);
            ifBoardChanged = true;
          }
        }

        // Rule 2: Any live cell with two or three neighbors lives on to the next generation
        // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction
        else if(this.state.neighCount[i][j] === 3 && this.state.color[i][j] === "white"){
          colorTempMap[i][j]="black";
          neighChanges = this.countMyNeigh(i,j, neighChanges, 1);
          ifBoardChanged = true;
        } 
      }
    }

    for(let i=0; i<MAX_ROW; i++){
      for(let j=0; j<MAX_COL; j++){
        neighbors[i][j] += neighChanges[i][j];
      }
    }

    if(ifBoardChanged){
      let currTickCount = this.state.tickCount;
      this.setState({tickCount: currTickCount+1});
    }

    this.setState({neighCount: neighbors});  
  }


  /***  Handles what happens when a cell changes color  ***/
  /* Update a cell's Color and let the surrounding neighbors know of that change */
	handleColorChange(c){		
    
    let row = c[0];
    let col = c[1];
    let num;
    let colorTempMap = this.state.color;

		if(this.state.color[row][col] === "black"){
			// I'm dieing
      colorTempMap[row][col] = "white";
      num = -1;
		} else {
			// I'm being born
      colorTempMap[row][col] = "black";
			num = 1;
    }
    
    // Update Neigbor Map
    this.setState({
      color: colorTempMap,
      neighCount: this.countMyNeigh(row,col, this.state.neighCount, num)
    });
  }

  handleTimerTick(e){
    clearInterval(this.timerID);

    if(this.state.timer === "Start"){
      this.setState({ timer: "Pause"});
      this.timerID = setInterval(() => this.handleTickChange(), 250);
    } else{
      this.setState({timer: "Start"});
    }
  }
	
	render(){
		return(
			<div id="main">
        <h1>The Game of Life</h1>
				<Board 
					color={this.state.color}
					neighCount={this.state.neighCount}
					onColorChange={this.handleColorChange}
				/>

        <Options 
					onTickChange={this.handleTickChange}
          onTimerTick={this.handleTimerTick}
          startButton={this.state.timer}
          counter={this.state.tickCount}
        />
			</div>

		);
	}
}

export default App;
