import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useRef, useState } from "react";
import { MockResponse } from "../models/MockResponse";
import AddItem from "./AddItem";

const GridList: React.FC = () => {
    //  hooks
    const gridRef: any = useRef();

    // States
    const [gridContent, setGridContent] = useState<Array<any>>(
        MockResponse.NameDataMock
    );
    const [sortColumn, setSortColumn] = useState<string>("nickname");
    const [sortOrder, setSortOrder] = useState<string>("ASC");
    const [openModal, setOpenModal] = useState<boolean>(false);

    //  Constants
    const columnDefs = [
        { headerName: "No", valueGetter: "node.rowIndex + 1", width: 80 },
        { headerName: "Nickname", field: "name", width: 200 },
        { headerName: "Age", field: "age", width: 100 },
    ];

    //  Mount
    useEffect(() => {
        console.log("content ", gridContent);
    }, [gridContent]);

    //  Events
    const onGridReady = (params: any) => {
        params.api.sizeColumnsToFit();
    };

    const onSort = (e: any) => {
        if (gridContent != undefined && gridContent.length > 0) {
            const sortDetail = e.api.getSortModel();
            if (sortDetail[0] != undefined) {
                setSortColumn(sortDetail[0]?.colId);
                setSortOrder(sortDetail[0]?.sort);
            } else {
                setSortColumn("");
                setSortOrder("");
            }
        }
    };

    const handleAddItem = () => {
        setOpenModal(true);
        console.log("open", openModal);
    };

    return (
        <>
            <div className="form-content">
                <input
                    type="button"
                    value="Add items to list"
                    className="btn btn-primary "
                    onClick={handleAddItem}
                />

                <div
                    className="ag-theme-alpine"
                    style={{ height: 350, width: "50%" }}
                >
                    <AgGridReact
                        ref={gridRef}
                        rowData={gridContent}
                        defaultColDef={{
                            sortable: true,
                            resizable: true,
                        }}
                        onGridReady={onGridReady}
                        rowBuffer={0}
                        columnDefs={columnDefs}
                        enableRangeSelection={true}
                        pagination={false}
                        onSortChanged={onSort}
                    />
                </div>
                <AddItem
                    openModal={openModal}
                    closeModal={() => setOpenModal(false)}
                    setGridContent={setGridContent}
                    currentData={gridContent}
                />
            </div>
        </>
    );
};

export default GridList;
