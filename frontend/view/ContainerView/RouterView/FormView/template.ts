export const template: string = `
  <section id='invoice-form'>
    <form>
      <div class="float">
        <button type='button' class="button-clear-form">내용 지우기</button>
        <button type='button' class="button-remove-invoice hidden">삭제</button>
      </div>
      <div class="row">
        <div class="item">
          <label class="form-label">분류</label>
          <button type='button' class="button earning-toggle active">수입</button>
          <button type='button' class="button spending-toggle">지출</button>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <label class="form-label">날짜</label>
          <input type="date" class="input-date" />
        </div>
        <div class="item">
          <label class="form-label">카테고리</label>
          <select class="select-category" value=''>
            <option value="" disabled selected>선택하세요</option>
            <option value='123'>123</option>
          </select>
        </div>
        <div class="item">
          <label class="form-label">결제수단</label>
          <select class="select-payment">
            <option value="">선택하세요</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <label class="form-label">금액</label>
          <input class="input-amount" placeholder='금액을 입력해주세요' />
        </div>
        <div class="item">
          <label class="form-label">내용</label>
          <input class="input-item" placeholder='내용을 입력해주세요' />
        </div>
      </div>
      <div class="row">
        <button type="button" class="button button-submit">확인</button>
      </div>
    </form>
  </section>
`
