import { StyledModal } from './styled';

const { Container, Box, BoxContent, Header, Title, Cancel, Button, Body, Footer } = StyledModal;

const Modal = ({ title, onCancel, onSubmit, children }) => {
  return (
    <Container>
      <Box>
        <BoxContent>
          <Header>
            <Title>{title}</Title>
            <Cancel onClick={onCancel}>❌</Cancel>
          </Header>
          <Body>{children}</Body>
          <Footer>
            <Button onClick={onSubmit}>✔ 확인</Button>
          </Footer>
        </BoxContent>
      </Box>
    </Container>
  );
};

export default Modal;
