import reactStringReplace from "react-string-replace";
import { typography } from "./typography";
import { punctuation } from "./punctuation";
import { tags } from "./tags";

export function changeText(text) {
  let replacedText = text;
  replacedText = tags(replacedText);
  replacedText = typography(replacedText);
  replacedText = punctuation(replacedText);

  return replacedText;
}
