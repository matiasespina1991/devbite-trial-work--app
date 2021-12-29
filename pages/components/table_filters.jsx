import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Select from '@mui/material/Select';
import { de } from "date-fns/locale";

export default function TableFilters({firmaFilterValue , userIdFilterValue , quelleFilterValue , quelleFilter , levelFilterValue , resultsLimit , resultsLimitFilterValue , dateFromValue, dateFromFilter , dateToValue, dateToFilter }) {

    return(
        <>
        <div className="table-filters--container">

        <div className="filter">
                <Box sx={{ minWidth: 170 }}>
                    <FormControl fullWidth>
                        <InputLabel>Level</InputLabel>
                        <Select
                            labelId="level"
                            label="Level"
                            defaultValue=""
                            onChange={levelFilterValue}
                        >
                            <MenuItem value={-1}>- Alle -</MenuItem>
                            <MenuItem value={0}>Unknown (0)</MenuItem>
                            <MenuItem value={1}>Critical Error (1)</MenuItem>
                            <MenuItem value={2}>Error (2)</MenuItem>
                            <MenuItem value={3}>Warning (3)</MenuItem>
                            <MenuItem value={4}>Info (4)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div className="filter">
                <Box sx={{ minWidth: 170 }}>
                    <FormControl fullWidth>
                        <InputLabel>Quelle</InputLabel>
                        <Select
                            labelId="quelle"
                            label="Quelle"
                            defaultValue=""
                            value={quelleFilter ? quelleFilter : ""}
                            onChange={quelleFilterValue}
                        >
                            <MenuItem value={-1}>- Alle -</MenuItem>
                            <MenuItem value={9}>HOMEPAGE-TOOL</MenuItem>
                            <MenuItem value={10}>SHOW-ROOOOM</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div className="filter">
                <TextField id="user-id" onChange={userIdFilterValue} label="User ID" variant="outlined" />
            </div>

            <div className="filter">
                <TextField id="firma" onChange={firmaFilterValue} label="Firma" variant="outlined" />
            </div>

            <div className="filter">
                <LocalizationProvider locale={de} dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Datum von"
                        inputFormat="dd.MM.yyyy"
                        mask="__.__.____"
                        minDate={978318000000}
                        maxDate={new Date (dateToFilter)}
                        value={dateFromFilter}
                        onChange={dateFromValue}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>

            <div className="filter">
                <LocalizationProvider locale={de} dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Datum bis"
                        inputFormat="dd.MM.yyyy"
                        mask="__.__.____"
                        minDate={new Date (dateFromFilter)}
                        maxDate={Date.now()}
                        value={dateToFilter}
                        onChange={dateToValue}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>

            <div className="filter">
                <Box sx={{ minWidth: 150 }}>
                    <FormControl fullWidth>
                        <InputLabel>Anzahl der Ergebnisse</InputLabel>
                        <Select
                            labelId="limit-select"
                            label="Anzahl der Ergebnisse"
                            defaultValue={resultsLimit && resultsLimit}
                            value={resultsLimit && resultsLimit}
                            onChange={resultsLimitFilterValue}
                        >
                            { quelleFilter !== -1 && <MenuItem value={-1}>Alle anzeigen</MenuItem> }
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={500}>500</MenuItem>
                            <MenuItem value={1000}>1000</MenuItem>
                            <MenuItem value={2500}>2500</MenuItem>
                            <MenuItem value={5000}>5000</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

        </div>
        </>
    )
}
