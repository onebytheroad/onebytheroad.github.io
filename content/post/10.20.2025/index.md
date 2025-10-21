---
title: 10-10 笔记
description: 云想衣裳花想容，春拂槛露华浓
date: 2025-10-10
slug: 10-10
image: bj.jpg
categories:
    - 每日
---
### c语言基础
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
       
        #整形
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

### python
学习了字典及其基础语法知识
