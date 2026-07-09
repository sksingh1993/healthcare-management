import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText
} from "@mui/material";

export default function AppSelect({

    label,
    name,
    value,
    onChange,
    options=[],
    error,
    helperText,
    required = false

}) {

    return (

        <FormControl
            fullWidth
            required={required}
            error={!!error}
        >

            <InputLabel>{label}</InputLabel>

            <Select
                name={name}
                value={value}
                label={label}
                onChange={onChange}
            >

                {
                    (options || []).map(option => (

                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.value}
                        </MenuItem>

                    ))
                }

            </Select>

            <FormHelperText>

                {helperText}

            </FormHelperText>

        </FormControl>

    );

}