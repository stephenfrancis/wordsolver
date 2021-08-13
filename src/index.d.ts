declare module "*.css" {
  const classes: Record<string, string>;
  export default classes;
}

type Mode = "anagram" | "regex";
