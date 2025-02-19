import { Box } from "@mui/system";
import {
    Autocomplete,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dispatch, SetStateAction, useState } from "react";
import top100Films from "@/data/top100films";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/pl';

interface AddFlightProps {
    addLogPopUp: boolean;
    setAddLogPopUp: Dispatch<SetStateAction<boolean>>;
}

type StartEndType = 'ICAOCode' | 'LatLon' | 'Name';

const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        hours.push({ label: hour, value: hour });
    }
    return hours;
};

const generateMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
        const minute = i < 10 ? `0${i}` : `${i}`;
        minutes.push({ label: minute, value: minute });
    }
    return minutes;
};

const AddFlight = ({ addLogPopUp, setAddLogPopUp }: AddFlightProps) => {
    const [startType, setStartType] = useState<StartEndType>('ICAOCode');
    const [endType, setEndType] = useState<StartEndType>('ICAOCode');

    dayjs.locale('pl');

    return (
        <Modal
            open={addLogPopUp}
            onClose={() => setAddLogPopUp(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    maxHeight: '80vh', // Maksymalna wysokość modalu
                    overflowY: 'auto',  // Przewijanie w osi Y
                    color: 'black',
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '36px',
                }}
            >
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Dodaj lot
                </Typography>
                <Divider>Statek powietrzny</Divider>
                <div className="flex justify-between">
                    <FormControl sx={{ minWidth: 240 }}>
                        <InputLabel id="demo-simple-select-helper-label">Wybierz producenta</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Wybierz samolot"
                        >
                            <MenuItem value="">
                                <em>Brak</em>
                            </MenuItem>
                            <MenuItem value={10}>Piper</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 240 }}>
                        <InputLabel id="demo-simple-select-helper-label">Wybierz model</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Wybierz samolot"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>P28 Warrior</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Divider>Początek lotu</Divider>
                <div className="flex flex-col gap-6">
                    <InputLabel id="demo-simple-select-helper-label">Miejsce startu</InputLabel>
                    <FormControl className="flex justify-center items-start">
                        <RadioGroup
                            value={startType}
                            onChange={(event) => setStartType(event.target.value as StartEndType)}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="ICAOCode" control={<Radio />} label="Kod ICAO" />
                            <FormControlLabel value="LatLon" control={<Radio />} label="Współrzędne geograficzne" />
                            <FormControlLabel value="Name" control={<Radio />} label="Nazwa własna" />
                        </RadioGroup>
                    </FormControl>
                    {startType === 'ICAOCode' && (
                        <FormControl sx={{ minWidth: 240 }}>
                            <Autocomplete
                                disablePortal
                                options={top100Films}
                                sx={{ width: 240 }}
                                renderInput={(params) => <TextField {...params} label="Lotnisko ICAO" />}
                            />
                        </FormControl>
                    )}
                    {startType === 'LatLon' && (
                        <div className="flex justify-between">
                            <FormControl sx={{ minWidth: 240 }}>
                                <TextField id="outlined-basic" label="Szerokość geograficzna (lat)" variant="outlined" />
                            </FormControl>
                            <FormControl sx={{ minWidth: 240 }}>
                                <TextField id="outlined-basic" label="Dlugość geograficzna (lon)" variant="outlined" />
                            </FormControl>
                        </div>
                    )}
                    {startType === 'Name' && (
                        <div className="flex justify-between">
                            <FormControl sx={{ width: '100%' }}>
                                <TextField id="outlined-basic" label="Nazwa własna" variant="outlined" />
                            </FormControl>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-6'>
                    <InputLabel id="demo-simple-select-helper-label">Dzień i czas startu (UTC)</InputLabel>
                    <div className="flex justify-between">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pl'>
                            <DatePicker
                                className='w-[240px]'
                                label="Data startu"
                                views={['year', 'month', 'day']}
                            />
                        </LocalizationProvider>
                        <div className="w-[240px] flex gap-2">
                            <Autocomplete
                                disablePortal
                                options={generateHours()}
                                sx={{ width: 240 }}
                                renderInput={(params) => <TextField {...params} label="Godzina" />}
                            />
                            <Autocomplete
                                disablePortal
                                options={generateMinutes()}
                                sx={{ width: 240 }}
                                renderInput={(params) => <TextField {...params} label="Minuta" />}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <InputLabel id="demo-simple-select-helper-label">Przebieg silnika</InputLabel>
                    <div className="flex justify-between">
                        <FormControl sx={{ width: '240px' }}>
                            <TextField id="outlined-basic" type='number' label="Początkowy przebieg" variant="outlined" />
                        </FormControl>
                    </div>
                </div>
                <Divider>Koniec lotu</Divider>
                <div className="flex flex-col gap-6">
                    <InputLabel id="demo-simple-select-helper-label">Miejsce lądowania</InputLabel>
                    <FormControl className="flex justify-center items-start">
                        <RadioGroup
                            value={endType}
                            onChange={(event) => setEndType(event.target.value as StartEndType)}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="ICAOCode" control={<Radio />} label="Kod ICAO" />
                            <FormControlLabel value="LatLon" control={<Radio />} label="Współrzędne geograficzne" />
                            <FormControlLabel value="Name" control={<Radio />} label="Nazwa własna" />
                        </RadioGroup>
                    </FormControl>
                    {endType === 'ICAOCode' && (
                        <FormControl sx={{ minWidth: 240 }}>
                            <Autocomplete
                                disablePortal
                                options={top100Films}
                                sx={{ width: 240 }}
                                renderInput={(params) => <TextField {...params} label="Lotnisko ICAO" />}
                            />
                        </FormControl>
                    )}
                    {endType === 'LatLon' && (
                        <div className="flex justify-between">
                            <FormControl sx={{ minWidth: 240 }}>
                                <TextField id="outlined-basic" label="Szerokość geograficzna (lat)" variant="outlined" />
                            </FormControl>
                            <FormControl sx={{ minWidth: 240 }}>
                                <TextField id="outlined-basic" label="Dlugość geograficzna (lon)" variant="outlined" />
                            </FormControl>
                        </div>
                    )}
                    {endType === 'Name' && (
                        <div className="flex justify-between">
                            <FormControl sx={{ width: '100%' }}>
                                <TextField id="outlined-basic" label="Nazwa własna" variant="outlined" />
                            </FormControl>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-6'>
                    <InputLabel id="demo-simple-select-helper-label">Dzień i czas startu (UTC)</InputLabel>
                    <div className="flex justify-between">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pl'>
                            <DatePicker
                                className='w-[240px]'
                                label="Data startu"
                                views={['year', 'month', 'day']}
                            />
                        </LocalizationProvider>
                        <div className="w-[240px] flex gap-2">
                            <Autocomplete
                                disablePortal
                                options={generateHours()}
                                sx={{ width: 240 }}
                                renderInput={(params) => <TextField {...params} label="Godzina" />}
                            />
                            <Autocomplete
                                disablePortal
                                options={generateMinutes()}
                                sx={{ width: 240 }}
                                renderInput={(params) => <TextField {...params} label="Minuta" />}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <InputLabel id="demo-simple-select-helper-label">Przebieg silnika</InputLabel>
                    <div className="flex justify-between">
                        <FormControl sx={{ width: '240px' }}>
                            <TextField id="outlined-basic" type='number' label="Końcowy przebieg" variant="outlined" />
                        </FormControl>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default AddFlight;