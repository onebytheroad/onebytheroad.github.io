---
title: 12-01 笔记
description: 赌书消得泼茶香，当时只道是寻常
date: 2025-12-01
slug: 12-01
image: bj.jpg
categories:
  - 每日
---



### MUL

mul命令,汇编语言中的乘法命令

相乘的两个数，要么都是8位，要么都是16位

**乘数**：指令中给出的 `reg/mem`
**被乘数**：**固定为 AL 或 AX**（根据乘数位数决定）

| 乘数位数 | 被乘数  | 结果存放    | 示例                            |
| :------- | :------ | :---------- | :------------------------------ |
| **8位**  | **AL**  | **AX**      | `MUL BL` : AX = AL × BL         |
| **16位** | **AX**  | **DX:AX**   | `MUL BX` : DX:AX = AX × BX      |
| **32位** | **EAX** | **EDX:EAX** | `MUL ECX` : EDX:EAX = EAX × ECX |

8位乘数结果存放在AX中

16位乘数结果存放在DX,AX中，DX存高位，AX存低位

32位存EDX,EAX



`MUL`只处理无符号位乘法，有符号位需要用`IMUL`来计算

`mul reg`

`mul 内存单元` 内存单元可以用不同的寻址方式给出

~~~\
mul byte ptr ds:[0]
(ax) - (al) * ((ds)*16 + 0)

mul word ptr [bx+Si+8]

(ax) = (al)* ((ds)*16 + (bx) + (si) + 8)
(dx) = (al)* ((ds)*16 + (bx) + (si) + 8)
~~~



### 子程序

模块化设计程序处理数据

需要明确子程序的参数传递和结果返回值的存储

~~~
子程序设计样例：
;说明: 计算N的3次方
;参数(bx) = N
;结果：(dx:ax) = N ^ 3

cube:
mov ax,bx
mul bx
mul bx
ret


程序设计样例：
assume cs:code
data segment
  dw 1,2,3,4,5,6,7,8
  dd 0,0,0,0,0,0,0,0
data ends

code segment 

start:
	mov ax,data
	mov ds,ax
	mov si,0
	mov di,16

	mov cx,8
s:
	mov bx,[si]
	call cube
	mov [di],ax
	mov [di].2,dx
	add si,2
	add di,4
	loop s
	
	mov ax,4c00h
	int 21h
	
cube:
mov ax,bx
mul bx
mul bx
ret

code ends
end start
~~~



而如果数据较多的情况，寄存器无法存储庞大的数据

就可以将字符串的首地址传给子程序，利用循环来解决

~~~
assume cs:code

data segment 
  db conversation'
data ends

code segment
start:
	mov ax,data
	mov ds,ax
	mov si,0
	mov cx,12
	call capital
	mov ax,4c00h
	int 21h
	
capital:
	and byte ptr [si],11011111b
	inc si
	loop capital
	ret
	
code ends
end start
~~~



如果主程序使用了循环，子程序中也需要使用循环的时候，对于rcx计数器来说就有多个程序在调用，导致互相的数据调用出现问题，此时可以使用栈来解决数据调用的问题

 ```
 code segment
 
 start:
 	mov ax,data
 	mov ds,ax
 	mov bx,0
 
 	mov cx,4
   s:
     mov si,bx
     call capital
     add bx,5
     loop s
     
     mov ax,4c00h
     int 21h
     
 capital:
 	push cx
 	push si
 	
 change:
 	mov cl,[si]
 	mov ch,0
 	jcxz ok
 	and byte ptr [si],11011111b
 	inc si
 	jmp short change
   ok:
     pop si
     pop cx
     ret
     
 code ends
 end start
 ```

调整子程序和主程序之间cx的出入栈顺序和调用顺序，使得两个程序之间互不干扰





### 标志寄存器（flag寄存器）



