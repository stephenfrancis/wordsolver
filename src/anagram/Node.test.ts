import { readFileSync } from "fs";
import { getAnagrams, Node } from "./Node";

describe("the anagram function", () => {
  test("basic anagram solving", () => {
    const root_node = new Node("");
    const words = readFileSync("src/wordlist/2of4brif.txt", {
      encoding: "utf8",
    }).split("\r\n");
    words.filter((word) => !!word).forEach((word) => root_node.add(word));

    const getSingleAnagram = (letters: string) => {
      const results = getAnagrams(root_node, 3, 2, letters);
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

    expect(getAnagrams(root_node, 10, 4, "rabbit")).toEqual([
      "rabbit",
      "art bib",
      "barb it",
      "barb ti",
      "bat rib",
      "bib rat",
      "bib tar",
      "rib tab",
    ]);
  });
});
