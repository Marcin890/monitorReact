import reactStringReplace from "react-string-replace";
// import { uuid } from "uuidv4";
import { v4 as uuid } from "uuid";

export function tags(text, id) {
    let replacedText = text;

    replacedText = replacedText.replace(/<p><br \/>/g, "<p>");
    replacedText = replacedText.replace(/<p> <\/p>/g, "");
    return replacedText;
}
