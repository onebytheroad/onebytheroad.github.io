---
title: 11-03 笔记
description: 春风若有怜花意，可否许我再少年。
date: 2025-11-03
slug: 11-03
image: bj.jpg
categories:
    - 每日
---

##### 作业

1.指针含义：指针是一个存放内存地址的变量.指针长度：长度由所属变量类型决定，char 即1字节，int 即4字节，如果五类型，由所在平台决定，x86即4个字节，x64即8个字节

2.p是指针时，\*p的情况需要做讨论，如果是没有与int之类的声明语句相结合，则为解引用符号，读取指针中存放的地址，如果与声明语句结合，则可能是二级指针

3.通过char类型的指针指向int 类型的整数1，然后打印指针值，int类型占四个字节，而char指针只有一个字节，会丢失另外三字节的数据，看打印结果是1或者0就能判断是高位还是低位优先。

4.x86平台是低位优先储存，所以两个指针读取出的数都是ff，p1用的是有符号的字符型，p2是无符号的字符型，而输出的之后又采取转换成10进制输出，

ff转换成2进制应0111 1111 ，10进制是255，但是有符号数中，数的范围是-128~127，所以p1的输出应该是-1，因为补码的127+1整数溢出，p2的输出应该是255

导入vs

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <stdbool.h>



int main()
{
	int num = 0x000000ff;
	char* p1 = (char*)&num;
	unsigned char* p2 = (unsigned char*)&num;
	printf("%lu\n", *p1);
	printf("%lu\n", *p2);

	return 0;
}


```

第一个结果是随机数，第二个结果是255

```
ai解答

1. 整数提升规则
在C语言中，小于int的类型在表达式计算中会被提升为int：

char → int

unsigned char → int

2. 具体过程分析
对于 *p1 (有符号char，值0xff = -1)：
c
*p1 = 0xff  // 内存中的字节

// 整数提升（保持值不变）：
char -1 → int -1
二进制：11111111 (char) → 11111111 11111111 11111111 11111111 (int)

// 提升后的int值：0xFFFFFFFF (-1)
对于 *p2 (无符号char，值0xff = 255)：
c
*p2 = 0xff  // 内存中的字节

// 整数提升（保持值不变）：
unsigned char 255 → int 255  
二进制：11111111 (uchar) → 00000000 00000000 00000000 11111111 (int)

// 提升后的int值：0x000000FF (255)
printf的可变参数机制
printf 通过 va_list 从栈上读取参数，它不知道实际传入的类型，只按照格式符解释：

c
printf("%lu\n", *p1);
栈上实际内容：

text
| 0xFFFFFFFF | (从*p1提升来的int -1)
| 格式字符串地址 |
printf的理解：

%lu 期望 4/8字节的 unsigned long

但从栈上读取到的是 0xFFFFFFFF (int -1)

类型不匹配 → 未定义行为


```



美化了博客，修复了一堆史山代码

