---
title: 11-11 递归
description: 世事一场大梦，人生几度秋凉？
date: 2025-11-11
slug: 11-11
image: bj.jpg
categories:
    - c语言基础
---

# 第十九课-递归

## （1）：递归定义

![digui](C:/blog/my-blog/content/post/11-2025/11.09.2025/digui.png)

函数内部，直接或者间接的调用自身

递归首先需要有至少一个递归出口，即终止条件，不能无限调用自己

递归式，原问题划分成子问题，子问题解决性质一样，这样子问题解决之后原问题也会被解决

### 阶乘

![jiecheng](C:/blog/my-blog/content/post/11-2025/11.09.2025/jiecheng.png)

定义fact无符号数

满足n==0或==1，即一个递归出口

```
int fact(unsigned int n)
{
	if(n==0 || n==1)
	{
		return 1;
	}
	return n * fact(n-1);
}
```

### 斐波那契数列

![feibonaqishulie](C:/blog/my-blog/content/post/11-2025/11.09.2025/feibonaqishulie.png)

```
unsigned int feibo(unsigned int n)
{
	if(n==1 || n==2)
	{
		return 1;
	}
	return feibo(n-1)+feibo(n-2);
}

printf("feibo(6)=%d\n",feibo(6))
```

### 递归的优缺点

![youquedian](C:/blog/my-blog/content/post/11-2025/11.09.2025/youquedian.png)

###### 作业

![zuoye4](C:/blog/my-blog/content/post/11-2025/11.09.2025/zuoye4.png)

1. 两个，一个是递归的出口，二个是递归式，递归式需要满足符合原式的子式，并且能求解问题

2. 递归优点：简洁明了  缺点：效率较低，容易导致栈溢出

   迭代优点：效率高，  缺点：代码编写难度高

## （2）：递归的应用

![diguiyingyong](C:/blog/my-blog/content/post/11-2025/11.10.2025/diguiyingyong.png)

问题1

```
int mystrlen(const char* str)
{
	if (str == NULL || *str == '\0')
	{
		return 0;
	}
	return 1 + mystrlen(str + 1);

	//一句话计算出非空字符串的长度
	//(str==NULL || *str=='\0')?0:1+mystelen(str+1)
}
```

 问题2

```
void reverse_print(const char *str)
{
	if(str==NULL || *str=='\0')
	{
		return;
	}
	reverse_print(str+1);
	printf("%c",*str);
}
```

直接定义*指向内存地址是静态区不可更改，需要改成在栈上才可以更改

比如：

char *str=

char buf[] = 

问题3

```
void reverse_str(char *str,int len)
{
	if (str == NULL || *str == '\0' || len==0)
	{
		return 0;
	}

	reverse_str(str + 1,len-2);

	char tmp = *str;
	*str = *(str + len - 1);
	*(str + len -1)=tmp;

	return;
}
```

 ### 运用递归

![yunyongdigui](C:/blog/my-blog/content/post/11-2025/11.10.2025/yunyongdigui.png)

###### 作业

![zuoye1](C:/blog/my-blog/content/post/11-2025/11.10.2025/zuoye1.png)

1. 寻找解决问题的子式，也就是寻找一个式子能让递归一直嵌套下去直到嵌套到递归出口

2. 递归或者循环解决

   

   ```
   int fibonacci(int n) {
       if(n == 0) {
           return 0;
       } else if(n == 1) {
           return 1;
       } else {
           return fibonacci(n-1) + fibonacci(n-2);
       }
   }
   
   int main() {
       int n;
       printf("请输入一个整数：");
       scanf("%d", &n);
       printf("斐波那契数列的第%d项为：%d\n", n, fibonacci(n));
       return 0;
   }
   
   
   #include<stdio.h>
   
   // 斐波那契数列函数
   int fibonacci(int n) {
       if(n <= 1) {
           return n;
       }
       int a = 0, b = 1;
       for(int i = 2; i <= n; i++) {
           int temp = a + b;
           a = b;
           b = temp;
       }
       return b;
   }
   
   int main() {
       int n;
       printf("请输入一个整数：");
       scanf("%d", &n);
       printf("斐波那契数列的第%d项为：%d\n", n, fibonacci(n));
       return 0;
   }
   ```

   

   # 第二十课-文件

## （1）：文件概念

