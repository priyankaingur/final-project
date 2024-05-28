import {useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import {Box, MenuItem} from "@mui/material";
import { Select } from '@mui/material';

export const useField = (type,defaultValue) => {
    const [value, setValue] = useState(defaultValue)

    const onChange = (event) => {
        const input=event.target.value
        setValue(input)
    }
    const reset = () => {
        setValue(defaultValue)
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}

export const useDropdown = ( options) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (options && options.length > 0 && value === '')
            setValue(options[0])

    }, [options])

        const reset = () => {
            setValue(options[0])
        }

        const Dropdown = () => (
            <Select
                value={value}
                onChange={(event) => {
                    setValue(event.target.value)
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        )
        return {
            selectedValue: value,
            Dropdown,
            reset,
        }

}

export const useDropdownWithSort = ( options,data,setData) => {
    const [value, setValue] = useState(options[0].accessor)
    const orderByOptions = [
        {value: 'asc', label: 'A-Z'},
        {value: 'desc', label: 'Z-A'}]
    const [sortOrder, setSortOrder] = useState(orderByOptions[1].value);
    const reset = () => {
        setValue(options[0].accessor)
    }

    useEffect(()=>{
    arrangeData()
    },[value,sortOrder,setData])

    const Dropdown = () => (<div>
        <Box style={{ justifyContent: 'space-between' }}>

            Sort By: <Select   labelId="demo-simple-select-label"
                               id="demo-simple-select"
            defaultValue={value}
            onChange={(event) => setValue(event.target.value)}
        >
            {options.map((option) => (<MenuItem key={option.accessor} value={option.accessor}>
                {option.label}
            </MenuItem>))}
        </Select>
        {/*</FormControl>*/}
        {/*    <FormControl sx={{ m: 1, minWidth: 120 }}>*/}
            Order By: <Select
            defaultValue={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
        >
            {orderByOptions.map((option) => (<MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>))}
        </Select>
        {/*</FormControl>*/}
            </Box></div>

    )

    const arrangeData=()=>{
        if(data){
            let sortedData = [...data];

            if (sortOrder === "asc") {
                sortedData.sort((a, b) => (a[value] > b[value] ? 1 : -1));
                setSortOrder("desc");
            } else {
                sortedData.sort((a, b) => (a[value] < b[value] ? 1 : -1));
                setSortOrder("asc");
            }
            setSortOrder(sortOrder)
            setData(sortedData);
        }
    }

    return {
        selectedValue: value,
        Dropdown,
        reset,
        arrangeData
    }
}

export const useDate = () => {
    const [value, setValue] = useState(new Date());

    const reset = () => {
        setValue(new Date())
    }

    const DateInput = () => (
        <DatePicker
            autoOk
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label="Select a date"
                    disabled={false}
                    fullWidth
            selected={value}
            onChange={date => setValue(date)}
        />
    )
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    };
    return {
        year: value.getFullYear(),
        month: value.toLocaleString('default', { month: 'long' }),
        value:formatDate(value),
        DateInput,
        reset,
    }
}

