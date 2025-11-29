---
title: 11-27 笔记
description: 夕阳无限好，只是近黄昏
date: 2025-11-27
slug: 11-27
image: bj.jpg
categories:
  - 每日
---

## 实验七-寻址方式在结构化数据访问中的应用

~~~
assume cs:codesg

data segment
db '1975','1976','1977','1978','1979','1980','1981','1982','1983'
db '1984','1985','1986','1987','1988','1989','1990','1991','1992'
db '1993','1994','1995'
;

dd 16,22,382,1356,2390,8000,16000,24486,50065,97479,140417,197514
dd 345980,590827,803530,1183000,1843000,2759000,3753000,4649000,5937000
;

dw 3,7,9,13,28,38,130,220,476,778,1001,1442,2258,2793,4037,5635,8226
dw 11542,11430,15257,17800
;
data ends

table segment
  db 21 dup ('year summ ne ?? ')
table ends

codesg segment
start:
      mov ax,data
      mov ds,ax
      mov si,0
      mov bx,00d0h
      mov cx,21
  yearc:
      mov ax,[si]
      mov [bx],ax
      add si,4
      add bx,0010h
      loop yearc
      mov si,2
      mov bx,00d2h
      mov cx,21
  yearc1:
      mov ax,[si]
      mov [bx],ax
      add si,4
      add bx,0010h
      loop yearc1
      mov si,0054h
      mov bx,00d5h
      mov cx,21
  income:
      mov ax,[si]
      mov [bx],ax
      add si,4
      add bx,0010h
      loop income
      mov si,0056h
      mov bx,00d7h
      mov cx,21
  income1:
      mov ax,[si]
      mov [bx],ax
      add si,4
      add bx,0010h
      loop income1
      mov si,00a8h
      mov bx,00dah
      mov cx,21
  people:
      mov ax,[si]
      mov [bx],ax
      add si,2
      add bx,0010h
      loop people
      mov si,0054h
      mov di,00ddh
      mov bp,00a8h
      mov bx,ds:[bp]
      mov cx,21
  average:
      mov ax,[si]
      mov dx,[si+2]
      div bx
      mov [di],ax
      add si,4
      add bp,2
      mov bx,ds:[bp]
      add di,0010h
      loop average

      mov ax,4c00h
      int 21h

codesg ends
end start

~~~

用了5个循环分别解决数据替换问题

问题：嵌套循环的使用，各种寻址方式结合，地址和数据之间传输的区别

~~~
mov ax,data
mov ds,ax
mov ax,table
mov es,ax

mov bx,0
mov si,0
mov di,0
mov cx,21
~~~

计算人均收入并存放

~~~
mov ax,54h[bx]
mov dx,56h[bx]

div word ptr ds:0a8h[si]
mov es:0dh[di],ax
~~~



