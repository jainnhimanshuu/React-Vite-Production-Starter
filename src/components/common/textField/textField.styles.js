const textFieldStyles = {
    root: theme => ({
        '& .MuiFilledInput-root': {
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid black',
            '&:before': {
                borderBottom: 'none !important',
            },
            '&:after': {
                borderBottom: 'none !important',
            },
            '&:hover': {
                backgroundColor: 'white !important',
            },
        },
        '& .Mui-focused': {
            backgroundColor: 'white !important',
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '16px',
        },
    }),
};

export default textFieldStyles;
