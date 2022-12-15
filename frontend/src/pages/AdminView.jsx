import { useEffect, useState } from "react";
import { getSalesRecords } from "../services/adminService";

const AdminView = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData();
        console.log("-------------->>>");
        console.log("tableData: " + tableData);
    }, []);

    return (
        <>
            <h1>Admin View: {tableData}</h1>
        </>
    );
};

export default AdminView;
