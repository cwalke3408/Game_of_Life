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

    for(let i=0; i<MAX_ROW; i++){
      let cols=[];
      let colorCols=[];
      for(let j=0; j<MAX_COL; j++){
        cols[j]=0;
        colorCols[j]="white";
      }
      this.state.color[i]=colorCols;
      this.state.neighCount[i]=cols;
    }
    
		this.handleTickChange = this.handleTickChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleTimerTick = this.handleTimerTick.bind(this);
	}
  
  handleCounterChange(e){
    this.setState({tickCount: this.state.tickCount++});

    console.log("Count Change -- ");
    console.log(this.state.tickCount);
  }

  countMyNeigh(row, col, neighMap, num, testFrom) {

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
    
    // console.log(testFrom+" >" + row + " " + col);
    // console.log("ROWS after neigh update NUM=> " +num);
    // for(let i=0; i<MAX_ROW; i++){
    //   console.log(neighMap[i]+ "<==>"+ this.state.neighCount[i]);
    //   // console.log(neighMap[i]);
    // }


    return neighMap;    
  }

	handleTickChange(tick){
		//console.log("---------TICK----------- ")
    let neighbors = this.state.neighCount;
    let neighChanges = [];
    let ifBoardChanged = false;

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
            let colorTempMap  = this.state.color;
            colorTempMap[i][j]="white";
            this.setState({color: colorTempMap});
            neighChanges = this.countMyNeigh(i,j, neighChanges, -1, "fromTick");
            ifBoardChanged = true;
          }
        }

        // Rule 2: Any live cell with two or three neighbors lives on to the next generation
        // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction
        else if(this.state.neighCount[i][j] === 3 && this.state.color[i][j] === "white"){
          let colorTempMap = this.state.color;
          colorTempMap[i][j]="black";
          this.setState({color: colorTempMap});
          neighChanges = this.countMyNeigh(i,j, neighChanges, 1, "fromTick");
          ifBoardChanged = true;
        } 
      }
    }

    for(let i=0; i<MAX_ROW; i++){
      for(let j=0; j<MAX_COL; j++){
        neighbors[i][j] += neighChanges[i][j];
      }
    }

    if(ifBoardChanged)
      this.setState({tickCount: this.state.tickCount+= 1});

    this.setState({neighCount: neighbors});  
    // console.log("==========================");
    // for(let i=0; i<MAX_ROW; i++){
    //   console.log(neighChanges[i]+ "<==>"+ this.state.neighCount[i]);
    //   // console.log(neighMap[i]);
    // }
    // for(let i=0; i<MAX_ROW; i++){
    //   //console.log(this.state.neighCount[i]);
    //   console.log(neighbors[i]);
    // }
  }


	
	handleColorChange(c){		
    
    let row = c[0];
    let col = c[1];

    //console.log(`===> [${row}][${col}] <====`)
		if(this.state.color[row][col] === "black"){
			// I'm dieing
      let colorTempMap = this.state.color;
      colorTempMap[row][col] = "white";
			this.setState({color: colorTempMap});
			
			// Update Neighbor Map
			this.setState({neighCount: this.countMyNeigh(row,col, this.state.neighCount, -1, "fromColor")});

		} else {
			// I'm being born
      let colorTempMap = this.state.color;
      colorTempMap[row][col] = "black";
			this.setState({color: colorTempMap});
			
			// Update Neigbor Map			
			this.setState({neighCount: this.countMyNeigh(row,col, this.state.neighCount, 1, "fromColor")});
		}
  }

  handleTimerTick(e){
    // console.log("Timer... " + this.timerID);
    clearInterval(this.timerID);

    if(this.state.timer === "Start"){
      this.setState({ timer: "Pause"});
      this.timerID = setInterval(
        () => this.handleTickChange(),
        250
      )
      // console.log("tht " + this.timerID);
    } else{
      this.setState({timer: "Start"});
    }
  }
	
	render(){
		return(
			<div id="main">
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
