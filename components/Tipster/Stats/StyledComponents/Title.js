import styled from 'styled-components';

const Title = styled.div`
    font-size: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: ${(props) => props.marginTop};
    font-weight: ${(props) => props.weight};
`;

export default Title;
