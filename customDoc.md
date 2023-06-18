# 筆記
MOCK注入的入口
\PPTist\src\store\slides.ts
创建元素
PPTist\src\hooks\useCreateElement.ts
MOCK 放預設PPT
PPTist\src\mocks\slides.ts

輸出JSON
PPTist\src\views\Editor\ExportDialog\ExportJSON.vue

type
PPTist\src\types\slides.ts

剪貼簿
\PPTist\src\hooks\usePasteTextClipboardData.ts

快捷鍵
\PPTist\src\hooks\useGlobalHotkey.ts

添加幻灯片
PPTist\src\views\Editor\Thumbnails\index.vue
```js
createTextElement({
    left: (VIEWPORT_SIZE - width) / 2,
    top: (VIEWPORT_SIZE * viewportRatio.value - height) / 2,
    width,
    height,
}, { content: '<p>新添加文本</p>' })
createImageElement(base64)

import { nanoid } from 'nanoid'
// const base64Str
createElement({
    type: 'image',
    id: nanoid(10),
    src,
    width,
    height,
    left: (VIEWPORT_SIZE - width) / 2,
    top: (VIEWPORT_SIZE * viewportRatio.value - height) / 2,
    fixedRatio: true,
    rotate: 0,
})


const insertImageElement = (files: FileList) => {
  const imageFile = files[0]
  if (!imageFile) return
//   createImageElement 會吃 base64字串
  getImageDataURL(imageFile).then(dataURL => createImageElement(dataURL))
}
/**
 * 读取图片文件的dataURL
 * @param file 图片文件
 */
export const getImageDataURL = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result as string)
    })
    reader.readAsDataURL(file)
  })
}
```

```js
{
    "type": "image",
    "id": "k9xsIFFf9y",
    "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABjCAYAAABkDAWWAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAADeSURBVHhe7dExAQAADMOg+TfdyeAJFriFKgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArgNoe2sb0HpbCSvIAAAAASUVORK5CYII=",
    "width": 96,
    "height": 99,
    "left": 452,
    "top": 231.75,
    "fixedRatio": true,
    "rotate": 0
}
{
    "type": "image",
    "id": "Bkkegbnm1T",
    "src": "data:image/png;base64,",
    "width": 316.2481259370315,
    "height": 562.5,
    "left": 341.8759370314842,
    "top": 0,
    "fixedRatio": true,
    "rotate": 0
}
{
    "type": "text",
    "id": "w1FvXAwSsC",
    "left": 101.86176994372742,
    "top": 140.0599285673023,
    "width": 169.96788008565312,
    "height": 58.886509635974306,
    "content": "",
    "rotate": 0,
    "defaultFontName": "Microsoft Yahei",
    "defaultColor": "#333",
    "vertical": false
}
```

```js
  state: (): SlidesState => ({
    theme: theme, // 主题样式
    slides: slides, // 幻灯片页面数据
    slideIndex: 0, // 当前页面索引
    viewportRatio: 0.5625, // 可视区域比例，默认16:9
  }),
import { useSlidesStore } from '@/store'
const slidesStore = useSlidesStore()
const { currentIndex } = storeToRefs(slidesStore)

//PPTist\src\hooks\useSlideHandler.ts
const {
  copySlide,
  pasteSlide,
  createSlide,
  createSlideByTemplate,
  copyAndPasteSlide,
  deleteSlide,
  cutSlide,
  selectAllSlide,
  sortSlides,
} = useSlideHandler()
  // 创建一页空白页并添加到下一页
  const createSlide = () => {
    const emptySlide: Slide = {
      id: nanoid(10),
      elements: [],
      background: {
        type: 'solid',
        color: theme.value.backgroundColor,
      },
    }
    mainStore.setActiveElementIdList([])
    slidesStore.addSlide(emptySlide)
    addHistorySnapshot()
  }

```

```js
const slidesStore = useSlidesStore()
  const { currentSlide, slides, theme, slideIndex } = storeToRefs(slidesStore)
```