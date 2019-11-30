import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "../index.scss";

import AddFav from "../components/lists/AddFav.js";
import MovieBox from "../components/lists/MovieBox.js";

storiesOf("Favorites", module)
.addParameters({
  backgrounds: [{ name: "black", value: "#fff", default: true }]
})
.add("Add fav", () => (
  <AddFav
    onClick = {action("click")}
/>
))
.add("Click Movie", () => (
  <MovieBox
    title="test"
    img = 'images/movies/titanic.jpg'
    onClick = {action("click")}
/>
))