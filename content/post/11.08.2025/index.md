---
title: 11-08 笔记
description: 明天见，是世界上最伟大的预言
date: 2025-11-08
slug: 11-08
image: bj.jpg
categories:
    - 每日
---

## （3）：结构体浅拷贝深拷贝

#### 结构体赋值时的拷贝

![jiegoutifuzhi](jiegoutifuzhi.png)

是否能像图中一样，s1赋值之后，直接用s1来拷贝到其他结构体

##### 浅拷贝和深拷贝

![qiamkaobei](qiamkaobeishenkkaobei.png)

左，如果结构体中不包含指针变量，那么s2=s1是正确的

右，结构体中的拷贝默认是浅拷贝，在赋值的同时也把指针所指向的的地址一起拷贝过去，而且s2中还未给指针分配内存，会导致s1和s2共享分配的100个字节的内存

如果free(s1.p)，那么s2.p就变成了野指针，指向了一个无效的内存地址



```
#include <stdio.h>
#include <string.h>
#include <malloc.h>

typedef struct _struct1
{
	int a;
	char c;

}struct1,*pstruct1;
 
typedef struct _struct2
{
	int a;
	char *p;

}struct2, *pstruct2;

int main()
{
	struct1 s1 = { 100,'A' };
	struct1 s2=s1;

	printf("s1:a:%d,c:%c\n", s1.a, s1.c);
	printf("s2:a:%d,c:%c\n", s2.a, s2.c);

	struct2 s3;
	s3.a = 100;
	s3.p = (char*)malloc(16);
	if(s3.p == NULL)
	{
		return -1;
	}

	memset(s3.p, 0, 16);
	strcpy_s(s3.p, 16, "hello world");
	struct2 s4=s3;

	printf("s3:a:%d,p:%s\n", s3.a, s3.p);
	printf("s4:a:%d,p:%s\n", s4.a, s4.p);

	free(s3.p);

	printf("s4:a:%d,p:%s\n", s4.a, s4.p);

	return 0;
}

```

debug

![qiankaobeidebug](qiankaobeidebug.png)

##### 深拷贝的实现

![sh](shenkaobeideshixian.png)

需要程序员手动去分配内存

##### 图解

![qianshenj](qianshenjkaobeitujie.png)

互有瑕疵

#### copy-on-writr

![copy-on-write](copy-on-write.png)

###### 作业

![zuoye1](zuoye1.png)

1.浅拷贝，将对应的值和内存地址直接拷贝到对应的变量当中，也就是，两个指针指向同一个内存地址，共享这一个内存地址

深拷贝，在拷贝指针中分配新的内存，然后将被拷贝指针中的值拷贝到新地址，原指针的改动对拷贝后的指针无影响

2.浅拷贝对指针来说是两个指针指向同一个内存地址，如果原指针所在结构体运行完成后释放自己在堆上分配的内存，会导致拷贝后的指针变成野指针

3.c语言中默认是浅拷贝

4.拷贝时，先给拷贝指针分配一个内存，然后再对齐进行拷贝

5.写时拷贝，是一种利用"节点"的拷贝方式,多个指针指向一个节点，然后节点再指向一个内存地址，节点用于记录所指向的指针的个数，当还有指针指向的时候，避免释放内存导致其他指针变为野指针

另外，写实拷贝还能按某一指针需要修改内存地址中的数据并开辟一个新的地址来存放数据



## （4）：结构体应用

#### 结构体数组

结构体数组的初始化与遍历

结构体指针数组

 ##### 结构体做函数参数

传指针

传值

判断两个同学成绩

###### 作业

![zuoye2](zuoye2.png)

1.引用传参，c++中。c语言中指针的效率大于传值

2.链表待定

##  （5）：sizeof计算结构体长度

计算类型或者变量的长度，计算的是所占字节的长度

### 基本类型

![jibenleixing](jibenleixing.png)

utf16编码，utf32编码

long ：win 都站4个字节，linux x64占8个字节

### 结构体对齐-自然对齐

![jiegoutizirnaduiqi](jiegoutizirnaduiqi.png)

