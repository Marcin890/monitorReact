import reactStringReplace from "react-string-replace";
import { v4 as uuid } from "uuid";

export function term(text) {
    let replacedText = text;
    // Covid-19
    replacedText = replacedText.replace(
        /(covid-19|Covid-19|covid19|Covid19)/g,
        "COVID-19"
    );

    return replacedText;
}
