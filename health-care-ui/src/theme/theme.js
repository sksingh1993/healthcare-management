import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        primary: {
            main: "#1976d2"
        },

        secondary: {
            main: "#388e3c"
        },

        background: {
            default: "#f5f7fa"
        }

    },

    shape: {
        borderRadius: 8
    }

});

export default theme;