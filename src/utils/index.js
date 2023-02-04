import path from "path";
import { fileURLToPath } from "url";

export const __dirname = (metaURL) => path.dirname(fileURLToPath(metaURL));