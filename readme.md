# LRC-Parser

Parsing LRC file.

# Installation

```
npm install @hypst/lrc-parser
```

This module works on browsers as well.

# Usage

```javascript
parse(lrc)
```

## Parameters:
|Parameter|Description|
|-|-|
|`lrc`|LRC source file, as string.|

## Return value:

An object with 2 properties.

|Property|Description|
|-|-|
|`info`|An array including parse info, warnings and errors.|
|`lines`|An array including lines of lyric.|

### Item of `info`:

|Property|Description|
|-|-|
|`type`|`Fatal`, `Error`, `Warning` or `Info`.|
|`message`|Message.|
|`line`|(Optional) The line where the info occurs.|
|`column`|(Optional) The column where the info occurs.|

### Item of `lines`:

|Property|Description|
|-|-|
|`time`|An `HMSTime` object.|
|`text`|Lyric text.|

About `HMSTime`, see [@hypst/time-beat-format](https://github.com/HyperbolaStudio/time-beat-format).