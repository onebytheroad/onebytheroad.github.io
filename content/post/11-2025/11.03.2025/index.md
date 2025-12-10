---
title: 11-03 指针定义与使用
description: 春风若有怜花意，可否许我再少年。
date: 2025-11-03
slug: 11-03
image: bj.jpg
categories:
    - c语言基础
---

# 第十三课-指针

## （1）：指针定义与使用

### 变量在内存中的地址

![bianliangd](C:/blog/my-blog/content/post/11-2025/11.02.2025/bianliangdeneicundizhi.png)

 &取值运算符

### 指针定义

![zhizhen](C:/blog/my-blog/content/post/11-2025/11.02.2025/zhizhen.png)

指针也是变量，指针也有类型，指针存放的值是内存地址

指针字节就是内存地址的长度

```
int main()
{
	int i = 1;
	int* p = &i;
	printf("p=%p,&i=%p,sizeof(p):%d\n", p, &i, sizeof(p));


	return 0;
}

```

### 指针的定义与初始化形式

![zhenzhiding](C:/blog/my-blog/content/post/11-2025/11.02.2025/zhenzhidingyiyuchushihua.png)

初始化：1.指向某个变量的地址  2.指向一个分配的内存或者字符串常量  3.指向NULL

```
int i,*p；定义了一个整型i和整型指针，这里*与int一起 
p =&i  野指针，指向随机值 
```

 ```
char *p=(Char*)malloc(100);  在堆上分配了地址，赋值给了一个指针
char *str = "hello world";   指向的是字符串变量地址
char c='A';  一个字符变量'a'
char *str = &c;  一个指针str，把c的地址赋值给了str，指向字符变量c
char *pch= &c ;
字符指针既可以指向字符串，也可以指向字符变量
赋值给指针的时候，赋值的类型一定要匹配
字符指针赋值给整型指针，需要强制转化
 ```

### *p：解引用运算符    与指针定义的\*不是一个东西

![jieyinyuongyunsuanfu](C:/blog/my-blog/content/post/11-2025/11.02.2025/jieyinyuongyunsuanfu.png)

  ```
int *p1,*p2   中 “*” 是定义指针p1，p2
printf 中*p1 *p2 是解引用符
*p1 == a   *p2 == b    对 *p1+1 *p2+2 就是对a，b修改
但是必须要是可写的 
a是常量指针，指针的一种形式，指向的数组的首地址
p指向的字符串的首地址
对a和p进行解引用，*a为数组第一个元素，*p为字符串第一个
  ```

野指针和NULL都不能被解引用

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 



int main()
{	
	int a = 100;
	int b = 10;

	int arr[10] = { 2,3,4,6,7,8 };
	char* s = "hello world";

	int* p1 = &a;
	int* p2 = &b;

	printf("*p1=%d,*p2=%d\n", *p1, *p2);
	printf("a=%d,b=%d\n", a, b);

	*p1 += 1;
	*p2 += 1;

	printf("a=%d,b=%d\n", a, b);

	printf("*arr:%d\n", *arr);

	printf("*s:%c\n", *s);

	return 0;
}

