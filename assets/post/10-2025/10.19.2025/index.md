---
title: 10-19 整形
description: 故事不长，也不难讲，相识一场，爱而不得
date: 2025-10-19
slug: 10-19
image: bj.jpg
categories:
    - c语言基础
---
# 整形

       short int   简写为 short
    int
    long int  简写为 long
    long long
    _int64
       char也可以看作一种整型 
      
    short a1 = 100
        int a2 = 0x64
        long a3 = 100L
      
        unsigned short a4 = 100
        unsigned int a5 100
        unsigned long a6 = 100UL
    
        long long a7 100ll;Linux
        _int64 a8 = 100i64 ;windows

长度不对，会容易出很多漏洞，

    浮点类型
    float//单精度, 4个字节
    double//双精度，8个字节

   float x=3.1415f  如果不写f系统会认为这是一个双精度浮点数
   double y = 1.732

自定义新的类型
                       typedef int INTl
                     typedef unsigned int UINT
                     typedef unsigned short USHORT
                        typedef char CHAR
                      typedef unsigned long ULONG
                      typedef usigned short WORD
                       typedef unsigned int DWORD
                     typedef unsigned char BYTE
                      typedef unsigned int size_t

数据结构体，列表节点，二次参数
可以用来应对c语言代码中的标准或者平台发生了变化，重新定义可以减少代码的修改量
代码更简单
统一编码风格







