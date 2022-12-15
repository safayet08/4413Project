import { useEffect, useState } from "react";
import { getSalesRecords } from "../services/adminService";
import { async } from "../services/cartService";

const AdminView = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData();
        console.log("-------------->>>");
        // const data = await getSalesRecords();

        setTableData();
    }, []);

    return (
        <>
            <h1>Admin View:</h1>
            {console.log("-------------->>>")}
            {console.log(tableData)}
        </>
    );
};

export default AdminView;
