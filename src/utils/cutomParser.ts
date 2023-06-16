import { Slide } from '@/types/slides'
import { nanoid } from 'nanoid'

export const slides: Slide[] = [
  {
    id: 'eDjxwlx7_N',
    elements: [
      {
        type: 'text',
        id: '0Iv3a40nP1',
        width: 723.4908136482939,
        height: 182.546875,
        left: 135.00109361329834,
        top: 146.18875765529307,
        rotate: 0,
        defaultFontName: 'Microsoft Yahei',
        defaultColor: '#333',
        content:
          '<p style="text-align: center; color: #000000"><span style="font-size: 62.5px;font-family: Arial;">雇主版${}</span></p>',
        lineHeight: 1,
        outline: {
          color: '#000',
          width: 0,
          style: 'solid'
        },
        fill: ''
      }
    ],
    background: {
      type: 'solid',
      color: '#FFFFFF'
    }
  },
  {
    id: 'T-NDsfQv3z',
    elements: [
      {
        type: 'image',
        id: 'mxnzOZyR2j',
        src: '',
        width: 244.50339020122482,
        height: 529.1666666666666,
        left: 57.92322834645669,
        top: 16.666666666666664,
        fixedRatio: true,
        rotate: 0
      },
      {
        type: 'image',
        id: 'PR8n0Ch8LH',
        src: '',
        width: 244.50339020122482,
        height: 529.1666666666666,
        left: 373.432195975503,
        top: 16.666666666666664,
        fixedRatio: true,
        rotate: 0
      },
      {
        type: 'image',
        id: 'qlAmETvkWF',
        src: '',
        width: 244.50339020122482,
        height: 529.1666666666666,
        left: 688.9410542432195,
        top: 16.666666666666664,
        fixedRatio: true,
        rotate: 0
      },
      {
        type: 'text',
        id: 'Ctg8-d50dN',
        width: 204.72440944881888,
        height: 68.890625,
        left: 708.8305446194224,
        top: 409.517594689385,
        rotate: 0,
        defaultFontName: 'Microsoft Yahei',
        defaultColor: '#333',
        content:
          '<p style="text-align: center; color: #000000"><span style="font-size: 18.75px;font-family: Microsoft Yahei;">輸入電話號碼</span></p><p style="text-align: center; color: #000000"><span style="font-size: 18.75px;font-family: Microsoft Yahei;">點選發送驗證碼</span></p>',
        lineHeight: 1,
        outline: {
          color: '#000',
          width: 0,
          style: 'solid'
        },
        fill: '#fff2cc'
      },
      {
        type: 'text',
        id: 'ytxDuKbl5h',
        width: 204.72440944881888,
        height: 68.890625,
        left: 393.321686351706,
        top: 409.517594689385,
        rotate: 0,
        defaultFontName: 'Microsoft Yahei',
        defaultColor: '#333',
        content:
          '<p style="text-align: center; color: #000000"><span style="font-size: 18.75px;font-family: Microsoft Yahei;">輸入電話號碼</span></p><p style="text-align: center; color: #000000"><span style="font-size: 18.75px;font-family: Microsoft Yahei;">點選發送驗證碼</span></p>',
        lineHeight: 1,
        outline: {
          color: '#000',
          width: 0,
          style: 'solid'
        },
        fill: '#fff2cc'
      },
      {
        type: 'text',
        id: 'Yv1iChSPrz',
        width: 204.72440944881888,
        height: 68.890625,
        left: 77.81271872265964,
        top: 409.517594689385,
        rotate: 0,
        defaultFontName: 'Microsoft Yahei',
        defaultColor: '#333',
        content:
          '<p style="text-align: center; color: #000000"><span style="font-size: 18.75px;font-family: Microsoft Yahei;">輸入電話號碼</span></p><p style="text-align: center; color: #000000"><span style="font-size: 18.75px;font-family: Microsoft Yahei;">點選發送驗證碼</span></p>',
        lineHeight: 1,
        outline: {
          color: '#000',
          width: 0,
          style: 'solid'
        },
        fill: '#fff2cc'
      }
    ],
    background: {
      type: 'solid',
      color: '#FFFFFF'
    }
  }
]

function genAll() {
  const ans: any = []
  const input = [
    [
      {
        id: 11,
        text: '',
        imgSrc: ''
      },
      {
        id: 12,
        text: '',
        imgSrc: ''
      }
    ],
    [
      {
        id: 1,
        text: '',
        imgSrc: ''
      },
      {
        id: 2,
        text: '',
        imgSrc: ''
      },
      {
        id: 3,
        text: '',
        imgSrc: ''
      },
      {
        id: 4,
        text: '',
        imgSrc: ''
      }
    ]
  ]

  input.forEach(slideConfig => {
    const slide = genSlides(slideConfig)
    ans.push(slide)
  })

  return ans
}

// 產生投影片
function genSlides(slideConfig: any) {
  const slideExample = {
    id: nanoid(10),
    elements: genElements(slideConfig),
    background: {
      type: 'solid',
      color: '#FFFFFF'
    }
  }
  return slideExample
}

// <br> 代表換行
// 產生元素
const 判斷內容 = ({ text = '' }) => {
  const big = (txt: string) =>
    `<p style="text-align: center; color: #000000"><span style="font-size: 62.5px;font-family: Arial;">${txt}</span></p>`
  const small = (txt: string) =>
    `<p style="text-align: center; color: #000000"><span style="font-size: 18.75px;font-family: Microsoft Yahei;">${txt}</span></p>`
  const 內容 = small
  let ans = ''
  if (text.includes('<br>')) {
    const arr = text.split('<br>')
    arr.forEach(item => {
      ans += 內容(item)
    })
    return ans
  }

  ans += 內容(text)
  return ans
}
// elConfig
// [
//     {
//       id: 11,
//       text: '',
//       imgSrc: ''
//     },
//     {
//       id: 12,
//       text: '',
//       imgSrc: ''
//     }
//   ],
function genElements(slideConfig: any) {
  const ans2: {
    id: string
    type: string
    src?: any
    width: number
    height: number
    left: number
    top: number
    fixedRatio?: boolean
    rotate: number
    defaultFontName?: string
    defaultColor?: string
    content?: any
    lineHeight?: number
    outline?: { color: string; width: number; style: string }
    fill?: string
  }[] = []
  slideConfig.forEach((el: any) => {
    const elImgExample = {
      id: nanoid(10),
      type: 'image',
      src: el.imgSrc,
      width: 244.50339020122482,
      height: 529.1666666666666,
      left: 57.92322834645669,
      top: 16.666666666666664,
      fixedRatio: true,
      rotate: 0
    }
    const elTxtExample = {
      id: nanoid(10),
      type: 'text',
      width: 204.72440944881888,
      height: 68.890625,
      left: 708.8305446194224,
      top: 409.517594689385,
      rotate: 0,
      defaultFontName: 'Microsoft Yahei',
      defaultColor: '#333',
      content: 判斷內容({ text: el.text }), //
      lineHeight: 1,
      outline: {
        color: '#000',
        width: 0,
        style: 'solid'
      },
      fill: '#fff2cc'
    }

    ans2.push(elImgExample)
    ans2.push(elTxtExample)
  })
  return ans2
}
/**
// src
// data:image/png;base64,iV
// content




// 新增組 新增元素



 */
