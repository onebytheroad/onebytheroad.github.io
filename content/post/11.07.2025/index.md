---
title: 11-07 笔记
description: 人生若只如初见，何事秋风悲画扇
date: 2025-11-07
slug: 11-07
image: bj.jpg
categories:
    - 每日
---

## （2）：结构体中的指针与数组

### 三种不同结构体定义示意图

![sanzhongjiegouti](sanzhongjiegouti.png)

左：

设定数组64字节的长度，则考生的名字不能超过64个字节，而考生的名字没有达到64字节，就会出现空间的浪费

中：

字符指针，单独指派内存

可以根据所填入字符串大小来分配内存，不会造成内存的浪费，但是存放的地方不连续，如果要做拷贝，需要单独的进行拷贝

右：

name数组中有一个元素，但是一个元素的空间，是可以变长的，这样既能满足空间不浪费，还能够连续便于拷贝

```
#include <stdio.h>
#include <malloc.h>
#include <string.h>


typedef struct _info1
{
	int value;
	char name[64];
}info1,*pinfo1;

typedef struct _info2
{
	int value;
	char *name;
}info2, *pinfo2; 

typedef struct _info3
{
	int value;
	size_t length;
	char name[1];
}info3, *pinfo3;

int main()
{
	info1* pi1 = (info1*)malloc(sizeof(info1));
	if (pi1 == NULL)
	{
		goto err;
	}
	memset(pi1, 0, sizeof(info1));

	pi1->value = 78;
	strcpy_s(pi1->name, 64, "lucy");

	info2* pi2 = (info2*)malloc(sizeof(info2));
	if (pi2 == NULL)
	{
		goto err;
	}

	pi2->value = 78;
	size_t len = strlen("lucy") + 1;

	pi2->name = (char*)malloc(len);
	if (pi2 == NULL)
	{
		goto err;
	}
	memset(pi2->name, 0, len);
	strcpy_s(pi2->name, len, "lucy");

	info3* pi3=(info3*)malloc(sizeof(info3) + strlen("lucy") + 1 - 1);
	if (pi3 == NULL)
	{
		goto err;
	}
	memset(pi3, 0, sizeof(info3) + strlen("lucy") + 1 - 1);
	pi3->value = 78;
	pi3->length = strlen("lucy") + 1;

	strcpy_s(pi3->name, pi3->length, "lucy");

	printf("1:score:%d,name:%s\n", pi1->value, pi1->name);
	printf("2:score:%d,name:%s\n", pi2->value, pi2->name);
	printf("3:score:%d,name:%s\n", pi3->value, pi3->name);


	err:
		if (pi1)
			free(pi1);
		if (pi2->name)
			free(pi2->name);
		if (pi2)
			free(pi2);
		if (pi3)
			free(pi3);


	return 0;
	}
```

##### 作业：

![zuoye](zuoye.png)

1.用malloc函数为指针在堆上分配内存，然后检验指针是否指向NULL，如果不是就使用memset进行初始化

2.如上述代码。

##### 语言练习：

```
语言练习1：
void inputArray(int *arr, int n); // 用于从键盘给数组输入n个整数。
提示：使用指针或下标arr[i]均可。
void printArray(int *arr, int n); // 用于打印数组的所有元素。
int findMax(int *arr, int n); // 用于找出并返回数组中的最大值。
在main函数中：
定义一个长度为5的整型数组。
依次调用 inputArray, printArray, findMax，并打印出最大值。

第一次：
#include <stdio.h>
#include <stdlib.h>

void Inputarray(int* arr, int n)
{
	printf("输入'n'个数字：");
	scanf((char*)"%s",&arr);
	return arr[n];
}

void Printarray(int* arr, int n)
{
	for (int i = 0; i < n; i++)
	{
		printf("%d", arr[i]);
	}
	return 0;
}

int findMax(int* arr, int n)
{
	int max = arr[0];
	for (int i = 0; i < n; i++)
	{
		 
		if (max < arr[i])
		{
			max = arr[i];
		}	
	}

	return max;
}

int main()
{
	int arr[5];

	Inputarrat(arr, 5);

	printf("%d", Printarray(arr, 5));


	int max = findMax(arr, 5);
	printf("%d", max);


	return 0;

}

检测错误：
#include <stdio.h>
#include <stdlib.h>

void Inputarray(int* arr, int n)
{
	for (int i=0; i < n; i++) 
	{
		printf("输入%d个数字：",n);
		scanf("%d", &arr[i]);
	}

}

void Printarray(int* arr, int n)
{
	for (int i = 0; i < n; i++)
	{
		printf("%d  ", arr[i]);
	}

}

int findMax(int* arr, int n)
{
	int max = arr[0];
	for (int i = 1; i < n; i++)
	{
		 
		if (max < arr[i])
		{
			max = arr[i];
		}	
	}

	return max;
}

int main()
{
	int arr[5];

	Inputarray(arr, 5);

	Printarray(arr, 5);

	int max = findMax(arr, 5);
	printf("输入数组中最大的数为：%d", max);

	return 0;
}
```

###### error1：

void函数，直接对参数进行操作不返回值，清楚函数实现的参数是否需要返回值

