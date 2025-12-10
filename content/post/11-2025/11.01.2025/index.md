---
title: 11-01 自己实现字符串api
description: 小轩窗，正梳妆，相顾无言，惟有泪千行...
date: 2025-11-01
slug: 11-01
image: bj.jpg
categories:
    - c语言基础
---

## (4):自己实现字符串api

![caozuo](caozuo.png)

```
#include <stdio.h>
#include <string.h>
#include <assert.h>

size_t mystrlen(const char* str)//const 表示函数内部不会修改str的值
{
    size_t count = 0;

    if (str == NULL)
        return 0;//如果是指针，判断是否为0

    while (*str != '\0')
    {
        count++;
        str++;
    }

    return count;
}

size_t mystrlen2(const char* str)
{
    const char* eos = str;
    while (*eos++);

    return (size_t)(eos - str - 1);//eos末尾，str开头，相减是元素个数包含0字符，-1是非零字符的个数
}

//递归  str==NULL || *str=='\0'   return 0;
//1+mystrlen2(str+1)  递归出口

size_t mystrlen3(const char* str)
{
    if (str == NULL || *str == '\0')
        return 0;
    return 1 + mystrlen3(str + 1);//递归式,子串加一
}

size_t mystrlen4(const char* str)
{
    return str == NULL || *str == '\0' ? 0 : 1 + mystrlen4(str + 1);
}
//字符串拷贝函数
char* mystrcpy(char* dst, const char* src)
{ 
    if (dst == NULL || src==NULL)
    {
        return NULL;
    }

    char* s = dst;

    while (*s++ = *src++);//依然会引起缓存区报错

    //*s = '\0'; 

    return dst;
}

int mystrcmp(const char* s1, const char* s2)
{
 //   if (s1 == NULL || s2 == NULL)
 //  {
 //       return 0;
 //   }
    assert(s1 != NULL && s2 != NULL);//要求括号里面必须为真，如果其中应该为none，那么括号就是假

    while (*s1 && *s2 && (*s1 == *s2))
    {
        s1++;
        s2++;

    }
    return *s1 - *s2;
}

int main()
{
    char str[] = "hello world";
    char buf[128] = { 0 };

    printf("strlen:%lld\n", strlen(str));
    printf("mystrlen:%lld\n", mystrlen(str));
    printf("mystrlen2:%lld\n", mystrlen2(str));
    printf("mystrlen3:%lld\n", mystrlen3(str));
    printf("mystrlen4:%lld\n", mystrlen4(str));

    mystrcpy(buf, str);

    printf("buf: % s\n", mystrcpy(buf, str));

    char* s1 = "hello world";
    char* s2 = "hello world";

    if (mystrcmp(s1, s2) == 0)
    {
        printf("%s==%s\n", s1, s2);
    }
    else
    {
        printf("%s != %s\n",s1,s2);
    }

    return 0;
}

```

循环效率大于递归，递归，函数在自己调用自己的过程中涉及到入栈和出栈

递归嵌套太深可能会导致栈溢出，但是递归代码更加简洁，需要保证防止栈溢出

应用层的栈较大可以使用递归，内核层严禁使用递归

**防止程序崩溃，在定义函数之前应对设定值进行严格的校验**

##### 作业

![zuoye1](zuoye1.png)

1.

```
char* rav_strtok(char* strToken, const char* strDelimit) {

    //定义局部变量
    static char* text = NULL;
    unsigned char table[32];
    const unsigned char* delimit;
    unsigned char* str;
    char *head;

    //更新静态字符串
    if (strToken) text = strToken;

    //对不合法输入进行特殊判断
    if (text == NULL) return NULL;
    if (strDelimit == NULL) return text;

    //改变 char 为 unsigned char 以便进行位运算
    str = (unsigned char*)text;
    delimit = (const unsigned char*)strDelimit;

    //初始化位表
    for (int i = 0; i < 32; i++) table[i] = 0;
    for (; *delimit; delimit++) {
        table[*delimit >> 3] |= 1 << (*delimit & 7);
    }

    // 跳过分隔符直到起始位置
    while (*str && (table[*str >> 3] & (1 << (*str & 7)))) str++;
    head = (char*)str;

    // 找到第一个分隔符
    for (; *str; str++) {
        if (table[*str >> 3] & (1 << (*str & 7))) {
            *str++ = '\0';
            break;
        }
    }

    // 更新结果
    text = (char*)str;
    if (*text == '\0') text = NULL;
    return head;
}
```

