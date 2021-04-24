import reactStringReplace from "react-string-replace";
import { v4 as uuid } from "uuid";

export function typography(text) {
    let replacedText = text;

    // Cudzysłów początkowy
    replacedText = reactStringReplace(replacedText, /(\s")/g, (match, i) => (
        <span key={uuid()} className="changed">
            {" "}
            „
        </span>
    ));

    // Cudzysłów końcowy
    replacedText = reactStringReplace(replacedText, /([^\s]")/g, (match, i) => {
        const out = match.replace('"', "”");
        return (
            <span key={uuid()} className="changed">
                {out}
            </span>
        );
    });

    // Cudzysłów na początku lini
    replacedText = reactStringReplace(replacedText, /(")/g, (match, i) => (
        <span key={uuid()} className="changed">
            „
        </span>
    ));

    // Dywiz ze spacją na półpauzę
    replacedText = reactStringReplace(
        replacedText,
        /(\s-|-\s|\s-\s)/g,
        (match, i) => (
            <span key={uuid()} className="changed">
                {" "}
                –{" "}
            </span>
        )
    );

    return replacedText;
}
