import React from 'react';
export default function Emotions(props) {
    return(
        <div className="mb-3">
             {props.feelings.map( (item,i) => (item.emotion ? 
             <span className="input-group-text" key={i}>{item.emotion+' '+item.percentage+'%'}</span> : <></>))} 
        </div>
    );
};
