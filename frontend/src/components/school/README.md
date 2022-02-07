url:
root: /school
register: /school/register
modify: /school/modify/:communityId
detail: /school/:communityId

## Todo

- [ ]  ~~summernote 사용 실패~~
- [ ]  ~~ckeditor 사용 실패~~
- [ ]  ~~draft.js 사용 문제 발생~~
- [ ]  ~~react quill toast-ui 보다 안좋아보임~~
- [x]  toast-ui
- [x]  화면 구성
- [x]  게시글 등록 기능 구현
- [x]  게시글 조회 기능 구현
- [x]  페이징
- [x]  게시글 수정 기능 구현
- [x]  게시글 삭제 기능 구현
- [x]  댓글 등록 기능 구현
- [x]  댓글 조회 기능 구현
- [x]  댓글 수정 기능 구현
- [x]  댓글 삭제 기능 구현
- [x]  대댓글 등록 기능 구현
- [x]  대댓글 조회 기능 구현
- [x]  대댓글 수정 기능 구현
- [x]  대댓글 삭제 기능 구현
- [ ]  에러페이지 구성 삭제한 글에 접근한다거나 수정권한이 없는 사람이 수정하려고 할때 에러페이지 보이게

### 화면 구성

```jsx
┌ components
│ └ widgets
│   └ school
│     │ └ comment
~~│     │   └ CommentContainer.js   // 댓글 컨테이너~~ 삭제
│     │   └ CommentRegister.js    // 댓글, 대댓글 작성하는 컴포넌트
│     │   └ CommentItem.js        // 댓글, 대댓글 항목 컴포넌트, 대댓글 리스트 포함
│     │   └ CommentList.js        // 댓글 리스트 컴포넌트
│     ├ CommunityDetail.js        // 게시글 내용 페이지
│     ├ CommunityList.js          // 게시글 목록 페이지
│     ├ CommunityRegister.js      // 게시글 등록 페이지
│     ├ CommunityItem.js          // 게시글 목록 항목├ routes
  └ School.js                   // 홈에서 보이는 우리학교보기 컴포넌트
```

### ckeditor

- 내용 보기
    
    처음에 우리 프로젝트에 `ckeditor`(기본적으로 기능이 어느정도 갖추어진 tool)를 적용했을 때 글자 크기, 굵게, 기울게가 적용이 안됨
    
    → 이유가 plugin이 적용되지 않아서라고 생각하여서 plugin을 적용하는 방법을 공부하였고, 가장 베이스 ckeditor git을 클론해서 재빌드 하는 방법과 eject를 해서 프로젝트 자체에 적용하는 방법이 있다는 것을 알았고 두가지 방법 모두 쉽지 않아서 어쩔 수 없이 eject하는 방법 선택
    
    eject로 하다보니 처음에 설치했던 `ckeditor` 와 동일한 plugin을 설치하고 있다는 것을 깨닫고 새로운 react-app을 만들어서 테스트 해보니 거기서는 기존에 `ckeditor` 또한 굵게, 기울게, 글자크기 모두 잘 적용된다는 것을 알았음
    
    근데 우리 프로젝트에만 이상하게 적용이 안돼서 root 인 index.js에 `ckeditor` 만 넣고 실행하니 또 잘 됨. 근데 index.js에
    
    ```jsx
     <PersistGate loading={null} persistor={persistor}>
        <App />
     </PersistGate>
    ```
    
    이 부분만 추가하면 또 바로 안됨 이유를 모르겠음... 
    
    하지만 웹팩, 바벨 설정을 하지 못하면 결국 스타일 변경을 할 수 없는 문제가 있어서 사용X
    

### draft.js

- 내용 보기
    
    facebook에서 만든 react를 위한 에디터, 한글 사용에 문제가 있음 에디터에 한글을 입력하면 그 즉시 반영이 안되는 문제가 있음 →를 누르거나 하면 되긴 하지만 적합하지 않다고 판단
    

### toast-ui

- 내용 보기
    
    그나마 마크다운 편집이나 일단 위즈윅편집을 모두 제공하는 에디터, 기능이 부실하고 확장성이 부족하지만 이번 프로젝트에는 토스트 ui를 사용해야 할 것 같다. 
    

## 기능 구현

### 게시글 등록 기능

- 내용 보기
    
    request
    
    - token
    - 제목(title)
    - 내용(content)
    
    response
    
    - 등록 성공/실패 status

### 게시글 조회 기능

