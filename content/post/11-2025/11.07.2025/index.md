---
title: 11-07 结构体指针，应用
description: 人生若只如初见，何事秋风悲画扇
date: 2025-11-07
slug: 11-07
image: bj.jpg
categories:
    - c语言基础
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



## （3）：结构体浅拷贝深拷贝

#### 结构体赋值时的拷贝

![jiegoutifuzhi](C:/blog/my-blog/content/post/11-2025/11.08.2025/jiegoutifuzhi.png)

是否能像图中一样，s1赋值之后，直接用s1来拷贝到其他结构体

##### 浅拷贝和深拷贝

![qiamkaobei](C:/blog/my-blog/content/post/11-2025/11.08.2025/qiamkaobeishenkkaobei.png)

左，如果结构体中不包含指针变量，那么s2=s1是正确的

右，结构体中的拷贝默认是浅拷贝，在赋值的同时也把指针所指向的的地址一起拷贝过去，而且s2中还未给指针分配内存，会导致s1和s2共享分配的100个字节的内存

如果free(s1.p)，那么s2.p就变成了野指针，指向了一个无效的内存地址



```
#include <stdio.h>
#include <string.h>
#include <malloc.h>

typedef struct _struct1
{
	int a;
	char c;

}struct1,*pstruct1;
 
typedef struct _struct2
{
	int a;
	char *p;

}struct2, *pstruct2;

int main()
{
	struct1 s1 = { 100,'A' };
	struct1 s2=s1;

	printf("s1:a:%d,c:%c\n", s1.a, s1.c);
	printf("s2:a:%d,c:%c\n", s2.a, s2.c);

	struct2 s3;
	s3.a = 100;
	s3.p = (char*)malloc(16);
	if(s3.p == NULL)
	{
		return -1;
	}

	memset(s3.p, 0, 16);
	strcpy_s(s3.p, 16, "hello world");
	struct2 s4=s3;

	printf("s3:a:%d,p:%s\n", s3.a, s3.p);
	printf("s4:a:%d,p:%s\n", s4.a, s4.p);

	free(s3.p);

	printf("s4:a:%d,p:%s\n", s4.a, s4.p);

	return 0;
}

```

debug

![qiankaobeidebug](C:/blog/my-blog/content/post/11-2025/11.08.2025/qiankaobeidebug.png)

##### 深拷贝的实现

![sh](C:/blog/my-blog/content/post/11-2025/11.08.2025/shenkaobeideshixian.png)

需要程序员手动去分配内存

##### 图解

![qianshenj](C:/blog/my-blog/content/post/11-2025/11.08.2025/qianshenjkaobeitujie.png)

互有瑕疵

#### copy-on-writr

![copy-on-write](C:/blog/my-blog/content/post/11-2025/11.08.2025/copy-on-write.png)

###### 作业

![zuoye1](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye1.png)

1.浅拷贝，将对应的值和内存地址直接拷贝到对应的变量当中，也就是，两个指针指向同一个内存地址，共享这一个内存地址

深拷贝，在拷贝指针中分配新的内存，然后将被拷贝指针中的值拷贝到新地址，原指针的改动对拷贝后的指针无影响

2.浅拷贝对指针来说是两个指针指向同一个内存地址，如果原指针所在结构体运行完成后释放自己在堆上分配的内存，会导致拷贝后的指针变成野指针

3.c语言中默认是浅拷贝

4.拷贝时，先给拷贝指针分配一个内存，然后再对齐进行拷贝

5.写时拷贝，是一种利用"节点"的拷贝方式,多个指针指向一个节点，然后节点再指向一个内存地址，节点用于记录所指向的指针的个数，当还有指针指向的时候，避免释放内存导致其他指针变为野指针

另外，写实拷贝还能按某一指针需要修改内存地址中的数据并开辟一个新的地址来存放数据



## （4）：结构体应用

#### 结构体数组

结构体数组的初始化与遍历

结构体指针数组

 ##### 结构体做函数参数

传指针

传值

判断两个同学成绩

###### 作业

![zuoye2](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye2.png)

1.引用传参，c++中。c语言中指针的效率大于传值

2.链表待定

##  （5）：sizeof计算结构体长度

计算类型或者变量的长度，计算的是所占字节的长度

### 基本类型

![jibenleixing](C:/blog/my-blog/content/post/11-2025/11.08.2025/jibenleixing.png)

utf16编码，utf32编码

long ：win 都站4个字节，linux x64占8个字节

### 结构体对齐-自然对齐

![jiegoutizirnaduiqi](C:/blog/my-blog/content/post/11-2025/11.08.2025/jiegoutizirnaduiqi.png)

成员一样，位置不太一样

如果是基本成员，存放地点就必须是成员类型的整数倍

char，可以存放在任何地址，地址都是1的整数倍

short，0 2 4 6 8  

结构体中包含结构体，按照结构体中子成员中最大的基本类型的整数倍

最终结果成都必须为sizeof基本类型的整数倍，比如第一个a结构体，计算出来的结果如果是20，需要往后填充4个字节来满足必须要是基本类型double=8的整数倍，也就是24个字节

![ziranduiqi](C:/blog/my-blog/content/post/11-2025/11.08.2025/ziranduiqi.png)

一般从零地址开始存，这样计算存完即是结构体所占内存大小

作用，保证cpu在一个时钟周期内把这些数据拿到，提高存取效率

### pragma pack(n)

![pragma pack](C:/blog/my-blog/content/post/11-2025/11.08.2025/pragma pack.png)

pragma示例

![pragmashili](C:/blog/my-blog/content/post/11-2025/11.08.2025/pragmashili.png)

![jisuan](C:/blog/my-blog/content/post/11-2025/11.08.2025/jisuan.png)

定义结构对齐

![pragma pack1](C:/blog/my-blog/content/post/11-2025/11.08.2025/pragma pack1.png)

如果按照1字节对齐，那就不用空格，全部加起来即是字节大小 

### 栈空间对齐

![zhankongjianduiqi](C:/blog/my-blog/content/post/11-2025/11.08.2025/zhankongjianduiqi.png)

直接按4字节对齐

在print函数中float会扩充成double字节。

![zhankongjian](C:/blog/my-blog/content/post/11-2025/11.08.2025/zhankongjian.png)

x64平台填充

float有专门的寄存器，前四个参数存入寄存器，在栈上还会给这四个参数预留空间

![x64](C:/blog/my-blog/content/post/11-2025/11.08.2025/x64.png)

###### 作业

![zuoye3](C:/blog/my-blog/content/post/11-2025/11.08.2025/zuoye3.png)

 1.sizeof(s1)=8  short 两个字节，long 四个字节 ，long为4，需要为4的倍数，所以最后为8

sizeof(s2)= 24  char 1个字节， s1 有8个字节，long long  类有8个字节，结果17，因为要为8的倍数，所以为24

sizeof(s3)=   char 1个字节，short两个字节，long 4个字节，longlong  8个字节   16个字节



2.sizeof(double) = 8  sizeof (long) = 4 sizeof(char) = 1

sizeof(a) = 24   sizeof(b)=16