成员一样，位置不太一样

如果是基本成员，存放地点就必须是成员类型的整数倍

char，可以存放在任何地址，地址都是1的整数倍

short，0 2 4 6 8  

结构体中包含结构体，按照结构体中子成员中最大的基本类型的整数倍

最终结果成都必须为sizeof基本类型的整数倍，比如第一个a结构体，计算出来的结果如果是20，需要往后填充4个字节来满足必须要是基本类型double=8的整数倍，也就是24个字节

![ziranduiqi](ziranduiqi.png)

一般从零地址开始存，这样计算存完即是结构体所占内存大小

作用，保证cpu在一个时钟周期内把这些数据拿到，提高存取效率

### pragma pack(n)

![pragma pack](pragma pack.png)

pragma示例

![pragmashili](pragmashili.png)

![jisuan](jisuan.png)

定义结构对齐

![pragma pack1](pragma pack1.png)

如果按照1字节对齐，那就不用空格，全部加起来即是字节大小 

### 栈空间对齐

![zhankongjianduiqi](zhankongjianduiqi.png)

直接按4字节对齐

在print函数中float会扩充成double字节。

![zhankongjian](zhankongjian.png)

x64平台填充

float有专门的寄存器，前四个参数存入寄存器，在栈上还会给这四个参数预留空间

![x64](x64.png)

###### 作业

![zuoye3](zuoye3.png)

 1.sizeof(s1)=8  short 两个字节，long 四个字节 ，long为4，需要为4的倍数，所以最后为8

sizeof(s2)= 24  char 1个字节， s1 有8个字节，long long  类有8个字节，结果17，因为要为8的倍数，所以为24

sizeof(s3)=   char 1个字节，short两个字节，long 4个字节，longlong  8个字节   16个字节



2.sizeof(double) = 8  sizeof (long) = 4 sizeof(char) = 1

sizeof(a) = 24   sizeof(b)=16



## （6）：联合体

### 联合体（UNION）定义

![lianhetidingyi](lianhetidingyi.png)

“同一段内存”，改变其中一个变量，别的变量可能会受影响

### 代码定义形式

![union dingyi](union dingyi.png)

 红色是标准的联合体定义方式，而且在应用中非常常见

示例

![uniondaima](uniondaima.png)

前面四个字节，i和s重叠，为i赋值的时候，其实就是覆盖

为s赋值的时候，i的值也会被破坏，他们同时存在，但是值是否存在不知道

```
#include <stdio.h>
#include <string.h>

typedef union _foo
{
	char s[20];
	int i;
}foo;

int main()
{
	foo a;
	a.i = 100;
	printf("a.i:%d,a.s:%s\n", a.i, a.s);
	strcpy(a.s, "hello world!");
	printf("a.i:%d,a.s:%s\n", a.i, a.s);
	printf("&a.i:%p,&a.s%p\n", &a.i, &a.s);
	printf("sizeof(a)=%d\n", sizeof(a));
	return 0;
}
```

### UNION的性质

![xingzhi](xingzhi.png)

### 结构体和联合体的区别

![jiegoutihei](jiegoutihe lianheti.png)

### 可以互相包含

![huxiangbaohan](huxiangbaohan.png)

```
#include <stdio.h>
#include <string.h>

typedef union _demo1
{
	int a;
	struct
	{
		int b;
		char c;
	}s;
	float f;
}demo1,*pdemo1;

typedef struct _demo2
{
	union
	{
		int a;
		char b;
	}c;
	int d;
}demo2,*pdemo2;

int main()
{
	demo1 dm1;
	demo2 dm2;

	dm1.a = 100;
	printf("dm1.s.b:%d\n", dm1.s.b);
	printf("dm1.f:%.2f\n", dm1.f);
	
	dm2.c.a = 0x12;
	dm2.d = 0x64;
	printf("dm2.d:%d,dn2.c.a:%d\n",dm2.d,dm2.c.a);
	dm2.c.b = 'A';
	printf("dm2.d:%d,dn2.c.a:%d\n", dm2.d, dm2.c.a);



	return 0;
}
```

