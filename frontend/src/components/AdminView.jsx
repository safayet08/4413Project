import { useEffect, useState } from "react";
import { getSalesRecords, getVisitTable } from "../services/adminService";

// import BootstrapTable from 'react-bootstrap-table-next';
import ProgressBar from "react-bootstrap/ProgressBar";

const AdminView = () => {
    const [visitRecord, setVisitRecord] = useState([]);
    const [salesRecord, setSalesRecord] = useState([]);
    const salesRecordColumns = [
        {
            dataField: "name",
            text: "Product Name",
        },
        {
            dataField: "sold",
            text: "Total Sold",
        },
        {
            dataField: "price",
            text: "Total Price Sold",
        },
    ];
    useEffect(() => {
        const fetchSalesTable = async () => {
            const records = await getSalesRecords();
            setSalesRecord(records);
            console.log("products");
            console.log(records);
        };

        const fetchVisitTable = async () => {
            const records = await getVisitTable();
            setVisitRecord(records);
            console.log("visits");
            console.log(records);
        };

        fetchSalesTable();
        fetchVisitTable();
    }, []);

    const renderDailyVisits = (pageViewCountList) => {
        console.log(pageViewCountList);
        const totalCount =
            pageViewCountList.HomePage +
            pageViewCountList.ItemView +
            pageViewCountList.CartAdd +
            pageViewCountList.Purchase;
        console.log(totalCount);

        return (
            <>
                <div className="flex-container">
                    <div className="flex-child-magenta">
                        {" "}
                        {pageViewCountList.date}{" "}
                    </div>

                    <div className="flex-child" key="homepageAnalytics">
                        <p>HomePage Views</p>
                        <ProgressBar
                            striped
                            variant="success"
                            label={
                                Math.round(
                                    (pageViewCountList.HomePage / totalCount) *
                                        10000
                                ) /
                                    100 +
                                "%"
                            }
                            now={
                                (pageViewCountList.HomePage / totalCount) * 100
                            }
                        />
                    </div>

                    <div className="flex-child" key="itemViewAnalytics">
                        <p>Item Views</p>
                        <ProgressBar
                            striped
                            variant="info"
                            label={
                                Math.round(
                                    (pageViewCountList.ItemView / totalCount) *
                                        10000
                                ) /
                                    100 +
                                "%"
                            }
                            now={
                                (pageViewCountList.ItemView / totalCount) * 100
                            }
                        />
                    </div>

                    <div className="flex-child" key="cartAddAnalytics">
                        <p>Cart Add</p>
                        <ProgressBar
                            striped
                            variant="warning"
                            label={
                                Math.round(
                                    (pageViewCountList.CartAdd / totalCount) *
                                        10000
                                ) /
                                    100 +
                                "%"
                            }
                            now={(pageViewCountList.CartAdd / totalCount) * 100}
                        />
                    </div>

                    <div className="flex-child" key="purchaseAnalytics">
                        <p>Purchase</p>
                        <ProgressBar
                            striped
                            variant="danger"
                            label={
                                Math.round(
                                    (pageViewCountList.Purchase / totalCount) *
                                        10000
                                ) /
                                    100 +
                                "%"
                            }
                            now={
                                (pageViewCountList.Purchase / totalCount) * 100
                            }
                        />
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <h2> Sales record</h2>
            {/* <BootstrapTable
                keyField="id"
                data={salesRecord}
                columns={salesRecordColumns}
            /> */}
            <br></br>
            <h2> Visit record</h2>
            <div>{visitRecord.map((record) => renderDailyVisits(record))}</div>
        </>
    );
};

export default AdminView;
