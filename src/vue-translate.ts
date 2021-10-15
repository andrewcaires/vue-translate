import Vue, { PluginObject } from 'vue';

export interface VueTranslateOptions {
  locale?: string;
  locales?: VueTranslateLocales;
}

export type VueTranslateLocale = { [key: string]: string }
export type VueTranslateLocales = { [key: string]: VueTranslateLocale }
export type VueTranslateParameters = { [key: string]: string | number | boolean }

class Translate {

  private options: VueTranslateOptions;

  constructor(options: VueTranslateOptions) {

    this.options = options;
  }

  current(): VueTranslateLocale {

    return this.options.locale && this.options.locales && this.options.locales[this.options.locale] || {};
  }

  locale(value: string): boolean {

    if (this.options.locale != value) {

      this.options.locale = value;

      return true;
    }

    return false;
  }

  translate(message: string, options: VueTranslateParameters = {}): string {

    const messages = this.current();

    message = messages[message] || message;

    return message.replace(/{[0-9a-zA-Z]+}/g, (value: string) => {

      value = value.substring(1, value.length - 1);

      return options && options[value]?.toString() || `%${value}%`;
    });
  }

  update(components: Array<Vue>): boolean {

    components.forEach((component) => {

      component.$forceUpdate();

      this.update(component.$children);
    });

    return true;
  }
}

export const VueTranslate: PluginObject<VueTranslateOptions> = {

  install(vue: any, options: VueTranslateOptions = {}): void {

    const plugin = new Translate(options);

    Vue.mixin({

      methods: {

        $t: plugin.translate.bind(plugin),

        $locale(value: string) {

          return plugin.locale(value) && plugin.update(this.$root.$children);
        },
      },
    });
  },
};

declare module 'vue/types/vue' {
  interface Vue {
    $t: typeof Translate.prototype.translate;
    $locale: typeof Translate.prototype.locale;
  }
}

export default VueTranslate;
