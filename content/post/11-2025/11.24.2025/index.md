---
title: 11-24 笔记
description: 也许，我最终也会停止思念你
date: 2025-11-24
slug: 11-24
image: bj.jpg
categories:
  - 每日
---

## 7.5 [bx+idata]

* 在前面，我们可以用[bx]的方式来指明一个内存单元，我们还可以用一种个高位灵活的方式来指明内存单元：

  [bx+idata]表示一个内存单元，他的偏移地址为(bx)+idata （bx中的数值加上idata）

  比如: [10H]  拆成[bx = 8H+2H]

  

  ![7.5bxidata](7.5bxidata.png)



![7.5changyonzhil](7.5changyonzhil.png)

问题7.1

![7.57.1wrnti](7.57.1wrnti.png)

~~~
mov ax,2000h
mov ds,ax
mov bx,1000h
mov ax,[bx]
mov cx,[bx+1]
add cx,[bx+2]
~~~



![7.1wentifen1](7.1wentifen1.png)

![7.1wentifenxi2](7.1wentifenxi2.png)

![7.1wentifenxi3](7.1wentifenxi3.png)

## 7.6 用[bx+idata]的方式进行数组的处理

有了[bx+idata]这种表示内存单元的方式，我们就可以用更高级的结构来看待所要处理的数据

![7.6chuli](7.6chuli.png)

![7.6shuzuchulidaima](7.6shuzuchulidaima.png)



更简化的操作

![7.6jianhuafangfa](7.6jianhuafangfa.png)

![7.6daimashili](7.6daimashili.png)

![7.6fenxi](7.6fenxi.png)

![7.6gaijinhoudechengxu](7.6gaijinhoudechengxu.png)

![7.6gaijindaima1](7.6gaijindaima1.png)

用高级语言来描述

![7.6gaojiyuyanmiaos](7.6gaojiyuyanmiaos.png)



![7.6xiangsizhichu](7.6xiangsizhichu.png)

[bx+idata]的方式为高级语言实现数组提供了便利机制