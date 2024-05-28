import {Button, Grid, InputLabel, Paper, TextField, Typography} from "@mui/material";
import {useDate, useDropdown, useField} from "../hooks";
import Expenses from "../services/Expenses";
import Profits from "../services/Profits";

const AddExpense = ({setMessage,setError, setExpenses, expenses, profileId,cakes,profits,setProfits}) => {

    const categoryOptions = ['Ingredients', 'Equipment', 'Packaging', 'Other'
    ]

    const getCakeNames = () => {
        return cakes.map(c => c.name)
    }

    const {reset: resetDate, DateInput: SelectDate, value: date, year, month} = useDate()

    const {reset: resetItem, ...item} = useField('text', '')
    const {reset: resetCost, ...cost} = useField('number', '')
    const {
        reset: resetCategory,
        selectedValue: category,
        Dropdown: CategoryDropdown
    } = useDropdown(categoryOptions);

    const {
        reset: resetCakes,
        selectedValue: selectedCake,
        Dropdown: CakesDropdown
    } = useDropdown(getCakeNames());

    const getLastYearProfit=(year)=>{
       const lastYearProfit = Profits.getByYearAndMonth(year-1,"December",profileId)
        return lastYearProfit!==null?lastYearProfit.cumulative_profit:0
    }
    const addNew = (expense) => {
        Expenses.create(expense).then(async (savedExpense) => {
            setExpenses(expenses.concat(savedExpense))
            const profit =await Profits.getByYearAndMonth(year, month,profileId)
            if(profit){// updating existing profit
                const newProfit ={...profit}
                newProfit.overall_expenses = parseInt(profit.overall_expenses) + parseInt(expense.cost)
                newProfit.cumulative_profit =  parseInt(profit.cumulative_profit)-expense.cost
                newProfit.expenses=profit.expenses.concat(savedExpense.id)

                const updatedProfit =await Profits.update(newProfit.id,newProfit)
                setProfits(profits.map(profit=>profit.id !== updatedProfit.id?profit: updatedProfit))

            }else{// creating new profit
                const lastYearProfit = getLastYearProfit(year);
                const overallExpenses = expense.cost;
                const cumulativeProfit = Number.isFinite(lastYearProfit) && Number.isFinite(overallExpenses)
                    ? lastYearProfit - overallExpenses
                    : -overallExpenses;
                const newProfit = {
                    year:year,
                    month: month,
                    overall_expenses:expense.cost,
                    overall_gross:0,
                    cumulative_profit: cumulativeProfit,
                    expenses:[savedExpense.id],
                    average_profit_per_cake:0,
                    profileId:profileId
                }
                const updatedProfit = await Profits.create(newProfit)
                setProfits(profits.concat(updatedProfit))
            }
            setMessage(`A new expense of ${item.value} is added!`)

        }).catch((error) => {
            setError(error.response.data.error);
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        let expenseObject = {
            date: date.toString(),
            item: item.value,
            cost: cost.value,
            category: category,
            linkedCake: cakes.find(cake => cake.name === selectedCake),
            profileId:profileId
        }
        addNew(
            expenseObject
        )
        clearInputs(e)

    }
    const clearInputs = (e) => {
        e.preventDefault()
        resetDate()
        resetItem()
        resetCost()
        resetCategory()
        resetCakes()
    }

    return (<div>
        <Typography variant='h5' align='justify'>Add a new expense</Typography>
        <Paper>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <InputLabel>Date:</InputLabel>
                {/*<input {...date}/>*/}
                <SelectDate required/>
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Item:</InputLabel>
                <TextField size="small"
                           variant="filled"
                           label="Accepts text"
                           placeholder="Enter item name here"
                           type="text"
                           // inputProps={{maxLength: 10}}
                           fullWidth
                           required {...item}/>
            </Grid>
            <Grid item xs={4}>

                <InputLabel>Cost:</InputLabel>
                <TextField
                    variant="outlined"
                    label="Accepts only numbers"
                    placeholder="Enter cost here"
                    type="number"
                    inputProps={{maxLength: 5}}
                    fullWidth
                    required {...cost}/>
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Category:</InputLabel>
                <CategoryDropdown/>
            </Grid>
            <Grid item xs={4}>
                <InputLabel>Cake:</InputLabel>
                <CakesDropdown required/>
            </Grid>
            <Grid item xs={6}>

                <Button onClick={handleSubmit} variant="contained" color="primary">Create</Button>

                <Button onClick={clearInputs} variant="contained" color="primary">Reset</Button>
            </Grid>
        </Grid>
        </Paper>
    </div>)
}
export default AddExpense