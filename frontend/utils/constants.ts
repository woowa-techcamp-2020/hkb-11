export const CONSTANT = {
  SPENDING: '지출',
  EARNING: '수입',
}

export const CLASS = {
  HIDDEN: 'hidden',
  ACTIVE: 'active',
  ITEM: 'item',
  CENTER: 'center',
}

export enum EVENT {
  ADD_INVOICE = 'ADD_INVOICE',
  CLEAR_INVOICES = 'CLEAR_INVOICES',
  REMOVE_INVOICE = 'REMOVE_INVOICE',
  UPDATE_INVOICE = 'UPDATE_INVOICE',
  HIGHLIGHT_INVOICE = 'HIGHLIGHT_INVOICE',
  SET_SUM_EARNING = 'SET_SUM_EARNING',
  SET_SUM_SPENDING = 'SET_SUM_SPENDING',
  EARNING_TOGGLE = 'EARNING_TOGGLE',
  SPENDING_TOGGLE = 'SPENDING_TOGGLE',
  SET_INVOICES = 'SET_INVOICES',
  SET_CATEGORIES = 'SET_CATEGORIES',
  CLEAR_CATEGORIES = 'CLEAR_CATEGORIES',
  ADD_PAYMENT = 'ADD_PAYMENT',
  SET_PAYMENTS = 'SET_PAYMENTS',
  CLEAR_PAYMENTS = 'CLEAR_PAYMENTS',
}

export const ROUTER = {
  MUTATE_VIEW: 'MUTATE_VIEW',
  CHANGE_DATE: 'CHANGE_DATE',
}

export const FORM_CLASS = {
  INPUT_AMOUNT: 'input-amount',
  INPUT_DATE: 'input-date',
  INPUT_ITEM: 'input-item',
  SELECT_CATEGORY: 'select-category',
  SELECT_PAYMENT: 'select-payment',
  CLEAR_BTN: 'button-clear-form',
  REMOVE_BTN: 'button-remove-invoice',
  EARNING_TOGGLE: 'earning-toggle',
  SPENDING_TOGGLE: 'spending-toggle',
  SUBMIT_BTN: 'button-submit',
}

export const CALENDAR_CLASS = {
  DAY: 'day',
  DATE: 'date',
  DATE_CELL: 'date-cell',
  TODAY: 'today',
  OTHER_MONTH: 'other-month',
  EARNING_SUM: 'earning-sum',
  SPENDING_SUM: 'spending-sum',
}

export enum MODAL_ID {
  PAYMENT_MODAL = 'payment-modal',
}
