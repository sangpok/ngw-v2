import React, { useEffect, useState } from 'react';

import { StyledUserTab } from './styled';
import { useSelector } from 'react-redux';

import UserProfile from '@Components/UserProfile';

const { Container, Group, PropertyName, PropertyDescribe, Input, ImageWrapper, ErrorLabel } =
  StyledUserTab;

const UserTab = ({ inputValues, onChange }) => {
  const [errorShow, setErrorShow] = useState(false);

  const handleError = () => {
    setErrorShow(true);
  };

  const handleLoad = () => {
    setErrorShow(false);
  };

  return (
    <Container>
      <Group col gap={1}>
        <Group gap={2}>
          <PropertyName>별명</PropertyName>
          <PropertyDescribe>방명록에 사용할 별명을 설정합니다</PropertyDescribe>
        </Group>
        <Input
          type="text"
          placeholder="사용자 별명"
          value={inputValues.userName}
          onChange={(e) => onChange((prevState) => ({ ...prevState, userName: e.target.value }))}
        />
      </Group>
      <Group col gap={1}>
        <Group gap={2}>
          <PropertyName>비밀번호</PropertyName>
          <PropertyDescribe>댓글을 삭제할 때 필요한 비밀번호를 설정합니다</PropertyDescribe>
        </Group>
        <Input
          type="password"
          placeholder="****"
          value={inputValues.userPassword}
          onChange={(e) =>
            onChange((prevState) => ({ ...prevState, userPassword: e.target.value }))
          }
        />
      </Group>
      <Group col gap={1}>
        <Group gap={2}>
          <PropertyName>프로필 사진</PropertyName>
          <PropertyDescribe>프로필 사진을 설정합니다</PropertyDescribe>
        </Group>
        <ImageWrapper>
          <UserProfile
            src={inputValues.userProfile}
            size={16}
            onLoad={handleLoad}
            onError={handleError}
          />
        </ImageWrapper>
        {errorShow && <ErrorLabel>올바르지 않은 이미지입니다</ErrorLabel>}
        <Input
          type="url"
          placeholder="https://example.com/example1.jpg"
          value={inputValues.userProfile}
          onChange={(e) => onChange((prevState) => ({ ...prevState, userProfile: e.target.value }))}
        />
      </Group>
    </Container>
  );
};

export default UserTab;
