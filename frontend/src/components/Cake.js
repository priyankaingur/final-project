import { useField} from "../hooks";
import 'react-datepicker/dist/react-datepicker.css'

import BasicTable from "./BasicTable";
import { Button, Grid, InputLabel, TextField, Typography} from "@mui/material";
import Cakes from "../services/Cakes";


const Cake = ({cakes, setCakes,profileId,setError,setMessage}) => {

    const {reset: resetName, ...name} = useField('text', '')
    const {reset: resetPrice, ...price} = useField('number', '')

    const addNew = (cake) => {
        Cakes.create(cake).then((savedCake)=>{
            setCakes(cakes.concat(savedCake))
            setMessage(`A new cake ${name.value} of price $${price.value} is added!`)
        }).catch((error) => {
            setError(error.response.data.error);
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let cakeObject = {
            name:name.value,
            price: price.value,
            profileId:profileId
        }
        addNew(
            cakeObject
        )
        clearInputs(e)

    }
    const clearInputs = (e) => {
        e.preventDefault()
        resetPrice()
        resetName()
    }
    const columns = [
        {label: "Name", accessor: "name"},
        {label: "Price", accessor: "price"}
    ];

    return (
        <div>
            <BasicTable columns={columns} data={cakes} setData={setCakes}></BasicTable>
            <Typography variant='h5' align='justify'>Add a new cake</Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                        <InputLabel>Name:</InputLabel>
                        <TextField variant="outlined"
                                   label="Accepts only text"
                                   placeholder="Enter cake name here"
                                   type="text"
                                   inputProps={{ maxLength: 15 }}
                                   fullWidth
                                   required {...name}/>
                </Grid>
                <Grid item xs={4}>
                        <InputLabel>Price:</InputLabel>
                        <TextField variant="outlined"
                                   label="Accepts only numbers"
                                   placeholder="Enter amount here"
                                   type="number"
                                   inputProps={{ maxLength: 5 }}
                                   fullWidth
                            required {...price}/>
                </Grid>
            </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" >Create</Button>
                    <Button onClick={clearInputs} variant="contained" color="primary" >Reset</Button>
                </Grid>
        </div>
    )

}
export default Cake
