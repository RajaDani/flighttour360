
import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
    // typography: {
    //     fontFamily: comfortaa,
    // },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },

        MuiInputLabel: {
            defaultProps: {
                sx: {
                    fontSize: "13px",
                },
            },
        },
    },
    listItemText: {
        // fontFamily: comfortaa,
        textDecoration: "none !important",
    },
});

export default customTheme;
