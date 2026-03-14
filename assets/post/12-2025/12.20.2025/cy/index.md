---
title: 12-20 凯撒加密
description: 喜欢要互相才作数，遗憾也是
date: 2025-12-20
slug: 12-20-2025-jiami
image: bj.jpg
categories:
  - 加密算法
---

1

# 凯撒密码

一种经典的替换加密技术，将字母按字母表的顺序向前或者向后移动固定的位数来加密信息。

~~~
#include <stdio.h>
#include <string.h>

int main()
{
	char passwd[100], encrypted[100];
	int i, j, k, t, move, tmp;
	printf("加密选择1，解密选择2：");
	scanf("%d", &tmp);
	if (tmp == 1) {
		printf("输入原文:");
		scanf("%s", &passwd);
		printf("自定义密匙(1-25):");
		scanf("%d", &move);
		for (i = 0; i < strlen(passwd); i++)
		{
			if (passwd[i] >= 'A' && passwd[i] <= 'Z')
			{
				passwd[i] = ((passwd[i] - 'A') + move) % 26 + 'A';
			}
			else if (passwd[i] >= 'a' && passwd[i] <= 'z')
			{
				passwd[i] = ((passwd[i] - 'a') + move) % 26 + 'a';
			}
		}
		printf("加密后的密文");
		printf("%s\n", passwd);
	}
	else {
		printf("输入密文:");
		scanf("%s", &passwd);
		printf("密匙为(1-25):");
		scanf("%d", &move);
		for (i = 0; i < strlen(passwd); i++)
		{
			if (passwd[i] >= 'A' && passwd[i] <= 'Z')
			{
				passwd[i] = ((passwd[i] - 'A') + 26 - move) % 26 + 'A';
			}
			else if (passwd[i] >= 'a' && passwd[i] <= 'z')
			{
				passwd[i] = ((passwd[i] - 'a') + 26 - move) % 26 + 'a';
			}
		}
		printf("解密后的原文");
		printf("%s\n", passwd);
	}
	return 0;
}

~~~



# 变种

## ROT13

特殊变种，偏移量为13，属于f函数对称加密，加密和解密过程相同。

回转13位，将明文中的每个字母都向后移动13位

## ASCII码变种

一般的凯撒密码只加密字母，二ascii码可以将数字和其他字符根据ascii精选偏移，实现更复杂的加密

~~~
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MIN_ASCII 32    // 空格
#define MAX_ASCII 126   // ~
#define RANGE (MAX_ASCII - MIN_ASCII + 1)  // 可打印字符范围

// 加密函数
void caesar_encrypt(char *text, int shift) {
    // 确保移位在合理范围内
    shift = shift % RANGE;
    if (shift < 0) {
        shift += RANGE;  // 处理负移位
    }
    
    for (int i = 0; text[i] != '\0'; i++) {
        // 只加密可打印ASCII字符
        if (text[i] >= MIN_ASCII && text[i] <= MAX_ASCII) {
            // 计算新字符位置
            int original = text[i] - MIN_ASCII;
            int encrypted = (original + shift) % RANGE;
            text[i] = encrypted + MIN_ASCII;
        }
        // 非可打印字符保持不变
    }
}

// 解密函数
void caesar_decrypt(char *text, int shift) {
    // 解密是加密的逆操作
    caesar_encrypt(text, -shift);
}
~~~



## 变异凯撒密码

