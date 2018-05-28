import React, { Component } from 'react';
import Cell from './Cell.js'

class Board extends React.Component{
	constructor(props){
		super(props);
		
		this.handleColorChange = this.handleColorChange.bind(this);
	}
	

	handleColorChange(e){
		this.props.onColorChange(e);
	}
	
	render(){
		const theCells = [];
		let color = this.props.color;
		let neighCount = this.props.neighCount;
		let handle = this.handleColorChange;
        let aRow = 0;
		let col = 0;
		
		this.props.neighCount.forEach((row) => {
			col = 0;
			row.forEach(()=>{
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
			<div className="theBoard">

			
				<div className="outerCells">
					<div id="cells" className="grid-container" onChange={this.onColorChange}>
						{theCells}
					</div>
				</div>
			</div>
		);
	}
}

export default Board;