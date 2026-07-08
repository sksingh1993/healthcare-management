import { TextField } from "@mui/material";

export default function AppTextField({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    required = false,
    type = "text",
    multiline = false,
    rows = 1,
    ...rest
}) {
    return (
        <TextField
            fullWidth
            label={type === "date" ? undefined : label}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            type={type}
            error={Boolean(error)}
            helperText={helperText}
            multiline={multiline}
            rows={rows}
            slotProps={{
                inputLabel: {
                    shrink: true
                }
            }}
            {...rest}
        />
    );
}