```

### &与*

![&](C:/blog/my-blog/content/post/11-2025/11.02.2025/&.png)

	*arr = 100;
	*s = "X";

*arr 指向数组第一个元素，可以使用指针修改

*s指向静态常量区，修改会报错

### &与*互为逆运算：\*&与&\*

![niyunsuan](C:/blog/my-blog/content/post/11-2025/11.02.2025/niyunsuan.png)

*运算符需要和指针联系在一起，a不是指针，所以&\*a会报错

### 易混淆

![yihunxiao](C:/blog/my-blog/content/post/11-2025/11.02.2025/yihunxiao.png)

### 指针的赋值与使用

![zhizhendefuzhi](C:/blog/my-blog/content/post/11-2025/11.02.2025/zhizhendefuzhiyushiyong.png)

*p2 = *p1  即j = i   j和i的值都变为'a'

**用双引号直接赋值的字符串是只读的，用数组或malloc创建的字符串是可修改的。**

p2=p1 把p1的地址赋值给p2，相当于p2指向了p1的地址

### 指针类型与互相转换

![zhizhenlei](C:/blog/my-blog/content/post/11-2025/11.02.2025/zhizhenleixingyuhuxiangzhuanhuan.png)



![lizi2](C:/blog/my-blog/content/post/11-2025/11.02.2025/lizi2.png)

少了会导致数据丢失，多了可能会导致破坏其他内存地址。强制转化有可能会导致程序受到影响

类型不一样宽度就不一样

### void *p

![void](C:/blog/my-blog/content/post/11-2025/11.02.2025/void.png)

void *p  没有任何类型，和类型指针不一样

void的指针概念中没有内存长度的概念，拿不到内存长度

不能用*p来取值，取不了其中的值

GCC里面的扩展，void默认为1字节

主要用在函数参数定义的时候，可以接受任何类型的指针的赋值，万能指针型

void赋值成别的类型需要强转，而解引用也需要转换

一般用在函数的形参位置，不用做任何的强制转换，只是在内部需要转换

 ~~~
void *pv1 = p1 
只是对pv1的赋值，类型并未转换，GCC应该可以
sizeof(pv1)   指针本身是变量
sizeof(*pv1)  只是无法解引用
 ~~~

### 字符指针

![zifuzhizhen](C:/blog/my-blog/content/post/11-2025/11.02.2025/zifuzhizhen.png)

### sizeof(p)\sizeog(*p)

![sizeof(C:/blog/my-blog/content/post/11-2025/11.02.2025/sizeof(p).png)](sizeof(p).png)

sizeof(p)   指针对应的长度

sizeof(*p)  指针对应类型的长度

4 4 1 4   12   4  1  1

### 指针的应用

![yingyong](C:/blog/my-blog/content/post/11-2025/11.02.2025/yingyong.png)

```
#include <stdbool.h>

bool is_system_little()
{
	int x = 0x1;
	char* p = (char*)&x;

	if (*p == 1)
		return true;
	else
		return false;

}
```

##### 作业

![zuoye2](zuoye2.png)

##### 作业

1.指针含义：指针是一个存放内存地址的变量.指针长度：长度由所属变量类型决定，char 即1字节，int 即4字节，如果五类型，由所在平台决定，x86即4个字节，x64即8个字节

2.p是指针时，\*p的情况需要做讨论，如果是没有与int之类的声明语句相结合，则为解引用符号，读取指针中存放的地址，如果与声明语句结合，则可能是二级指针

3.通过char类型的指针指向int 类型的整数1，然后打印指针值，int类型占四个字节，而char指针只有一个字节，会丢失另外三字节的数据，看打印结果是1或者0就能判断是高位还是低位优先。

4.x86平台是低位优先储存，所以两个指针读取出的数都是ff，p1用的是有符号的字符型，p2是无符号的字符型，而输出的之后又采取转换成10进制输出，

ff转换成2进制应0111 1111 ，10进制是255，但是有符号数中，数的范围是-128~127，所以p1的输出应该是-1，因为补码的127+1整数溢出，p2的输出应该是255

导入vs

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <stdbool.h>



int main()
{
	int num = 0x000000ff;
	char* p1 = (char*)&num;
	unsigned char* p2 = (unsigned char*)&num;
	printf("%lu\n", *p1);
	printf("%lu\n", *p2);

	return 0;
}


```

第一个结果是随机数，第二个结果是255

```
ai解答

1. 整数提升规则
在C语言中，小于int的类型在表达式计算中会被提升为int：

char → int

unsigned char → int

2. 具体过程分析
对于 *p1 (有符号char，值0xff = -1)：
c
*p1 = 0xff  // 内存中的字节

// 整数提升（保持值不变）：
char -1 → int -1
二进制：11111111 (char) → 11111111 11111111 11111111 11111111 (int)

// 提升后的int值：0xFFFFFFFF (-1)
对于 *p2 (无符号char，值0xff = 255)：
c
*p2 = 0xff  // 内存中的字节

// 整数提升（保持值不变）：
unsigned char 255 → int 255  
二进制：11111111 (uchar) → 00000000 00000000 00000000 11111111 (int)

// 提升后的int值：0x000000FF (255)
printf的可变参数机制
printf 通过 va_list 从栈上读取参数，它不知道实际传入的类型，只按照格式符解释：

c
printf("%lu\n", *p1);
栈上实际内容：

text
| 0xFFFFFFFF | (从*p1提升来的int -1)
| 格式字符串地址 |
printf的理解：

%lu 期望 4/8字节的 unsigned long

但从栈上读取到的是 0xFFFFFFFF (int -1)

类型不匹配 → 未定义行为


```
