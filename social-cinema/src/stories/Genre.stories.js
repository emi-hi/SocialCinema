import React from "react";
import { action } from '@storybook/addon-actions';
import { storiesOf } from "@storybook/react";

import Genres from "../components/Genres";


storiesOf("Genres", module)
  .add("Base", () => <Genres/>)
