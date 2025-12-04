---
title: 12-03 笔记
description: 无可奈何花落去，似曾相识燕归来
date: 2025-12-03
slug: 12-03
image: bj.jpg
categories:
  - 每日
---

计算代码长度

利用 `-`  用 `offset do0end - offset do0` 



设置中断向量

中断向量表中的0号表项中，使do0成为0号中断的中断处理程序

0:0字单元存放偏移地址，0:2字单元存放段地址

```
mov ax,0
mov es,ax
mov word ptr es:[0*4],200h
mov word ptr es:[0*4 + 2],0
```





单步中断

cpu执行完一条指令后，如果检测到标志寄存器的TF位为1，则产生单步中断，引发中断过程，中断类型码为1

```
1；取得中断类型码1
2；标志寄存器入栈，TF，IF设置为0
3；CS,IP入栈
4；(ip) = (1*4),(cs) = (1*4+2)
```

在debug中以t指令的方式展现，cpu执行完t指令后，将TF置为1，然后cpu执行单步中断，再显示所有寄存器中的内容，并且等待输入命令

中断过程中TF置0，是为了防止cpu在执行中断过程程序中再去执行中断过程

不相应中断的特殊情况：（一个例子）

~~~
执行完向ss传递数据的指令之后，如果发生中断，是不执行的。
因为ss与sp一同构成栈空间，而中断指令执行的过程中会向栈中压入数据
如果ss和sp不一起执行，会形成错误的栈空间，导致内存错误
~~~





### **int** 指令  

内中断中由int指令引发的中断

`格式 int n`

取码 ，入栈，调整TF和IF的值 ，然后IP和CS赋值，再转去执行n号中断的中断处理程序

在程序中用int调用任何一个中断的中断处理程序

一般情况下，系统将一些具有一定功能的子程序以中断处理程序的方式提供给应用程序调用，编程时就可以通过int来调用这些子程序。可以将中断处理程序简称为中断例程





### BIOS 和 DOS 所提供的中断例程

系统板的ROM存放着一套成勋，成为BIOS（基本输入输出系统）

~~~
1;硬件系统的检测和初始化程序
2;外部中断和内部中断的中断例程
3;用于对硬件设备进行I/O操作的中断例程
4;其他和硬件系统相关的中断例程
~~~

bios是连接硬件与操作系统的最底层软件，必不可少的系统软件

bios中断的应用

```
int 10h 设置光标位置功能

mov ah,2	置光标
mov bh,0	第0页
mov dh,5	dh中放行号
mov dl,12	dl中放列号
int 10h

显示字符功能
mov ah,0	在光标位置显示字符
mov al,'a'	字符
mov bl,7	颜色属性
mov bh,0	第0页
mov cx,3	字符重复个数
int 10h

代码样例
assume cs:code
code segment

    mov ah,2
    mov bh,0
    mov dh,5
    mov dl,12
    int 10h

    mov ah,9
    mov al,'a'
    mov bl,11001010b
    mov bh,0
    mov cx,3
    int 10h

    mov ax,4c00h
    int 21h

code ends
end
```



dos中断例程

```
assume cs:code

data segment
  db 'Welcome to masm', '$'
data ends

code segment 
start:
    mov ah,2	置光标
    mov bh,0	第0页
    mov dh,5	dh中放行号
    mov dl,12	dl中放列号
    int 10h

    mov ax,data
    mov ds,ax
    mov dx,0	ds:dx指向字符串的首地址data:0
    mov ah,9	表示调用第21h号中9号子程序，功能为在从光标位置显示字符串
    int 21h

    mov ax,4c00h
    int 21h

code ends
end start

$本身不显示，起到边界的作用

正常的int 21h返回是4ch号功能 即：
mov ah,4ch
mov al,0
int 21h
```





### PWN COLLEGE

逻辑门

与门，或门，异或门，非门













