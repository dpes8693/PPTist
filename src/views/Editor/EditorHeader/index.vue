<template>
  <div class="editor-header">
    <div class="left">
      <Dropdown :trigger="['click']">
        <div class="menu-item">
          <IconFolderClose /> <span class="text">文件</span>
        </div>
        <template #overlay>
          <Menu>
            <FileInput
              accept=".pptist"
              @change="files => importSpecificFile(files)"
            >
              <MenuItem>导入 pptist 文件</MenuItem>
            </FileInput>
            <FileInput
              accept="application/vnd.openxmlformats-officedocument.presentationml.presentation"
              @change="files => importPPTXFile(files)"
            >
              <MenuItem>导入 pptx 文件（demo）</MenuItem>
            </FileInput>
            <MenuItem @click="setDialogForExport('pptx')">导出文件</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Dropdown :trigger="['click']">
        <div class="menu-item"><IconEdit /> <span class="text">编辑</span></div>
        <template #overlay>
          <Menu>
            <MenuItem @click="undo()">撤销</MenuItem>
            <MenuItem @click="redo()">重做</MenuItem>
            <MenuItem @click="createSlide()">添加页面</MenuItem>
            <MenuItem @click="deleteSlide()">删除页面</MenuItem>
            <MenuItem @click="toggleGridLines()">{{
              gridLineSize ? '关闭网格线' : '打开网格线'
            }}</MenuItem>
            <MenuItem @click="toggleRuler()">{{
              showRuler ? '关闭标尺' : '打开标尺'
            }}</MenuItem>
            <MenuItem @click="resetSlides()">重置幻灯片</MenuItem>
            <MenuItem @click="openSelectPanel()">{{
              showSelectPanel ? '关闭选择面板' : '打开选择面板'
            }}</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Dropdown :trigger="['click']">
        <div class="menu-item"><IconPpt /> <span class="text">演示</span></div>
        <template #overlay>
          <Menu>
            <MenuItem @click="enterScreeningFromStart()">从头开始</MenuItem>
            <MenuItem @click="enterScreening()">从当前页开始</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Dropdown :trigger="['click']">
        <div class="menu-item">
          <IconHelpcenter /> <span class="text">帮助</span>
        </div>
        <template #overlay>
          <Menu>
            <MenuItem
              @click="goLink('https://github.com/pipipi-pikachu/PPTist/issues')"
              >意见反馈</MenuItem
            >
            <MenuItem
              @click="
                goLink(
                  'https://github.com/pipipi-pikachu/PPTist/blob/master/doc/Q&A.md'
                )
              "
              >常见问题</MenuItem
            >
            <MenuItem @click="hotkeyDrawerVisible = true">快捷键</MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Dropdown :trigger="['click']">
        <div class="menu-item">
          <IconHelpcenter /> <span class="text">製作截圖(快捷鍵=F7)</span>
        </div>
        <template #overlay>
          <Menu>
            <MenuItem @click="hotkeyDrawerVisible2 = true"
              >呼叫匯入json視窗</MenuItem
            >
          </Menu>
        </template>
      </Dropdown>
    </div>

    <div class="right">
      <Tooltip :mouseLeaveDelay="0" title="导出">
        <div class="menu-item" @click="setDialogForExport('pptx')">
          <IconShare size="18" fill="#666" />
        </div>
      </Tooltip>
      <Tooltip :mouseLeaveDelay="0" title="幻灯片放映">
        <div class="menu-item" @click="enterScreening()">
          <IconPpt size="19" fill="#666" style="margin-top: 1px" />
        </div>
      </Tooltip>
      <a href="https://github.com/pipipi-pikachu/PPTist" target="_blank">
        <div class="menu-item"><IconGithub size="18" fill="#666" /></div>
      </a>
    </div>

    <Drawer
      width="320"
      placement="right"
      :closable="false"
      :visible="hotkeyDrawerVisible"
      @close="hotkeyDrawerVisible = false"
    >
      <HotkeyDoc />
    </Drawer>

    <!-- custom -->
    <Drawer
      width="320"
      placement="right"
      :closable="false"
      :visible="hotkeyDrawerVisible2"
      @close="hotkeyDrawerVisible2 = false"
    >
      <div>
        <textarea
          tabindex="0"
          name=""
          id="customTextArea"
          cols="30"
          rows="10"
          v-model="inputJson"
          :placeholder="placeHolder"
        ></textarea>
        <button class="btn" @click="handleParseJson">確定匯入</button>
        <button class="btn" @click="inputJson = ''">清除</button>
      </div>
    </Drawer>

    <FullscreenSpin :loading="exporting" tip="正在导入..." />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'
