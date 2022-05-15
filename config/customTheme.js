import { css } from "styled-components";
import { FormClose } from "grommet-icons";

const customTheme = {
  global: {
    background: "#000",
    hover: {
      color: "#000",
      background: "000",
    },
    font: {
      family: "Inter, sans-serif",
      color: "#fff",
    },
    colors: {
      brand: "#000",
      active: "#22003b",
      color: "#fff",
      control: "#fff",
      border: "#1E00FF",
      placeholder: "#111",
      text: "#fff",
    },
    focus: {
      shadow: {
        color: "#1E00FF",
      },
      outline: {
        color: "#1E00FF",
      },
    },
    control: {
      border: {
        width: "3px",
      },
    },
  },
};

export default customTheme;
