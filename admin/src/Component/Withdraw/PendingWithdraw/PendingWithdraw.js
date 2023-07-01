import React, { Fragment, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from "axios";

function PendingWithdraw(props) {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [hash, setHash] = useState("");
    const [disable, setDisable] = useState(false);
    const [final, setFinal] = useState(false);

    const getList = () => {
        axios
            .post(process.env.REACT_APP_SERVER_IP + "pending_withdraw/getAll", {})
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

    useEffect(() => {
        setFinal(hash === "");
    }, [hash])

    const AcceptClicked = () => {
        setHash("");
        setShowDialog(true);
    }

    const Accept = () => {
        setShowDialog(false);
        axios
            .post(process.env.REACT_APP_SERVER_IP + "pending_withdraw/accept", {
                data: selected,
                hash: hash,
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
            .post(process.env.REACT_APP_SERVER_IP + "pending_withdraw/reject", {
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

    const footerContent = (
        <div>
            <Button label="Ok" icon="pi pi-check" disabled={final} onClick={() => Accept()} autoFocus />
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowDialog(false)} className="p-button-text" />
        </div>
    );

    return (
        <div>
            <div className="card flex justify-content-center">
                <Dialog header="Input hash" visible={showDialog} style={{ width: '50vw' }} onHide={() => setShowDialog(false)} footer={footerContent}>
                    {/* <InputText value={hash} onChange={(e) => setHash(e.target.value)} /> */}
                    <span className="p-float-label">
                        <InputTextarea id="description" value={hash} onChange={(e) => setHash(e.target.value)} rows={5} cols={30} />
                        <label htmlFor="description">Your transaction hash here.</label>
                    </span>
                </Dialog>
            </div>
            <div className="button-group-1">
                <div>
                    <Button label="Accept" onClick={(e) => AcceptClicked()} disabled={disable} icon="pi pi-check" />
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
                    <Column field="crypto" header="Cryptocurrency"></Column>
                    <Column field="amount" header="Amount"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column field="time" header="Requested at"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default PendingWithdraw;