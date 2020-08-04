export const template: string = /*html*/ `
  <section id='invoice-chart'>
    <div id="chart-selector" class="row">
      <div class="item left">
        <label> 날짜별 분류 </label>
        <input type="radio" name="chart" id="bar" checked/>
      </div>
      <div class="item right">
        <label> 항목별 분류 </label>
        <input type="radio" name="chart" id="pi"/>
      </div>
    </div>
  </section>
`

export const barChartTemplate = /*html*/ `
  <div id="bar-chart">
    <small>bar-chart</small>
    <svg viewBox="0 0 800 400"></svg>
  </div>
`
export const piChartTemplate = /*html*/ `
  <div id="pi-chart">
    <small>pi-chart</small>
    <svg viewBox="0 0 800 400"></svg>
  </div>
`
