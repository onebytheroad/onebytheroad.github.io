---
title: 10-19 笔记
description: 故事不长，也不难讲，相识一场，爱而不得
date: 2025-10-19
slug: 10-19
image: bj.jpg
categories:
    - 每日
---
### python基础课
序列中有关于字符串，列表，元组的知识总结
补充了一些常用函数

### c语言基础

##内建型别##
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

#字符型：char./wchar_t
sizeof(char) = 1 即char类型占1个字节空间       采用ASCII编码，一个字符对应一个字节
sizeof(wchar_t) = 2或者4,字符数与字节数的区别  Unicode编码，一个字符对应多个字节
char c='a'// 'a'是字符常量，c是字符变量。常量用单引号包围  '''->'\''  表示字符常量的时候用单引号引起来，单引号也是一个字符，需要用转义字符来表示该引号不是字符
wchar_t wc=L'a';
unsigned char/signed char,只写char，由编译器决定是有符号无符号
字符编码：字符在计算机中是通过字符编码（字符的id）的形式存储的，'a'->97,'A'->65
        ASCII码，美国标准信息交换代码
    ASCII码是单字节编码系统，它使用指定的7位或者8位二进制数组合来表示128或256种可能的字符


