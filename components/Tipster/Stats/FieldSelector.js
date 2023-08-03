import styled from 'styled-components';
import Title from './StyledComponents/Title';
import LeaderboardFilterContainer from '@Components/Leaderboard/LeaderboardFilterContainer';
import { getPeriodMenuOptions } from '@services/tipster/tipsterService';
import { groupByKey } from '@Components/utils/util';
import lbStore from '@stores/lbStore';
import { useContext, useEffect } from 'react';
import { UserContext } from '@Context/User/UserProvider';

import { getAllRaceTracks } from '@services/tipster/tipsterService';

const Container = styled.div`
    background: white;
    margin-top: 10px;
    padding: 5px 15px 5px 15px;
`;

const StyledSelect = styled.select`
    border: 0px;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
`;

const StyleOptions = styled.option``;

const SelectedText = styled(Title)`
    font-size: 11px;
`;

const SelectWrapper = styled.div`
    align-items: center;
    justify-content: center;
    color: grey;
`;

function FieldSelector(props) {
    return (
        <Container>
            <LeaderboardFilterContainer
                isMarket={false}
                selectedType={props.racetype}
                showAlternateTracks={true}
                tipsterName={props?.tipsterName}
                reloadData={props?.reloadData}
                setreloadData={props?.setreloadData}
            />
        </Container>
    );
}

export default FieldSelector;
