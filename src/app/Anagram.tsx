import * as React from "react";

import { getAnagrams, Node } from "../anagram/Node";

import styles from "./Anagram.css";

interface Props {
  inputLetters: string;
  rootNode: Node;
}

const Anagram: React.FC<Props> = (props) => {
  const [maxResults, setMaxResults] = React.useState<number>(100);
  const [maxWords, setMaxWords] = React.useState<number>(3);
  const [results, setResults] = React.useState<string[]>([]);
  React.useEffect(() => {
    const temp = getAnagrams(props.rootNode, maxResults, maxWords, props.inputLetters);
    console.log(`looking for anagrams of ${props.inputLetters}, found ${temp.length} for max words ${maxWords} and max results ${maxResults}`);
    setResults(temp);
  }, [props.inputLetters, maxResults, maxWords]);

  return (
    <>
      <ShowParamFields maxResults={maxResults} maxWords={maxWords} onChangeMaxResults={setMaxResults} onChangeMaxWords={setMaxWords} />
      {results.length > 1 && (
        <div className={styles.count}>{results.length} results</div>
      )}
      {results.length === 1 && <div className={styles.count}>1 result</div>}
      <div className={styles.main}>
        {results.map((result) => (
          <div key={result}>{result}</div>
        ))}
      </div>
      {results.length === 0 && <div className={styles.count}>no results found</div>}
    </>
  );
};

interface ShowParamFieldsProps {
  maxResults: number;
  maxWords: number;
  onChangeMaxResults: (newResultLimit: number) => void;
  onChangeMaxWords: (newMaxWords: number) => void;
}

const ShowParamFields: React.FC<ShowParamFieldsProps> = (props) => {
  const onChangeMaxWords = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeMaxWords(parseInt(event.target.value, 10));
  }
  const onChangeMaxResults = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeMaxResults(parseInt(event.target.value, 10));
  }
  return (
    <div className={styles.showParamFields}>
      <div>max number of results:</div>
      <div><input type="number" onChange={onChangeMaxResults} value={String(props.maxResults)} /></div>
      <div>max number of words:</div>
      <div><input type="number" onChange={onChangeMaxWords} value={String(props.maxWords)} /></div>
    </div>
  )
}

export default Anagram;
