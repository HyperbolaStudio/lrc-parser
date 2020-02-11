import { Lyric } from "./definition";

export function createLRC(lyricObj:Lyric,endLine = '\n'){
    return [
        lyricObj.tags.map((tag)=>{
            return `[${Object.keys(tag)[0]}:${Object.values(tag)[0]}]`;
        }).join(endLine),
        lyricObj.lines.map((line)=>{
            return `[${line.time.toString()}]${line.text}`;
        }).join(endLine)
    ].join(endLine);
}