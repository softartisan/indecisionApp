import React from 'react';

const Action = (props) => (
        <div>
            <button 
            className="big-button"
            onClick={props.handlePick}
            disabled={!props.hasOptions}
            >
            ¿Qué deberia hacer ahora?</button>
        </div>
);


export{
    Action as default
}