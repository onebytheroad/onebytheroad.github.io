---
title: 11-17 寄存器
description: 平生不会相思，才会相思，便害相思
date: 2025-11-17
slug: 11-17
image: bj.jpg
categories:
  - 汇编语言
---

# 第二章  寄存器（cpu工作原理）

## CPU，寄存器

一个典型的CPU由运算器，控制器，寄存器等器件组成，器件靠内部总线相连

区别：

内部总线实现CPU内部各个器件之间的联系

外部总线实现CPU和主板上其他器件的联系



## 2.1 通用寄存器

8086CPU由14个寄存器，名称为AX,BZ,CX,DX,SI,DI,SP,BP,IP,CS,SS,DS,ES,PSW

8086CPU所有的寄存器都是16位的，可以存放两个字节

AX,BX,CX,DX 通常用来存放一般性数据被称之为通用寄存器

AX作例子

![2.1jicunqicunfang](C:/blog/my-blog/content/post/11-2025/11.16.2025/2.1jicunqicunfang.png)



![2.1hexcunchuqingk](C:/blog/my-blog/content/post/11-2025/11.16.2025/2.1hexcunchuqingk.png)



![2.1jicunqidfenwei](C:/blog/my-blog/content/post/11-2025/11.16.2025/2.1jicunqidfenwei.png)



![2.1 jicunqi8weio](C:/blog/my-blog/content/post/11-2025/11.16.2025/2.1 jicunqi8weio.png)

## 2.2 字在寄存器中的存储

字  word = 2B  8086  8位升级到16位， 把一次性读取16位的内存单元称之为字

## 2.3 几条汇编指令

![2.3huibianzhil](C:/blog/my-blog/content/post/11-2025/11.16.2025/2.3huibianzhil.png)

示例：

![2.3huibianshili](C:\blog\my-blog\content\post\11-2025\11.16.2025\2.3huibianshili.png)

8226H+8226H   进位溢出  1044C  答案是044C

这里的1被放到了进制位中去（请听下回分解）

![2.3seconshili](C:/blog/my-blog/content/post/11-2025/11.16.2025/2.3seconshili.png)

0000H  其中，AH代表了ax的高位，AL代表了ax的低位

add ah，bl  就是对ax的高位和bx的低位进行运算

答案不等于0158H，AH和AL是两个分开的存储，溢出了不会互相进入，会抛到另一个地方

如果是ax则为0158H

###### 监测点2.1

![jiancedian2.1](C:/blog/my-blog/content/post/11-2025/11.16.2025/jiancedian2.1.png)

另附             add al,6						ax=

​		    add al.al						ax=

​		    mov ax,cx						ax=



```
AX = F4A3H

AX = 31A3H

AX = 3123H

AX = 6246H

BX = 826CH

CX = 6246H

AX = 826CH

AX = 04D8H

AX = 0482H

AX = 6C82H

AX = D882H

AX = D888H

AX = D810H

AX = 6246H
```



（2）只能使用目前削过的汇编指令，最多能够使用四条指令，编程计算2的4次方

add ax,0008H

add ax,0008H



```
add ax,2
add ax,ax
add ax,ax
add ax,ax
```

## 2.4 物理地址

cpu访问内存单元是要给出内存单元的地址，所有的内存单元构成的存储空间是一个一位的线性空间。

我们将这个唯一的地址成为物理地址。

线性空间里的每一个存储单元都有唯一的地址，这个唯一的地址称为物理地址

## 2.5 16位结构的cpu

* 1.运算器一次最多可以处理16位的数据
* 2.寄存器的最大宽度为16位
* 3.寄存器和运算器之间的通路是16位的

## 2.6 8086cpu给出物理地址的方法

* 8086有20位地址总线，可传送20位地址，寻址能力为1M （外部）
* 8086内部为16位结构，它只能传送16位的地址，表现出的寻址能力却只有64k

**8086cpu采取一种在内部用两个16位地址合成的方法来形成一个20位的物理地址**

![2.68086cpuluojijiegou ](2.68086cpuluojijiegou .png)

其他部件：计算器之类的

![2.68086cpujiegoushil](2.68086cpujiegoushil.png)

### 地址加法器工作原理

物理地址=段地址*16+偏移地址

![2.6dizhijiafaqi](2.6dizhijiafaqi.png)

## 2.7 短地址*16+偏移地址=物理地址的本质含义

偏移地址比喻1

![2.7pianyibiyu](2.7pianyibiyu.png)

![2.7pianyibiyu1](2.7pianyibiyu1.png)

偏移地址比喻2

![2.7pianyidizhi2](2.7pianyidizhi2.png)

![2.7pianyizhi](2.7pianyizhi.png)