### 文件分类

![wenjianfenle](C:/blog/my-blog/content/post/11-2025/11.10.2025/wenjianfenlei.png)

 ### 文件系统

![wenjianxitong](C:/blog/my-blog/content/post/11-2025/11.10.2025/wenjianxitong.png)

### 文本文件与二进制文件

![wenbenwenjian](C:/blog/my-blog/content/post/11-2025/11.10.2025/wenbenwenjian.png)

字符编码



基于值编码

###### 作业

![zuoye2](C:/blog/my-blog/content/post/11-2025/11.10.2025/zuoye2.png)

1. 文本文件，基于字符编码的方式编写
2. 二进制文件，基于值编码的方式的文件 
3. 文件系统：管理，读写，调用一个文件的数据结构

FAT  ZFS





## （2）：文件创建、打开与读写

![wenjian](C:/blog/my-blog/content/post/11-2025/11.10.2025/wenjianchuangjian,dakaiyuguanbi.png)

```
fopen("newfile.txt","w,ccs=UTF-8");
第一个参数是路径，路径分为相对路径和绝对路径
第二个参数是文件的打开方式，
r 读   w  写    

文本方式打开，存在换行之间的转换

css 用来指定文件打开的编码

默认为ascii编码，可以通过读取文件头的形式来获取文本所用的编码方式
```

*记得关闭文件，否则会一直有程序或者进程占用文件使用*

fopen也是老函数，需要安全的调用，

fopen_s(&pfile)指针的值

~~~
_mkdir 创建文件夹的指令
<direct.h> 包含
~~~

### 代码演示

创建

```
 
#include <stdio.h>
#include <direct.h>

int create_file()
{
	char* path = "d:\\1111111111111\\mallocfree.txt";

	FILE *file = fopen(path, "w");
	if (file == NULL)
	{
		return -1;
	}
	fclose(file);
	return 0;
}

int main()
{
	create_file();

	return 0;
}
```

打开

```
 
int open_file()
{
	char* path = "d:\\111111111111\\mallocfree.txt";

	FILE* file = NULL;
	errno_t err = fopen_s(&file, path,"r");
	if (err != 0 || file == NULL)
	{
		return -1;
	}
	fclose(file);

	return 0;
}
```

创建文件夹

```
int create_dir()
{
	char* dirpath = "d:\\1111111111111\\mf\\";

	int res = _mkdir(dirpath);

	return res;
}
```

### 文件的读写

![duxie](C:/blog/my-blog/content/post/11-2025/11.10.2025/duxie.png)

buffer  数据    size  字节数   ntime  写入多少长度   fp  文件指针

```
#include <stdio.h>
#include <direct.h>
#include <windows.h>

void binaryio_demo()
{
	char* filepath = "d:\\1111111111111\\binary_io.txt";
	
	FILE* file = NULL;
	errno_t err = fopen_s(&file, filepath, "w");
	if (err != 0 || file == NULL)
	{
		return -1;
	}
	fwrite("hello world", strlen("hello world") + 1, 1, file);
	int date = 100;
	fwrite(&date, sizeof(date), 1, file);

	fclose(file);

	err = fopen_s(&file, filepath, "r");
	if (err != 0 || file == NULL)
	{
		return -1;
	}
	char buf[128] = { 0 };
	fread(buf, strlen("hello world") + 1, 1, file);
	

	int value = 0;
	fread(&value, sizeof(value), 1, file);
	printf("buf:%s,value:%d", buf,value);

	fclose(file);
}

int main()
{
	
	binaryio_demo();

	return 0;
}
```

### 文件的读写

#### 格式化输入输出

```
#include <stdio.h>
#include <direct.h>
#include <windows.h>

int format_io()
{
	char* filepath = "d:\\1111111111111\\format_io.txt";
	FILE *fp = NULL;
	errno_t err = fopen_s(&fp, filepath, "w");
	if (err != 0||fp == NULL)
	{
		return -1;
	}

	// int data = 100; 可以传入变量

	fprintf(fp,"%s %d","hello-world",100);
	fclose(fp);

	 err = fopen_s(&fp, filepath, "r");
	if (err != 0||fp == NULL)
	{
		return -1;
	}

	char buf[128] = { 0 };
	int value = 0;

	fscanf_s(fp, "%s%d", buf,128, &value);
	printf("format io:buf:%s,value:%d\n", buf, value);
	fclose(fp);
	return 0;
}
int main()
{
	format_io();
	return 0;
}

```

