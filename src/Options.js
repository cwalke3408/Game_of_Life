import React, {Component} from 'react';

class Options extends React.Component{

    constructor(props){
        super(props);

        console.log("Counter: " + props.onCounterChange);
    }
	handleTickChange(e){
		 this.props.onTickChange("tickToke");
    }
    
    handleTimerTick(e){
        this.props.onTimerTick(e);
    }

    // handleCounterChange(e){
    //     console.log("Counter Change")
    //     this.props.onCounterChange(e);
    // }

    render(){
        return(
            <div className="options">
                <button onClick={(e) => this.handleTickChange(e)} >
					Tick
				</button>
                <input value={this.props.counter} />
                <button onClick={(e)=>this.handleTimerTick(e)}> 
                    {this.props.startButton}
                </button>

                
            </div>
        )
    }
}

export default Options;