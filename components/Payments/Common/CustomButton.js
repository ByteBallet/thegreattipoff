import { Button } from '@mui/material';
export default function CommonButton(props) {
    const { children, color = 'success', ...rest } = props;
    return <Button {...rest}>{children}</Button>;
}