### DEMO

![DEMO](DEMO.png)

![1](1.png)

### 用union判断存储顺序

![union](union.png)

###### 作业：

![zuoye4](zuoye4.png)

```
1.
typedef union _b
{
	char a;
	int b;
	float c;
}b,*pb;
```

2.创建一个联合体，存入int整型和char字符指针，整型占四个字节，指针占一个字节，因为两个变量在同一段内存中，并且指针只指向了了一个小部分，然后看指针的输出值来判断是是低位还是高位

3.根据联合体中包含的最大的基本类型计算，为最大基本类型的倍数

4.联合体共享一段内存，修改其中任意一个变量会对其他变量造成影响，一般一次只使用一个变量

结构体可以使用多个变量，变量之间一般不会互相影响



## （6）：枚举类型（enum）

### 定义

![meijuleixingdingyi](meijuleixingdingyi.png)

是一种基本类型

![meijudaimadingyi](meijudaimadingyi.png)

逗号分隔，第一个值如果不指定，默认是0

中途可以指定，中途不能和前面设定好的值重复

例子

![meijulizi](meijulizi.png)

上述定义，都是枚举类型的变量，变量不能超出这个范围

不能再对所定义的枚举常量进行赋值

![meijulizi2](meijulizi2.png)

 ```
 #include <stdio.h>
 #include <tchar.h>
 #include <string.h>
 #include <stdlib.h>
 
 typedef enum _WINVERSION
 {
 	WIN2000,
 	WINXP,
 	VISTA,
 	WIN7,
 	WIN8
 }WINVERSION;
 
 int main()
 {
 	WINVERSION winos = 3;
 
 	switch (winos)
 	{
 	case WINXP:
 		printf("the os is winxp\n");
 		break;
 	case WIN7:
 		printf("the os is win7\n");
 		break;
 	case WIN8:
 		printf("the os is win8\n");
 		break;
 	default:
 		printf("unkonwn windows os")
 		break;
 	}
 	
 	return 0;
 }
 
 ```

#### sizeof 枚举类型

![sizeofmeijuleix](sizeofmeijuleix.png)

```

	printf("sizeof(WINVERSION):%d,sizeof(WIN8):%d",
		sizeof(WINVERSION), sizeof(WIN8));
		
长度都是一样的，枚举类型的底层应该是int，都是四个字节
```

#### 软工中的使用

![ruangong](ruangong.png)

###### 作业

![zuoye5](zuoye5.png)

```
1.typedef enum _day
{
	monday,
	tuesday,
	wedensday,
	thursday,
	friday,
	saturday,
	sunday
}day,*pday;
```

2.4个字节

3.枚举类型是非构建类型，是基础类型的一种

4.只能取所构建的类型中所定义的值。所构建的值一般是从0开始排列往后依次加1

# 第十六课-位运算

## （1）：位运算概述

### 复习二进制位

![erjinzhiwei](erjinzhiwei.png)

*扩展位数的时候，用符号为去填充多出来的位数*

### 位运算定义

![weiyunsuan](weiyunsuandedingyi.png)



| &    | \|   | ~    | ^    | <<   | >>   |
| ---- | ---- | ---- | ---- | ---- | ---- |
| and  | or   | not  | xor  | shl  | shr  |
| 与   | 或   | 取反 | 异或 | 左移 | 右移 |



### 运算符

![yunsuanfu](yunsuanfu.png)

###### 作业

![zuoye6](zuoye6.png)

1.一个bit为二进制中的一个为数位，一个byte由八个数位组成，成为一个字节

2.~最高，单目运算  << >> 次之  然后是  &  ^   |

3.不可以，整型是用32位补码形式存放。浮点数的存储方式与整数不一样，包含了一位符号位还有指数位，所以不能使用移位运算

4.一种是逻辑运算符一种是位运算符，单个是针对于数的二进制表达进行位移动，两个是对于两个表达之间的真假判断

5.都是  "x = x & 某数" 的含义

## （2）：与运算 &

![yuyunsuan](yuyunsuan.png)

### 程序表示

