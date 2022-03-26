import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Container, Row } from "react-bootstrap";
import { changeText } from "../reactString/functions/tinyChangeText";
import { ajaxTransport } from "jquery";

const Tiny = () => {
    const editorRef = useRef(null);
    const [data, setData] = React.useState("");
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const handleUpdate = (value, editor) => {
        setData(value);
    };

    const correctContent = () => {
        const data2 = changeText(data);

        setData(data2);
    };

    console.log(data);
    return (
        <>
            <Container>
                <Row>
                    <h2 className="mt-5">Editor</h2>
                </Row>
                <Row className="mt-2">
                    {" "}
                    <Button onClick={() => correctContent()}>Correct</Button>
                    <Button
                        className="ml-2"
                        variant="success"
                        onClick={() => {
                            navigator.clipboard.writeText(data);
                        }}
                    >
                        Copy
                    </Button>
                    <Button
                        variant="danger"
                        className="ml-2"
                        onClick={() => setData("")}
                    >
                        Clear
                    </Button>
                </Row>
                <Row className="mt-3">
                    <Editor
                        onEditorChange={handleUpdate}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={""}
                        value={data}
                        init={{
                            // skin: "oxide-dark",
                            // content_css: "dark",

                            quickbars_insert_toolbar: "",
                            quickbars_selection_toolbar: "",
                            width: "100%",
                            height: 600,
                            menubar: false,
                            language: "pl_PL",
                            entity_encoding: "raw",
                            browser_spellcheck: true,
                            plugins:
                                "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                            imagetools_cors_hosts: ["picsum.photos"],
                            menubar:
                                "file edit view insert format tools table help",
                            toolbar:
                                "undo redo | bold italic underline superscript subscript |   formatselect |  numlist bullist | removeformat charmap | fullscreen |  template link anchor ",
                            toolbar_sticky: true,
                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                            templates: [
                                {
                                    title: "PAP",
                                    description: "pap",
                                    content:
                                        "<img src='https://adst.mp.pl/img/scripts/common/PAP_logo.jpg'>",
                                },
                                {
                                    title: "Image Caption",
                                    description: "Caption",
                                    content: "<p><b><small>Podpis</small></b>",
                                },
                            ],
                            setup: function (editor) {
                                const insertUsername = function () {
                                    editor.insertContent(`–`);
                                };

                                editor.addShortcut(
                                    "meta+alt+P",
                                    "Insert username",
                                    function () {
                                        insertUsername();
                                    }
                                );
                                const insertPAP = function () {
                                    editor.insertContent(
                                        `<img src='https://adst.mp.pl/img/scripts/common/PAP_logo.jpg'>`
                                    );
                                };

                                editor.addShortcut(
                                    "meta+alt+L",
                                    "Insert username",
                                    function () {
                                        insertPAP();
                                    }
                                );
                                const insertCaption = function () {
                                    editor.insertContent(
                                        `<p><b><small>Podpis</small></b>`
                                    );
                                };

                                editor.addShortcut(
                                    "meta+alt+C",
                                    "Insert username",
                                    function () {
                                        insertCaption();
                                    }
                                );
                            },
                        }}
                    />
                </Row>
            </Container>
        </>
    );
};

export default Tiny;
