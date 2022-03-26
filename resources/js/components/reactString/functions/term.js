import reactStringReplace from "react-string-replace";
import { v4 as uuid } from "uuid";

export function term(text) {
    let replacedText = text;
    // Covid-19
    replacedText = reactStringReplace(
        replacedText,
        /(covid-19|Covid-19|covid19|Covid19)/g,
        (match, i) => (
            <span key={uuid()} className="changed">
                COVID-19
            </span>
        )
    );

    return replacedText;
}
