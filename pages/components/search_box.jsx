import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '20rem',
        marginTop: '1rem'
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function search_box({ searchInputValue }) {

    var searchInputDelayTimer;
    function handleSearchInputOnChange(inputString) {
        clearTimeout(searchInputDelayTimer);
        searchInputDelayTimer = setTimeout(function() {
            searchInputValue(inputString)
        }, 1000);
    }

    return(
        <div className="search-wrapper">
            <Search className="search-container">
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                className="search-input"
                placeholder="Suche…"
                onChange={(e) => handleSearchInputOnChange(e)}
            />
            </Search>
        </div>
    )
};
