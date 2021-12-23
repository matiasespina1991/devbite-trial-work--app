import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function TableFilters({userIdFilterValue , quelleFilterValue , resultsLimitFilterValue , darkModeSwitch , darkModeIsOn }) {

    const darkModeSwitch_Label = darkModeIsOn ? "Dark Mode is ON" : "Dark Mode is OFF"

    return(
        <>
        <div className="table-filters--container">

            <div className="filter">
                <TextField id="user-id" onChange={userIdFilterValue} label="USER ID" variant="outlined" />
            </div>

            <div className="filter">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel>Quelle</InputLabel>
                        <Select
                            labelId="quelle"
                            label="Quelle"
                            onChange={quelleFilterValue}
                        >
                            <MenuItem value={-1}>- Alle -</MenuItem>
                            <MenuItem value={9}>HOMEPAGE-TOOL</MenuItem>
                            <MenuItem value={10}>SHOW-ROOOOM</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {/* <p>QUELLE: </p>
                <select onChange={quelleFilterValue} defaultValue={'HOMEPAGE-TOOL'} name="quelle">
                    <option value="-1">- Alle -</option>
                    <option value="9">HOMEPAGE-TOOL</option>
                    <option value="10">SHOW-ROOOOM</option>
                </select> */}
            </div>

            <div className="filter">
                <p>Filter number of results: </p>
                <select onChange={resultsLimitFilterValue} defaultValue={'20'} name="limit-select">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>

            <FormGroup className="filter dark-mode-switch">
                <FormControlLabel control={<Switch inputProps={{ 'aria-label': 'controlled' }} onChange={darkModeSwitch} defaultChecked />} label={darkModeSwitch_Label} />
            </FormGroup>

        </div>
        </>
    )
}
