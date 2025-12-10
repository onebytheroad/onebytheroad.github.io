---
title: 12-05 汇编编写
description: 庭有枇杷树，吾妻死之年所手植也，今已亭亭如盖矣
date: 2025-12-05
slug: 12-05
image: bj.jpg
categories:
  - 汇编语言
---

控制流逻辑

在完成条件多路跳转时，必须使用 `je + jmp done` 隔离

~~~
.intel_syntax noprefix
.text
.global _start
_start:
	mov eax,[rdi]
	cmp eax,0x7f454c46
	je Add
	cmp eax,0x00005A4D
	je Sub
	jmp cheng
Add:
	mov eax,[rdi+4]
	add eax,[rdi+8]
	add eax,[rdi+12]
	jmp done
Sub:
	mov eax,[rdi+4]
	sub eax,[rdi+8]
	sub eax,[rdi+12]
	jmp done
cheng:
	mov eax,[rdi+4]
    imul eax,[rdi+8]
	imul eax,[rdi+12]
	jmp done
done:
~~~

以上代码中，如果没有`jmp done`指令，各个指令之间会穿透，即按顺序执行到底，导致代码运行错误

2

数据宽度问题，`rax`和`eax`的位数使用，使用不满足题意的高位字节，导致引入垃圾数据，破坏原本的数（负数破坏成正数）

3

拓展有符号数

cdqe拓展

```
sign-extend EAX to RAX
```

4

逆向中跳转表的识别

在反汇编中看到以下模式，很可能是跳转表：

```
cmp eax, 7
ja  default
mov rax, qword ptr [table + rax*8]
jmp rax
```

或

```
lea rax, [table]
jmp [rax + rcx*8]
```

5

跳转表，示例：

```
.intel_syntax noprefix
.text
.global _start

; 跳转表（必须对齐，通常放 .text 或 .rodata）
jtab:
    .quad do_add
    .quad do_sub
    .quad do_mul
    .quad do_div

_start:
    mov rax, [rdi]          ; x = [rdi]
    cmp rax, 3
    ja  default             ; if (x > 3) goto default

    ; 跳转表分发
    jmp [jtab + rax*8]

do_add:
    mov rax, [rdi+8]
    add rax, [rdi+16]
    jmp done

do_sub:
    mov rax, [rdi+8]
    sub rax, [rdi+16]
    jmp done

do_mul:
    mov rax, [rdi+8]
    imul rax, [rdi+16]
    jmp done

do_div:
    mov rax, [rdi+8]
    cqo                     ; sign-extend rax to rdx:rax
    idiv qword ptr [rdi+16] ; signed divide
    jmp done

default:
    xor rax, rax            ; y = 0

done:
    ; rax = result
```



汇编的伪指令，在内存中定义一个或多个字节的常量

~~~
.byte → 1 字节
.word → 2 字节（16 位）
.long 或 .int → 4 字节（32 位）
.quad → 8 字节（64 位）
~~~

==必须做边界检查==

~~~
cmp rax, MAX_INDEX
ja  default   ; 否则可能跳到任意地址（严重安全漏洞！）
~~~

跳转表最好连续，因为其属于在内存中被读取出的地址，最好是放在只读数据段

提供跳转表的前提下，注意跳转表的溢出条件，可能溢出条件会写在跳转表的末尾

