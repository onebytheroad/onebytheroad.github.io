---
title: 10-25 笔记
description: 世人千万种，浮云莫去求。斯人若彩虹，遇上方知有。
date: 2025-10-25
slug: 10-25
image: bj.jpg
categories:
    - 每日
---

![geshihua](geshihua.png)

输出16进制前缀的整数

%#x\n 即可，如果想用0补充位数不够显示的，比如15转化为16进制为f，想要显示0f就"%02x\n"

输出64位整数

`__int64 value=100I64`

`printf("%I64d\n",value)`

hd，短整型。d，标准整形。ld，长整型

无符号：%u 来打印

%f 单精度浮点数   %lf 双精度浮点数  %.7lf  保留到7位双精度浮点数

```
#include <stdio.h>
#pragma warning(disable : 4996)

int main(int argc)
{
	//char c;
	//wchar_t wc;
	//float f;
	//double d;

	char buf[80] = {0};

	printf("Please input a string:\n");
		scanf("%s", buf);    //数组名称代表了内存地址，之前的所有数都需要取内存地址输入
		printf("%s\n", buf); //scanf函数遇到空格即退出函数，


	return 0;
}

```

浮点数和整数可以不设定长度，因为长度固定且已知

字符，字符串等都需要设定长度，如果输入超过设定长度的数，那么多出来的数会破坏原本存储在内存空间里的其他的数据，导致其他破坏

scanf_s("%s,buf,80")

gets_s("%s,buf,80")

```
#include <stdio.h>
#pragma warning(disable : 4996)

int main(int argc)
{
	char c;
	wchar_t C;

	short s;
	int i;
	long l;
	__int64 value = 100I64;

	float f;
	double d;

	char buf[80] = {0};

	printf("Please input the data:\n");
	scanf("%c%hd%d%ld%I64d%f%lf%s",&c,&s,&i,&l,&value,&f,&d,buf);
	printf("c:%c s:%hd i:%d l:%ld value:%I64d f:%f lf:%lf buf:%s\n",
		c, s, i, l, value, f, d, buf);

	return 0;
}

```

多重输出，加宽字节会出bug导致无法输出。

![jingcheng](jingcheng.png)

fd，文件描述符表，每个进程独立拥有的指向任何一打开的文件，管道，设备等任何资源的引用或句柄，一种资源调配的数字编号

![zuoye1](zuoye1.png)

1.输入一个变量需要用取值符&获取其内存地址，字符串不需要，字符串的数组存储在计算机

2.scanf函数调用"%ws"或"%S",用w加s或者大写s来输入，printf("%S")同样用%S来表示输出

3.scanf不检测缓存区，只将输入值原封不动导入，如果大于其原本设置的内存长度，会挤压其内存空间中其他数据，导致数据错误等安全问题。scanf_s能够检测缓存区，比scanf更安全

溢出检测

4.scanf遇到空格即会退出函数，gets会包括空格一起输入

5.gets与gets_s和scanf与scanf_s一样，是否检测缓存区的问题

6.getch不显示输入字符，按下任意一个键即返回.

getchar显示输入字符，需要按下回车键才返回

7._getch是新的安全的函数,安全在哪：1.函数内部对线程的调动上锁，防止字符或者字节在调用的过程中被不同线程影响。2.两次不同的调用，来增加安全

8.代码中某些函数过时，有安全风险，没有安全检测，容易产生安全漏洞

# 第七课  (1):运算符

运算符是指对特定类型的变量或者常量要进行的操作，在运算符中被操作的变量或者常量叫做操作数。只有一个操作数的运算符叫单目运算符，只有两个操作数的叫双目运算符，有三个操作数的叫三目运算符。

举例：

```
&，++，！，~ 都是单目运算符
sizeof也是单目运算符
+ - * / 就是一种二目运算符
？： 唯一的三目运算符
```

![yunsuanfu](yunsuanfu.png)

### 逻辑非

!false  !FALSE   !0

true

!-1,!1,!2

false

自增，自减：I++,++i,i--,--i

### i++和i--

1,c语言的内建型别：

i++；

++i；是没有任何区别的，单独形成语句，都是把i进行+1操作

2.c++里

如果i是一个对象，不是内建型别，++i的效率要比i++要高

3.在复合表达式或者赋值语句里：

int i=0;

int a = i++;  先把i的值赋值给a，然后再对i进行相加// a = i ; i = i + 1  ---.  a = 0 , i = 1

int i=0; 

int b = ++i;  // i = i + 1  ; b = i ;   --->  b == 1,i == 1

4.函数中：

int i=0;

printf("i:%d\n",i++);

i = 0;

printf("i:%d\n",++i);

i = 0;

printf("%d %d\n",i++,++i);  // 不同的编译器产生的结果不一样

### 强转

(int)3.14f  -->浮点转整数

### sizeof  用来计算类型，变量，常量的长度

如图，类型必须加括号，常量、变量可以不加括号



/ 取商  %取余数

### 比较运算符

< <= > >= == !=

写a>b>c，需要写成 a>b && b>c 必须单独比较 

可以用常量 == 变量的相等方式来验证是否赋值 （常量与变量比较）

a == 1  a = 1   1 = a  1 == a

0和整数进行比较直接用== 即可

如果是和浮点数和零比较  ,不能直接进行比较，浮点数不精确 fabs是math.h中的绝对值

fabs(x)<=1e-6   ---> 

### 逻辑运算符：含义与计算顺序

&&：只要一个为0就停止计算    和

||：只要一个为1就停止运算    或

与的优先级大于或的优先级

### 三目

？：  常量变量都可以，也可以是一个符合要求的表达式

a?b:c  -->如果a为真，则取b的值为这个式子的表达式

​                如果a为假，则取c的值为运算符的值

### 复合运算符

= 

+=                   a = a+50      a += 50

*=                    a=a *100          a *= 100

-=                   a = a -20      a   -= 20

/=

%=

a <<= 2;    a = a<<2         a左移两位

###   逗号运算符

, i++,j++,(逗号表达式的求值，非常容易错)

![daquan](daquan.png)

## 运算符的结合律与优先

运算符的优先级和结合律决定操作数的结合方式，当复合表达式中的运算符的优先级不同时操作数的结合方式是由优先级决定。当符合表达式中的运算符的优先级相同时，操作数的结合方式由结合律决定。不过，我们也可以使用哭号强制把操作数结合在一起。

![youxianji](youxianji.png)



![yunsuanfuyouxianji](yunsuanfuyouxianji.png)



作业

![zuoye2](C:\blog\my-blog\content\post\10.25.2025\zuoye2.png)

1.

代码中的比较 NULL == p ,p ==NULL ,0 == i 与 i == 0 比较意义上是等效的，不过反写成0 == i ,NULL == p可以防止，如果在少打了一个等号的情况下，代码打成 0 = i 这样的代码会报错，能够有效的检查出代码错误

2.

a %= 5     等效为  a = a % 5

a *= 5   等效为  a = a * 5
