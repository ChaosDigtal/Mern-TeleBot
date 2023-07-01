import React, { Fragment, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";

function PendingContract(props) {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState(null);
    const [disable, setDisable] = useState(false);

    const getList = () => {
        axios
            .post(process.env.REACT_APP_SERVER_IP + "pending_contract/getAll", {})
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

    useEffect(() => {
       setDisable(selected === null);
    }, [selected])

    const Accept = () => {
        console.log(selected);
        axios
            .post(process.env.REACT_APP_SERVER_IP + "pending_contract/accept", {
                data: selected,
            })
            .then((response) => {
                let result = response["data"];
                if (result["result"] !== "success") {
                    return;
                }
                Refresh();
            })
            .catch((error) => { });
    }

    const Reject = () => {
        axios
            .post(process.env.REACT_APP_SERVER_IP + "pending_contract/reject", {
                data: selected,
            })
            .then((response) => {
                let result = response["data"];
                if (result["result"] !== "success") {
                    return;
                }
                Refresh();
            })
            .catch((error) => { });
    }

    const Refresh = () => {
        getList();
    }

    return (
        <div>
            <div className="button-group-1">
                <div>
                    <Button label="Accept" onClick={(e) => Accept()} disabled={disable} icon="pi pi-check" />
                    <Button label="Reject" onClick={(e) => Reject()} disabled={disable} severity="danger" icon="pi pi-times" />
                </div>
                <div>
                    <Button label="Refresh" onClick={(e) => Refresh()} severity="success" icon="pi pi-refresh" />
                </div>
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
                    <Column field="hash" header="Hash"></Column>
                    <Column field="time" header="Requested at"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default PendingContract;