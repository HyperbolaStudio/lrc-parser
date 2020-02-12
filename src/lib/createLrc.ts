import { Lyric } from "./definition";

export function createLRC(lyricObj:Lyric,endLine = '\n'){
    let tagsStr = lyricObj.tags.map((tag)=>{
        return `[${Object.keys(tag)[0]}:${Object.values(tag)[0]}]`;
    }).join(endLine);
    let linesStr = lyricObj.lines.map((line)=>{
        return `[${line.time.toString()}]${line.text}`;
    }).join(endLine);
    if(tagsStr!='')return [tagsStr,linesStr].join(endLine);
    else return linesStr;
}