import { createI18n } from 'vue-i18n'
import enUS from 'vant/es/locale/lang/en-US'
import zhCN from 'vant/es/locale/lang/zh-CN'

/**
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages'
import { Locale, type PickerColumn } from 'vant'

export const i18n = createI18n({
  locale: localStorage.getItem('language') || navigator.language,
  fallbackLocale: 'zhCN',
  messages,
})

/** 多语言 picker columns */
export const languageColumns: PickerColumn = [
  { text: '简体中文', value: 'zh-CN' },
  { text: 'English', value: 'en-US' },
]

/** 当前语言 */
export const locale = computed({
  get() {
    return (i18n.global.locale as unknown as Ref<string>).value
  },
  set(language: string) {
    localStorage.setItem('language', language);
    (i18n.global.locale as unknown as Ref<string>).value = language
    Locale.use(language)
  },
})

// 载入 vant 语言包
Locale.use('zh-CN', zhCN)
Locale.use('en-US', enUS)

// 根据当前语言切换 vant 语言包
Locale.use(locale.value)
