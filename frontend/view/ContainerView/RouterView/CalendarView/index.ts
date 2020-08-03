import { CALENDAR_CLASS } from '../../../../utils/constants'
import { templateToElement } from '../../../../utils/ElementGenerator'
import { View } from '../../../index'
import './style.scss'
import { dateCellTemplate, headerCellTemplate, template } from './template'

const days: string[] = ['일', '월', '화', '수', '목', '금', '토']

function getDateList(year: number, month: number) {
  const dateList: Date[] = []
  const firstDate: Date = new Date(`${year}-${month}-1`)
  const startDate: Date = new Date(firstDate)
  startDate.setDate(firstDate.getDate() - firstDate.getDay())

  for (let i = 0; i < 35; i++) {
    const date: Date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    dateList.push(date)
  }

  return dateList
}
export default class CalendarView extends View {
  constructor() {
    super(template)
  }
  mount(): void {
    days.forEach((day: string) => {
      const $headerCell = templateToElement(headerCellTemplate)
      const $day = <HTMLDivElement>(
        $headerCell.querySelector(`.${CALENDAR_CLASS.DAY}`)
      )
      $day.innerText = day
      this.$element.appendChild($headerCell)
    })

    const [year, month] = [2020, 7]
    getDateList(year, month).forEach((date: Date) => {
      const $dateCell = templateToElement(dateCellTemplate)
      const $date = <HTMLDivElement>(
        $dateCell.querySelector(`.${CALENDAR_CLASS.DATE}`)
      )
      $date.innerText = date.getDate().toString()

      if (date.getMonth() + 1 !== month) {
        $dateCell.classList.add(CALENDAR_CLASS.OTHER_MONTH)
      }

      this.$element.appendChild($dateCell)
    })

    console.log(dateCellTemplate)
  }
}