#### 字符输入输出

```
#include <stdio.h>
#include <direct.h>
#include <windows.h>

int char_io()
{
	char* str = "hello world";
	char* filepath = "d:\\11\\char_io.txt";

	FILE* fp = NULL;
	errno_t err = fopen_s(&fp, filepath, "w");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}

	while (*str != '\0')
	{
		fputc(*str, fp);
		str++;
	}
	fputc('\0', fp);
	fclose(fp);

	err = fopen_s(&fp, filepath, "r");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}
	while (!feof(fp))//判断是否到达文件末尾
	{
	char ch = fgetc(fp);
	printf("%c", ch);
	}
	printf("\n");
	fclose(fp);

	return 0;
}
int main()
{
	char_io();
	return 0;
}
```

#### 字符串输入输出

```
#include <stdio.h>
#include <direct.h>
#include <windows.h>

int str_io()
{
	char* data[4] =
	{
		"hello world\n",
		"hello beijing\n",
		"hello china\n",
		"hello dlrow\n"
	};

	char* filepath = "d:\\11\\str_io.txt";

	FILE* fp = NULL;
	errno_t err = fopen_s(&fp, filepath, "w");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}

	for (int i = 0; i < 4; i++)
	{
		fputs(data[i], fp);
	}
	fclose(fp);

	err = fopen_s(&fp, filepath, "r");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}

	while (!feof(fp))
	{
		char buf[128] = { 0 };
		fgets(buf, 128, fp);
		printf("str io:buf:%s", buf);
	}
	fclose(fp);

	return 0;
}
int main()
{
	str_io();

	return 0;
}
```

### fopen popen  fwrite write

![fopen](fopen.png)

读写缓存：调用io来写入磁盘非常消耗性能，而缓存就是将写入字节累计，到一定程度在写入磁盘

###### 作业

![zuoye](zuoye.png)

![pe](pe.png)

## （3）：文件其他相关操作

### 读写指针控制

![duxiezhizhenkongzhi](duxiezhizhenkongzhi.png)

读写指针，有一个指针在文件中移动，

从文件头开始移动，表示读和写的相应位置

rewind 移动到文件头

fseek  第二个参数是相对位置的偏移，第三个参数是某某位置    还有后续三张是个表格黑奴奥尔不过发选举过后

```
#include <stdio.h>
#include <direct.h>
#include <windows.h>
#include <string.h>

int seek_demo()
{

	char* filepath = "d:\\11\\see_demo.txt";

	FILE* fp = NULL;
	errno_t err = fopen_s(&fp, filepath, "w");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}

	fwrite("hello world", strlen("hello world") + 1, 1, fp);
	
	fseek(fp, -6, SEEK_CUR);

	fwrite("china", strlen("china") + 1, 1, fp);

	fclose(fp);
	
	err = fopen_s(&fp, filepath, "r");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}

	fseek(fp, 6, SEEK_SET);

	char buf[123] = { 0 };

	fread(buf, strlen("china") + 1, 1, fp);

	printf("buf:%s\n", buf);

	//fwrite("welcome world", strlen("welcome world") + 1, 1, fp);
	fclose(fp);

	return 0;
}
int main()
{
	seek_demo();

	return 0;
}
```



fseek 定位末尾

flen=ftell(fp) 读写偏移，返回值就是文件大小

```
#include <stdio.h>
#include <direct.h>
#include <windows.h>
#include <string.h>

int seek_demo()
{

	char* filepath = "d:\\11\\see_demo.txt";

	FILE* fp = NULL;
	errno_t err = fopen_s(&fp, filepath, "w");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}

	fwrite("hello world", strlen("hello world") + 1, 1, fp);
	
	fseek(fp, -6, SEEK_CUR);

	fwrite("china", strlen("china") + 1, 1, fp);

	fclose(fp);
	
	err = fopen_s(&fp, filepath, "r");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}

	fseek(fp, 6, SEEK_SET);

	char buf[123] = { 0 };

	fread(buf, strlen("china") + 1, 1, fp);

	printf("buf:%s\n", buf);

	//fwrite("welcome world", strlen("welcome world") + 1, 1, fp);
	fclose(fp);

	return 0;
}

long get_filesize(const char* filepath)
{
	if (filepath == NULL)
	{
		return 0;
	}
	FILE *fp = NULL;
	errno_t err = fopen_s(&fp, filepath, "r");

	if (err != 0 || fp == NULL)
	{
		return 0;
	}

	fseek(fp, 0, SEEK_END);

	long size = ftell(fp);

	fclose(fp);
}

int main()
{
	seek_demo();

	long size = get_filesize("d:\\11\\see_demo.txt");
	printf("size:%d", size);

	return 0;
}



```

