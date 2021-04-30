import reactStringReplace from "react-string-replace";
// import { uuid } from "uuidv4";
import { v4 as uuid } from "uuid";

export function tags(text) {
    let replacedText = text;

    // Akapit
    // replacedText = replacedText.split("\n").map((str) => <p>{str}</p>);
    replacedText = reactStringReplace(replacedText, /(\n)/g, (match, i) => (
        <>
            <br key={uuid()} />
        </>
    ));
    return replacedText;
}
