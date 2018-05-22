import React, { Component } from 'react';
import Cell from './Cell.js'

class Board extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
			click: false,
			cellColor: "Green",
			cells: []
		};
		
		for(let i=0; i< 50; i++){
			let cols = [];
			for(let j=0; j<70; j++){
				cols[j] = {
					id: ""+i+"|"+j,
					live: false,
					myNeighborsLiveCount: 0
				}
				this.state.cells[i] = cols;
				// console.log(this.state.cells);
			}
		}
		
		this.handleColorChange = this.handleColorChange.bind(this);
	}
	
	handleTickChange(e){
		this.props.onTickChange("tickToke");
	}
	handleColorChange(e){
		this.props.onColorChange(e);
	}
	
	render(){
		//let colorDisplay = null;
		const theCells = [];
		let curCells = this.state.cells;
		let color = this.props.color;
		let neighCount = this.props.neighCount;
		let handle = this.handleColorChange;
        let aRow = 0;
        let col = 0;
	
		curCells.forEach(function(row){
            col = 0;
			row.forEach(function(elem){
				//theCells.push(<button className="cell" style={colorDisplay} onClick={this.handleThisCellLife}/>);
				theCells.push(
					<Cell 
						row={aRow} 
                        col={col}
						color={color}
						neighCount={neighCount}
						onColorChange = {handle}
                    />);
                    col++;
			});
		    aRow++;
		});
		
		return(
			<div>
				<button onClick={(e) => this.handleTickChange(e)} >
					2nd Tick
				</button>
				
				<div id="cells" className="grid-container" onChange={this.onColorChange}>
					{theCells}
				</div>
			</div>
		);
	}
}

export default Board;