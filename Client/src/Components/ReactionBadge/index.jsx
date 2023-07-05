import React from 'react';

import { StyledReactionBadge } from './styled';

const { Container, Icon, Label } = StyledReactionBadge;

const ReactionBadge = ({ reaction }) => {
  const { icon, count } = reaction;

  return (
    <Container>
      <Icon>{String.fromCodePoint(icon)}</Icon>
      <Label>{count}</Label>
    </Container>
  );
};

export default ReactionBadge;
