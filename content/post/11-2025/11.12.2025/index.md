---
title: 11-12 笔记
description: 飞鸟与鱼不同路，再见容易再见难。
date: 2025-11-12
slug: 11-12
image: bj.jpg
categories:
    - 每日
---









将之前除链表，pe读取，配置文件读取的作业写了

### 1.将一个2行3列的二维数组转置为3行2列的数组

```
Input 6 integers:
123 43 12         00 01 02
64 234 12         10 11 12
转换后的数组:
123 64            00 01
43  234           10 11
12  12            20 21
```

代码

```
#include <stdio.h>

int main()
{
	int a[2][3] = { 0 };
	int b[3][2] = { 0 };
	for (int i = 0; i < 2; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			printf("Input 6 integers:");

			scanf("%d", &a[i][j]);
		}
	}

	for (int i = 0; i < 2; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			b[j][i] = a[i][j];
		}
	}
	for (int i = 0; i < 3; i++)
	{
		for (int j = 0; j < 2; j++)
		{
			printf("%d ", b[i][j]);
		}
		printf("\n");
	}
	return 0;
}
```

### 2.编写一个C语言程序，使用指针将数组{10, 20, 30, 40, 50}反转并输出结果。

实现如下：

```
原数组: 10 20 30 40 50
反转后: 50 40 30 20 10
```



代码：

~~~
#include <stdio.h>
#include <string.h>

int main()
{
	int a[5] = { 10,20,30,40,50 };
	int len = sizeof(a) / sizeof(a[0]) - 1;
	int* pl = &a[0];
	int* pr = &a[len];
	
	while (pl != pr)
	{
		int tmp =*pr;
		*pr = *pl;
		*pl = tmp;
		pl++;
		pr--;
	}
	for (int i=0; i < len+1; i++)
	{
		printf("%d ", a[i]);
	}
	return 0;
}
~~~

