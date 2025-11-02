---
title: 11-02 笔记
description: 我爱你，没有别的什么，只是爱你
date: 2025-11-02
slug: 11-02
image: bj.jpg
categories:
    - 每日
---

## （3）：函数调用约定

#### 调用约定：

![diaoyongyueding](diaoyongyueding.png)

![diayongyueding1](diayongyueding1.png)

cdecl 调用者还原栈

stdcall 被调用函数自身修改栈

fastcall 被调用者修改栈

![diayongyuedinglizi](diayongyuedinglizi.png)

short y 在入栈的时候，会将两个字节提升为四个字节（x86每一个都会对齐到4个字节）

上面是内存的低地址，下面是内存的高地址。内存增长和栈增长方向相反

首先是参数入栈，然后是返回地址入栈，这个过程中esp一直在往上走

eip 返回地址：调用完函数之后，下一条要执行的命令

*在程序运行期间，程序访问参数是用过[ebp+8]来访问的，访问局部变量通过[ebp-4]。加是高地址，减是低地址。*

返回地址过了就是老ebp入栈，形成老ebp和ebp指针，然后esp往上走一部分，形成局部变量空间

函数走完了，退出时，发生esp往下走的过程

首先是esp往下走，走到ebp，然后老ebp出栈，放到ebp寄存器中，然后ebp往下走

紧接着返回地址出栈，重新放到eip寄存器中，这是esp指到参数1上面

清理参数空间，也就是所谓的栈平衡，对cdecl来说是调用者完成这个过程

将esp向下移动（只有栈顶指针指向的内存区域才是有效的，向下走，之前的区域都会无效掉 

其他调用约定是被调用者清理，在函数结束的时候会有return 12；就是rsp向下移动12位来清理参数空间。而fastcal更快，因为1.2个参数存放在寄存器中，只需要返回四个字节即可

![yuedinglizi](yuedinglizi.png)

分析：

![fenxidaima](fenxidaima.png)

。

![tu](tu.png)

死循环问题：当i=16的时候,a[16]读取到的内存地址是i的内存地址，也就是说会把i赋值为0，重新开始循环，循环一直不会结束

#### 缓冲区溢出-栈溢出

![huanchongquyichu](huanchongquyichu.png)

![yichu-zhanyichu](yichu-zhanyichu.png)

超出200个字节后，多余的数据占用高位空间，假设有208个字节，会占用到老ebp和返回地址，而函数执行完之后的返回地址被占用了，就会去执行被修改之后的恶意代码

思考：

![sikao](sikao.png)

![sikao0](sikao0.png)

#### x64调用约定

![x64diaoyong](x64diaoyong.png)

x64 fastcall 变为调用者来维持栈平衡，统一采用fastcall

栈的整体大小要能被16整除

##### 作业：

![zuoye](zuoye.png)

1.

![da1](da1.png)

如图所示，根据x86的调用约定，printf默认使用edecl约定，参数从右往左压入栈中，形成xxyy这种样式

而后printf开始调用，在存储的时候，int和float都是4字节，压入栈中参数也是4字节，但是在读取是，%f是读取8字节的double，就导致了第一个调用edp+8调用在x上，第二个应该是edp+c却变成edp+10，变到y取值之上，第四个直接取到栈外的垃圾值

2.

![da2](da2.png)

如图所示，在第一次函数addr调用时，去了k所在的内存地址赋值给\*p指针，而后弹出栈，然后第二次调用loop函数，i可能存储的地址与k一模一样，所以在循环中的 (*p)-- 实际上针对的是k所在的地址，也就是现在的i的-1，导致i的值始终满足情况，造成死循环。

而short，因为 `(*p)--` 只修改 2 字节，破坏了i或j的值，使其变成一个很大的正数或特定的值，导致循环条件立即不成立。

## （4）：inline和static关键字

![inline](inline.png)

使用inline的效果

未使用时在printf里使用get函数，会将参数导入函数而计算取返回值再输出，

使用inline之后直接就将函数里的语句拷贝，对原函数的替换，到此处计算

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 

inline int mygetmax(int x, int y)
{
	return x > y ? x : y;
}

int main()
{
	int a = 5;
	int b = 13;

	int res = mygetmax(a, b);
	printf("max:%d\n", res);

	return 0;
	  
}

```



##### stastic

![static](static.png)

全局变量，当然源文件有效

局部变量，记忆作用，生命周期是程序运行时

只能在当前源文件中有效

## 函数设计常见问题与注意事项

### 问题1：接口设计问题

#### 利用printf打印结果代替返回值

![wenti1](wenti1.png)

1.凡是在算法中通过printf打印出来，不合格。需要将结果提供给调用者，需要去使用这个结果

2.十进制转换成36进制，输出无法调用

### 问题2：逻辑全部或者部分放在了main函数

![wenti2](wenti2.png)

main主要用来测试函数功能，不要把逻辑写在main中

![li1](li1.png)

### 问题3：调用了库函数

![wenti3](wenti3.png)

自己写算法必须是用纯c来实现

### 代码缺少封装

![wenti4](wenti4.png)

两端重复代码，可以封装成一段单独的函数，然后在此直接调用即可

### 问题4：函数内部内存分配

![wenti4](wenti4.png)

算法中，严禁调用内存分配函数

让调用者自己去分配内存

### 问题5：硬编码

![wenti5](wenti5.png)

考虑代码的可移植性

在x64和x86中int为4没问题，但是以后计算机的发展可能会出现问题，而用sizeof来代替可以提高代码的可移植性

代码中使用可读性的代码更适合

### 模块化设计思想

![mokuaihua](mokuaihua.png)

### 变量都必须初始化

![bianliangchushihua](bianliangchushihua.png)

### 变量命名原则

![bianlia](bianliangmingmingyuanze.png)

自解释性代码

### 指针移动

![zhizhenyidong](zhizhenyidong.png)

### char*str和char str[]

![charstr](charstr.png)

### 写算法 strstr为例子

1.明确的知道算法的输入和输出:输出的应该是字串名  即 char 

2.严进宽出，检测算法中每一个值

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 

char *_strstr(const char* str, const char* substr)
{
	if (str == NULL || substr == NULL)
	{
		return NULL;
	}

	if (*substr == '\0')
	{
		return (char *)str;
	}

	char* p1 = (char *)str;

	while (*p1!='\0')
	{
		char* p2 = p1;
		char* p3 = (char*)substr;
		while (*p2 && *p3 && (*p2 == *p3))
		{
			p2++;
			p3++;
		}
		if (*p3 == '\0')
		{
			return p1;
		}

		p1++;
	}

	return NULL;

}

int main()
{

	printf("strstr:%s\n", _strstr("hello world", "orl"));
	printf("strstr:%s\n", _strstr("hello world", "xyz"));
	printf("strstr:%s\n", _strstr("hello world", NULL));
	
	return 0;
}

```



# 第十三课-指针

## （1）：指针定义与使用

### 变量在内存中的地址

![bianliangd](bianliangdeneicundizhi.png)











