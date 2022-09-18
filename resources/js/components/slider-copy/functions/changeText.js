import reactStringReplace from "react-string-replace";
import { v4 as uuid } from "uuid";

export function changeText(text) {
    let replacedText = text;
    // Cudzysłów początkowy
    replacedText = reactStringReplace(
        replacedText,
        /(\si|\su|\sa|\sw|\sz|\so|\sI|\sU|\sA|\sW|\sZ|\sO)\s/g,
        (match, i) => <span key={uuid()}>{match}&nbsp;</span>
    );
    return replacedText;
}
