import { parse } from "../lib/parser";
import * as fs from "fs";
let l = fs.readFileSync('./src/test/lyric.lrc');
console.log(JSON.stringify(parse(l.toString())));