scanf的取值参数，应该用循环依次取值

```
任务二：指针与字符串（巩固）
目标： 巩固指针操作，理解字符串（字符数组）。
要求： 不使用标准库函数（如strlen, strcpy），自己实现以下两个函数：
int my_strlen(const char *str); // 计算字符串的长度（不包含结尾的‘\0'）。
提示：用一个指针遍历，直到遇到‘\0’。
void my_strcpy(char *dest, const char *src); // 将源字符串src复制到目标字符串dest。
提示：用循环逐个字符复制，最后别忘了在dest末尾加上‘\0’。
在main函数中：
定义一个源字符串 char src[] = "Hello, C!";
定义一个足够大的目标字符串数组 char dest[20];
调用你的函数进行复制和计算长度，并打印结果。
思考：
const char *src 中的 const 有什么用？（它防止你意外修改源字符串，是一个好习惯）。
如果 dest 的空间比 src 小，会发生什么？（这就是C语言需要程序员自己小心的地方，会“缓冲区溢出”，非常危险）。

第一次：
#include <stdio.h>

int my_strlen(const char* str)
{
	char* p = str[0];
	int tmp = 0;
	if (*p != '\0')
	{
		tmp++;
		p++;
	}
	else
	{
		printf("字符串的长度：%d", tmp);
	}

	return tmp;
}

void my_strcpy(char* det, const char* src)
{
	if (my_strlen(det) < my_strlen(src))
	{
		printf("新数组长度小于原数组，无法拷贝");
	}

	for (int i = 0; i < my_strlen(src); i++)
	{
		det[i] = src[i];
	}

}

int main()
{
	char src[] = "hello,C!";

	printf("%d", my_strlen(src));

	char det[20] = { 0 };
	
	my_strcpy(det, src);

	for (int i = 0; i < my_strlen(src); i++)
	{
		printf("%c",src[i]);
	}
	
	return 0;
}

修正：
#include <stdio.h>

int my_strlen(const char* str)
{
	const char *p=str;
	int tmp = 0;
	while (*p != '\0')
	{
		tmp++;
		p++;
	}
	return tmp;
}

void my_strcpy(char* det, const char* src)
{
	int len1 = my_strlen(src);
	if (30< my_strlen(src))
	{
		printf("新数组长度小于原数组，无法拷贝");
	}

	for (int i = 0; i < len1; i++)
	{
		det[i] = src[i];
	}
	det[len1] = '\0';

}

int main()
{
	char src[] = "hello,C!";

	printf("字符串长度：%d\n", my_strlen(src));

	char det[30] = { 0 };
	
	my_strcpy(det, src);

	for (int i = 0; i < my_strlen(src); i++)
	{
		printf("%c",src[i]);
	}
	
	return 0;
}
```

###### error2:

char* p = str[0] 类型错误，应该是  const char* p = str

逻辑错误：需要用循环遍历整个字符串，不是只检查第一个字符

用while循环持续检查直到遇到'\0'

my_strlen(det)计算的是det当前字符串内容的长度，不是数组总容量

在函数传参中的数组会退化为指针，在比较数组容量时要么额外传递容量参数，要么使用设定的常量

```
任务3：
任务三：综合应用——数组修改器（挑战）
目标： 综合运用所有概念，解决一个稍微复杂的问题。
要求： 编写一个函数，其原型为：
int removeElement(int *nums, int numsSize, int val);
功能： 在数组 nums 中，原地移除所有值等于 val 的元素。元素的顺序可以改变。函数返回移除后数组的新长度。
原地移除 意味着你不能申请新数组，必须在原数组上操作。
示例：

输入：nums = [3, 2, 2, 3], val = 3
你的函数操作后，数组可能变为 [2, 2, ...]，并返回新长度 2。
实现思路（“双指针”法，非常重要！）：
定义一个“慢指针” slow = 0，它指向下一个“有效元素”该存放的位置。
用一个“快指针” fast 从0到numsSize-1遍历整个数组。
如果 nums[fast] != val，说明这个元素应该保留。就把它复制到 nums[slow] 的位置，然后 slow 向前移动一位。
遍历结束后，slow 的值就是新数组的长度。
在main函数中测试你的代码。

第一次：
#include <stdio.h>

int removeElement(int* nums, int numSize, int val)
{
	char* slow = 0;

	for (int* fast = nums; fast < numSize; fast++)
	{
		if (nums[fast] != val)
		{
			nums[slow] = nums[fast];
			slow++;
		}
	}

	for (int i = 0; i < numSize; i++)
	{
		printf("%d", nums[i]);
	}

}


修正：
#include <stdio.h>

int removeElement(int* nums, int numSize, int val)
{
	int* slow = nums;

	for (int* fast = nums; fast < nums+numSize; fast++)
	{
		if (*fast != val)
		{
			*slow = *fast;
			slow++;
		}
	}

	for (int i = 0; i < numSize; i++)
	{
		printf("%d ", nums[i]);
	}
	return slow-nums;
}

int main()
{
	int a[5] = { 2,3,4,3,2 };

	printf("数组长度：%d", removeElement(a, 5, 3));


}

```



