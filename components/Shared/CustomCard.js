import React from 'react';
import { Card, CardContent, Box, TableContainer, Table, TableBody, Typography } from '@mui/material';

const CustomCard = ({
    title, bgcolor = "black.main",
    content,
    textcolor = "white.main",
    isTable = true,
    contentColor = "white.main",
    bottomContent
}) => {
    return (
        <Card sx={{ bgcolor: contentColor }}>
            <CardContent sx={{ p: 0 }} >
                {title.length > 0 &&
                    <Box sx={{
                        bgcolor: bgcolor,
                        borderTopLeftRadius: 1,
                        borderTopRightRadius: 1
                    }}>
                        <Typography
                            variant="h2"
                            component="p"
                            fontWeight="fontWeightBold"
                            sx={{ fontSize: 14 }}
                            px={2}
                            py={1}
                            color={textcolor}
                        >
                            {title}
                        </Typography>
                    </Box>
                }
                {
                    isTable ?
                        <TableContainer component={Box} px={1}>
                            <Table
                                aria-label="caption table"
                                size="small"
                                className="racingTable"
                            >
                                <TableBody>
                                    {content}
                                </TableBody>
                            </Table>
                        </TableContainer> :
                        content
                }
            </CardContent>
            {bottomContent && bottomContent}
        </Card>
    );
};

export default CustomCard;