import * as React from "react";
import * as ReactDOM from "react-dom";

import Anagram from "./Anagram";
import Input from "./Input";
import ModeSwitch from "./ModeSwitch";
import { Node } from "../anagram/Node";
import Regexer from "./Regexer";

import styles from "./App.css";

interface Props {}

const root_node = new Node("");
let loaded = false;
let words = [];

const App: React.FC<Props> = () => {
  const [inputLetters, setInputLetters] = React.useState<string>("");
  const [mode, setMode] = React.useState<Mode>("anagram");
  React.useEffect(() => {
    fetch("2of4brif.txt")
      .then((response) => response.text() as Promise<string>)
      .then((data: string) => {
        // console.log(`got data!: ${data}`);
        words = data.split("\r\n").filter((word) => !!word);
        words.forEach((word) => root_node.add(word));
        loaded = true;
        console.log(`content loaded, random word: ${root_node.getRandom()}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const onModeChange = (newMode: Mode) => {
    setMode(newMode);
  };
  return (
    <div className={styles.main}>
      <h1>WordSolver</h1>
      <Input onValueChange={setInputLetters} />
      <ModeSwitch mode={mode} onValueChange={onModeChange} />
      {mode === "anagram" && (
        <Anagram inputLetters={inputLetters} rootNode={root_node} />
      )}
      {mode === "regex" && (
        <Regexer inputLetters={inputLetters} words={words} />
      )}
    </div>
  );
};

const target = document.querySelector("#app");
ReactDOM.render(<App />, target);
