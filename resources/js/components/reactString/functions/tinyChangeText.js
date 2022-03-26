import reactStringReplace from "react-string-replace";
import { typography } from "./typography2";
import { punctuation } from "./punctuation2";
import { term } from "./term2";
import { tags } from "./tags2";

export function changeText(text, id) {
    console.log(id);

    let replacedText = text;

    replacedText = typography(replacedText);
    replacedText = punctuation(replacedText);
    replacedText = term(replacedText);
    replacedText = tags(replacedText);

    console.log(replacedText);

    return replacedText;
}
