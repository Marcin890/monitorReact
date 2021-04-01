import React from "react";
import {
    useTable,
    useSortBy,
    useFilters,
    useGlobalFilter,
    useAsyncDebounce
} from "react-table";
import matchSorter from "match-sorter";
import Button from "react-bootstrap/Button";
import BTable from "react-bootstrap/Table";
import {
    BsFillTrashFill,
    BsFillEyeFill,
    BsNewspaper,
    BsFillCaretUpFill,
    BsFillCaretDownFill
} from "react-icons/bs";
import dateTime from "../../functions/dateTime";
import GlobalFilter from "./GlobalFilter";

const BoardTable = ({ data, columns }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state
    } = useTable(
        {
            columns,
            data
        },

        useGlobalFilter,
        useSortBy
    );

    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <BTable responsive="sm" hover className="mt-2" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}

                                    <span>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <BsFillCaretDownFill />
                                            ) : (
                                                <BsFillCaretUpFill />
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);

                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </BTable>
        </>
    );
};

export default BoardTable;
