export const template: string = /*html*/ `
  <div id="login">
    <form class="rows">
      <div class="row">
        <label for="id">아이디</label>
        <input id="id" name="id" class="form">
      </div>
      <div class="row">
        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" class="form">
      </div>
      <div class="row">
        <button type="button" class="button button-login submit">로그인</button>
        <button type="button" class="button button-signup submit">회원가입</button>
      </div>
    </form>
  </div>
`