2.

```
atoi:
#include<stdio.h>
#include<stdlib.h>
#include<ctype.h>
int myAtoi(const char * str)
{
	//判断是否是NULL指针或空白字符串
	if (str == NULL)
		return 0;
	if (str == '\0')
		return 0;
	//过滤空白字符
	while (isspace(*str))
	{
		str++;
	}
	//使用标志flag来判断数字正负
	int flag = 1;
	if (*str == '+')
	{
		flag = 1;
		str++;
	}
	else if (*str == '-')
	{
		flag = -1;
		str++;
	}
	//由于字符串里的数字可能大于int类型的最大值，所以使用long long类型变量记录数据
	long long ret = 0;
	while (*str != '\0')
	{
		//如果是10进制数据
		if (isdigit(*str))
		{
			ret = ret * 10 + (*str - '0') * flag;
			str++;
			if (ret > INT_MAX)
				ret = INT_MAX;
			if (ret < INT_MIN)
				ret = INT_MIN;
		}
		//如果不是10进制数据
		else
		{
			//由于atoi函数返回值为int类型，而刚才定义的变量是long long类型，所以要进行转换
			return (int)ret;
		}
	}
	return (int)ret;
}
```

2.

```
char* my_itoa(int value, char* str, int base)
{
	if (base < 2 || base > 32)
	{
		printf("Wrong radix!\n");
		return str;
	}
	char* ret = str;
	if (value == 0)
	{
		*str++ = '0';
		*str = '\0';
		return ret;
	}
	if (base == 10 && value < 0)
	{
		value = -value;
		*str++ = '-';
	}
	char* start = str;
	// 从右到左依次将数字的每一位存储起来
	size_t num = value;
	while (num != 0)
	{
		if (num % base < 10)
		{
			*str++ = '0' + (char)(num % base);
		}
		else
		{
			*str++ = 'a' + (char)(num % base - 10);
		}
		num /= base;
	}
	*str = '\0';
	// 倒置字符串
	for (char* left = start, *right = str - 1; left < right; left++, right--)
	{
		char tmp = *left;
		*left = *right;
		*right = tmp;
	}
	return ret;
}
```

3.

```
#include <stdio.h>
#include <string.h>
#include <assert.h>

char* my_strstr(const char* str1, const char* str2)
{
	const char* cur = str1;  //用cur用来记录当前的位置
	const char* s1 = NULL;   //通过s1 和 s2 比较元素
	const char* s2 = NULL;
	assert(str1 && str2);    //assert断言，如果传入的地址有有一个会空指针，则直接返回str1的地址
	if (str2 == '\0')
		return (char*)str1;
	while (*cur)   //当cur中的值不为'\0'时，进入循环
	{
		s1 = cur;   //s1回到比较时的位置
		s2 = str2;  //s2回到初始位置
		while (*s1 && *s2 && *s1 == *s2) //当s1和s2指向的值相等时，进入循环
		{
			s1++;  //找到下一个元素
			s2++;  //找到下一个元素
			//再次比较
		}
		if (*s2 == '\0')  //当s2中的元素为'\0'时，则说明在str1中找到了str2
			return (char*)cur; //返回当前的位置
		cur++; //第一次没找到，找到下一个元素重新寻找
	}
	return NULL; //如果在循环中没有找到，则返回一个空指针
}

int main()
{
	char arr1[] = "abcadefdef";
	char arr2[] = "def";
	char* ret = my_strstr(arr1, arr2);
	if (ret != NULL)
	{
		printf("%s\n", ret);
	}
	else
	{
		printf("找不到\n");
	}
	return 0;
}
```



