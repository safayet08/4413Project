import { useEffect, useState } from "react";
import { getSalesRecords, getVisitTable } from "../services/adminService";
import AddItemForm from "./AddItemForm";
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
        };

        const fetchVisitTable = async () => {
            const records = await getVisitTable();
            setVisitRecord(records);
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
                <div className="flex-container" key="flex-container-key">
                    <div
                        className="flex-child-magenta"
                        key="flex-child-magenta-key"
                    >
                        {" "}
                        {pageViewCountList.date}{" "}
                    </div>

                    <div className="flex-child" key="homepageAnalytics">
                        <p key="homapageDesc">HomePage Views</p>
                        <ProgressBar
                            striped
                            variant="success"
                            key="homepageAnalyticsProgressBar"
                            label={pageViewCountList.HomePage}
                            now={Math.round(
                                (pageViewCountList.HomePage / totalCount) * 100
                            )}
                        />
                    </div>

                    <div className="flex-child" key="itemViewAnalytics">
                        <p key="itemViewPageDesc">Item Views</p>
                        <ProgressBar
                            striped
                            variant="info"
                            key="itemViewAnalyticsProgressBar"
                            label={pageViewCountList.ItemView}
                            now={Math.round(
                                (pageViewCountList.ItemView / totalCount) * 100
                            )}
                        />
                    </div>

                    <div className="flex-child" key="cartAddAnalytics">
                        <p key="cartAddPageDesc">Cart Add</p>
                        <ProgressBar
                            striped
                            variant="warning"
                            key="cartAddAnalyticsProgressBar"
                            label={pageViewCountList.CartAdd}
                            now={Math.round(
                                (pageViewCountList.CartAdd / totalCount) * 100
                            )}
                        />
                    </div>

                    <div className="flex-child" key="purchaseAnalytics">
                        <p key="purchasePageDesc">Purchase</p>
                        <ProgressBar
                            striped
                            variant="danger"
                            key="purchaseAnalyticsProgressBar"
                            label={pageViewCountList.Purchase}
                            now={Math.round(
                                (pageViewCountList.Purchase / totalCount) * 100
                            )}
                        />
                    </div>
                </div>
            </>
        );
    };

    const headerStyle = {
        border: "2px solid black",
        padding: "15px 15px 15px 15px",
    };
    const trtdStyle = {
        border: "2px solid black",
    };

    const renderTable = ({ theadData, tbodyData }) => {
        return (
            <table>
                <thead>
                    <tr key="table-row-head">
                        {theadData.map((heading, index) => {
                            return (
                                <th
                                    key={heading.dataField + index}
                                    style={headerStyle}
                                >
                                    {heading.text}
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                <tbody>
                    {tbodyData.map((row, index) => {
                        return (
                            <>
                                <tr
                                    key={row.toString() + index}
                                    style={trtdStyle}
                                >
                                    <td
                                        style={trtdStyle}
                                        key={row.name + index}
                                    >
                                        {row.name}
                                    </td>
                                    <td
                                        style={trtdStyle}
                                        key={row.sold + index}
                                    >
                                        {row.sold}
                                    </td>
                                    <td
                                        style={trtdStyle}
                                        key={row.price + index}
                                    >
                                        {row.price}
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <>

            <h2> Sales record</h2>
            {renderTable({
                theadData: salesRecordColumns,
                tbodyData: salesRecord,
            })}
            <br></br>
            <h2> Visit record</h2>
            <div>{visitRecord.map((record) => renderDailyVisits(record))}</div>
            <AddItemForm/>

        </>
    );
};

export default AdminView;
