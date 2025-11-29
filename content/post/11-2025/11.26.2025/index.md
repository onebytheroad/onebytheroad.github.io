---
title: 11-26 笔记
description: 没有及时说出口的话，会变得越来越难说，最后便成了办不到的事
date: 2025-11-26
slug: 11-26
image: bj.jpg
categories:
  - 每日
---

# 第八章 数据处理的两个基本问题

引言

![diabzhangyinyan](diabzhangyinyan.png)

定义描述性符号 reg 和 sreg     

reg描述寄存器，sreg描述段寄存器

![yinyanzhilingjihe](yinyanzhilingjihe.png)

## 8.1 bx,si,di,bp

![8.1zongjiejicunqi](8.1zongjiejicunqi.png)

![8.1zhiling](8.1zhiling.png)

![8.1zhilingyongfa](8.1zhilingyongfa.png)

![8.1zhengquedeyongfa](8.1zhengquedeyongfa.png)

只有两个，且字母不能有重叠

![8.1bpdeshiyong](8.1bpdeshiyong.png)



## 8.2 机器指令处理的数据所在位置

绝大部分机器指令都是进行数据处理的指令，处理大致可分为三类

读取，写入，运算

在机器指令这一层来讲，并不关心数据的值是多少，而关系指令执行前一刻，它将要处理的数据所在的位置

![8.2zhilingzhixingqian](8.2zhilingzhixingqian.png)

指令缓冲器，特殊的寄存器，用来保存要执行的一条指令

## 8.3 汇编语言中数据位置的表达

* 汇编语言种如何表达数据的位置
* 汇编语言种有三个概念来表达数据的位置
  * 1.立即数 （idata）
  * 2.寄存器
  * 3.段地址（SA）和偏移地址（EA）

![8.3lijishu](8.3lijishu.png)

![8.3jicunqi](8.3jicunqi.png)

![8.3duandizhihepianyi](8.3duandizhihepianyi.png)



![8.3shilibiaoda](8.3shilibiaoda.png)

![8.3duandizhishili](8.3duandizhishili.png)



显性强制给出段地址

![8.3xianxinggeichuduandizhi](8.3xianxinggeichuduandizhi.png)



## 8.4 寻址方式

当数据存放在内存中的时候，我们可以用多种方式来给定这个内存单元的偏移地址，这种定位内存单元的方法一般被称为寻址方式

![8.4xunzhifangshixiaojie](8.4xunzhifangshixiaojie.png)

### 直接寻址

![8.4zhijiexunzhiguocheng](8.4zhijiexunzhiguocheng.png)

### 间接寻址

![8.4jianjiexunzhi](8.4jianjiexunzhi.png)

### 寄存器相对寻址

![8.4jicunqixiangduixunzhi](8.4jicunqixiangduixunzhi.png)

### 8.4 基址变址寻址

![8.4jizhibianzhixunzhi](C:\blog\my-blog\content\post\11-2025\11.26.2025\8.4jizhibianzhixunzhi.png)

### 相对基址变址寻址

![8.4xiangduijizhibianzhixunzhi](8.4xiangduijizhibianzhixunzhi.png)

## 8.5 指令要处理的数据有多长

* 8086CPu的指令，可以处理两种尺寸的数据，byte和word。所以在机器指令中要指明，指令进行的是在字操作还是字节操作

### 通过寄存器指明

![8.5jicunqizhimingcaozuo](8.5jicunqizhimingcaozuo.png)

![8.5zhimingcaozuo](8.5zhimingcaozuo.png)



### 在没有寄存器名存在的情况下，用操作符X ptr指明内存单元的长度，X在汇编指令中可以为word或byte

![8.5xpyrzhiming](8.5xpyrzhiming.png)

* 在没有寄存器参与的内存单元访问指令中，用word ptr 或 byte ptr显性的指明索要访问的内存单元的长度是很必要的
* 否则，cpu无法得知所要访问的你单元是字单元还是字节单元

![8.5debugchakan](8.5debugchakan.png)

![chulishuju](8.5chulishuju.png)

![8.5chulizhijieshuju](8.5chulizhijieshuju.png)

### 其他方法

有些指令默认了访问的是字单元或字节单元

进行字操作

