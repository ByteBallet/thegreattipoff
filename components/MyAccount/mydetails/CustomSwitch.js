import { Switch } from '@mui/material';

const CustomSwitch = (props) => {
    const { onChange, ...rest } = props;

    return (
        <Switch
            onChange={onChange}
            classes={{
                root: {
                    width: '90px',
                    height: '50px',
                    padding: 0,
                    marginRight: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                track: {
                    width: '80px',
                    height: '40px',
                    borderRadius: '20px',
                },
                switchBase: {
                    '&$checked': {
                        color: 'white',
                        transform: 'translateX(40px)',
                    },
                    '& + $track': {
                        backgroundColor: 'grey',
                        // backgroundColor: "rgba(0,125,129,0.3)",
                    },
                },
                checked: {},
                thumb: {
                    width: '32px',
                    height: '32px',
                    transform: 'translateX(0px)',
                },
            }}
            {...rest}
        />
    );
};
export default CustomSwitch;
