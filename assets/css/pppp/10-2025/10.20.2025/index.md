---
title: 10-20 内建型别
description: 云想衣裳花想容，春风拂槛露华浓
date: 2025-10-20
slug: 10-20
image: bj.jpg
categories:
    - c语言基础
---
# 内建型别

c语言是一个强类型的语言，数据必须明确指定类型，C++还加强了类型安全的检查
程序与数据：程序的任务：处理数据（信息），图片，视频，文本，日志，数据库等。
一个人的年龄，身高，体重，名字，健康状况，性别等数据，对应了不同的类型

c语言标准，所有的都支持，占字节意为在磁盘中进行存储的时候必须要占这么多空间才能进行存储
字符类型：char/wchar_t    2个字节或者4个字节   char对应    wchar_t对应
整型：short 短暂，2个字节/int 标准，4个字节/long 长整型，winx86 8个字节/longlong 再linux用的多/_int64 win多，8字节
实数单精度：float  4字节
实数双精度：double  8字节
有符号和无符号：signed   有/unsigned 无,(signed)int 默认有/ unsigned int
布尔类型：bool,0/1(true/false) C99 <stdbool.h>  头文件
c语言内部支持的型别

数据类型的实例
char gender = 'M';ASCII字符
wchar_t sex = L'F';UNICODE字符  此字符一个字符占两个字节，ios和linux占4个字节
char name[16] = 'tom';   字符组有16个元素
wchar_t nick[16] = L'Jcak';

int age=30;
float weight=79.1f;
double height= 1.80
bool bhealthy= ture;

内建型别，数据以字节为单位存储在内存中，不同类型的数据，存储占用的内存空间长度不同

字符型：char./wchar_t
sizeof(char) = 1 即char类型占1个字节空间       采用ASCII编码，一个字符对应一个字节
sizeof(wchar_t) = 2或者4,字符数与字节数的区别  Unicode编码，一个字符对应多个字节
char c='a'// 'a'是字符常量，c是字符变量。常量用单引号包围  '''->'\''  表示字符常量的时候用单引号引起来，单引号也是一个字符，需要用转义字符来表示该引号不是字符
wchar_t wc=L'a';
unsigned char/signed char,只写char，由编译器决定是有符号无符号
字符编码：字符在计算机中是通过字符编码（字符的id）的形式存储的，'a'->97,'A'->65
ASCII码，美国标准信息交换代码

ASCII码是单字节编码系统，它使用指定的7位或者8位二进制数组合来表示128或256种可能的字符
标准ASCII码也叫基础ASCII码，使用7位二进制数来表示所有的大写和小写字母，数字0-9，标点符号，以及在美式英语中使用的特殊控制字符
    char c= 'A',//c=65  
        char ch='0';//ch=48  

UNICODE编码
ASCII编码只能表示有限的字符数，为了能够将世界上所有的字符都纳入编码范围，UNICODE字符编码便产生了，在UNICODE字符编码中，经常采用的是用2个字节或4个字节来表示一个字符，UNICODE编码的具体实现包括UTF-8，UTF-16和UTF-32。其中UTF-8中的字符占用的字节可以从1到4个，而UTF-16占两个字节，UTF-32占4个字节。
unicode编码兼容ASCII编码
 '0'  '1'被引号括起来，表示1和0的字符，有对应的编码，而0，和1对应的就是整数的值，
    如何把一个字符转化成整数：  c - '0'//     '5'-'0'=5      (减0这个字符)
                           整数转化成字符：    i  + '0'//       5+'0'='5' （加0这个字符）
                          大写转小写  char c = 'M'
                                                 c + 'a' - 'A'   字母大小写之间转化差32位值，所以加上小a减大A，不直接写32是为了能看懂
                                                char ch='y'
                                                 ch + 'A'-'a'    a=97 A=65
