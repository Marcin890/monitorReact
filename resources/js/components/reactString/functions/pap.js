import reactStringReplace from "react-string-replace";
import { v4 as uuid } from "uuid";

export function pap(text) {
    let replacedText = text;

    const agm =
        "<img src='https://adst.mp.pl/img/scripts/common/PAP_logo.jpg'>";

    replacedText = agm + "\n" + replacedText;

    return replacedText;
}
