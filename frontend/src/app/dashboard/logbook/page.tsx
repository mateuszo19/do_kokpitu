"use client"

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import Paper from '@mui/material/Paper';
import {useState} from "react";
import AddFlight from "@/components/AddFlight/AddFlight";

interface Column {
    id: 'id' | 'plane' | 'startDate' | 'startPlace' | 'startEngineOperatingHours' | 'endDate' | 'endPlace' | 'endEngineOperatingHours';
    label: string;
    minWidth?: number;
    align?: 'center' | 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        id: 'id',
        label: 'Lp.',
        minWidth: 30
    },
    {
        id: 'plane',
        label: 'Samolot',
        minWidth: 100
    },
    {
        id: 'startDate',
        label: 'Godzina startu',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'startPlace',
        label: 'Miejsce startu',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'startEngineOperatingHours',
        label: 'Przebieg silnika',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'endDate',
        label: 'Godzina startu',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'endPlace',
        label: 'Miejsce startu',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'endEngineOperatingHours',
        label: 'Przebieg silnika',
        minWidth: 170,
        align: 'center',
    }
];

interface Data {
    id: number;
    plane: string;
    startDate: string;
    startPlace: string;
    startEngineOperatingHours: number;
    endDate: string;
    endPlace: string;
    endEngineOperatingHours: number;
}

function createData(
    id: number,
    plane: string,
    startDate: string,
    startPlace: string,
    startEngineOperatingHours: number,
    endDate: string,
    endPlace: string,
    endEngineOperatingHours: number,
): Data {
    return { id, plane, startDate, startPlace, startEngineOperatingHours, endDate, endPlace, endEngineOperatingHours };
}

const renderEngineOperatingHours = (value: number) => {
    const integerPart = Math.floor(value);
    const decimalPart = Math.round(((value) - integerPart) * 10);

    const integerDigits = integerPart.toString().split('');

    return (
        <div className='flex justify-end items-center'>
            {integerDigits.map((digit, index) => (
                <div key={index} className='bg-black text-white border rounded-md px-2 py-2 mx-1'>
                    {digit}
                </div>
            ))}
            <div className='bg-white text-red-600 px-2 py-2 mx-1 border rounded-md'>
                .{decimalPart}
            </div>
        </div>
    );
};

const rows = [
    createData(1, 'Piper P28 Warrior (SP-MZT)', '12:30 03-02-2025', 'POZ', 12.4, '12:30 03-02-2025', 'POZ', 12.6),
    createData(1, 'Piper P28 Warrior (SP-MZT)', '12:30 03-02-2025', 'POZ', 1122.4, '12:30 03-02-2025', 'POZ', 1127.6),
];

export default function LogBook() {
    const [ addLogPopUp, setAddLogPopUp ] = useState<boolean>(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className='flex items-center'>
                <h1 className='text-primary text-3xl'>LogBook</h1>

            </div>
            <div className='flex items-center gap-8'>
                <div className='rounded-xl bg-white px-8 py-4 shadow'>
                    <TextField variant="outlined" size="small" label="Wyszukaj lot" id="fullWidth" />
                </div>
                <div className='rounded-xl bg-white px-8 py-4 shadow'>
                    <Button
                        onClick={() => {setAddLogPopUp(true)}}
                        variant="contained"
                        color="success">Dodaj lot</Button>
                </div>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={2}>
                                    {/*Country*/}
                                </TableCell>
                                <TableCell align="center" colSpan={3}>
                                    Start
                                </TableCell>
                                <TableCell align="center" colSpan={3}>
                                    Zakończenie
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === 'startEngineOperatingHours' || column.id === 'endEngineOperatingHours'
                                                            ? renderEngineOperatingHours(Number(value)) // Zastosowanie niestandardowego renderowania
                                                            : column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {addLogPopUp && (
                <AddFlight setAddLogPopUp={setAddLogPopUp} addLogPopUp={addLogPopUp} />
            )}
        </div>
    );
}
