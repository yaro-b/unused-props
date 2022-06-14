import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import replace from "@rollup/plugin-replace"

export default {
  input: "./src/index.tsx",
  output: {
    file: "./public/assets/bundle.js",
    format: "iife",
  },
  plugins: [
    resolve(),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
    }),
    typescript(),
  ],
}
