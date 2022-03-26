import reactStringReplace from "react-string-replace";
import { typography } from "./typography";
import { punctuation } from "./punctuation";
import { tags } from "./tags";
import { term } from "./term";
import { pap } from "./pap";

export function changeText(text, id) {
    console.log(id);

    let replacedText = text;
    if (id === "pap") {
        replacedText = pap(replacedText);
    }
    replacedText = tags(replacedText, id);
    replacedText = typography(replacedText);
    replacedText = punctuation(replacedText);
    replacedText = term(replacedText);

    return replacedText;
}
