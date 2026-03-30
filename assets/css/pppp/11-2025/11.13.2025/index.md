---
title: 11-13 作业
description: 正是江南好风景，落花时节又逢春 
date: 2025-11-13
slug: 11-13
image: bj.jpg
categories:
    - c语言基础
---

4.定义一个名为 `BinaryString` 的结构体，包含一个字符串 `str` 用于存储二进制数字，和一个整型变量 `length` 用于存储字符串的长度。编写一个函数，ring` 结构体数组中，最后返回这个数组

示例输入：

```c
hello
```

输出：

```c
h: 01101000
e: 01100101
l: 01101100
l: 01101100
o: 01101111
```



代码：

````
#include <stdio.h>
#include <string.h>

typedef struct BinaryString
{
	char str;
	int length;
}BinaryString,*pBinaryString;

void PrintBinary(unsigned char dec)
{
	unsigned int quotient = 1;
	unsigned int Remainder = 1;
	char c[8] = { 0 };
	int count = 0;
	while (dec > 0)
	{
		Remainder = dec % 2;
		quotient = dec / 2;
		c[count] = Remainder;
		count++;
		dec = quotient;
	}
	for (int i = 8 - 1; i >= 0; i--)
	{
		printf("%d", c[i]);
	}
	printf("\n");
}

void Change_ASCII_Bin(char a[], int len)
{
	for (int i = 0; i < len; i++)
	{
		BinaryString b1 = { 0 };
		b1.str = a[i];
		printf("%c:", b1.str);
		char n = (int)b1.str;
		PrintBinary(n);
	}
}

int main()
{
	char a[6] = {0};
	printf("input array:");
	scanf("%s", &a);
	int len = sizeof(a) / sizeof(a[0]) - 1;

	Change_ASCII_Bin(a,len);

	return 0;
}

````

学习十进制转换为二进制

以及二进制的正序逆序打印











