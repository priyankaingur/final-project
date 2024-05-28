import {useDropdownWithSort} from "../hooks";
import {useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
    tableCellClasses,
    styled,
    TablePagination,
    Modal, Box,
} from '@mui/material'
import Cakes from "../services/Cakes";
import Expenses from "../services/Expenses";
import Incomes from "../services/Incomes";
import theme from "../theme";

const BasicTable = ({columns, data, setData}) => {
    const [page, setPage] = useState(0);
    const rowsPerPageOptions = [3, 6, 9];
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const [selectedCellValue, setSelectedCellValue] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getCakes = async (cakeArr) => {
        if (!cakeArr || cakeArr.length === 0) {
            return [];
        }
        const cakePromises = cakeArr.map((id) => Cakes.getById(id));
        const cakes = await Promise.all(cakePromises);
        return cakes.map((cake) => cake.name);
    }

    const getExpenses = async (ExpenseArr) => {
        if (!ExpenseArr || ExpenseArr.length === 0) {
            return [];
        }
        const expensePromises = ExpenseArr.map(async (id) => Expenses.getById(id).then((res) => {
            return res
        }));
        const expenses = await Promise.all(expensePromises);
        return expenses.map((exp) => exp.item);
    }

    const getIncomes = async (incomeArr) => {
        if (!incomeArr || incomeArr.length === 0) {
            return [];
        }
        const incomePromises = incomeArr.map(async (id) => await Incomes.getById(id).then((res) => {
            return res
        }));
        const incomes = await Promise.all(incomePromises);
        return incomes.map((inc) => inc.source);
    }


    const PopupForm = ({cellValue, onClose, data}) => {
        const [linkedCakes, setLinkedCakes] = useState([]);
        const [linkedExpenses, setLinkedExpenses] = useState([]);
        const [linkedIncomes, setLinkedIncomes] = useState([]);

        const style = {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        };


        useEffect(() => {
            const getCakesData = async () => {
                const cakeNames = await getCakes(data.cakes);
                setLinkedCakes(cakeNames);
            }
            getCakesData();
        }, [data.cakes])

        useEffect(() => {
            const getExpenseData = async () => {
                const expenseItems = await getExpenses(data.expenses);
                setLinkedExpenses(expenseItems.length !== 0 ? expenseItems : ["No linked Expense found"]);
            }
            getExpenseData();
        }, [data.expenses])

        useEffect(() => {
            const getIncomeData = async () => {
                const incomeSource = await getIncomes(data.incomes);
                setLinkedIncomes(incomeSource.length !== 0 ? incomeSource : ["No linked sources found"]);
                console.log(incomeSource)
            }
            getIncomeData();
        }, [data.incomes])

        return (<div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            ><Box style={style}>
                <h2>You clicked on <b>{cellValue}</b></h2>
                {data.cakes ? (<>
                    <div>{linkedCakes} Linked Cake is found</div>
                </>) : (data.expenses ? (<>
                        <div>Linked expenses items are <ul>
                            {linkedExpenses.map((expense, index) => (<li key={index}>{expense}</li>))}
                        </ul></div>
                        <div>Linked incomes sources are <ul>
                            {linkedIncomes.map((income, index) => (<li key={index}>{income}</li>))}
                        </ul></div>
                    </>

                ) : (<> </>))}
                <button onClick={onClose}>Close</button></Box></Modal>
            </div>);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const {
        arrangeData: sort, Dropdown: SortDropdown
    } = useDropdownWithSort(columns, data, setData);

    useEffect(() => {
        sort()
    }, [])
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.secondaryLight.main, color: theme.palette.common.white,
        }, [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        }, cursor: 'pointer',
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }, '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const Head = ({columns}) => {

        return (<TableHead>
            <StyledTableRow>
                {columns.map(({label, accessor}) => {
                    // return <th key={accessor} onClick={() => handleSort({accessor})}>{label}{getArrow()}</th>;
                    return <StyledTableCell component="th" scope="row" align="right"
                                            key={accessor}>{label}</StyledTableCell>;

                })}
            </StyledTableRow>
        </TableHead>)
    }
    const Body = ({columns, data}) => {

        const handleClick = (e, data, tData) => {
            setSelectedCellValue(tData);
            setSelectedData(data)
            setOpen(true);
        }
        return (<TableBody>

            {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => {
                    // {data.map((data) => {
                    return (<StyledTableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}} key={data.id}>

                            {columns.map(({accessor}, index) => {
                                // const d=data
                                const tData = data[accessor] ? data[accessor] : "0";
                                return <StyledTableCell onClick={(e) => handleClick(e, data, tData)} align="right"
                                                        key={index}>{tData}</StyledTableCell>;
                            })}
                        </StyledTableRow>)
                })}

        </TableBody>)
    }
    if (data) return (<div>
            <SortDropdown/>

            <TableContainer component={Paper}>
                <Table stickyHeader sx={{minWidth: 650}} aria-label="simple table">
                    <Head columns={columns}/>
                    <Body columns={columns} data={data} setData={setData}/>
                </Table>
            </TableContainer>
        <Paper>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /></Paper>{selectedCellValue && (<div>
                    <PopupForm cellValue={selectedCellValue} data={selectedData} onClose={() => {
                        setSelectedCellValue(null)
                        setSelectedData(null)
                        setOpen(false);
                    }}/>

            </div>)}</div>)
}

export default BasicTable