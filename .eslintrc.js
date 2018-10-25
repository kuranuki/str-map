module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "typescript-eslint-parser"
  },
  // parserOptions: {
  //   parser: 'babel-eslint'
  // },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // より厳しいルールにするには`plugin:vue/strongly-recommended`
    // もしくは `plugin:vue/recommended` に切り替えることを検討してください。
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  // *.vue ファイルを lint にかけるために必要
  plugins: [
    'vue'
  ],
  // ここにカスタムルールを追加します。
  rules: {
    "semi": [2, "never"],
    "no-console": "off",
    "quotes": ["error", "single"],
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": [
      "error", {
        "singleQuote": true,
        "semi": false
      },
    ]
  },
  overrides: [
    {
      "files": ["**/*.ts", "**/*.vue"],
      "rules": {
        "no-undef": "off",
        "no-unused-vars": "off", // decorator のため
      }
    }
  ]
}
