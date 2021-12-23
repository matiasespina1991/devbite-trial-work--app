import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function DarkModeSwitch({ darkModeSwitch , darkModeIsOn }) {
    

    const darkModeSwitch_Label = darkModeIsOn ? "Dark Mode is ON" : "Dark Mode is OFF"
    return(
        <FormGroup className="filter dark-mode-switch">
            <FormControlLabel control={<Switch inputProps={{ 'aria-label': 'controlled' }} onChange={darkModeSwitch} defaultChecked />} label={darkModeSwitch_Label} />
        </FormGroup>
    )

};