## 8.6 寻址方式的综合应用

![8.6zongheyingy](8.6zongheyingy.png)

![8.6timufenxi](8.6timufenxi.png)

从要修改的内容，我们可以逐步的确定修改的方法

* （1）我们要访问的数据是dec公司的记录，所以首先要确定dec公司记录的位置：<font size=3 color="red">R=seg:60</font>

  确定了公司记录的位置后，我们下面就进一步确定要访问的内容在记录中的位置

* 确定排名字段在记录中的位置：0ch

* 修改R+0ch处的数据

* 确定收入字段在记录中的位置:0EH

* 修改R+0EH处的数据

* 确定产品字段在记录中的位置：10h。要修改的产品字段是一个字符串（或一个数组），需要访问字符串中的每一个字符。所以我们要进一步确定每一个字符在字符串中的位置

* 确定第一个字符在产品字段中的位置：P=0

* 修改R+10H+P处的数：P=P+1

* 修改R+10H+P处的数据：P=P+1

* 修改R+10H+P处的数据

![8.6chengxushili](8.6chengxushili.png)

c语言描述

![8.6xunzhifangshidecyuyanmiaoshu](8.6xunzhifangshidecyuyanmiaoshu.png)

按c语言来写汇编语言

![8.6huibianlijiecyuyan](8.6huibianlijiecyuyan.png)



![8.6xunzhidezongheyingy](8.6xunzhidezongheyingy.png)

一般来说，我们用[ bx+idata+si ]的方式来访几条狗提中的数据

<font size=3 color="red">用bx定位整个结构体，用idata定位结构体中的某一个数据项，用si定位数组相中的每个元素</font>

![8.61](8.61tieqiedexunzhishuxie.png)



![8.6zongjie](8.6zongjie.png)

## 8.7 div指令

* div是除法指令（division），使用div做出发的时候

  * 除数：8位或16位，在寄存器中或内存单元中

  * 被除数：（默认）放在ax或dx和ax中

    * 除数 被除数
    * 8位   16位（AX）
    * 16位  32位（DX+AX）

    * 结果：运算    8位    16位

      ​           商        AL      AX  

      ​           余数     AH     DX

      以上结果的16位和8位是看除数决定

* div指令格式
  * div reg
  * div 内存单元

![8.7divzhiling](8.7divzhiling.png)

![8.9divzhilingshil](8.9divzhilingshil.png)

高位放于余数，低位放商



### 利用除法指令进行计算

![8.7chufazhiling](8.7chufazhiling.png)

![8.7chufazhilingfenxi](8.7chufazhilingfenxi.png)

186A1H   1存放在dx中，86A1存放在ax中



~~~
assume cs:codesg

codesg segment
start:
      mov dx,1
      mov ax,86a1h 
      mov bx,100
      div bx

    mov ax,4c00h
    int 21h
    
codesg ends
end start
~~~

### 编程实现2

![8.7bianchengshixian2](8.7bianchengshixian2.png)



## 8.8 伪指令 dd

* 前面我们用db和dw定义字节型数据和字型数据
* dd是用来定义dword（double word）双字型数据的

![8.8weizhilinghsili](8.8weizhilinghsili.png)



### 问题8.1

![wenti8.1wenti](wenti8.1wenti.png)

~~~‘
assume cs:codesg,ds:datasg

datasg segment
dd 100001
dw 100
dw 0
datasg ends

codesg segment
start:
      mov ax,datasg
      mov ds,ax
      mov ax,ds:[0]
      mov dx,ds:[2] 
      mov bx,ds:[4]
      div bx
      mov ds:[6],ax

    mov ax,4c00h
    int 21h
    
codesg ends
end start
~~~

![wenti8.1fenxi](wenti8.1fenxi.png)

![wenti8.1shixiandaima](wenti8.1shixiandaima.png)

## 8.9 dup

* dup是一个操作符，在汇编语言中同db，dw，dd等一样，也是由编译器识别处理的符号
* 它是和db，dw，dd等数据定义伪指令配合使用的，用来进行数据的重复

![8.9dupdaimashili](8.9dupdaimashili.png)

![8.9dudaimashilip](8.9dudaimashilip.png)

![8.9dupshilibuy](8.9dupshilibuy.png)