基础：采用逐字符增加的偏移量

 ```
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

// 基础变异凯撒：移位值随位置递增
void variant_caesar_encrypt(char *text, int base_shift) {
    int position = 0;
    
    for (int i = 0; text[i] != '\0'; i++) {
        if (isalpha(text[i])) {
            // 计算当前字符的移位值
            int shift = base_shift + position;
            
            char base = isupper(text[i]) ? 'A' : 'a';
            int offset = text[i] - base;
            
            // 应用移位（对26取模）
            offset = (offset + shift) % 26;
            if (offset < 0) offset += 26;
            
            text[i] = base + offset;
            position++;  // 位置递增
        }
        // 非字母字符保持原样，但位置也递增（可选）
        // else { position++; }
    }
}

void variant_caesar_decrypt(char *text, int base_shift) {
    int position = 0;
    
    for (int i = 0; text[i] != '\0'; i++) {
        if (isalpha(text[i])) {
            int shift = base_shift + position;
            
            char base = isupper(text[i]) ? 'A' : 'a';
            int offset = text[i] - base;
            
            offset = (offset - shift) % 26;
            if (offset < 0) offset += 26;
            
            text[i] = base + offset;
            position++;
        }
    }
}
 ```

## 2. 基于斐波那契数列的变异凯撒

```
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

// 生成斐波那契数列移位值
void generate_fibonacci_shifts(int *shifts, int length, int start1, int start2) {
    if (length >= 1) shifts[0] = start1;
    if (length >= 2) shifts[1] = start2;
    
    for (int i = 2; i < length; i++) {
        shifts[i] = shifts[i-1] + shifts[i-2];
    }
    
    // 对26取模，确保在字母范围内
    for (int i = 0; i < length; i++) {
        shifts[i] = shifts[i] % 26;
        if (shifts[i] < 0) shifts[i] += 26;
    }
}

void fibonacci_caesar_encrypt(char *text, int fib1, int fib2) {
    int len = strlen(text);
    int *shifts = (int*)malloc(len * sizeof(int));
    
    generate_fibonacci_shifts(shifts, len, fib1, fib2);
    
    for (int i = 0; i < len; i++) {
        if (isalpha(text[i])) {
            char base = isupper(text[i]) ? 'A' : 'a';
            int offset = text[i] - base;
            
            offset = (offset + shifts[i]) % 26;
            text[i] = base + offset;
        }
    }
    
    free(shifts);
}

void fibonacci_caesar_decrypt(char *text, int fib1, int fib2) {
    int len = strlen(text);
    int *shifts = (int*)malloc(len * sizeof(int));
    
    generate_fibonacci_shifts(shifts, len, fib1, fib2);
    
    for (int i = 0; i < len; i++) {
        if (isalpha(text[i])) {
            char base = isupper(text[i]) ? 'A' : 'a';
            int offset = text[i] - base;
            
            offset = (offset - shifts[i]) % 26;
            if (offset < 0) offset += 26;
            
            text[i] = base + offset;
        }
    }
    
    free(shifts);
}
```

## 3. 基于密钥的变异凯撒

```
#include <stdio.h>
#include <string.h>
#include <ctype.h>

// 使用密钥生成移位序列
void key_based_caesar_encrypt(char *text, const char *key) {
    int key_len = strlen(key);
    int key_index = 0;
    
    for (int i = 0; text[i] != '\0'; i++) {
        if (isalpha(text[i])) {
            // 从密钥字符计算移位值
            int shift;
            if (isupper(key[key_index])) {
                shift = key[key_index] - 'A';
            } else {
                shift = key[key_index] - 'a';
            }
            
            char base = isupper(text[i]) ? 'A' : 'a';
            int offset = text[i] - base;
            
            offset = (offset + shift) % 26;
            text[i] = base + offset;
            
            // 移动密钥索引
            key_index = (key_index + 1) % key_len;
        }
    }
}

void key_based_caesar_decrypt(char *text, const char *key) {
    int key_len = strlen(key);
    int key_index = 0;
    
    for (int i = 0; text[i] != '\0'; i++) {
        if (isalpha(text[i])) {
            int shift;
            if (isupper(key[key_index])) {
                shift = key[key_index] - 'A';
            } else {
                shift = key[key_index] - 'a';
            }
            
            char base = isupper(text[i]) ? 'A' : 'a';
            int offset = text[i] - base;
            
            offset = (offset - shift) % 26;
            if (offset < 0) offset += 26;
            
            text[i] = base + offset;
            
            key_index = (key_index + 1) % key_len;
        }
    }
}
```
