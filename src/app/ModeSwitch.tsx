import * as React from "react";
import RadioButton from "./RadioButton";

import styles from "./ModeSwitch.css";

interface Props {
  mode: Mode;
  onValueChange?: (newMode: Mode) => void;
}

const ModeSwitch: React.FC<Props> = (props) => {
  return (
    <fieldset className={styles.main}>
      <RadioButton id="anagram" label="Anagram" name="mode_switch" onValueChange={props.onValueChange} value={props.mode} />
      <RadioButton id="regex"   label="Regex"   name="mode_switch" onValueChange={props.onValueChange} value={props.mode} />
    </fieldset>
  );
};

export default ModeSwitch;
