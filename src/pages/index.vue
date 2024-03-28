<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import { languageColumns, locale } from '@/utils/i18n'

definePage({
  name: 'main',
  meta: {
    level: 1,
  },
})

const appStore = useAppStore()
const checked = ref<boolean>(isDark.value)

watch(
  () => isDark.value,
  (newMode) => {
    checked.value = newMode
  },
  { immediate: true },
)

function toggle() {
  toggleDark()
  appStore.swithMode(isDark.value ? 'dark' : 'light')
}

const { t } = useI18n()

const languageValues = computed({
  get() {
    return [locale.value]
  },
  set(values: Array<string>) {
    locale.value = values[0]
  },
})

const menuItems = computed(() => ([
  { title: t('home.mockGuide'), route: 'mock' },
  { title: t('home.echartsDemo'), route: 'charts' },
  { title: t('home.unocssExample'), route: 'unocss' },
  { title: t('home.persistPiniaState'), route: 'counter' },
  { title: t('home.404Demo'), route: 'unknown' },
]))

const showLanguagePicker = ref(false)
</script>

<template>
  <VanCellGroup inset>
    <VanCell center :title="$t('home.darkMode')">
      <template #right-icon>
        <VanSwitch v-model="checked" size="20px" aria-label="on/off Dark Mode" @click="toggle()" />
      </template>
    </VanCell>
    <van-field
      is-link
      readonly
      name="picker"
      :label="$t('home.language')"
      @click="showLanguagePicker = true"
    />
    <van-popup v-model:show="showLanguagePicker" position="bottom">
      <van-picker
        v-model="languageValues"
        :columns="languageColumns"
        @confirm="showLanguagePicker = false"
        @cancel="showLanguagePicker = false"
      />
    </van-popup>

    <template v-for="item in menuItems" :key="item.route">
      <VanCell :title="item.title" :to="item.route" is-link />
    </template>
  </VanCellGroup>
</template>

<route lang="yaml">
  meta:
    layout: home
</route>
