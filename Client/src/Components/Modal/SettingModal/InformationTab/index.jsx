import React from 'react';

import { StyledInformationTab } from './styled';

const { Container, Bold, Describe, Made } = StyledInformationTab;

const InformationTab = () => {
  return (
    <Container>
      <Bold>Notion Guest Book Widget</Bold>
      <Describe>
        '<strong>프</strong>론트<strong>엔</strong>드로 <strong>성</strong>공할 <strong>사</strong>
        람들(<strong>프엔성사</strong>)'를 위한 노션 방명록 위젯입니다. 가보자고~🦊
      </Describe>
      <Made>만든 이: 김 주현(@sangpok)</Made>
    </Container>
  );
};

export default InformationTab;
