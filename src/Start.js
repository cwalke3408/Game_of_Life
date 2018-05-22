import React, { Component } from 'react';

class Start extends React.Component{
    constructor(){
        super();
    }

    handleTimerTick(e){
        this.props.onTimerTick(e);
    }

    render(){

        return(
          <button onClick={(e)=>this.handleTimerTick(e)}> {this.props.startButton} </button>
        )
    }
}

export default Start;