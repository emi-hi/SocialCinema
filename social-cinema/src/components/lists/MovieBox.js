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
            <img src={props.img} height="120px" alt={props.title}/>
          </div>
          {props.removeLaterMovie &&
            <div className="remove" onClick={() => props.removeLaterMovie(props.id)}>
              <img src="./images/trash.png" alt="Delete" />
            </div>
          }
        </div>
      )}
    </Draggable>
  );
}