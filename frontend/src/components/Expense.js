import {useState} from "react";
import BasicTable from "./BasicTable";
import AddExpense from "./AddExpense";


const Expense = ({cakes,profits,expenseData,setProfits,profileId,setError,setMessage}) => {
    const [expenses, setExpenses] = useState(expenseData)
    // const cakes = props.data.cakes
    // const profits = props.data.profits

    const columns = [
        {label: "Date", accessor: "date"},
        {label: "Item", accessor: "item"},
        {label: "Cost", accessor: "cost"},
        {label: "Category", accessor: "category"}
    ];

    return (
        <div>
            <BasicTable columns={columns} data={expenses} setData={setExpenses}></BasicTable>
            <AddExpense setMessage={setMessage} setError={setError} setExpenses={setExpenses}
                        expenses={expenses} profileId={profileId} cakes={cakes}
            setProfits={setProfits} profits={profits}/>
        </div>
    )

}
export default Expense
