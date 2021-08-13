import { readFileSync } from "fs";
import { Node } from "./Node";

describe("the anagram function", () => {
  test("basic anagram solving", () => {
    const root_node = new Node("");
    const words = readFileSync("src/wordlist/2of4brif.txt", {
      encoding: "utf8",
    }).split("\r\n");
    words.filter((word) => !!word).forEach((word) => root_node.add(word));

    const getSingleAnagram = (letters: string) => {
      const results = [];
      root_node.anagrams(letters, results, "", null, root_node, 3, 2);
      if (results.length < 1) {
        throw new Error("no anagrams found");
      }
      return results[0];
    };

    expect(words.length).toBe(60389);
    expect(getSingleAnagram("vkaradar")).toBe("aardvark");
    expect(getSingleAnagram("abdeelortuvv")).toBe("abut revolved");
    expect(root_node.getRandom().length).toBeGreaterThan(0);
    expect(() => {
      getSingleAnagram("xxxx");
    }).toThrowError("no anagrams found");
  });
});
