import styled from 'styled-components';
import Title from './StyledComponents/Title';

const Body = styled(Title)`
    font-size: 0.8rem;
`;

const Container = styled.div`
    text-align: center;
    justify-content: center;
    align-items: center;
`;

function Header(props) {
    const { title, body } = props;
    return (
        <Container>
            <Title weight={'bold'} size="medium" marginTop={'10px'}>
                {title}
            </Title>
            <Body weight={'normal'} size="small" marginTop={'0px'}>
                {body}
            </Body>
        </Container>
    );
}

export default Header;
