import React from "react";

export default function Radio(props) {

  return (
    <div>
      <input id="on" name="state-d" type="radio" checked={props.checked} />
      <label for="on" onclick="">{props.name}</label>
    </div>
  );
};