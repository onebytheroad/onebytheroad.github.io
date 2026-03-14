---
title: 11-14 作业
description: 何时归故里，同她笑一场
date: 2025-11-14
slug: 11-14
image: bj.jpg
categories:
  - c语言基础
---

5.从标准输入读入 `R×C` 矩阵，将其：

- 以整齐的表格形式写入文本文件 `matrix.txt`；
- 以**二进制**格式写入 `matrix.bin`，格式为（均 32 位小端有符号整数）：`R`、`C` 头两个数，然后是按**行主序**存放的 `R*C` 个元素。

示例输入

```c
2 3
11 26 32
24 85 96
```

`matrix.txt` 内容（文本）：

```c
11 26 32
24 85 96
```

代码：

```
#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>

int WriteFile(int **arr,int R,int C)
{
	char *path = "d:\\11\\matrix.txt";

	FILE* file = NULL;
	errno_t err = fopen_s(&file,path,"w");
	if (err != 0 && file == NULL)
	{
		return -1;
	}
	
	for (int i = 0; i < R; i++)
	{
		for (int j = 0; j < C; j++)
		{
			fprintf(file,"%d ",arr[i][j]);
		}
		fprintf(file,"\r\n");
	}
		 
	fclose(file);

}

int WriteFileBin(int** arr, int R, int C)
{
	char* path = "d:\\11\\matrix.bin";

	FILE* file = NULL;
	errno_t err = fopen_s(&file, path, "wb");
	if (err != 0 && file == NULL)
	{
		return -1;
	}

	for (int i = 0; i < R; i++)
	{
		for (int j = 0; j < C; j++)
		{
			fwrite(&arr[i][j], sizeof(int),1,file);
		}
		
	}

	fclose(file);

	err = fopen_s(&file, path, "rb");
	if (err != 0 || file == NULL)
	{
		return -1;
	}

	int buf[128*128] = {0};
	fread(buf, sizeof(int), R * C, file);

	for (int i = 0; i < R*C; i++)
	{
		printf("buf:%d\n", buf[i]);
	}

	fclose(file);
}

int main()
{
	int a, b;
	printf("input R&C:");
	scanf("%d %d", &a, &b);

	int** arr = (int**)malloc(a * sizeof(int*));
	for (int i = 0; i < a; i++)
	{
		arr[i] = (int*)malloc(b * sizeof(int));
	}

	
	for (int i = 0; i < a; i++)
	{
		for (int j = 0; j < b; j++)
		{
			printf("input data:");
			scanf("%d", &arr[i][j]);
		}
	}

	WriteFile(arr,a,b);

	WriteFileBin(arr, a, b);

	free(arr);

	return 0;
}
```



1.编写一个程序，定义一个 `Student` 结构体，包含以下成员：

- `char name[20]` —— 学生姓名
- `int id` —— 学号
- `float score` —— 成绩

要求：

1. 从键盘输入 `n` 个学生的信息。
2. 按成绩从高到低排序（若成绩相同则按学号升序）。
3. 输出排序后的学生信息。

输入

```
5
Alice 1001 85.5
Bob 1003 90.0
Cindy 1002 90.0
David 1004 78.0
Eve 1005 85.5

```

输出

```c
排序后的学生信息：
Bob 1003 90.00
Cindy 1002 90.00
Alice 1001 85.50
Eve 1005 85.50
David 1004 78.00

```

```
#include <stdio.h>
#include <stdlib.h>

typedef struct Student
{
	char name[20];
	int id;
	float score;


}Student, * pStudent;

int main()
{
	int a;
	printf("input quantity:");
	scanf("%d", &a);

	Student* stu= (Student*)malloc(a * sizeof(Student));
	if (stu == NULL) 
	{
		return -1;
	}
	for (int i = 0; i < a; i++)
	{
		printf("input stu message:");
		scanf("%s %d %f", stu[i].name, &stu[i].id, &stu[i].score);
	}

	

	for (int i = 0; i < a; i++)
	{
		for (int j = i+1; j < a; j++)
		{
			if (stu[i].score < stu[j].score)
			{
				Student tmp = { 0 };
				tmp = stu[j];
				stu[j] = stu[i];
				stu[i] = tmp;
			}

			if (stu[i].score == stu[j].score && stu[i].id < stu[j].id)
			{
				Student tmp = { 0 };
				tmp = stu[j];
				stu[j] = stu[i];
				stu[i] = tmp;
			}
		}
	}

	for (int i = 0; i < a; i++)
	{
		printf("%s %d %.2f\n", stu[i].name, stu[i].id, stu[i].score);
	}

	free(stu);
	return 0;
}
```

