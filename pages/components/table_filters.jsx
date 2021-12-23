import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Select from '@mui/material/Select';

export default function TableFilters({userIdFilterValue , quelleFilterValue , resultsLimitFilterValue , darkModeSwitch , darkModeIsOn , dateFromValue, dateFromFilter , dateToValue, dateToFilter }) {

    const darkModeSwitch_Label = darkModeIsOn ? "Dark Mode is ON" : "Dark Mode is OFF"

    return(
        <>
        <div className="table-filters--container">

            <div className="filter">
                <TextField id="user-id" onChange={userIdFilterValue} label="USER ID" variant="outlined" />
            </div>

            <div className="filter">
                <Box sx={{ minWidth: 150 }}>
                    <FormControl fullWidth>
                        <InputLabel>Quelle</InputLabel>
                        <Select
                            labelId="quelle"
                            label="Quelle"
                            value=""
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date from"
                        inputFormat="MM.dd.yyyy"
                        value={dateFromFilter}
                        onChange={dateFromValue}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>

            <div className="filter">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date to"
                        inputFormat="MM.dd.yyyy"
                        value={dateToFilter}
                        onChange={dateToValue}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>

            <div className="filter">
                <Box sx={{ minWidth: 150 }}>
                    <FormControl fullWidth>
                        <InputLabel>Filter number of results</InputLabel>
                        <Select
                            labelId="limit-select"
                            label="Filter number of results"
                            defaultValue={20}
                            onChange={resultsLimitFilterValue}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <FormGroup className="filter dark-mode-switch">
                <FormControlLabel control={<Switch inputProps={{ 'aria-label': 'controlled' }} onChange={darkModeSwitch} defaultChecked />} label={darkModeSwitch_Label} />
            </FormGroup>

        </div>
        </>
    )
}
