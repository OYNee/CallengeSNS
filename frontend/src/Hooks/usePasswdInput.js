import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
    console.log(value);
    if (value < 8) {
      console.log("OK");
    }
  };

  return { value, onChange, setValue };
};
