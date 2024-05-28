import BasicTable from "./BasicTable";


const Profits = ({profits,setProfits}) => {
        const columns = [
            {label: "Year", accessor: "year"},
            {label: "Month", accessor: "month"},
            {label: "Expenses", accessor: "overall_expenses"},
            {label: "Gross", accessor: "overall_gross"},
            {label: "Profit", accessor: "cumulative_profit"},
            // {label: "Average profit per cake", accessor: "average_profit_per_cake"},
        ];
    if (profits !== null)
        return (<div><BasicTable columns={columns} data={profits} setData={setProfits}/></div>)
}

export default Profits;
