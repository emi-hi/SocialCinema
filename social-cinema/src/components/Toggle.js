import React from "react";
import Radio from "./Radio";

export default function Toggle(props) {


  return (
    <div class="switch-toggle switch-3 switch-candy">
        <h2>{props.name}</h2>
        <Radio name="Love it"/>
        <Radio name="Meh it"/>
        <Radio name="Hate it"/>
    </div>
  )
}
