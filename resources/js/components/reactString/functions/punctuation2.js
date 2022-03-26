import reactStringReplace from "react-string-replace";
import { v4 as uuid } from "uuid";

export function punctuation(text) {
    let replacedText = text;

    // Przecinek po spacji
    replacedText = replacedText.replace(/(\s,|\s,\s)/g, ", ");
    // Kropka po spacji
    replacedText = replacedText.replace(/(\s\.|\s\.\s)/g, ". ");

    // Dwukropek po spacji
    replacedText = replacedText.replace(/(\s:)/g, ":");

    // Wiele spacji
    replacedText = replacedText.replace(/(\s{2,})/g, " ");

    return replacedText;
}
