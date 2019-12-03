import React from "react";

//this one shows up when there is no favorite. It's just an add symbol.
export default function Empty(props) {
  return (
    <main className="empty">
      <p>To add a movie to your later list, generate a movie suggestion and click watch later.</p>
    </main>
  );
}