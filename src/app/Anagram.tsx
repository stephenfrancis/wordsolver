import * as React from "react";

import { Node } from "../anagram/Node";

import styles from "./Anagram.css";

interface Props {
  inputLetters: string;
  rootNode: Node;
}

const Anagram: React.FC<Props> = (props) => {
  const [results, setResults] = React.useState<string[]>([]);
  React.useEffect(() => {
    const temp = [];
    console.log(`looking for anagrams of ${props.inputLetters}`);
    props.rootNode.anagrams(
      props.inputLetters,
      temp,
      "",
      null,
      props.rootNode,
      100,
      3
    );
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

export default Anagram;