## 2.8 段的概念

![2.8duandegainian](2.8duandegainian.png)



![2.8duandeshili](2.8duandeshili.png)



在编程时可以根据需要，将若干地址连续的内存单元看作一个段，用 段地址*16 定位段的起始地址（基础地址），用偏移地址定位段中的内存单元

注意：

* 短地址*16必然时 16的倍数，所以一个段的起始地址也一定是16的倍数
* 偏移地址为16位，16位地址的寻址能力为64k，所以一个段的长度最大为64k

## 内存单元地址小结

* cpu访问内存单元是，必须向内存提供内存单元的物理地址
* 8086cpu在内部用短地址和偏移地址移位相加的方式形成最终的物理地址

思考：

1.

 ![xiaojiewenti1](xiaojiewenti1.png)

同一个物理地址，可以由多个段地址加偏移地址来得到

2.

![xiaojiewenti2](xiaojiewenti2.png)

小结

![neicundiixiaojie](neicundiixiaojie.png)

###### 检测点2.2

![jiancedian2.2](jiancedian2.2.png)

（1）：寻址范围：0001H  -  10000H

（2）：最小为：10001H   最大为：20000H 

给定地址需要乘以16，也就是左移一位

寻址范围应该是 0010H--1000FH

最小 1001H    最大  2000H

## 2.9 段寄存器

![2.9duanjicunqi](2.9duanjicunqi.png)

已知cpu的物理地址需要短地址加偏移地址来合成

段地址需要有地方来存储，就是段寄存器

cs：代码地址

ds：数据地址

ss：堆上的地址

es：什么都有的地址

## 2.10 cs和ip

![2.10 cshe ip](2.10csheip.png)

### 8086pc读取和执行指令相关部件

![8086duquhezhixing](8086duquhezhixing.png)

![806duquguoc](806duquguoc.png)

B8 代表 mov ax

0123H 从上到下，低位到高位，低位优先存储

![2.10gongzuoliuchengjianyao](2.10gongzuoliuchengjianyao.png)

ip+3，ip+2，索引到下一条指令

### cpu工作过程简要描述

![2.10cpugongzuoguocheng](2.10cpugongzuoguocheng.png)

想要绕过杀毒软件，就可以将木马植入FFFF0H单元中，指向病毒程序，屏蔽杀毒软件

![2.10 ](2.10                                   .png)

## 2.11 修改cs，ip的指令

![2.11 xiugaicsipzhiling](2.11 xiugaicsipzhiling.png)

###   如何修改AX中的值

![2.11xiugaiax](2.11xiugaiax.png)

不能通过mov来改变cs·ip的值

![2.11 zhuanyizhiling](2.11 zhuanyizhiling.png)

### 仅修改ip

![2.11 jinxiugai ip](2.11 jinxiugai ip.png)

### cpu运行的流程

![2.11 couyunxingliucheng](2.11 couyunxingliucheng.png)



![2.11wentifenxi](2.11wentifenxi.png)

 ## 2.12 代码段

![2.12 daimaduangainia](2.12daimaduangainia.png)

### 执行代码段的指令

![2.12 daimaduanzhix](2.12daimaduanzhix.png)



![2.12 shili](2.12shili.png)

## 2.9-2.12 小结

1.段地址在8086CPU的寄存器中存放。当8086CPU要访问内存时，由段寄存器提供内存单元的段地址。8086CPU由4个段寄存器，其中CS用来存放指令的短地址。

2.CS存放指令的段地址，ip存放指令的偏移地址。

8086中，任意时刻，CPU将CS：IP指向的内容当作指令执行

3.8086CPU的工作过程：

* 从CS:IP指向内存单元读取指令，读取的指令进入指令缓冲器
* IP指向下一条指令（IP有一个递加器，根据指令的长度加加，跳转到下一条指令）
* 执行指令

4.8086CPU提供转移指令修改CS·IP的内容

###### 检测点2.3

![jiancedian 2.3](jiancedian 2.3.png)

3次，

第一次读取 mov ax,bx，执行完成后，ip+3，到sub指令首地址开始读取

sub ax,ax，完成后ip+3

jmp ax 完成后 执行jmp指令到0000H的位置 ip=ax



根据cs：ip的工作过程推理，考虑到读取街道ip自动递增，ip修改的次数是四次，而只考虑ip修改指令的执行，那么ip只被修改了三次

~~~
读取 mov ax, bx 后，IP自动增加。
读取 sub ax, ax 后，IP自动增加。
读取 jmp ax 后，IP自动增加。
执行 jmp ax 时，IP被AX的值（0）覆盖。
~~~

## 实验一

![shiyanyidebug](shiyanyidebug.jpg)
