/* eslint-disable react/prop-types */
import { TextField as MuiTextField } from '@mui/material';
import textFieldStyles from './textField.styles';

export const TextField = ({ label, helperText }) => {
    return (
        <MuiTextField
            helperText={helperText}
            label={label}
            sx={textFieldStyles.root}
            variant="filled"
        />
    );
};

export default TextField;
