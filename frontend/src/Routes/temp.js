import React from "react";

import {
  MaskedTextBox,
  NumericTextBox,
  Input,
  Switch,
  Slider,
  RangeSlider,
  SliderLabel,
  ColorGradient,
  ColorPalette,
  ColorPicker,
  Checkbox,
  RadioButton,
  RadioGroup,
} from "@progress/kendo-react-inputs";
import "@progress/kendo-react-intl";
import "@progress/kendo-drawing";
import "@progress/kendo-react-tooltip";
import "@progress/kendo-react-form";
import "@progress/kendo-react-dropdowns";
import "@progress/kendo-react-buttons";
import "@progress/kendo-react-labels";

export default () => {
  const selectedColor = "rgba(237, 126, 50, 1)";
  const gradientSettings = {
    opacity: false,
  };

  return (
    <ColorPicker
      defaultValue={selectedColor}
      view={"gradient"}
      gradientSettings={gradientSettings}
    />
  );
};
