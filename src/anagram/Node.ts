export class Node {
  private readonly letter: string;
  private prev?: Node;
  private next: Record<string, Node>;
  private count: number;
  private level: number;
  private ends_word: boolean;

  constructor(letter: string, prev?: Node, level?: number) {
    this.letter = letter;
    this.prev = prev;
    this.next = {};
    this.count = 0;
    this.level = level || 0;
    this.ends_word = false;
  }

  add(word: string) {
    if (word.length < 1) {
      throw new Error("zero-length string argument of add()");
    }
    const initial = word.substr(0, 1);
    if (!this.next[initial]) {
      this.next[initial] = new Node(initial, this, this.level + 1);
      this.count += 1;
    }
    if (word.length === 1) {
      this.next[initial].ends_word = true;
    } else {
      this.next[initial].add(word.substr(1));
    }
  }

  getWord(suffix?: string): string {
    if (!suffix) {
      suffix = "";
    }
    suffix = this.letter + suffix;
    if (this.prev) {
      suffix = this.prev.getWord(suffix);
    }
    return suffix;
  }

  nextNodes(func: (letter: string, node: Node) => void) {
    Object.keys(this.next).forEach((letter) => func(letter, this.next[letter]));
  }

  getRandom() {
    let rand = Math.floor(
      Math.random() * (this.count + (this.ends_word ? 1 : 0))
    );
    if (this.ends_word && rand === this.count) {
      return this.getWord();
    }
    let out;
    this.nextNodes((letter, node) => {
      if (rand === 0) {
        out = node.getRandom();
      }
      rand -= 1;
    });
    return out;
  }

  anagrams(
    remainder: string,
    results: string[],
    prefix: string,
    prev_word: string | null,
    root_node: Node,
    max_results: number,
    required_words: number
  ) {
    if (typeof prefix !== "string") {
      prefix = "";
    }
    const curr_word_count = prefix.split(" ").length;
    if (remainder.length === 0 && curr_word_count === required_words) {
      if (this.ends_word) {
        results.push(prefix + remainder);
      }
    } else if (
      results.length >= max_results ||
      curr_word_count > required_words
    ) {
      return;
    } else {
      if (this.ends_word) {
        root_node.anagrams(
          remainder,
          results,
          prefix + " ",
          prefix.substr(prefix.lastIndexOf(" ") + 1),
          root_node,
          max_results,
          required_words
        );
      }
      this.nextNodes((initial, node) => {
        let i;
        if (
          (i = remainder.indexOf(initial)) > -1 &&
          (!prev_word || prev_word.substr(this.level, 1) < initial)
        ) {
          node.anagrams(
            remainder.substr(0, i) + remainder.substr(i + 1),
            results,
            prefix + initial,
            null,
            root_node,
            max_results,
            required_words
          );
        }
      });
    }
  }
}

export function getAnagrams(
  root_node: Node,
  max_results: number,
  max_words: number,
  letters: string
) {
  const results = [];
  for (let i = 1; i <= max_words && results.length < max_results; i += 1) {
    root_node.anagrams(
      letters,
      results,
      "",
      null,
      root_node,
      max_results - results.length,
      i
    );
  }
  return results;
}