- 내용 보기
    
    페이징
    
    ```bash
    $ npm install react-js-pagination
    ```
    
    ```jsx
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
    ```
    
    처음에 글 전체 갯수를 요청
    
    ```jsx
    	const [isLoading, setIsLoading] = useState(false);
      const [totalItemsCount, setTotalItemsCount] = useState(0);
      const [isTotalItemsCountLoading, setIsTotalItemsCountLoading] = useState(true);
    
      useEffect(() => {
        console.log("총 글 개수 받아오기");
        if (isTotalItemsCountLoading) {
          getCommunityTotalCount()
          .then(res => {
            console.log(res.data.totalCommunity);
            setTotalItemsCount(res.data.totalCommunity);
            setIsTotalItemsCountLoading(false);
          })
        } else {
          setIsLoading(true);  // 글 개수를 set하고 나서 글 리스트 요청
        }
      }, [isTotalItemsCountLoading]);
    ```
    
    게시글 리스트
    
    request
    
    - none
    
    response: Object
    
    - 글 작성자(userId)
    - 제목(title)
    - 조회수(hit)
    - 작성시간(regTime)
    - 게시글 Id(communityId)
    
    게시글 보기
    
    request
    
    - communityId
    
    response: Object
    
    - 글 작성자(userId)
    - 제목(title)
    - 내용(content)
    - 조회수(hit)
    - 작성시간(regTime)

## useNavigate

- 내용 보기
    
    글 작성이나 글 내용보는 것은 단순히 화면만 넘어가는 것이 아니라 url을 변경해주는게 좋다고 판단
    일반적으로 글을 쓰다가 취소하거나 게시글을 보다가 뒤로가기 버튼을 누르면 기존의 커뮤니티 화면으로 이동을 해야하는데 url을 기준으로 페이지를 보여주다보니 다른 route로 넘가는 문제 발생
    
    ```jsx
    const School = () => {
      return (
        <Container>
          <Outlet />
        </Container>
      )
    };
    
    export default School;
    ```
    
    ```jsx
    const CommunityList = () => {
      const Navigate = useNavigate();
      const [data, setData] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
    
    	...
    
      return (
        <>
          <Desc>우리 학교 커뮤니티</Desc>
          <Container>
            <ButtonContainer>
              <Button
                name="글쓰기"
                width="7rem"
                height="2rem"
                onClick={() => Navigate("./register")}
              />
            </ButtonContainer>
    				...
          </Container>
        </>
      );
    };
    ```
    
    School.js 는 단순히 하얀색 박스만 표현하도록하고 내부를 <Outlet />을 사용하여 useNavigate를 통한 페이지 이동시 보여주는 영역 표시
    
    ```jsx
    <Route path="/school/" element={<School />} >
      <Route path="" element={<CommunityList />} />
      <Route path="register" element={<CommunityRegister />} />
      <Route path=":communityid" element={<CommunityDetail />} />
    </Route>
    ```
    
    react-route-dom v6 문법에 따라 서브 라우트 설정
    

## Component 재귀

- 내용 보기
    
    댓글과 대댓글을 구현하는데 똑같이 생긴 컴포넌트를 하나 더만들어야 되는 문제발생 재귀로 컴포넌트를 재사용 할 수 없을까 하는 의문을 가지고 찾아보니 재귀로 할 수 있는 방법이 있었다.
    
    ```jsx
    const CommentItem = ({ data, children }) => {
      const sampleData = [
        ...
      ];
      return (
        <Container>
          <Content pl={children}>
            <div className="userName">{data.userName}</div>
            <div className="content">{data.comment}</div>
            <FeatureContainer>
              <span className="regTime">{data.regTime}</span>
              <span className="reCommentBtn">답글달기</span>
              <span className="reCommentBtn">수정하기</span>
              <span className="reCommentBtn">삭제하기</span>
            </FeatureContainer>
          </Content>
          {children && sampleData.map(
            (item) => <CommentItem data={item} key={item.id} />
          )}
        </Container>
      );
    };
    ```
    
    댓글의 컴포넌트에는 children이라는 props를 부여하고 대댓글에는 부여하지 않음으로써 차이점 발생
    
    props로 children이 true 값일 때만 map함수를 이용하여 대댓글을 출력하면 하나의 컴포넌트로 두가지 기능 모두 사용 가능
    

## bug

- 내용 보기
    - [x]  url로 접속시 남의 글 수정 가능, 다른사람이 조회는 할 수 있어야 하므로 프론트에서 처리해야 될것 같음 수정하기 눌렀을때 수정하는 페이지로 이동한 userId와 작성자 userId를 비교해서 바로 에러페이지로 이동할 수 있도록 `Done`
    - [x]  뒤로가기시 삭제한 글 다시 볼 수 있음 db에서 del_yn으로 처리해둬서 그런거 같음 `Done`
    - [x]  뒤로가기시 삭제한 글에 댓글을 달 수 있음 `Done`
    - [x]  자기가 쓴 댓글에만 수정, 삭제 버튼
    - [x]  게시글, 댓글 목록이 시간 순서대로 오지 않음 `Done`
    - [ ]  댓글 달기, 수정하기 여러 군데서 누르면 하나만 뜨게
    - [x]  게시글 수정, 댓글 달기, 수정, 삭제 시 변경된 내용 바로 반영