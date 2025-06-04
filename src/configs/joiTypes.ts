import {convertFromDirectory} from "joi-to-typescript"

convertFromDirectory({
  schemaDirectory: "./src/validation",
  typeOutputDirectory: './src/validation/types',
})