[![npm](https://img.shields.io/npm/v/@andrewcaires/vue-translate?color=blue&logo=npm)](https://www.npmjs.com/package/@andrewcaires/vue-translate)
[![downloads](https://img.shields.io/npm/dt/@andrewcaires/vue-translate?color=blue)](https://www.npmjs.com/package/@andrewcaires/vue-translate)
[![size](https://img.shields.io/github/repo-size/andrewcaires/vue-translate?color=blue)](https://github.com/andrewcaires/vue-translate)
[![language](https://img.shields.io/github/languages/top/andrewcaires/vue-translate?color=blue)](https://github.com/andrewcaires/vue-translate)
[![commit](https://img.shields.io/github/last-commit/andrewcaires/vue-translate?color=blue&logo=github)](https://github.com/andrewcaires/vue-translate)
[![license](https://img.shields.io/github/license/andrewcaires/vue-translate?color=blue)](https://github.com/andrewcaires/vue-translate/blob/main/LICENSE)

# vue-translate

VueJS plugin for translation

## Installation

`npm i @andrewcaires/vue-translate`

## Usage

```js
import VueTranslate from '@andrewcaires/vue-translate';
import Vue from 'vue';

Vue.use(VueTranslate, {
  locale: 'en',
  locales: {
      'en': {
        'Hello world': 'Hello world',
      },
      'pt': {
        'Hello world': 'Olá Mundo',
      },
  },
});

<template>
  <div>{{$t('Hello world')}}</div>
</template>

// OR

export default Vue.extend({
  ...
  computed: {
    text() {
      return this.$t('Hello world');
    }
  },
  ...
});
```

## Api

- `$t` Translate a message

```js
const text = this.$t('Hello world');

const text = this.$t('Hello {name}', { name: 'John' });
```

- `$locale` Set language for translation

```js
this.$locale('en');
```

### Links

*  [Docs](https://github.com/andrewcaires/vue-translate#readme)
*  [GitHub](https://github.com/andrewcaires/vue-translate)
*  [npm](https://www.npmjs.com/package/@andrewcaires/vue-translate)

## License

*  [MIT](https://github.com/andrewcaires/vue-translate/blob/main/LICENSE)
