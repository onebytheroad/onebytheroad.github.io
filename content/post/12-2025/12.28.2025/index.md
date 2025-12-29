---
title: 12-28 RC4
description: 
date: 2025-12-28
slug: 12-28-2025
image: bj.jpg
categories:
  - 加密算法
---

RC4算法

# 算法简介

RC4是对称加密算法中的序列密码（也成为流密码）通过生成伪随机密钥流域明文逐位异或实现加密

流密码也属于对称密码，但与分组加密算法不同的是，流密码不对明文数据进行分组，而是用密钥生成与明文一样长短的密码流对明文进行加密，加解密使用相同的密钥

**密钥长度可变**

# 加密原理

## 算法

包括**密钥调度算法KSA**和**伪随机子密码生成算法PRGA**两大部分(以密钥长度为256个字节为例)。

### 密钥调度算法（KSA）

KSA的作用是初始化一个256字节的状态数组（S-box），并根据密钥对其进行排列。

初始化S-box：

创建一个大小为256的字节数组 S，其中 S[i] = i，i 从0到255。
密钥调度：

使用密钥对 S-box 进行排列。假设密钥长度为 L 字节，密钥为 K[0], K[1], ..., K[L-1]。
初始化两个索引 i 和 j，初始值都为0。
对于每个 i 从0到255：
j = (j + S[i] + K[i mod L]) mod 256
交换 S[i] 和 S[j]

### 伪随机生成算法（PRGA）

PRGA的作用是生成一个与明文长度相同的伪随机密钥流。

初始化索引：

初始化两个索引 i 和 j，初始值都为0。

生成密钥流：

对于每个字节 n（从0到明文长度-1）：
i = (i + 1) mod 256
j = (j + S[i]) mod 256
交换 S[i] 和 S[j]
t = (S[i] + S[j]) mod 256
从 S-box 中取出 S[t]，作为伪随机密钥流的一个字节 K[n]

加密：将明文与生成的伪随机密钥流异或，得到密文

解密：将密文与相同的伪随机密钥流异或，恢复明文

### 代码实现

```

#include <stdio.h>
#include <string.h>
 
// 全局变量声明
int S[256];    // 状态数组
char *key;     // 密钥数组
int RAND[256]; // 随机密钥流
 
void KSA(char *key);           // 密钥调度算法
void PRGA();                   // 伪随机数生成算法
void Swap_State(int i, int j); // 状态交换算法
 
//
void Swap_State(int i, int j)
{
    int temp;
    temp = S[i];
    S[i] = S[j];
    S[i] = temp;
}
 
//
void KSA(char *key)
{
    int j;
    int keylength;
    int i;
 
    // 索引
    keylength = strlen(key);
    for (i = 0; i < 256; i++)
    {
        S[i] = i;
    }
 
    // 初始化状态数组
    j = 0;
    for (i = 0; i < 256; i++)
    {
        j = (j + S[i] + key[i % keylength]) % 256;
        Swap_State(i, j);
    }
}
 
//
void PRGA()
{
    // 初始化
    int i = 0;
    int j = 0;
    int number = 0;
    // 已经生成的随机字
    // 通过循环生成
    while (number < 256)
    {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        Swap_State(i, j);
        RAND[number] = S[(S[i] + S[j]) % 256];
        number++;
    }
}
 
 
int main()
{
    char *plaintext;
    unsigned int ciphertext[256];
    int i;
    int plaintext_length;
    plaintext = "hello, C.";
 
    key = "Key";
 
    plaintext_length = strlen(plaintext);
    KSA(key);
    PRGA();
    printf(" RC4 Experiment, April 12 2025, Lious_gcp. \n\n");
    for (i = 0; i < plaintext_length; i++)
    {
        ciphertext[i] = plaintext[i] ^ RAND[i];
        printf(" plaintext[ %i]=%c\t", i, plaintext[i]);
        printf(" ciphertext[ %i]=%x\n", i, ciphertext[i]);
    }
    return 0;
}
```