### 文件重命名

```
int rename_demo()
{
	char* file1 = "d:\\11\\see_demo.txt";
	char* file2 = "d:\\11\\seek1_demo.txt";

	rename(file1, file2);

	return 0;
}


还可以重命名到其他目录里面去
不可以跨盘符重命名
```

### 文件删除

```

int remove_demo()
{
	char* filepath = "d:\\11\\see_demo.txt";
	int res = remove(filepath);
	return res;

}


```

删除不掉可能是因为进程被占用

###### 作业

![zuoye1](zuoye1.png)

1. remind()   (SEEK_CUR)     (SEEK_END)      (SEEK_SET)

2. ftell = flen   指针指向末尾在显示偏移量
3.  两次声明文件，一次原名字一个名字，然后调用rename    。。 删除指定文件之后调用remove
4. 与指向end的偏移值做对比，相等即是读到结束了

## （4）：结构体IO与优化

![jiegouti](jiegoutiwenjianduxiegengxin.png)

```
#include <stdio.h>
#include <direct.h>
#include <windows.h>
#include <string.h>

#define FILENAME "d:\\11\\student_data_base.dat"
#define MAXLEN 64

typedef struct _record
{
	char name[MAXLEN];
	int age;
}record,*precord;

int write_record(FILE* fp)
{


	while (1) 
	{
		record r = { 0 };

		printf("Please input the age:\n");
		scanf_s("%d", &r.age);
		if (r.age == 0)
		{
			break;
		}

		printf("Please input the name:\n");
		scanf_s("%s",r.name, MAXLEN);

		fwrite(&r, sizeof(r), 1, fp);
	}

	return 0;
}

int read_record(FILE* fp)
{
	while (!feof(fp))
	{
		record r = { 0 };
		int count = fread(&r, sizeof(r), 1, fp);
		if (count == 0)
		{
			break;
		}
		printf("age:%d,name:%s\n", r.age, r.name);
	}
	return 0;
}

int main()
{
	FILE* fp = NULL;
	errno_t err = fopen_s(&fp, FILENAME, "w");
	if (err != 0 || fp == NULL)
	{
		return -1;

	}

	write_record(fp);

	fclose(fp);

	err = fopen_s(&fp, FILENAME, "r");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}
	
	read_record(fp);

	fclose(fp);

	return 0;
}

```

![shili](shili.png)

如图，存放年龄和名字之后，还有大量的空间被无意义的数据占用



优化：

在名字前面存放每一个名字的字节数

```
#include <stdio.h>
#include <direct.h>
#include <windows.h>
#include <string.h>

#define FILENAME "d:\\11\\student_data_base.dat"
#define MAXLEN 64

typedef struct _record
{
	char name[MAXLEN];
	int age;
}record,*precord;




int optwrite_record(FILE* fp)
{
	while (1)
	{
		record r = { 0 };
		printf("Please input rhe age:\n");
		scanf_s("%d", &r.age);
		if (r.age == 0)
		{
			break;
		}

		printf("Please input the name:\n");
		scanf_s("%s", r.name, MAXLEN);

		int len = strlen(r.name);
		fwrite(&len, sizeof(len), 1, fp);
		fwrite(r.name, len, 1, fp);
		fwrite(&r.age, sizeof(r.age), 1, fp);

	}

	return 0;
}

int optread_record(FILE *fp)
{
	while (!feof(fp))
	{
		record r = { 0 };
		int len = 0;

		int count = fread(&len, sizeof(len), 1, fp);
		if (count == 0)
		{
			break;
		}
		fread(r.name, len, 1, fp);
		fread(&r.age, sizeof(r.age), 1, fp);
		printf("age:%d,name:%s\n", r.age, r.name);
	}


	return 0;
}



int main()
{
	FILE* fp = NULL;
	errno_t err = fopen_s(&fp, FILENAME, "w");
	if (err != 0 || fp == NULL)
	{
		return -1;

	}

	optwrite_record(fp);

	fclose(fp);

	err = fopen_s(&fp, FILENAME, "r");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}
	
	optread_record(fp);

	fclose(fp);

	return 0;
}
```

