import React, { useEffect, useState } from 'react';

import StyledLogin from './styled';

const { Container, Form, FormGroup, Label, Input, Button } = StyledLogin;

const Login = ({ onSubmit }) => {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userPassword: '',
    userProfile: '',
  });

  const handleChange = (e) => {
    e.preventDefault();

    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.dataset.type]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>이름</Label>
          <Input
            type="text"
            placeholder="홍길동"
            tabIndex="1"
            value={userInfo.userName}
            data-type="userName"
            onChange={handleChange}
            required
            autoFocus
          />
        </FormGroup>

        <FormGroup>
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="****"
            tabIndex="2"
            value={userInfo.userPassword}
            data-type="userPassword"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>프로필 사진</Label>
          <Input
            type="text"
            inputMode="url"
            placeholder="http://example.com/profile.jpg"
            tabIndex="3"
            value={userInfo.userProfile}
            data-type="userProfile"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button tabIndex="4">가입</Button>
      </Form>
    </Container>
  );
};

export default Login;
