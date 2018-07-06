import React, {Component} from 'react';

class Options extends Component{
	handleTickChange(){
		 this.props.onTickChange();
    }
    
    handleTimerTick(e){
        this.props.onTimerTick(e);
    }

    render(){
        return(
            <div className="options">
                <button onClick={(e) => this.handleTickChange(e)} >Tick</button>
                <input value={this.props.counter} />
                <button onClick={(e)=>this.handleTimerTick(e)}> 
                    {this.props.startButton}
                </button>              
            </div>
        )
    }
}

export default Options;