import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    componentDidMount = () => {
        try{
            const options = JSON.parse(localStorage.getItem('options'));
            options && this.setState(( ) => ({options}));
        }catch (e){

        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevState.options.legth !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    componentWillUnmount = () => {
        console.log('componentWillUnmout');
    }
    handleDeleteOptions = () => {
        this.setState( () => ({options: [] }) );
    }
    handlePick = () => {
        const random = Math.floor(Math.random() * this.state.options.length);
        this.state.options[random];
        this.setState(() => ({
            selectedOption: this.state.options[random]
        }));
    }
    handleOkOption = () => {
        this.setState(() => {
            return {
                selectedOption: undefined
            }
        });
    }
    handleAddOption = (option) => {
        if(!option){
            return 'Ingresa un valor valido.';
        }else if(this.state.options.includes(option)){
            return 'Esta opción ya existe.';
        }
        this.setState( (prevState) => ({options:[...prevState.options, option]}) );
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState( (prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    render(){
        const title = 'Indecision';
        const subtitle = 'Pone tu vida en las manos de una computadora';
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action 
                    hasOptions={this.state.options.length> 0}
                    handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                        options={this.state.options} 
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                        handleAddOption={this.handleAddOption}
                        />
                    </div>
                    <OptionModal 
                        selectedOption={this.state.selectedOption}
                        handleOkOption={this.handleOkOption}
                    />
                 </div>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}

export{
    IndecisionApp as default
}