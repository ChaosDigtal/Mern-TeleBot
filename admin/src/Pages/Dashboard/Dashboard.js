import React, { useState, useEffect } from "react";
import axios from "axios";
import { TabView, TabPanel } from 'primereact/tabview';
import PendingContract from "../../Component/Contract/PendingContract/PendingContract"
import OngoingContract from "../../Component/Contract/OngoingContract/OngoingContract"
import ExpiredContract from "../../Component/Contract/ExpiredContract/ExpiredContract"
import PendingWithdraw from "../../Component/Withdraw/PendingWithdraw/PendingWithdraw"
import FinishedWithdraw from "../../Component/Withdraw/FinishedWithdraw/FinishedWithdraw";
import User from "../../Component/User/User"

function Dashboard() {

  useEffect(() => {
  }, []);

  return (
    <div className="card">
      <TabView>
        <TabPanel header="&nbsp;&nbsp;User Information" leftIcon="pi pi-user mr-2">
          <User></User>
        </TabPanel>
        <TabPanel header="&nbsp;&nbsp;Pending Contract" leftIcon="pi pi-angle-double-down mr-2">
          <PendingContract></PendingContract>
        </TabPanel>
        <TabPanel header="&nbsp;&nbsp;Ongoing Contract" leftIcon="pi pi-angle-double-right mr-2">
          <OngoingContract></OngoingContract>
        </TabPanel>
        <TabPanel header="&nbsp;&nbsp;Expired Contract" leftIcon="pi pi-check-circle mr-2">
          <ExpiredContract></ExpiredContract>
        </TabPanel>
        <TabPanel header="&nbsp;&nbsp;Pending Withdraw" leftIcon="pi pi-angle-double-down mr-2">
          <PendingWithdraw></PendingWithdraw>
        </TabPanel>
        <TabPanel header="&nbsp;&nbsp;Handled Withdraw" leftIcon="pi pi-check-circle mr-2">
          <FinishedWithdraw></FinishedWithdraw>
        </TabPanel>
      </TabView>
    </div>

  );
}

export default Dashboard;
