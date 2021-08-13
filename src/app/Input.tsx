import * as React from "react";

import styles from "./Input.css";

interface Props {
  onValueChange?: (newVal: string) => void;
}

const Input: React.FC<Props> = (props) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const onBlur = () => {
    if (props.onValueChange) {
      props.onValueChange(ref.current.value);
    }
  };
  return (
    <input
      autoCapitalize="lower"
      autoComplete="off"
      autoFocus
      className={styles.main}
      maxLength={20}
      onBlur={onBlur}
      ref={ref}
      spellCheck="false"
      type="text"
    />
  );
};

export default Input;
