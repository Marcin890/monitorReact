import reactStringReplace from "react-string-replace";
import { v4 as uuid } from "uuid";

export function punctuation(text) {
    let replacedText = text;

    // Przecinek po spacji
    replacedText = reactStringReplace(
        replacedText,
        /(\s,|\s,\s)/g,
        (match, i) => (
            <span key={uuid()} className="changed">
                ,{}
            </span>
        )
    );

    // Kropka po spacji
    replacedText = reactStringReplace(
        replacedText,
        /(\s\.|\s\.\s)/g,
        (match, i) => (
            <span key={uuid()} className="changed">
                .{}
            </span>
        )
    );
    // Dwukropek po spacji
    replacedText = reactStringReplace(replacedText, /(\s:)/g, (match, i) => (
        <span key={uuid()} className="changed">
            {match[1]}
        </span>
    ));

    // Wiele spacji
    replacedText = reactStringReplace(replacedText, /(\s{2,})/g, (match, i) => (
        <span key={uuid()} className="changed">
            {" "}
        </span>
    ));

    return replacedText;
}
