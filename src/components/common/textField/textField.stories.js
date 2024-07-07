import { TextField } from './textField';

export default {
    title: 'Components/Common/TextField',
    component: TextField,
};

export const Default = {
    args: {
        label: 'Default',
    },
};

export const WithIcon = {
    args: {
        label: 'Inout With Icon',
    },
};

export const HelperTextOnly = {
    args: {
        label: 'Inout With Helper Text Only',
        helperText: 'Helper Text',
    },
};
