import React, { Component } from 'react';

class Cell extends Component{
	handleColorChange(location){
		this.props.onColorChange(location);
	}
	
	render(){
		
		return(
			<div className="cell grid-item"  
                style={{background: this.props.color[this.props.row][this.props.col]}} 
                onClick={(e)=>{this.handleColorChange([this.props.row, this.props.col])}}>
			</div>
		);
	}
}

export default Cell;