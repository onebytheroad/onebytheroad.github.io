---
title: 11-28 指令
description: 最终，遗忘把一切变得美丽
date: 2025-11-28
slug: 11-28
image: bj.jpg
categories:
  - 汇编语言
---
~~~
XOR 
XOR reg1,reg2

逻辑：reg2 = reg2 XOR reg1

标志位更新
S：与最高位相同
Z：全0置1，否则置0
~~~



~~~
Test
进行逻辑与运算，但不改变操作数
运算结果在设置相关标记位后会被丢弃

作用是利用标志位进行验位跳转
SF = 将结果的最高位赋给SF标志位，例如结果最高位是1，SF就是1
看TEMP是不是0，如果TEMP是0，ZF位置1；如果TEMP不是0，ZF位置0
PF = 将TEMP的低8位，从第0位开始，逐位取同或。也就是第0位与第1位的同或结果，去和第2位同或，结果再去和第3位同或…直到和第7位同或。PF位是奇偶校验位，如果结果低8位中1的个数是偶数，PF=1；否则PF=0

test eax，100b；b后缀意为二进制
jnz ******；如果eax右数第三个位为1，jnz将会跳转
jnz跳转的条件是ZF=0, ZF=0意味着ZF(零标志)没被置位，即逻辑与结果为1

Test的一个非常普遍的用法是用来测试一方寄存器是否为空：
test ecx, ecx
jz somewhere
如果ecx为零，设置ZF零标志为1，jz跳转。
~~~



~~~
movzx (用0填充拓展的高位部分)
	unsigned char a = 0xff;
00A33E85 C6 45 FB FF          mov         byte ptr [a],0FFh  
 	int b;
 	b = a + 1;
00A33E9B 0F B6 45 FB          movzx       eax,byte ptr [a]  
00A33E9F 83 C0 01             add         eax,1  
00A33EA2 89 45 EC             mov         dword ptr [b],eax  

char a 类型与int b 类型在寄存器中进行计算
对a进行无符号拓展
拓宽字节数
同样的先使用movzx进行无符号扩展
不过与b不同的点在于，将al寄存其中的值赋给了a,也就是0x0100的后两位 00
所以最后a 的值为0

 movsx（将sf（对应符号位）填充到拓展的高位部分）
	char a = 0xff;
00983E85 C6 45 FB FF          mov         byte ptr [a],0FFh  
	printf("%d\n", a);
00983E89 0F BE 45 FB          movsx       eax,byte ptr [a]  
	int b;
	b = a + 1;
00983E9B 0F BE 45 FB          movsx       eax,byte ptr [a]  
00983E9F 83 C0 01             add         eax,1  
00983EA2 89 45 EC             mov         dword ptr [b],eax  

此处char型变量a中值最初是0xff，此时的符号位为1
使用movsx指令进行有符号扩展后将值存入eax中，eax中保存的值为0xffff
eax加1之后，发生溢出，此时eax中保存的值为0x0000
所以最终b中的值为0
~~~



~~~
lea
计算有效地址并加载到寄存器中
lea ax,[bx+si]
会计算[bx+si]的和然后加载到ax中，不访问内存内容
leaq 表示的是加载有效地址；而（%rsi，%rdi，4）表示的是将%rsi寄存器中的值，加上4倍的%rdi的值，得到X(A)+4n*i 
~~~



~~~
shl
mov bl, 8FH              ; BL = 10001111b
shi bl, 1        ; CF = 1, BL = 00011110b

CF中寄存最后一次移出的数字
最低位用0填充

shr
mov al, 0D0H       ; aL = 11010000b
shr al, 1		  ; aL = 01101000b, CF = 0

cf中寄存最后一次移出数字，最高位填充0
~~~



~~~
cmp
比较两个无符号数
ZF CF 
cmp a.b

a == b
ZF = 1

a < b 
CF = 1

a > b                  a >= b
CF == ZF == 0          CF == 0  ZF == 1

比较的是两个有符号数，则符号标志位、零标志位和溢出标志位表示的两个操作数之间的关系
a < b
SF != OF

a > b
SF == OF

a == b
ZF = 1

如果因为溢出导致了实际结果为负，那么逻辑上真正的结果必然为正。
如果因为溢出导致了实际结果为正，那么逻辑上真正的结果必然为负。
~~~



~~~
跳转指令
基于无符号数比较的跳转

助记符	说明
JB	小于跳转
JNB	不小于跳转
JNBE	不小于或等于跳转
JA	大于跳转
JNA	不大于跳转
JNAE	不大于或等于跳转
基于相等性的跳转

助记符	说明
JE	相等跳转
JNE	不相等跳转
JCXZ	CX = 0 跳转
JECXZ	ECX = 0 跳转
JRCXZ	RCX = 0 跳转（64模式）
基于有符号数比较的跳转

助记符	说明
JG	大于跳转
JL	小于跳转
JNLE	不小于或等于跳转
JNGE	不大于活等于跳转
JGE	大于或等于跳转
JLE	小于或等于跳转
JNL	不小于跳转
JNG	不大于跳转
基于进位和零标志位的跳转

助记符	说明
JC	进位跳转（进位标志位置1）
JNC	无进位跳转（进位标志位清零）
JZ	为零跳转（零标志位置1）
JNZ	非零跳转（零标志位清零）

~~~



~~~
检测条件	无符号数跳转	有符号数跳转	同义指令	检查的标志位
A == B		JE			JE				JZ			ZF = 1
A != B		JNE			JNE				JNZ			ZF = 0
A < B		JB			JL			JNAE, JNGE	     CF = 1 (无符号)SF != OF (有符号)
A >= B		JAE			JGE	JNB, 	 JNL			CF = 0 (无符号)SF == OF (有符号)
A > B		JA			JG			JNBE, JNLE		CF=0 且 ZF=0 (无符号)ZF=0 且 SF==OF (有符号)
A <= B		JBE			JLE			JNA, JNG		CF=1 或 ZF=1 (无符号)ZF=1 或 SF!=OF (有符号)

~~~





~~~
逻辑指令
AND DST,SRC
OR dst，src
XOR dst，src
NOT orc 指令支持的寻址方式：除立即数寻址方式以外的其余寻址方式

指令支持的寻址方式：两个操作数不能同时为存储器寻址。即为除源操作数为立即数的情况外，原操作数和目的操作数必须有一个寄存器寻址方式。
令执行后CF 和OF 置零，AF无定义。
SF=1 指令执行后的结果为负数(符号位为1)
SF=0 指令执行后的结果为正数(符号位为0)
ZF=1 指令执行后的结果为零
ZF=0 指令执行后的结果不为零
PF=1 结果操作数中1的个数为偶数时置1
PF=0 结果操作数中1的个数为奇数时置0
~~~



~~~
CWD: AX符号位拓展到DX
CDQ: EAX符号位拓展到EDX
CQO: RAX符号位拓展到RDX

CBW: AL符号位拓展到DX
CWDE: AX符号位拓展到EAX
CDQE: EAX符号位拓展到RAX
~~~



# 

