module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vee-validate-inspector': 'off',
    'vue/no-mutating-props': 'off',
    'vuejs-accessibility/alt-text': 'off',
    'vue/require-explicit-emits': 'off',
    'no-unused-vars': 'off',
  },
};
