import {
    DeleteForeverRounded,
    DeleteForeverSharp,
    DeleteOutlined,
    DeleteSharp,
    DeleteSweepOutlined,
    DeleteSweepTwoTone,
    EditOutlined,
    ErrorOutlined,
} from '@mui/icons-material';
import { Container, Box } from '@mui/material';
import CreditWithExpire from './CreditWithExpire';
import { IconButton } from '@mui/material';
import { SvgIcon } from '@mui/material';
import ModifyIcon from '../../../public/images/svg/edit.svg';
import DeleteIcon from '../../../public/images/svg/icon-trash2.svg';
import getButtonIcons from '../../utils/icons';
export default function CreditCardLine(props) {
    const {
        card,
        modifyUpCard = () => {
            alert('modify');
        },
        removeUpCard = () => {
            alert('delete');
        },
        selected = false,
    } = props;

    return (
        <Container sx={styles.container}>
            <CreditWithExpire card={card} selected={selected} />
            <Box sx={{ display: 'flex' }}>
                <IconButton
                    onClick={() => modifyUpCard(card)}
                    sx={{ px: 2, pr: 4 }}
                >
                    {/* <EditOutlined size="small" /> */}
                    <SvgIcon
                        component={ModifyIcon}
                        size="small"
                        viewBox="0 0 1000 1000"
                        sx={{ fontSize: 18 }}
                        color="black"
                    />
                </IconButton>
                <IconButton onClick={() => removeUpCard(card)} sx={{ p: 0 }}>
                    {/* <DeleteOutlined size="small" /> */}
                    {/* {getButtonIcons('svg', 'trash2', 16)} */}
                    <SvgIcon
                        component={DeleteIcon}
                        viewBox="0 0 26 26"
                        sx={{ fontSize: 18 }}
                        color="black"
                    />
                </IconButton>
            </Box>
        </Container>
    );
}
const styles = {
    container: {
        display: 'flex',
        // justifyContent: 'space-between',
        width: '100%',
        py: 1,
        px: 0,
        mx: 0,
    },
};
