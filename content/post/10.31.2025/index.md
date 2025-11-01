---
title: 10-31 笔记
description: 愿你有一天能与你重要的人相遇
date: 2025-10-31
slug: 10-31
image: bj.jpg
categories:
    - 每日
---







作业：

```
思路：
for循环从右往左遍历函数然后存入新的字符串中再拷贝

#include <stdio.h>

void reverse_str(char *str)
{
	while (*str != '\0')
	{
		str++;
		int x = str;
	}

	for (int i = str; i >= 0; i--)
	{
		char str2[] = "0";
		for (int j = 0; j < str; j++)
		{
			str2[j] = str[i];
		}
		
		return 0;
	}
}

int main()
{
	char str[] = "hello world";
    reverse_str(*str);

	printf("%s",reverse_str(*str));

	return 0;
}

问题：
1.主函数中，调用函数之后，怎么将函数返回值导入变量中
2.void是什么语法，” 不允许使用不完整的类型 "void" “ 什么叫做不完整，输入void也报错

网络：
#include <stdio.h>

void Reverse(char* str)
{
    char* left = str;//left指向字符串数组的首元素
    char* right = str + strlen(str) - 1;//right指向字符串的最后一个元素
    while (left < right)//进行首元素和尾元素的交换，直至left等于right为止，此时字符串完成1逆置
    {
        char temp = *left;
        *left = *right;
        *right = temp;
        ++left;
        --right;
    }
}


int main()
{
    char str[10000]="hello world";

    Reverse(str);

    printf("%s", str);

    return 0;
}
使用指针首位互换，在指针互相相遇后停止

```





