---
title: 11-22 笔记
description: 雨终究会停，雾终究会散，你我终究会被替代
date: 2025-11-22
slug: 11-22
image: bj.jpg
categories:
  - 每日
---

# 第五章 [BX]和loop指令

## 5.1 【bx】和内存单元的描述

![5.1debughebianyiqi](5.1debughebianyiqi.png)

debug中写命令，与编辑器中写命令不同。

debug中写[0]，指的是偏移地址，但是编辑器中写[0]被认为是0，01这样的数据

![5.1boxheneicundanyuan](5.1boxheneicundanyuan.png)

我们要完整的描述一个内存单元，需要两种信息：

* 内存单元的地址
* 内存单元的长度（类型）

我们用[0]表示一个内存单元时，0表示单元的偏移地址，段地址默认在ds中，单元的长度（类型）可以由具体指令中的其他操作对象（比如寄存器）指出，如前边的AX,AL

![5.1bianyiqi](5.1bianyiqi.png)

在汇编源程序中直接使用mov ax,[0] 编译器会把[0]当成0直接传输过去

可用通用寄存器来间接传递偏移地址单元的数据

loop是描述循环的指令

### 描述性符号”（）“：用括号来表示一个寄存或一个内存单元中的内容

![5.2miaoshuxingfuhao](5.2miaoshuxingfuhao.png)

![5.2miaoshufuhao](5.2miaoshufuhao.png)

![5.2miaoshuxxu](5.2miaoshuxxu.png)

### 约定符号idata表示常量

在debug中写过类似的指令：mov ax,[0]，表示将ds：0处的数据送入ax中，指令中，在[...]里用一个常量0表示内存单元的偏移地址，以后我们用idata表示常量

![5.1yuedingfuhao](5.1yuedingfuhao.png)



![5.1zhilinggongneng](5.1zhilinggongneng.png)

![5.1zhilingongnengxu](5.1zhilingongnengxu.png)



~~~
assume cs:codesg
codesg  segment
fishcc:mov ax,2000h
			 mov ds,ax
			 mov bx,1000h
			 mov ax,[bx]
			 inc bx
			 inc bx
			 mov [bx],ax
			 inc bx
			 inc bx
			 mov [bx],ax
			 inc bx
			 mov [bx],al
			 inc bx
			 mov [bx],al

	mov ax,4c00h
	int 21h

codesg ends
end fishcc

inc：加加运算符，bx中内容加1
~~~

指令分析：

![5.1wentifenxi1](5.1wentifenxi1.png)



![5.1wentifenxi2](5.1wentifenxi2.png)



![5.1wentifenxi3](5.1wentifenxi3.png)

[bx]：用寄存器来表示段地址当中的偏移地址

**注意**

（）里的元素可以有三种类型：1.寄存器名，2.段寄存器名，3.内存单元的物理地址（一个20位数据）

比如：(ax),(ds),(al),(cx),(20000H),((ds)*16+(bx)) 都是正确用法

(2000:0),((ds):1000h)不是正确的用法

## 5.2 loop指令

* 指令的格式：loop 标号，CPU执行loop指令的时候，要进行两步操作：
  * （cx）=（cx）-1；  cx与loop紧密相连
  * 判断cx中的值，不为零则转至标号处执行程序，如果为0则向下执行



* 从上面的描述中，可以看到，cx中的值影响着loop指令的执行结果
* 通常，我们用loop指令来实现循环功能，cx中存放循环次数



### 编程计算

![5.2bianchengjis](5.2bianchengjis.png)

![5.2biacnhengjisuant](5.2biacnhengjisuant.png)

![5.2biancjisuan](5.2biancjisuan.png)

![5.2jisuanrenwus](5.2jisuanrenwus.png)



按照算法 计算大量数据程序的数量非常多，用loop来简化

![5.2loopjisuanshli](5.2loopjisuanshli.png)

与goto类似，设置一个标号，loop跳转到标号，然后执行循环

每一次循环cx中的数值减1，直到cx数值减为0结束循环执行下一条语句

*程序分析*

（1）标号

在汇编语言中，标号代表一个的地址，此程序中有一个标号s，它实际上标识了一个地址，这个地址处有一条指令：add ax,ax

（2）loop s

![5.2loop20](5.2loop20.png)

debug编辑默认十六进制

masm默认是十进制的



![5.2loopzhiling](5.2loopzhiling.png)



![5.2zhilingchegxu](5.2zhilingchegxu.png)



![5.2debuggenzongloop](5.2debuggenzongloop.png)



![5.2fenxi5.2wenti](5.2fenxi5.2wenti.png)

注意：

![5.2zhuyi](5.2zhuyi.png)



![5.3ruhefuzhi](5.3ruhefuzhi.png)

 

![5.3zhuyiqieji](5.3zhuyiqieji.png)

**切记，不能以字母开头，需要在前面加上0**



## 复习指令处理

### 5.4 debug和汇编编译器masm对指令的不同处理

![5.4axfuxi](5.4axfuxi.png)

