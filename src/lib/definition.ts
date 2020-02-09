import {HMSTime} from '@hypst/time-beat-format';

export interface LyricTag{
    [tag:string]:string;
}
export interface LyricLine{
    time:HMSTime;
    text:string;
}
export interface Lyric{
    tags:LyricTag[];
    lines:LyricLine[];
}

export interface ParseInfo{
    type:'Info'|'Warning'|'Error'|'Fatal';
    line?:number;
    column?:number;
    message:string;
}
export interface ParseResult{
    info:ParseInfo[];
    lyric:Lyric;
}