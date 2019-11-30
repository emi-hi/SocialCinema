import React from "react";

export default function RuntimeSelector(props) {
  return (
    <div>
      <label>
        Minimum Runtime:
        <input min="30" max="300" step="10" type="range" value={props.minimumRuntime} onChange={(event)=>{props.setMinimumRuntime(event.target.value)}}/>
      </label>
      <span>Approximately {props.minimumRuntime} minutes</span>
      <label>
        ***Maximum Runtime:
        <input min="30" max="300" step="10" type="range" value={props.maximumRuntime} onChange={(event)=>{props.setMaximumRuntime(event.target.value)}}/>
      </label>
      <span>Approximately {props.maximumRuntime} minutes</span>
    </div>
  )
}
