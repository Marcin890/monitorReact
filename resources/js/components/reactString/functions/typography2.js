import reactStringReplace from "react-string-replace";
import { v4 as uuid } from "uuid";

export function typography(text) {
    let replacedText = text;

    // Cudzysłów początkowy
    replacedText = replacedText.replace(/\s"/g, " „");
    // Cudzysłów końcowy
    replacedText = replacedText.replace(/([^\s])"/g, "$1”");
    // Cudzysłów na początku linii
    replacedText = replacedText.replace(/(>”)/g, ">„");

    // Dywiz ze spacją na półpauzę
    replacedText = replacedText.replace(/(\s-|-\s|\s-\s)/g, " – ");

    return replacedText;
}