两种不同的情况处理

![5.4liangzhongbiancqing](5.4liangzhongbiancqing.png)

```
debug
mov ax,2000
mov ds,ax
mov al,[0]
mov bl,[l]
mov cl,[2]
mov dl,[3]
```



~~~
汇编程序
需要通过[bx]来实现
如果想要直接通过[2]来实现
需要加上段地址

debug
mov ax,2000
mov ds,ax
mov al,ds:[0]
mov bl,ds:[l]
mov cl,ds:[2]
mov dl,ds:[3]
~~~

![5.4zhilingfenbian](5.4zhilingfenbian.png)

## 5.5 loop和[bx]的联合应用

![5.5lianheyingyong](5.5lianheyingyong.png)

![5.5lianheyingyongfenxi2](5.5lianheyingyongfenxi2.png)

![5.5lianhefenxi3](5.5lianhefenxi3.png)

![5.5lianhejiyingyong4](5.5lianhejiyingyong4.png)

问题：

类型的匹配和结果的不超界

目前的方法：用一个16位的寄存器来作为中介

我们将内存单元的中的8位数据复制到一个16位寄存器ax中，再将ax中的数据加到dx上，从而使两个运算对象的类型匹配并且结果不会超界

不使用循环，代码重复啰嗦

 ```
 mov al,ds:[0]
 mov ah,0
 mov dx,ax
 ```

![5.5leijiafenx9](5.5leijiafenx9.png)

循环体内容：

![5.5xunhuantinerong](5.5xunhuantinerong.png)

![5.5xunhuanfenxixuxu](5.5xunhuanfenxixuxu.png)

![5.5xuanhuanxuxuxuxu](5.5xuanhuanxuxuxuxu.png)

![5.5xiangxisuanfamiaos](5.5xiangxisuanfamiaos.png)

最终程序的实现：

```
assume cs:code
code segment
	mov ax,0ffffh
	mov ds,ax
	mov bx,0
	
	mov dx,0
	
	mov cx,12
	
s:  mov al,[bx]
	mov ah,0
	add dx,ax
	inc bx
	loop s
	
	mov ax,4c00h
	int 21h
code ends
end
```



## 5.5 loop和【bx】的联合应用

在实际编程中，经常会遇到，用同一种方法处理地址连续的内存单元中的数据的问题

我们需要用循环来解决这类问题，同时我们必须能够在每次循环的时候按照同一种方法来改变要访问的内存单元的地址


这时我们不用能常量来给出内存单元的地址，而应用变量

”mov al,[bx]“中的bx就可以看作一个代表内存单元地址的变量，我们可以不写新的指令，仅通过改变bx中的数值，改变指令访问的内存单元

## 5.6 段前缀

指令”mov ax,[bx]“中，内存单元的偏移地址由bx给出，而段地址默认在ds中

我们可以在访问内存单元的指令中显示地给出内存单元的段地址所在的段寄存器

![5.6duanqianzhui](5.6duanqianzhui.png)

如果前面什么都没写的话默认是放在ds中的

## 5.7 一段安全的空间

![5.7daimaweigui](5.7daimaweigui.png)

代码违规，动用了其他程序或操作系统的内存占用空间

![5.7yiduananquankongjian](5.7yiduananquankongjian.png)

总结一下

（1）我们需要直接向一段内存中写入内吨

（2）这段内存空间不应该存放系统或其他程序的数据或代码，否则写入操作很可能引发错误

（3）dos方式下，一般情况，0：200~0：2FF空间中没有系统或其他程序的数据或代码；

（4）以后，我们需要直接向一段内存中写入内容时，就是用0：200~0：2FF这段空间

## 5.8 段前缀的使用

* 我们考虑一个问题

将内存ffff:0~ffff:b段单元中的数据拷贝到0：200~0：20b单元中

![5.8fenxiduanqinazhui](5.8fenxiduanqinazhui.png)

![5.8fenxiyixiaa](5.8fenxiyixiaa.png)

~~~
assume cs:code
code srgment
	mov bx,0;       (bx)=0,偏于i从0开始
	mov cx,12;      （cx）=12，循环12次
s:  mov ax,0ffffh
	mov ds,ax；     （ds）0ffffh
	mov dl,[bx]；    （dl）= （（ds）*16+bx），将ffff：bx中的数据送入dl
	mov ax,0020h 
	mov ds,ax；      （ds）=0020h
	mov [bx],dl；   （（ds）*16+（bx）） = （dl），将dl的数据送入0020Lbx
	inc bx			；（bx）=（bx）+1
	loop s
	
	mov ax,4c99h
	int 21h
code ends
end
~~~



![5.8chengxudaimfexni](5.8chengxudaimfexni.png)



改进的程序中，使用es存放目标空间0020：0~0020：b的段地址，用ds存放源空间ffff：0~ffff：b的段地址

在访问内存单元的指令”mov es:[bx],al“中，显式的用段前缀”es：“给出单元的段地址，这样就不必再循环中重复设置ds
