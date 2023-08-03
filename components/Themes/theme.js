import { createTheme } from '@mui/material/styles';
import getthemeOptions from 'themeOptions';

let options = getthemeOptions();
// Create a theme instance.
const theme = createTheme({
    palette: {
        adFilter: {
            buttonBackgroundColor: {
                selected: '#555028',
                notSelected: '#111111',
            },
            hotBetBanner: {
                0: {
                    rightGradient: '#fdeb7d',
                    leftGradient: '#fff7c8',
                    activeTabBg: '#fffbe8',
                    activeTabFont: '#96893a',
                    inactiveTabBg: '#fdf0a1',
                    inactiveTabFont: '#96893a',
                },
                1: {
                    rightGradient: ' #fed99e',
                    leftGradient: '#feeeda',
                    activeTabBg: '#fdf6e6',
                    activeTabFont: '#b69b6c',
                    inactiveTabBg: '#fbe2b9',
                    inactiveTabFont: '#b69b6c',
                },
                2: {
                    rightGradient: '#dff0fa',
                    leftGradient: '#f3f8fc',
                    activeTabBg: '#f5fafd',
                    activeTabFont: '#6794b5',
                    inactiveTabBg: '#e3f1fa',
                    inactiveTabFont: '#517fa0',
                },
            },
        },
        grey2: {
            main: '#eeeff1',
        },
        primary: {
            main: options.colors.primary_main,
            contrastText: options.colors.contrastText,
            alternate: options.colors.primary_alternate,
            light1: options.colors.primary_light1,
            light2: options.colors.primary_light2,
            light3: options.colors.primary_light3,
            time: '#581663',
            main1: options.colors.primary_main1,
        },
        secondary: {
            main: options.colors.secondary_main,
            light: '#77d405',
            button: options.colors.headerDivider,
        },
        error: {
            main: '#FF0000',
            light: '#ffdadb',
            countdown: '#ef2626',
            price: '#fc1804',
            alerttext: '#FF0000',
            alert: '#FFE1E1',
        },
        success: {
            main: '#59ab01',
            light: '#e8fad2',
            light1: '#f6fdf3',
            contrastText: '#fff',
            price: '#2ac002',
            alert: '#E4F9EC',
            alerttext: '#70AD47',
            disabled: '#b8d7a3',
        },
        warning: {
            main: '#f38401',
        },
        info: {
            main: '#7D7B7C',
            comment: '#276ED8',
            border: '#2f4c8f',
        },
        background: {
            default: options.colors.background,
            header: options.colors.header,
            tabs: options.colors.tabs,
            dialogcontent: options.colors.dialogcontent,
            shadedbtn: options.colors.shadedbtn,
            form: options.colors.formbg,
            betslip: options.colors.betslip,
            legs: options.colors.legs,
            multilegs: options.colors.multilegs,
            comment: '#DAE3F3',
            comment1: '#E6F0D5',
            whiteBackground: '#fff',
            placepos: '#f2eaf9',
            winpos: '#fffbef',
            proTipster: '#141920',
        },
        alert: {
            infobackground: options.colors.bgalertinfo,
            infotext: options.colors.textalertinfo,
        },
        text: {
            default: options.colors.textcolor,
            header: options.colors.headertext,
            active: options.colors.activetext,
            dialog: options.colors.dialogtitle,
            greytext: options.colors.greytext,
            blueText: options.colors.blueText,
        },
        border: {
            outlined: options.colors.outlinedborder,
            secondary: options.colors.secondaryborder,
            divider: options.colors.headerDivider,
            yellow: options.colors.primary_main,
        },
        icon: {
            checkcircle: options.colors.checkcircle,
            betslip: options.colors.betslipicon,
        },
        grey: {
            main: '#949494',
            light: '#bababa',
            dark: '#666666',
            primary: '#e2e2e2',
            secondary: '#b1b1b1',
            dark1: '#787879',
            tipBtn: '#f0f1f2',
            joinField: '#f4f4f4',
            joinBorder: '#cccccc',
            backdrop: '#3c3c3c',
            keypad: '#555555',
            dividends: '#3f3f3f',
            border: '#3d3d3d',
            btntext: '#8F8F8F',
            disabledTip: '#fcfcfd',
            disabledTipText: '#a4a4a4',
            dark2: '#181818',
            border1: '#e0e0e0',
            sportsOdds: '#EEEEEE',
            homeIcon: '#e8e9ea',
            desktop: '#fafafa',
            hb: '#999999',
            logobg: '#e4e4e4',
        },
        grey2: {
            main: '#eeeff1',
        },
        gray: {
            main: '#e2e2e2',
        },
        black: {
            main: '#000',
        },
        white: {
            main: '#fff',
        },
        yellow: {
            main: '#FFDE16',
            secondary: '#FDC609',
        },
        footer: {
            main: '#232323',
            secondary: '#2E2E33',
            secondary1: '#212223',
            text: '#9c9ca0',
            text1: '#B0AFC0',
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        fontSize: 14,
        allVariants: {
            color: '#000',
        },
        hotbet: {
            title: 15,
            subTitle: 14,
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    backgroundColor: options.colors.tabs,
                    color: options.colors.textcolor,
                    '&.Mui-selected': {
                        backgroundColor: options.colors.primary_main,
                        color: options.colors.activeTabtext,
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: options.colors.disabled,
                    },
                },
            },
        },
        // MuiPaper: {
        // 	styleOverrides: {
        // 		root: {
        // 			transition: 'none !important'
        // 		},
        // 	},
        // },
    },
});

theme.typography.h1 = {
    fontSize: '36px',
    [theme.breakpoints.down('md')]: {
        fontSize: '24px',
    },
};
theme.typography.h2 = {
    fontSize: '20px',
};
theme.typography.subtitle1 = {
    fontSize: '18px',
};
theme.typography.subtitle2 = {
    fontSize: '14px',
};
export default theme;
