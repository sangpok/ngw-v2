import React from 'react';

import { StyledLoadingIndicator } from './styled';

const { Container, Loader } = StyledLoadingIndicator;

const LoadingIndicator = () => {
  return (
    <Container>
      <Loader />
    </Container>
  );
};

export default LoadingIndicator;
