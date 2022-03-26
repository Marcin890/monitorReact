import reactStringReplace from "react-string-replace";
// import { uuid } from "uuidv4";
import { v4 as uuid } from "uuid";

export function tags(text, id) {
    let replacedText = text;

    // Akapit
    // replacedText = replacedText.split("\n").map((str) => <p>{str}</p>);

    replacedText = replacedText.replace(/\n+/g, "\n");

    replacedText = reactStringReplace(replacedText, /(\n)/g, (match, i) => (
        <>
            <br key={uuid()} />
            <br key={uuid()} />
            <span key={uuid()} className="changed">
                &lt;p&gt;
            </span>
        </>
    ));
    if (replacedText[4] !== undefined && id === "pap") {
        replacedText[4] = "<b>" + replacedText[4] + "</b>";
    }
    if (replacedText[1] !== undefined && id === "pap") {
        replacedText[1] = (
            <>
                <br />
                <br />
            </>
        );
    }

    console.log(replacedText[4]);
    return replacedText;
}
