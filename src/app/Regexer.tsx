import * as React from "react";

import styles from "./Regexer.css";

interface Props {
  inputLetters: string;
  words: string[];
}

const Regexer: React.FC<Props> = (props) => {
  const [results, setResults] = React.useState<string[]>([]);
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

  return (
    <>
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
