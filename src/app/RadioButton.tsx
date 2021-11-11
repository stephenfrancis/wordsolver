import * as React from "react";

interface Props {
  id: string;
  label: string;
  name: string;
  onValueChange: (newValue: string) => void;
  value: string;
}

const RadioButton: React.FC<Props> = (props) => {
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (props.onValueChange) {
      props.onValueChange(event.currentTarget.id);
    }
  };

  return (
    <>
      <input
        id={props.id}
        name={props.name}
        type="radio"
        value={props.id}
        checked={props.value === props.id}
        onChange={onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </>
  )
};

export default RadioButton;
