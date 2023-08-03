import { Typography } from '@mui/material';
import styled from 'styled-components';
import * as React from 'react';
import Box from '@mui/material/Box';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: white;
`;

const GetTips = styled.button`
    background: white;
    border: solid 1px;
    border-radius: 5px;
    border-color: green;
    padding: 5px 15px 5px 15px;
    color: green;
`;

const StyledTabs = styled.div`
    display: flex;
    justify-content: space-between;
    background: white;
    // padding: 10px 0px;
`;

const StyledTab = styled.div`
    flex: 1;
    font-size: 16px;
    background: white;
    text-align: center;
    font-weight: ${(props) => (props.border === 1 ? 600 : 0)};
    border-bottom: solid ${(props) => (props.border === 1 ? '2px' : '0px')};
    border-color: purple;
    padding: 10px 0px;
`;

const Panel = styled.div`
    padding: 15px 20px;
`;

function DateTabs() {
    return (
        <Box sx={{ width: '100%', background: 'white', marginTop: '10px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <StyledTabs onClick={() => alert('Today')}>
                    <StyledTab border={1}>Today</StyledTab>
                    <StyledTab border={0}>Saturday</StyledTab>
                </StyledTabs>
            </Box>

            <Panel>
                <TabContent date="Today" />
            </Panel>
        </Box>
    );
}

const TabContent = (props) => {
    return (
        <Container>
            <Typography fontSize={16} color={'black.main'} fontWeight="600">
                {props.date} 6 - Tips{' '}
                <Typography fontSize={16} color={'black.main'}>
                    (horses)
                </Typography>
            </Typography>
            <GetTips onClick={() => alert('Get Tips button')}>
                <Typography fontSize={15} color={'green'} fontWeight="600">
                    Get Tips
                </Typography>
            </GetTips>
        </Container>
    );
};

function DateSelector() {
    return <DateTabs />;
}

export default DateSelector;
