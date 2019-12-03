import './MovieBox.scss'
import React from "react";
import { Draggable } from "react-beautiful-dnd"

export default function MovieBox(props) {

  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {(provided) => (
        <div className="movie_box"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="tiny_poster">
            <img src={props.img} alt={props.title}/>
          </div>
          {props.removeLaterMovie &&
            // <div className="remove" onClick={() => props.removeLaterMovie(props.id)}>
            <img className="remove" src="./images/trash-button.png" alt="Delete" onClick={() => props.removeLaterMovie(props.id)}/>
            // </div>
          }
        </div>
      )}
    </Draggable>
  );
}