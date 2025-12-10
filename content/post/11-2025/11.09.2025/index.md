---
title: 11-09 位运算
description: 花开堪折直须折，莫待无花空折枝
date: 2025-11-09
slug: 11-09
image: bj.jpg
categories:
    - c语言基础
---

# 第十六课-位运算

## （1）：位运算概述

### 复习二进制位

![erjinzhiwei](C:/blog/my-blog/content/post/11-2025/11.08.2025/erjinzhiwei.png)

*扩展位数的时候，用符号为去填充多出来的位数*

### 位运算定义

![weiyunsuan](C:/blog/my-blog/content/post/11-2025/11.08.2025/weiyunsuandedingyi.png)



| &    | \|   | ~    | ^    | <<   | >>   |
| ---- | ---- | ---- | ---- | ---- | ---- |
| and  | or   | not  | xor  | shl  | shr  |
| 与   | 或   | 取反 | 异或 | 左移 | 右移 |



### 运算符

![yunsuanfu](C:/blog/my-blog/content/post/11-2025/11.08.2025/yunsuanfu.png)

###### 作业

![zuoye6](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye6.png)

1.一个bit为二进制中的一个为数位，一个byte由八个数位组成，成为一个字节

2.~最高，单目运算  << >> 次之  然后是  &  ^   |

3.不可以，整型是用32位补码形式存放。浮点数的存储方式与整数不一样，包含了一位符号位还有指数位，所以不能使用移位运算

4.一种是逻辑运算符一种是位运算符，单个是针对于数的二进制表达进行位移动，两个是对于两个表达之间的真假判断

5.都是  "x = x & 某数" 的含义

## （2）：与运算 &

![yuyunsuan](C:/blog/my-blog/content/post/11-2025/11.08.2025/yuyunsuan.png)

### 程序表示

![yuyunsuanchengxubiaoshi](C:/blog/my-blog/content/post/11-2025/11.08.2025/yuyunsuanchengxubiaoshi.png)

7，的二进制表示为0111，一个数与7进行与运算，得到的数，就是其末尾3位

16，0xF

子网掩码 255.255.255.0 -> 0xFFFFFF00

ip:192.168.1.100  

前三个字节是网络号。最后一个字节是主机号

子网掩码，进行与运算获取网络号

### 清除整数a二进制中最右边的1

![qingchu1](C:/blog/my-blog/content/post/11-2025/11.08.2025/qingchu1.png)

### 各种性质

![xingzhiyu](C:/blog/my-blog/content/post/11-2025/11.08.2025/xingzhiyu.png)

###### 作业

![zuoye7](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye7.png)

1.与运算中，与1运算的值都为本身，与0预算的值都为0，获取低三位低八位，只需要使 0000 0111 , 0000 0000 1111 1111  满足除需要的位数其余数字为0即可获得

2.某一位为1，也是，假设判断第四位为1，0000 1000  如果结果为1则为1



## （3）：或运算  |

![huoyunsuan](C:/blog/my-blog/content/post/11-2025/11.08.2025/huoyunsuan.png)

### 或运算程序 

![huoyunsuanchengxu](C:/blog/my-blog/content/post/11-2025/11.08.2025/huoyunsuanchengxu.png)

###### 作业

![zuoye8](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye8.png)

或运算算法，有1即结果为1,所以只需要确保计算的某位置的数为1即可

## （4）：异或运算    ^

![yihuoyunsuan](C:/blog/my-blog/content/post/11-2025/11.08.2025/yihuoyunsuan.png)

异或运算，相同为0，不同为1、

### 异或的程序表达

![yihuodechengxubiaoda](C:\blog\my-blog\content\post\11.08.2025\yihuodechengxubiaoda.png)

###  异或运算的性质

![yihuoyun](C:/blog/my-blog/content/post/11-2025/11.08.2025/yihuoyunsuandexingzhi.png)

xor eax eax  自己与自己异或，结果为0

两个数的交换

![jiaohuan](C:/blog/my-blog/content/post/11-2025/11.08.2025/jiaohuan.png)



![2](C:/blog/my-blog/content/post/11-2025/11.08.2025/2.png)

### 单指针实现双链表

![danzhizhen](C:/blog/my-blog/content/post/11-2025/11.08.2025/danzhizhenshuanglianbiaop.png)

![qiujiedian](C:/blog/my-blog/content/post/11-2025/11.08.2025/qiujiedian.png)

###### 作业

![zuoye9](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye9.png)

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

![qufanyunsuan](C:/blog/my-blog/content/post/11-2025/11.08.2025/qufanyunsuan.png)

必须是1个字节，2个或者4个

### 程序表示

