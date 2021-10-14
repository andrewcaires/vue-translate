import Vue, { PluginObject } from 'vue';

export interface VueTranslateOptions {
  locale?: string;
  locales?: VueTranslateLocales;
}

export type VueTranslateLocale = { [key: string]: string }
export type VueTranslateParams = { [key: string]: string }
export type VueTranslateLocales = { [key: string]: VueTranslateLocale }

let locale: string | undefined;
let locales: VueTranslateLocales;

const forceUpdate = (components: Array<Vue>): boolean => {

  components.forEach((component) => {

    component.$forceUpdate();

    forceUpdate(component.$children);
  });

  return true;
}

const getCurrent = (): VueTranslateLocale => {

  return locale && locales[locale] || {};
}

const install = (vue: any, options: VueTranslateOptions = {}): void => {

  locale = options.locale;
  locales = options.locales || {};

  Vue.mixin({

    methods: {

      $t: toTranslate,

      $locale(value: string) {

        return setLocale(value) && forceUpdate(this.$root.$children);
      },
    },
  });
}

const setLocale = (value: string): boolean => {

  if (locale != value) {

    locale = value;

    return true;
  }

  return false;
}

const toTranslate = (message: string, options?: VueTranslateParams) => {

  options = options || {};

  const messages = getCurrent();

  message = messages[message] || message;

  return message.replace(/{[0-9a-zA-Z]+}/g, (value) => {

    value = value.substring(1, value.length - 1);

    return options && options[value] || `%${value}%`;
  });
}

export const VueTranslate: PluginObject<VueTranslateOptions> = { install };

declare module 'vue/types/vue' {
  interface Vue {
    $t: typeof toTranslate;
    $locale: typeof setLocale;
  }
}

export default VueTranslate;
