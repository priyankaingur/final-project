import {useDate, useDropdown, useField} from "../hooks";
import 'react-datepicker/dist/react-datepicker.css'

import {useState} from "react";
import Incomes from "../services/Incomes";
import {Button, Grid, InputLabel, Paper, TextField, Typography} from "@mui/material";
import Profits from "../services/Profits";
import BasicTable from "./BasicTable";


const Income = (props) => {
    const [incomes, setIncomes] = useState(props.incomes)
    const cakes = props.cakes
    const profits = props.profits

    const categoryOptions = ['Cake Sales','Custom Cake Order','Supply Sales', 'Teaching', 'Other' ]
    const cakeList = cakes?.map(c=>c.name)

    const {reset: resetDate, DateInput:SelectDate,value:date, year, month} = useDate()
    const {reset: resetAmount, ...amount} = useField('number', '')
    const {
        reset: resetSource,
        selectedValue: source,
        Dropdown: CategoryDropdown,
    } = useDropdown( categoryOptions);

    const {
        reset: resetCakes,
        selectedValue: selectedCake,
        Dropdown: CakesDropdown
    } = useDropdown(cakeList);
    const getLastYearProfit=(year)=>{
        const lastYearProfit = Profits.getByYearAndMonth(year-1,"December",props.profileId)
        return lastYearProfit!==null?lastYearProfit.cumulative_profit:0
    }

    const getAverageProfitPerCake = (newIncome, newProfit) => {
        if (newIncome.source === "Cake Sales") {
            const cumulativeProfit = Number.isFinite(newProfit.cumulative_profit) ? newProfit.cumulative_profit : 0;
            const incomes = Array.isArray(newProfit.incomes) ? newProfit.incomes.map(income =>{
                 return Incomes.getById(income)
            } ): [];
            const numCakes = incomes.filter(income => income.source === "Cake Sales").reduce((sum, income) => sum + parseInt(income.num_of_cakes), 0);
            return numCakes > 0 ? cumulativeProfit / numCakes : 0;
        }
    }
    const addNew = async (income) => {
        await Incomes.create(income).then(async (newIncome) => {
            console.log("newIncome:", newIncome);
            setIncomes(incomes.concat(newIncome))

            const profit = await Profits.getByYearAndMonth(year, month, props.profileId)
            let newProfit;
            if (profit) {// updating existing profit
                newProfit = {...profit}

                const overallGross = Number.isFinite(parseInt(profit.overall_gross)) ? parseInt(profit.overall_gross) : 0;
                const cumulativeProfit = Number.isFinite(parseInt(profit.cumulative_profit)) ? parseInt(profit.cumulative_profit) : 0;
                const amount = Number.isFinite(parseInt(income.amount)) ? parseInt(income.amount) : 0;

                newProfit.overall_gross = overallGross + amount;
                newProfit.cumulative_profit = cumulativeProfit + amount;
                newProfit.incomes = profit.incomes.concat(newIncome.id);
                newIncome.num_of_cakes = (newIncome.source === "Cake Sales") ? parseInt(newIncome.num_of_cakes) + 1 : newIncome.num_of_cakes
                newProfit.average_profit_per_cake = getAverageProfitPerCake(newIncome, newProfit)

                const updatedProfit = await Profits.update(newProfit.id, newProfit)
                props.setProfits(profits.map(profit => profit.id !== updatedProfit.id ? profit : updatedProfit))

            } else {// creating new profit
                const lastYearProfit = getLastYearProfit(year);
                const overallGross = income.amount;
                const cumulativeProfit = Number.isFinite(lastYearProfit) && Number.isFinite(overallGross)
                    ? lastYearProfit + overallGross
                    : overallGross;
                newProfit = {
                    year: year,
                    month: month,
                    overall_expenses: 0,
                    overall_gross: newIncome.amount,
                    cumulative_profit: cumulativeProfit,
                    incomes: [newIncome.id],
                    profileId: props.profileId
                }
                newIncome.num_of_cakes = (newIncome.source === "Cake Sales") ? 1 : 0
                newProfit.average_profit_per_cake = getAverageProfitPerCake(newIncome, newProfit)
                const updatedProfit = await Profits.create(newProfit)
                props.setProfits(profits.concat(updatedProfit))

            }
            props.setMessage(`A new income of $${amount.value} is added!`)
        }).catch((error) => {
            console.log(error)
            props.setError(error.response.data.error)
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let incomeObject = {
            date: date.toString(),
            amount: amount.value,
            source: source,
            profileId:props.profileId
        }
        if(selectedCake!==null)
            incomeObject.linkedCake=(cakes.find(cake=>cake.name===selectedCake)).id

        addNew(
            incomeObject
        )
        clearInputs(e)

    }
    const clearInputs = (e) => {
        e.preventDefault()
        resetDate()
        resetAmount()
        resetSource()
        resetCakes()
    }
    const columns = [
        {label: "Date", accessor: "date"},
        {label: "Source", accessor: "source"},
        {label: "Amount", accessor: "amount"}
    ];
    const getLinkedCake=()=>{
        if(source === "Cake Sales" && cakeList && cakeList.length !== 0)
        return(<><InputLabel>Cake:</InputLabel>
        <CakesDropdown required/></>)
    }

    return (
        <div>
            <BasicTable columns={columns} data={incomes} setData={setIncomes}></BasicTable>
            <Paper>
            <Typography variant='h5' align='justify'>Add a new income</Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                        <InputLabel>Date:</InputLabel><SelectDate required/>
                </Grid>
                <Grid item xs={4}>
                <InputLabel>Source:</InputLabel>
                        <CategoryDropdown required/>
                </Grid>
                <Grid item xs={4}>

                {getLinkedCake()}
                </Grid>
                <Grid item xs={4}>

                <InputLabel>Amount:</InputLabel>
                        <TextField variant="outlined"
                                   label="Accepts only numbers"
                                   placeholder="Enter amount here"
                                   type="number"
                                   inputProps={{ maxLength: 5 }}
                                   fullWidth
                            required {...amount}/>
                </Grid>
            </Grid>
                <Grid item xs={6}>

                    <Button onClick={handleSubmit} variant="contained" color="primary" >Create</Button>
                    <Button onClick={clearInputs} variant="contained" color="primary" >Reset</Button>

            </Grid>
            </Paper>
        </div>
    )

}
export default Income
