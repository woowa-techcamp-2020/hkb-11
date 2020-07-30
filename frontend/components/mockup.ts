import { Invoice } from '../../types'
const mockup: Array<Invoice> = [
  {
    id: 1,
    date: new Date('2020-08-01T03:24:00'),
    category: {
      id: 1,
      type: '지출',
      title: '식비',
    },
    paymentMethod: {
      id: 1,
      userId: '아그라작',
      title: '은행',
    },
    amount: 10000,
    item: '버거킹',
    userId: '아그라작',
  },
  {
    id: 2,
    date: new Date('2020-08-01T05:24:00'),
    category: {
      id: 1,
      type: '지출',
      title: '식비',
    },
    paymentMethod: {
      id: 1,
      userId: '아그라작',
      title: '은행',
    },
    amount: 5000,
    item: '메가치킨마요는너무맛있어',
    userId: '아그라작',
  },
  {
    id: 3,
    date: new Date('2020-08-01T11:24:00'),
    category: {
      id: 1,
      type: '지출',
      title: '식비',
    },
    paymentMethod: {
      id: 1,
      userId: '아그라작',
      title: '은행',
    },
    amount: 5200,
    item: '버거킹',
    userId: '아그라작',
  },
  {
    id: 4,
    date: new Date('2020-08-02T03:24:00'),
    category: {
      id: 1,
      type: '지출',
      title: '식비',
    },
    paymentMethod: {
      id: 1,
      userId: '아그라작',
      title: '은행',
    },
    amount: 10000,
    item: '',
    userId: '아그라작',
  },
  {
    id: 5,
    date: new Date('2020-08-01T03:26:00'),
    category: {
      id: 1,
      type: '지출',
      title: '식비',
    },
    paymentMethod: {
      id: 1,
      userId: '아그라작',
      title: '은행',
    },
    amount: 1700,
    item: '대추차',
    userId: '아그라작',
  },
  {
    id: 6,
    date: new Date('2020-08-03T03:24:00'),
    category: {
      id: 1,
      type: '지출',
      title: '식비',
    },
    paymentMethod: {
      id: 1,
      userId: '아그라작',
      title: '티모카드',
    },
    amount: 2414,
    item: '이히히',
    userId: '아그라작',
  },
  {
    id: 7,
    date: new Date('2020-08-06T03:24:00'),
    category: {
      id: 1,
      type: '수입',
      title: '은행이자',
    },
    paymentMethod: {
      id: 1,
      userId: '아그라작',
      title: '티모카드',
    },
    amount: 1,
    item: '은행이자',
    userId: '아그라작',
  },
]
export default mockup
