---
title: 11-29 转移指令
description: 年年岁岁花相似，岁岁年年人不同
date: 2025-11-29
slug: 11-29
image: bj.jpg
categories:
  - 汇编语言
---

# 第九章 转移指令

操作符offset，用来取得标号的偏移地址

```
s:mov ax,bx
  mov si,offset s
  mov di,offset s0
  mov ax,cs:[si]
  mov cs:[di],axs0
s0:nop
   nop
```

用`offset` 可以复制标号地址然后使用

无条件转移

`jmp` 可以只修改IP，也可以同时修改cs和ip

`jmp`转移的目的地址，转移的举例（段间，段内，）

 `jmp short 标号` 转到标号处执行指令，实现段内短转移，对ip的修改范围是-128~127，向后移动127或者向前转移128歌字节

~~~
start:mov ax,0
      jmp short s
      add ax,1
    s:inc ax
codesg ends
~~~

在cpu机器码中，对于`jmp short s`这段代码没有给机器码的详细描述

cpu不需要具体的谜底地址就可以实现对ip的修改

![9.3jiqima](9.3jiqima.png)

补码进行的计算，计算出地址的偏移再位移

jmp short 标号   为   (ip) = (ip)+ 8位位移

8位位移=标号出的地址  -jmp后的第一个字节的地址

short指明此处的唯一为8位位移

由编译程序在编译时计算出



范围为-128~127

` jmp near ptr 标号`功能为 (ip) = (ip)+ 16位位移

进行段内近转移



## 无条件跳转

`jmp far ptr 标号` 

实现段间转移，又称为远转移

CS表示标号所在的段地址

IP表示标号坐在段中的偏移地址

far ptr指明了指令用标号的段地址和便宜地址来修改CS和IP

~~~
start:mov ax,0
      mov bx,0
      jmp far ptr s
      db 256 dup (0)
    s:add ax,1
      inc ax
~~~



`jmp 16位寄存器`

ip = 16位寄存器



`jmp word ptr 内存单元地址（段内转移）`

从内存单元地址处开始存放一个字，转移的目的偏移地址

~~~
mov ax,0123H
mov ds:[0],ax
jmp word ptr ds:[0]
~~~



`jmp dword ptr 内存单元地址（段内转移）`

内存单元地址处存放着两个字，高地址处的字是转移的目的段地址

低地址处是转移的目的偏移地址

cs = 内存单元地址+2

ip  = 内存单元地址

~~~
mov ax,0123h
mov ds:[0],ax
mov word ptr ds:[2],0
jmp dword ptr ds:[0]

cs = 0
ip = 0123h
cs:ip = 0000:0123
~~~



## 有条件跳转

jcxz指令为有条件转移指令，所有的有条件转移指令都是短转移

在对应的机器码中包含转移的位移，而不是目的地址

`jcxz 标号`

如果（cx）=0，则转移到标号处执行

(ip) = (ip) + 8位位移

cx != 0 时什么也不做

==约等于 if((cx)\==0)   jmp short  标号==



loop

if( (cx) != 0 )   jmp short 标号
