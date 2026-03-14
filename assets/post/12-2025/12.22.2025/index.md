---
title: 12-22 解题 
description: 
date: 2025-12-22
slug: 12-22-2025
image: bj.jpg
categories:
  - BUU WP
---

2019红帽杯 re

进入无main函数

然后观察start中的函数出入，第一个主函数解密出两个字符串

Info:The first four chars are `flag`

https://bbs.kanxue.com/thread-254172.htm

简单异或

无魔改的base64



但是答案不对

说明正确逻辑在别处

。。

看看别人wp，发现在某一个字符串调用下藏着一个可以的调用函数

sub_400D35

x交叉发现只有一个引用

进入之后发现是内部比对，而且没有输出

```
unsigned __int64 sub_400D35()
{
  unsigned __int64 result; // rax
  unsigned int v1; // [rsp+Ch] [rbp-24h]
  int i; // [rsp+10h] [rbp-20h]
  int j; // [rsp+14h] [rbp-1Ch]
  unsigned int v4; // [rsp+24h] [rbp-Ch]
  unsigned __int64 v5; // [rsp+28h] [rbp-8h]

  v5 = __readfsqword(0x28u);
  v1 = sub_43FD20(0) - qword_6CEE38;
  for ( i = 0; i <= 1233; ++i )
  {
    sub_40F790(v1);
    sub_40FE60();
    sub_40FE60();
    v1 = sub_40FE60() ^ 0x98765432;
  }
  v4 = v1;
  if ( ((unsigned __int8)v1 ^ byte_6CC0A0[0]) == 102 && (HIBYTE(v4) ^ (unsigned __int8)byte_6CC0A3) == 103 )
  {
    for ( j = 0; j <= 24; ++j )
      sub_410E90((unsigned __int8)(byte_6CC0A0[j] ^ *((_BYTE *)&v4 + j % 4)));
  }
  result = __readfsqword(0x28u) ^ v5;
  if ( result )
    sub_444020();
  return result;
}
```

经过解密发现，1233次异或混淆，然后主要字符串可以通过 调试获得 byte_6CC0A0

enc = [0x40, 0x35, 0x20, 0x56, 0x5D, 0x18, 0x22, 0x45, 0x17, 0x2F, 0x24, 0x6E, 0x62, 0x3C, 0x27, 0x54, 0x48, 0x6C, 0x24, 0x6E, 0x72, 0x3C, 0x32, 0x45, 0x5B]

再通过

`v1 = sub_40FE60() ^ 0x98765432;`

`(HIBYTE(v4)` 和` ((unsigned __int8)v1`

`(_BYTE *)&v4 + j % 4))`

这三条，可得到v1=v4且只有四个字节，然后进入循环需要过一个if

`unsigned __int8)v1 ^ byte_6CC0A0[0]) == 102 && (HIBYTE(v4) ^ (unsigned __int8)byte_6CC0A3) == 103`

使得数组里面前四个字节与字符串前四个字节异或得到`flag`

再异或回去得到原本的数组

然后解密



总结：

这一类无主函数且有多处混淆还无确定输出的题目

需要根据字符串或者函数的调用去寻找对应的解密