![shili1](shili1.png)

查询在数据库里人名

```
int optquery_record(FILE* fp)
{
	char name[MAXLEN] = { 0 };
	printf("Please input the name :\n");
	scanf_s("%s", name, MAXLEN);

	bool bFind = false;

	while (!feof(fp))
	{
		record r = { 0 };
		int len = 0;

		int count = fread(&len, sizeof(len), 1, fp);
		if (count == 0)
		{
			break;
		}
		fread(r.name, len, 1, fp);
		fread(&r.age, sizeof(r.age), 1, fp);
		
		if(strcmp(r.name,name)==0)
		{
			printf("found it,age:%d,name:%s\n", r.age, r.name);

			bFind = true;
			break;

		}

	}
	if (!bFind)
	{
		printf("nor found\n");
	}

}

```

此处报错，可能是进行比较时没有清零，未匹配上

问题：在第一次record时文件指针移动到文件末尾，而后续指针调用实际上无法再进行遍历

修改后代码:

```
#include <stdio.h>
#include <direct.h>
#include <windows.h>
#include <string.h>
#include <stdbool.h>

#define FILENAME "d:\\11\\student_data_base.dat"
#define MAXLEN 64

typedef struct _record
{
	char name[MAXLEN];
	int age;
}record,*precord;




int optwrite_record(FILE* fp)
{
	while (1)
	{
		record r = { 0 };
		printf("Please input rhe age:\n");
		scanf_s("%d", &r.age);
		if (r.age == 0)
		{
			break;
		}

		printf("Please input the name:\n");
		scanf_s("%s", r.name, MAXLEN);

		int len = strlen(r.name);
		fwrite(&len, sizeof(len), 1, fp);
		fwrite(r.name, len, 1, fp);
		fwrite(&r.age, sizeof(r.age), 1, fp);

	}

	return 0;
}

int optread_record(FILE *fp)
{
	while (!feof(fp))
	{
		record r = { 0 };
		int len = 0;

		int count = fread(&len, sizeof(len), 1, fp);
		if (count == 0)
		{
			break;
		}
		fread(r.name, len, 1, fp);
		fread(&r.age, sizeof(r.age), 1, fp);
		printf("age:%d,name:%s\n", r.age, r.name);
	}


	return 0;
}

int optquery_record(FILE* fp)
{
	char name[MAXLEN] = { 0 };
	printf("Please input the name :\n");
	scanf_s("%s", name, MAXLEN);

	bool bFind = false;

	rewind(fp);

	while (!feof(fp))
	{
		record r = { 0 };
		int len = 0;

		memset(&r, 0, sizeof(r));

		int count = fread(&len, sizeof(len), 1, fp);
		if (count == 0)
		{
			break;
		}
		fread(r.name, len, 1, fp);
		fread(&r.age, sizeof(r.age), 1, fp);
		
		if(strcmp(r.name,name)==0)
		{
			printf("found it,age:%d,name:%s\n", r.age, r.name);

			bFind = true;
			break;

		}

	}
	if (!bFind)
	{
		printf("nor found\n");
	}

	return 0;
}










int main()
{
	FILE* fp = NULL;
	errno_t err = fopen_s(&fp, FILENAME, "w");
	if (err != 0 || fp == NULL)
	{
		return -1;

	}

	optwrite_record(fp);

	fclose(fp);

	err = fopen_s(&fp, FILENAME, "r");
	if (err != 0 || fp == NULL)
	{
		return -1;
	}
	
	optread_record(fp);

	optquery_record(fp);

	fclose(fp);

	return 0;
}



```

删除：

找到这一条记录，将后面的记录重新覆盖前一条数据

更新：

1.更新年龄，更改覆盖

2.更改名字，名字长度更改，会破坏储存数据。只能够使用临时文件，拷贝之前的文件，然后写入，再拷贝之后的文件，在删除源文件

###### 作业

![zuoye3](zuoye3.png)









































