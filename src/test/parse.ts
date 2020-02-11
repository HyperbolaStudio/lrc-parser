import { parse } from "../lib/parser";
import * as fs from "fs";
import { createLRC } from "../lib/createLrc";
let l = fs.readFileSync('./src/test/lyric.lrc');
console.log(createLRC(parse(l.toString()).lyric));