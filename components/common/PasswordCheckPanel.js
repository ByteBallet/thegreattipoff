import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const upperLower = /[a-z].*[A-Z]|[A-Z].*[a-z]/;
const isValidWord = /^[a-zA-Z\s]*$/;
const GW_P_Num_Regex = /[0-9]/;

export default function PasswordCheckPanel(props) {
    const { value, client = 'eb' } = props;
    return (
        <Box sx={{ my: 1, mx: 2 }}>
            {client == 'eb' && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        fontSize: 13,
                        color: 'grey',
                    }}
                >
                    <CheckCircleIcon
                        color={upperLower.test(value) ? 'success' : 'grey'}
                        fontSize="small"
                    />
                    <span
                        style={{
                            paddingLeft: 5,
                            fontStyle: 'italic',
                        }}
                    >
                        Includes lower and upper case letters
                    </span>
                </div>
            )}

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    fontSize: 13,
                    color: 'grey',
                }}
            >
                <CheckCircleIcon
                    color={
                        value.length > 0 &&
                        (client == 'gto'
                            ? !isValidWord.test(value)
                            : GW_P_Num_Regex.test(value))
                            ? 'success'
                            : 'grey'
                    }
                    fontSize="small"
                />
                <span
                    style={{
                        paddingLeft: 5,
                        fontStyle: 'italic',
                    }}
                >
                    Includes at least one number
                </span>
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    fontSize: 13,
                    color: 'grey',
                }}
            >
                <CheckCircleIcon
                    color={value.length >= 6 ? 'success' : 'grey'}
                    fontSize="small"
                />
                <span
                    style={{
                        paddingLeft: 5,
                        fontStyle: 'italic',
                    }}
                >
                    Must be {'6'} or more characters
                </span>
            </div>
        </Box>
    );
}
