---
title: 12-17 解题
description: 
date: 2025-12-17
slug: 12-17
image: bj.jpg
categories:
  - BUU WP	
---

算法加密？

![img](file:///C:\Users\14671\Documents\Tencent Files\1467149032\Image\C2C\($_[ZB$_YSGV921@7)A]3WT.png)

已知_data_start__  内含字符串，v4的字符串也知道

解密思路，已知题目有`v4[i] != _data_start__[*((char *)v5 + i) - 1]` 的判断条件

需要满足v4字符与输入之后的字符经过变换在data里面的字符相等

遍历 data_start 中与v4相同的字符，查询到字符后存入 

知晓存入的 j  代表着  ` j = *((char *)v5 + i) - 1` ,由此做逆向输出

得十六进制 `0x54,0x37,0x55,0x5b,0x2c,0x4d,0x58,0x4f,0x2d,0x36,0x49,0x33`

输出得字符串 `T7U[,MXO-6I3`  但是结果不对





z

不一样的flag

解压exe 命令行运行，是上下左右移动形式

查壳 无壳  进ida找main函数进入

```
走步数的循环
代码中可得程序出口
if ( v7[5 * *(_DWORD *)&v3[25] - 41 + v4] == 35 )
{
      puts("\nok, the order you enter is the flag!");
      exit(0);
}
```

 而后调试程序，进入汇编查找地址

查v7的地址0060FEF0，计算算式的条件可得到，`23h = 35` ，在0060FEF0附近查找结果为23h的只有0060FEDF位置，所以v7[-17]为flag推出条件

而当程序等于49即31h，也就是0060FEDF位置往上的1结果时程序退出

而后理出 v4,v3 逻辑，左右改变v4，上下改变v3，确定是re逆向迷宫题

```
根据
    for ( i = 0; i <= 1; ++i )
    {
      if ( *(_DWORD *)&v3[4 * i + 25] > 4u )
        exit(1);
    }
说明v3<=4,且‘*11110100001010000101111#’共25个字符
得知为5 * 5迷宫

即:
*1111
01000
01010
00010
1111#

按图解出
```



更多迷宫类型未遇见

