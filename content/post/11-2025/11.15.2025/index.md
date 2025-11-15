title: 11-15 笔记
description: 夜阑卧听风吹雨，铁马冰河入梦来
date: 2025-11-15
slug: 11-15
image: bj.jpg
categories:

    - 每日
---

2.

某酒店有若干楼层，每层有若干房间。

请你编写一个程序，使用 **三维指针 `char ***hotel`** 存储所有房间的住客姓名。

要求：

1. 从键盘输入楼层数 `f` 和每层的房间数 `r`。
2. 动态分配三维指针内存，使得每个房间都能存放一个住客姓名字符串。
3. 用户依次输入每个房间的住客姓名（如空房请输入 `"Empty"`）。
4. 程序输出整个酒店的入住情况（按楼层打印）。
5. 最后释放所有分配的内存

输入

```c
2 3
Alice
Bob
Empty
Cindy
David
Eve

```

输出

```c
酒店入住情况：
第 1 层：
  房间 1: Alice
  房间 2: Bob
  房间 3: Empty
第 2 层：
  房间 1: Cindy
  房间 2: David
  房间 3: Eve

```



代码:

```
#include <stdio.h>
#include <stdlib.h>


int main()
{
	int f, r;
	printf("input hotel`s floor and room:");
	scanf("%d %d", &f, &r);

	char*** hotel = (char***)malloc(f * sizeof(char**));
	for (int i = 0; i < f; i++)
	{
		 hotel[i] = (char**)malloc(r * sizeof(char*));
		for (int j = 0; j < r; j++)
		{
			hotel[i][j] = (char*)malloc(20 * sizeof(char));
		}
	}
	
	
	for (int i = 0; i < f; i++)
	{
		for (int j = 0; j < r; j++)
		{
			printf("input human`s name:");
			scanf("%s", hotel[i][j]);
		}
	}

	printf("酒店入住情况:\n");

	for (int i = 0; i < f; i++)
	{
		 
		printf("第%d层:\n", i + 1);
		for (int j = 0; j < r; j++)
		{
			printf("房间%d:%s\n", j + 1, hotel[i][j]);
		}
	}
	
	for (int i = 0; i < f; i++)
	{
		
		for (int j = 0; j < r; j++)
		{
			free(hotel[i][j]);
		}

		free(hotel[i]);
	}
	free(hotel);


	return 0;
}
```

