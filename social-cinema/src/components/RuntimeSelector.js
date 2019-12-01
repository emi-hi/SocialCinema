import React from "react";

export default function RuntimeSelector(props) {
  return (
    <>
      <label>
        Minimum Runtime:
        <input min="30" max="300" step="10" type="range" value={props.minimumRuntime} onChange={(event)=>{props.setMinimumRuntime(event.target.value)}}/>
      </label>
      <p>Approximately {props.minimumRuntime} minutes</p>
      <label>
        Maximum Runtime:
        <input min="30" max="300" step="10" type="range" value={props.maximumRuntime} onChange={(event)=>{props.setMaximumRuntime(event.target.value)}}/>
      </label>
      <p>Approximately {props.maximumRuntime} minutes</p>
    </>
  )
}
