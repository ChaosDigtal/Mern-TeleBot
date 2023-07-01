import React, { Fragment, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";

function OngoingContract(props) {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState(null);

    const getList = () => {
        axios
            .post(process.env.REACT_APP_SERVER_IP + "ongoing_contract/getAll", {})
            .then((response) => {
                let result = response["data"];
                if (result["result"] !== "success") {
                    return;
                }
                setList(result["data"]);
            })
            .catch((error) => { });
    }

    useEffect(() => {
        getList();
    }, [])

    const Refresh = () => {
        getList();
    }

    return (
        <div>
            <div className="button-group-2">
                <Button label="Refresh" onClick={(e) => Refresh()}  severity="success" icon="pi pi-refresh" />
            </div>
            <div>
                <DataTable
                    value={list}
                    stripedRows
                    selectionMode="single"
                    sortMode="multiple"
                    paginator
                    selection={selected}
                    onSelectionChange={(e) => setSelected(e.value)}
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    dataKey="_id"
                >
                    <Column field="username" header="Username"></Column>
                    <Column field="budget" header="Budget"></Column>
                    <Column field="crypto" header="Cryptocurrency"></Column>
                    <Column field="time" header="Started at"></Column>
                    <Column field="left" header="Days left"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default OngoingContract;