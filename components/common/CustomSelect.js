import { Select,TextField, MenuItem, Typography } from '@mui/material';

const CustomSelect = (props) => {
    const { data = [], children, placeholder = '', ...rest } = props;

    return (
        <TextField
        select
        InputProps={{
         style:{
           fontSize:14,
         }
       }}
         {...rest}>
            <MenuItem value={0}>
                <Typography
                    sx={{
                        fontSize: 14,
                        color: 'grey.secondary',
                    }}
                >
                    {placeholder}
                </Typography>
            </MenuItem>
            {data.map((v, i) => (
                <MenuItem key={`menu_${i}`} value={v}>
                    {v}
                </MenuItem>
            ))}
            {children !== undefined && children instanceof Array
                ? children?.map((child, i) => (
                      <MenuItem key={child.value} value={child.value}>
                          {child.label}
                      </MenuItem>
                  ))
                : void 0}
        </TextField>
    );
};

export default CustomSelect;
