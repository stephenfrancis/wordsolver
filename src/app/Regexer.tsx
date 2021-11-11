import * as React from "react";
import RadioButton from "./RadioButton";

import styles from "./Regexer.css";

interface Props {
  inputLetters: string;
  setInputLetters: (new_letters: string) => void;
  words: string[];
}

const Regexer: React.FC<Props> = (props) => {
  const [results, setResults] = React.useState<string[]>([]);
  const [matchWhole, setMatchWhole] = React.useState<string>(
    props.inputLetters.substr(0, 1) === "^" && props.inputLetters.substr(-1) === "$" ? "yes" : "no");
  React.useEffect(() => {
    const temp = [];
    if (!props.inputLetters) {
      return;
    }
    console.log(`looking for matches of ${props.inputLetters}`);
    try {
      const regex = new RegExp(props.inputLetters);
      props.words.forEach((word) => {
        if (regex.test(word)) {
          temp.push(word);
        }
      });
    } catch (e) {
      console.error(e);
    }
    console.log(`found ${temp.length}`);
    setResults(temp);
  }, [props.inputLetters]);

  const onMatchWholeChange = (new_val: string) => {
    let input_letters = props.inputLetters;
    if (new_val === "yes") {
      if (input_letters.substr(0, 1) !== "^") {
        input_letters = "^" + input_letters;
      }
      if (input_letters.substr(-1) !== "$") {
        input_letters = input_letters + "$";
      }
    } else {
      if (input_letters.substr(0, 1) === "^") {
        input_letters = input_letters.substr(1);
      }
      if (input_letters.substr(-1) === "$") {
        input_letters = input_letters.substr(0, input_letters.length - 1);
      }
    }
    console.log(`setting input letters to ${input_letters}`);
    props.setInputLetters(input_letters);
    setMatchWhole(new_val);
  }

  return (
    <>
      <fieldset className={styles.fieldset}>
        <span>Match whole words?</span>
        <RadioButton id="yes" label="yes" name="whole_words" onValueChange={onMatchWholeChange} value={matchWhole} />
        <RadioButton id="no"  label="no"  name="whole_words" onValueChange={onMatchWholeChange} value={matchWhole} />
      </fieldset>

      {results.length > 1 && (
        <div className={styles.count}>{results.length} results</div>
      )}
      {results.length === 1 && <div className={styles.count}>1 result</div>}
      <div className={styles.main}>
        {results.map((result) => (
          <div key={result}>{result}</div>
        ))}
      </div>
    </>
  );
};

export default Regexer;