![qufanyunsuan](C:/blog/my-blog/content/post/11-2025/11.08.2025/qufanyunsuanchengxubiaoshi.png)

*不存在复合运算*

###### 作业

![zuoye10](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye10.png)

先计算 ~0xFFFEFFFF  即 1111 1111 1111 1110 1111 1111 1111 1111  取反  0000 0000 0000 0001 0000 0000 0000 0000 

然后计算 0x12345678  即  0001 0010 0011 0100 0101 0110 0111 1000 与其取或，即把其中一位变成1即可

结果：0001 0010 0011 0101 0101 0110 0111 1000  = 0x12355678

## （6）：移位运算   <<  >>

### 左移运算符 ：<<

![zuoyiyunsuanfu](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoyiyunsuanfu.png)

举例

![zuoyiyunsuanjuli](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoyiyunsuanjuli.png)

### 右移运算符

![youyiyunsuanfu](C:/blog/my-blog/content/post/11-2025/11.08.2025/youyiyunsuanfu.png)

分为逻辑右移和算数右移

c语言中右移运算符为算数右移

java   >>>逻辑   >>算数

###### 作业

![zuoye11](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye11.png)

1.左移n位，空出来的用0填充  右移n位，空出来的用符号位填充

2.等于将这个数乘以/除以  2^N次方

3.(0x12345678 = 0001 0010 0011 0100 0101 0110 0111 1000  >> 24)  = 0000 0000 0000 0000 0000 0000 0001 0010  &  (0xFF=1111 1111)

结果为 0001 0010 =0x12



## （7）：位运算综合运用

### 将第N位置0或者置1

![0zhi1](C:/blog/my-blog/content/post/11-2025/11.08.2025/0zhi1.png)

### 对称加密

![yihuojiami](C:/blog/my-blog/content/post/11-2025/11.08.2025/yihuojiami.png)

### 实际项目运用

![shijiyunyong](C:/blog/my-blog/content/post/11-2025/11.08.2025/shijiyunyong.png)

###### 作业

![zuoye12](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye12.png)

1.  127 ->  0111 1111  左移1位，然后用0填充，再加1   1111 1110 加1   结果是1111 1111,  255   (?)
2.  -1 -> 1111 1111 右移1位，然后用符号位填充，1111 1111 再加1   结果是 1 0000 0000  -256   (?)

3.  算数运算符优先，也就是1<<5   0000 0001    0010 0000  结果是，乘以2的5次方，32

4.  15 & 240 换成二进制   0000 1111    1111 0000     与运算，与1运算为本身  , 0

5.  0000 1010   ^   0000 1100    异或运算，相同取0，相反取1   即  0000 0110   ，6
6.  与1111 1111 0000 0000 0000 0000 0000 0000  进行与运算
7.  1向左移动100位，除以7的余数，  0000 0111取余  (?)
8.  1~1024  00 0000 0001   -  10 0000 0000   异或取值范围   相同0，不同1   最大即2047，最小(?)  1025  还包含0

9.  (?)



解析：

字符型，-128~127 第一题左移转为十进制254，超出范围，截断，1111 1110 表示为 -2,-2+1=-1

第二题，右移一位，保持-1，再加1，结果为0

思路，循环加移位，先将浮点数转换为整数，因为浮点数与整数的编码方式不同，如果直接转换成2进制会出现问题，所以

需要转换成整数并且一位一位打印

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <stdbool.h>
#include <malloc.h>

#define mask 0x1

int main()
{
	float f = 1.0f;
	
	int k = *(int*)(&f), j;
	for (j = 31; j >= 0; j--)
		printf("%d", (k >> j) & mask);
	return 0;
}

网络：https://www.zhihu.com/question/457946470
```

结果如下

![diyizhiongsuanfa](diyizhiongsuanfa.png)

```
ai
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <stdbool.h>
#include <malloc.h>
#include <stdint.h>

void print_float_bits(float f) {
    // 1. 将 f 的二进制表示转为 uint32_t
    uint32_t u = *((uint32_t*)&f);

    // 2. 分别提取符号位(1 bit)、指数位(8 bits)、尾数位(23 bits)
    //    并打印每一位
    // 符号位: bit 31
    // 指数位: bit 30~23
    // 尾数位: bit 22~0

    printf("符号位(1): ");
    printf("%d", (u >> 31) & 1);

    printf("\n指数位(8): ");
    for (int i = 30; i >= 23; i--) {
        printf("%d", (u >> i) & 1);
    }

    printf("\n尾数位(23): ");
    for (int i = 22; i >= 0; i--) {
        printf("%d", (u >> i) & 1);
    }
    printf("\n");
}

int main()
{
    print_float_bits(1.0f);

    return 0;
}
```

结果：

![suanfadierzhong](suanfadierzhong.png)