![yuyunsuanchengxubiaoshi](yuyunsuanchengxubiaoshi.png)

7，的二进制表示为0111，一个数与7进行与运算，得到的数，就是其末尾3位

16，0xF

子网掩码 255.255.255.0 -> 0xFFFFFF00

ip:192.168.1.100  

前三个字节是网络号。最后一个字节是主机号

子网掩码，进行与运算获取网络号

### 清除整数a二进制中最右边的1

![qingchu1](qingchu1.png)

### 各种性质

![xingzhiyu](xingzhiyu.png)

###### 作业

![zuoye7](zuoye7.png)

1.与运算中，与1运算的值都为本身，与0预算的值都为0，获取低三位低八位，只需要使 0000 0111 , 0000 0000 1111 1111  满足除需要的位数其余数字为0即可获得

2.某一位为1，也是，假设判断第四位为1，0000 1000  如果结果为1则为1



## （3）：或运算  |

![huoyunsuan](huoyunsuan.png)

### 或运算程序 

![huoyunsuanchengxu](huoyunsuanchengxu.png)

###### 作业

![zuoye8](zuoye8.png)

或运算算法，有1即结果为1,所以只需要确保计算的某位置的数为1即可

## （4）：异或运算

![yihuoyunsuan](yihuoyunsuan.png)

异或运算，相同为0，不同为1、

### 异或的程序表达

![yihuodechengxubiaoda](C:\blog\my-blog\content\post\11.08.2025\yihuodechengxubiaoda.png)

###  异或运算的性质

![yihuoyun](yihuoyunsuandexingzhi.png)

xor eax eax  自己与自己异或，结果为0

两个数的交换

![jiaohuan](jiaohuan.png)



![2](2.png)

### 单指针实现双链表

![danzhizhen](danzhizhenshuanglianbiaop.png)

![qiujiedian](qiujiedian.png)

###### 作业

![zuoye9](zuoye9.png)

```
1.异或运算，相同为0，相反取1
设a ，b 两个数
int a,b;
a = a xor b
b = 'a' xor b = a xor b xor b = a xor 0 = a
a = 'a' xor 'b' = a xor b xor a = b xor 0 = b
所以 
a = b
b = a
```

2.链表暂定

## （5）：取反运算

![qufanyunsuan](qufanyunsuan.png)

必须是1个字节，2个或者4个

### 程序表示

![qufanyunsuan](qufanyunsuanchengxubiaoshi.png)

*不存在复合运算*

###### 作业

![zuoye10](zuoye10.png)

先计算 ~0xFFFEFFFF  即 1111 1111 1111 1110 1111 1111 1111 1111  取反  0000 0000 0000 0001 0000 0000 0000 0000 

然后计算 0x12345678  即  0001 0010 0011 0100 0101 0110 0111 1000 与其取或，即把其中一位变成1即可

结果：0001 0010 0011 0101 0101 0110 0111 1000  = 0x12355678

## （6）：移位运算   <<  >>

### 左移运算符 ：<<

![zuoyiyunsuanfu](zuoyiyunsuanfu.png)

举例

![zuoyiyunsuanjuli](zuoyiyunsuanjuli.png)

### 右移运算符

![youyiyunsuanfu](youyiyunsuanfu.png)

分为逻辑右移和算数右移

c语言中右移运算符为算数右移

java   >>>逻辑   >>算数

###### 作业

![zuoye11](zuoye11.png)

1.左移n位，空出来的用0填充  右移n位，空出来的用符号位填充

2.等于将这个数乘以/除以  2^N次方

3.(0x12345678 = 0001 0010 0011 0100 0101 0110 0111 1000  >> 24)  = 0000 0000 0000 0000 0000 0000 0001 0010  &  (0xFF=1111 1111)

结果为 0001 0010 =0x12



## （7）：位运算综合运用

### 将第N位置0或者置1

![0zhi1](0zhi1.png)

### 对称加密

![yihuojiami](yihuojiami.png)

### 实际项目运用

![shijiyunyong](shijiyunyong.png)

###### 作业

![zuoye12](zuoye12.png)

