import * as React from "react";

import styles from "./ModeSwitch.css";

interface Props {
  mode: Mode;
  onValueChange?: (newMode: Mode) => void;
}

const ModeSwitch: React.FC<Props> = (props) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (props.onValueChange) {
      props.onValueChange(event.currentTarget.id as Mode);
    }
  };
  const RadioButton = (id: string, label: string) => (
    <>
      <input
        id={id}
        name="mode_switch"
        type="radio"
        value={id}
        checked={props.mode === id}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
  return (
    <fieldset className={styles.main}>
      {RadioButton("anagram", "Anagram")}
      {RadioButton("regex", "Regex")}
    </fieldset>
  );
};

export default ModeSwitch;
