import React from "react";
import {
    useTable,
    useSortBy,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce
} from "react-table";
import Form from "react-bootstrap/Form";

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
}) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className="mt-3">
            <Form.Group>
                <Form.Control
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`Search ${count} records...`}
                />
            </Form.Group>
        </div>
    );
};

export default GlobalFilter;
