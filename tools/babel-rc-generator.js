/* inspired by https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/tools/babel-preset.js */
const BABEL_ENV = process.env.BABEL_ENV;
const building = BABEL_ENV != undefined && BABEL_ENV !== "cjs";
const transformImports = require("babel-plugin-transform-imports")

module.exports = {
  presets: [
    [
      "env",
      {
        loose: true,
        modules: building ? false : "commonjs"
      }
    ],
    "stage-0",
    "react"
  ],
  plugins: [transformImports]
}
