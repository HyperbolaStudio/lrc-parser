import { ParseResult } from './definition';
import { HMSTime } from '@hypst/time-beat-format';

let tagRegExp = /^\[([A-Za-z]+):(.*?)\]$/;
let lineRegExp = /^\[([0-9:\.]*)\](.*)$/;
export function parse(str:string){
    let result:ParseResult = {
        info:[],
        lyric:{
            tags:[],
            lines:[],
        }
    }
    try{
        let lyricStrList = str.split('\n').map((s)=>{
            return s.trim();
        });
        lyricStrList.forEach((lyricStr,index)=>{
            if(lyricStr==''){
                
            }else if(tagRegExp.test(lyricStr)){
                lyricStr.replace(tagRegExp,(match,d1,d2,offset)=>{
                    d2 = d2.trim();
                    if(!d1){
                        result.info.push({
                            type:'Error',
                            message:'Empty Tag Name.',
                            line:index+1,
                            column:1,
                        });
                        return match;
                    }else if(!d2){
                        result.info.push({
                            type:'Warning',
                            message:'Empty Tag Value.',
                            line:index+1,
                            column:1,
                        });
                    }
                    result.lyric.tags.push({
                        [d1]:d2,
                    });
                    return match;
                });
            }else if(lineRegExp.test(lyricStr)){
                lyricStr.replace(lineRegExp,(match,d1,d2,offset)=>{
                    d2 = d2.trimRight();
                    if(!HMSTime.HMS_REGEXP.test(d1)){
                        result.info.push({
                            type:'Error',
                            message:'Time syntax error.',
                            line:index+1,
                            column:2,
                        });
                        return match;
                    }
                    let time = new HMSTime(d1);
                    if(result.lyric.lines.length && time.offset(result.lyric.lines[result.lyric.lines.length-1].time) < 0){
                        result.info.push({
                            type:'Warning',
                            message:'Not strongly-increasing time label.',
                            line:index+1,
                            column:2,
                        });
                        result.info.push({
                            type:'Info',
                            message:'Previous time label:',
                            line:index,
                            column:2,
                        })
                    }
                    result.lyric.lines.push({
                        time,
                        text:d2,
                    })
                    return match;
                });
            }else{
                result.info.push({
                    type:'Warning',
                    message:'Unrecognized syntax. The line is ignored.',
                    line:index+1,
                    column:1,
                });
            }
        });
    }catch(err){
        console.log(err);
        result.info.push({
            type:'Fatal',
            message:err.message,
        });
    }
    return result;
}