import useScreening from '@/hooks/useScreening'
import useSlideHandler from '@/hooks/useSlideHandler'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'
import useImport from '@/hooks/useImport'

import HotkeyDoc from './HotkeyDoc.vue'
import FileInput from '@/components/FileInput.vue'
import FullscreenSpin from '@/components/FullscreenSpin.vue'
import { Tooltip, Dropdown, Menu, Drawer, message } from 'ant-design-vue'
//
import { input, genAll } from '@/utils/cutomParser'
import { copyText, readClipboard } from '@/utils/clipboard'
import useAddSlidesOrElements from '@/hooks/useAddSlidesOrElements'
const { addElementsFromData, addSlidesFromData } = useAddSlidesOrElements()
// readClipboard().then(text => {
//       pasteTextClipboardData(text, { onlySlide: true })
//     }).catch(err => message.warning(err))
const MenuItem = Menu.Item

const mainStore = useMainStore()
const { gridLineSize, showRuler, showSelectPanel } = storeToRefs(mainStore)

const { enterScreening, enterScreeningFromStart } = useScreening()
const { createSlide, deleteSlide, resetSlides } = useSlideHandler()
const { redo, undo } = useHistorySnapshot()
const { importSpecificFile, importPPTXFile, exporting } = useImport()

const setDialogForExport = mainStore.setDialogForExport

const toggleGridLines = () => {
  mainStore.setGridLineSize(gridLineSize.value ? 0 : 50)
}

const toggleRuler = () => {
  mainStore.setRulerState(!showRuler.value)
}

const openSelectPanel = () => {
  if (!showSelectPanel.value) mainStore.setSelectPanelState(true)
  else mainStore.setSelectPanelState(false)
}

const hotkeyDrawerVisible = ref(false)
// custom
const placeHolder = `[
    [
        {
            "id": 11,
            "text": "aa",
            "imgSrc": ""
        }
    ]
]`
import { KEYS } from '@/configs/hotkey'

function getClipboardText() {
  navigator.clipboard
    .read()
    .then(clipboardItems => {
      if (clipboardItems.length === 0) {
        console.log('no item')
        return
      }

      const clipboardItem = clipboardItems[0]
      // for (const type of clipboardItem.types) {
      //   if (type === 'text/plain') {
      //     clipboardItem
      //       .getType(type)
      //       .then(data => {
      //         return data.text()
      //       })
      //       .catch(error => {
      //         console.error('讀取剪貼簿失敗:', error)
      //       })
      //   }
      // }
      for (const type of clipboardItem.types) {
        if (type === 'text/plain') {
          clipboardItem
            .getType(type)
            .then(blob => {
              return blob.text() // 將 Blob 轉換為文本
            })
            .then(text => {
              inputJson.value = text
            })
            .catch(error => {
              console.error('讀取剪貼簿失敗:', error)
            })
          break
        }
      }
    })
    .catch(error => {
      console.error('讀取剪貼簿失敗:', error)
    })
}

// 快捷键開DRAWER
const keydownListener = (e: KeyboardEvent) => {
  const key = e.key.toUpperCase()
  if (key === KEYS.DRAWER) {
    hotkeyDrawerVisible2.value = true
    const area = document.getElementById('customTextArea')
    if (area) {
      setTimeout(() => {
        // 貼上剪貼簿文字
        const textFromClipboard = getClipboardText()
        console.log('已成功貼上')
      }, 100)
    }
  }
}
onMounted(() => document.addEventListener('keydown', keydownListener))
onUnmounted(() => document.removeEventListener('keydown', keydownListener))

const hotkeyDrawerVisible2 = ref(false)
const inputJson = ref('')
const handleParseJson = () => {
  try {
    const obj = JSON.parse(inputJson.value)
    if (!Array.isArray(obj)) {
      alert('請使用合法的格式')
      return
    }
    const slideObj = genAll(obj)
    // const slideObj = genAll(input)
    // 執行建立
    if (slideObj?.length === 0) {
      message.warning('空')
      return
    }
    console.log('gen', slideObj)
    addSlidesFromData(slideObj)
    message.success('ok')
  } 
  catch (error: any) {
    if (
      error.message.includes('is not valid JSON') ||
      error.message.includes('Unexpected end of JSON input')
    ) {
      // message.warning('請使用合法的 JSON 格式')
      alert('請使用合法的 JSON 格式')
      return
    }
    // message.error(error)
    alert(error)
  }
}
//

const goLink = (url: string) => window.open(url)
</script>

<style lang="scss" scoped>
.editor-header {
  background-color: #fff;
  user-select: none;
  border-bottom: 1px solid $borderColor;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.left,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;

  .text {
    margin-left: 4px;
  }
}

.left .menu-item:hover {
  background-color: #f9f9f9;
}
</style>
