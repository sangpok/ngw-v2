# Notion Guest Book Widget
*따뜻한 말 한 마디로 시작하는 알고리즘 스터디* /updated 23.07.10

## 서비스 소개
알고리즘 스터디를 노션에 기입하려고 들어왔을 때, 응원의 한 마디가 남겨져 있다면 스터디 구성원 간의 집속력이 더 높아지지 않을까 싶어 만들게 된 방명록 위젯입니다.

> ***Widget이란?***
> : 사용자가 콘텐츠를 시각적으로 표시하거나 기능을 추가하는 데 사용되는 특별한 종류의 Embed

## 서비스 정보 개요

#### Deploy URL
- Frontend URL: https://notion-guest-book.netlify.app/
- Backend URL: https://port-0-notion-guest-book-kvmh2mljy8qjro.sel4.cloudtype.app/

#### 화면설계 URL
- [Notion Guest Book Widget UI / Figma URL](https://www.figma.com/file/FhKi2XYacTrfhexPsd2lyz/Notion-Guest-Book?type=design&node-id=0%3A1&mode=design&t=6oOpbvAWTa1HHrfr-1)

#### Tech Stack
- Frontend Stack: React, Vite, Emotion, Socket-io-client, Redux-Toolkit
- Backend Stack: NodeJS, Express, Mongoose, Socket-io

### 프로젝트 폴더 구조
#### Client
```bash
│  App.jsx
│  main.jsx
│
├─API
│      index.js
│
├─Components
│  ├─ChatMessage
│  │  │  index.jsx
│  │  │  styled.jsx
│  │  │
│  │  ├─MessageContent
│  │  │      index.jsx
│  │  │      styled.jsx
│  │  │
│  │  └─ReplyContent
│  │          index.jsx
│  │          styled.jsx
│  │
│  ├─ConversationHistory
│  │      index.jsx
│  │      styled.jsx
│  │
│  ├─HoverMenu
│  │  │  index.jsx
│  │  │  styled.jsx
│  │  │
│  │  ├─EmojiPicker
│  │  │      index.jsx
│  │  │      styled.jsx
│  │  │
│  │  └─MoreMenu
│  │          index.jsx
│  │          styled.jsx
│  │
│  ├─LoadingIndicator
│  │      index.jsx
│  │      styled.jsx
│  │
│  ├─MessageInput
│  │  │  index.jsx
│  │  │  styled.jsx
│  │  │
│  │  ├─MessageType
│  │  │      index.jsx
│  │  │      styled.jsx
│  │  │
│  │  └─ReplyBox
│  │          index.jsx
│  │          styled.jsx
│  │
│  ├─Modal
│  │  │  index.jsx
│  │  │  styled.jsx
│  │  │
│  │  ├─DeleteModal
│  │  │      index.jsx
│  │  │      styled.jsx
│  │  │
│  │  ├─ProfileModal
│  │  │      index.jsx
│  │  │      styled.jsx
│  │  │
│  │  └─SettingModal
│  │      │  index.jsx
│  │      │  styled.jsx
│  │      │
│  │      ├─InformationTab
│  │      │      index.jsx
│  │      │      styled.jsx
│  │      │
│  │      └─UserTab
│  │              index.jsx
│  │              styled.jsx
│  │
│  ├─ReactionBadge
│  │      index.jsx
│  │      styled.jsx
│  │
│  └─UserProfile
│          index.jsx
│          styled.jsx
│
├─Font
│      index.css
│
├─Hooks
│      useDataFetcher.js
│      usePacket.js
│
├─Icon
│      CoolSayingL.jsx
│      CoolSayingR.jsx
│      index.jsx
│      More.jsx
│      Open.jsx
│      Push.jsx
│      Reaction.jsx
│      Reply.jsx
│
├─Store
│      ConversationSlice.js
│      DashboardStateSlice.js
│      FetchingStateSlice.js
│      index.js
│      LoadingStateSlice.js
│      ModalSlice.js
│      UserAuthSlice.js
│
├─Utils
│      index.js
│      socket.js
│
└─View
    ├─Dashboard
    │      index.jsx
    │      styled.jsx
    │
    └─Login
            index.jsx
            styled.jsx
```
#### Server
```bash
│  .env
│  App.js
│  package-lock.json
│  package.json
│  Server.js
│  socket.js
│  socketEvents.js
│  yarn.lock
│
├─controllers
│      comments.js
│
├─db
│      connect.js
│
└─models
        comments.js
```

## 기능 별 구현 화면

#### 회원가입 페이지
- 저장된 회원 정보가 있으면 채팅 뷰로 Re-direct
	- 회원 정보는 LocalStorage로 저장됨.
- 유효성 검사 통과시 가입 버튼 활성화
![](https://velog.velcdn.com/images/sangpok/post/ae733e2f-3f67-401c-9264-acfd4916deac/image.png)

#### 초기 로딩
![초기 로딩](https://velog.velcdn.com/images/sangpok/post/790e87eb-e1de-4cae-98d5-0c1249fbe32c/image.gif "초기 로딩")

#### 다른 Client 입장
![다른 Client 입장](https://velog.velcdn.com/images/sangpok/post/4e7b6b13-0e27-44d4-814a-0f828ffea175/image.gif "다른 Client 입장")

#### 메시지 전송
![메시지 전송](https://velog.velcdn.com/images/sangpok/post/5ca11a32-9656-4441-a98d-7c744517df94/image.gif "메시지 전송")

#### 공감 추가
![공감 추가](https://velog.velcdn.com/images/sangpok/post/0d13e7d3-487c-48cc-af02-c8667161b826/image.gif "공감 추가")

#### 메시지 삭제
![메시지 삭제](https://velog.velcdn.com/images/sangpok/post/77df7cf6-1195-4c6a-8340-953340989284/image.gif "메시지 삭제")

#### 메시지 타입 변경
![](https://velog.velcdn.com/images/sangpok/post/b185acd9-556c-4612-9291-8fc121c33037/image.gif)

#### 설정창 열기
![](https://velog.velcdn.com/images/sangpok/post/0c122bfa-c8d5-47d9-8c43-ac213a074b81/image.gif)

---

# 개발일지
- [노션 방명록 위젯에 Socket.io 도입하기 /velog](https://velog.io/@sangpok/%EB%85%B8%EC%85%98-%EB%B0%A9%EB%AA%85%EB%A1%9D-%EC%9C%84%EC%A0%AF%EC%97%90-Socket.io-%EB%8F%84%EC%9E%85%ED%95%98%EA%B8%B0)
