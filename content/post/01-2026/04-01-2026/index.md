---
title: Blowfish
description: 
date: 2026-01-04
slug: 01-04-2026
image: bj.jpg
categories:
  - 加密算法
---

## 算法简介

blowfish基于feistel网络结构，属于一种分组加密算法，分组大小为64位，密钥长度可变（32-448位）

主要通过将可变长度的密钥拓展为多个子密钥对数据进行加密

Blowfish算法的加密过程包括16轮Feistel网络运算，每轮使用一个子密钥。

## 加密原理

### 密钥拓展

将提供的可变长度密钥拓展为18个32位的子密钥（p数组）和4个256位的s盒。

1. 初始化P数组和S盒。
2. 将用户提供的密钥与P数组进行异或操作。
3. 使用Blowfish算法加密全零数据块，更新P数组和S盒。

### 数据加密

16轮feistel网络运算，每轮使用一个子密钥

1. 将64位数据块分为两个32位的部分（L和R）。
2. 对L和R进行16轮Feistel网络运算。
3. 交换L和R，并输出加密结果。

### 加密过程

拆分明文：将 64 位明文分为左 32 位（L）和右 32 位（R）。

16 轮迭代：
对 L 和 R 进行 16 轮处理，每轮操作如下（i 从 0 到 15）：

* L = L XOR P[i]
* R = R XOR F(L)
* 交换 L 和 R（最后一轮不交换）
* 其中，F 函数是 Blowfish 的核心非线性组件。
  最终处理：
* 迭代结束后，L = L XOR P [16]，R = R XOR P [17]，拼接 L 和 R 得到 64 位密文。

#### F函数

F 函数是 Blowfish 的非线性变换核心，输入 32 位数据，输出 32 位结果，步骤如下：

将 32 位输入拆分为 4 个 8 位字节（b0, b1, b2, b3），每个字节范围 0-255。
分别查询 4 个 S 盒：S0 [b0]、S1 [b1]、S2 [b2]、S3 [b3]（每个 S 盒返回 32 位值）。
将 4 个 S 盒的输出相加（模 2^32），结果即为 F 函数的输出。
公式：F(x) = (S0[b0] + S1[b1] + S2[b2] + S3[b3]) mod 2^32

## 解密过程

解密与加密流程几乎相同，唯一区别是**子密钥使用顺序相反**：
加密时使用子密钥顺序为 P [0] 至 P [17]，解密时使用顺序为 P [17] 至 P [0]。
这是因为 Blowfish 的迭代结构对称，反向使用子密钥即可完成解密。

示例：

加密

```
void Feistel(uint32_t* left, uint32_t* right) {
	uint32_t temp, f;
	int i;

	*left ^= p_box[0];

	for (i = 1; i <= 16; i++) {
		temp = *left;
		uint8_t a = (*left >> 24) & 0xFF;
		uint8_t b = (*left >> 16) & 0xFF;
		uint8_t c = (*left >> 8) & 0xFF;
		uint8_t d = *left & 0xFF;

		f = (s_box[3][d] + s_box[2][c]) ^ (s_box[1][b] + s_box[0][a]);
		*left = f ^ *right;
		*right = temp;
	}

	*right ^= p_box[17];
	temp = *left;
	*left = *right;
	*right = temp;
}
```

 解密

```
void DeFeistel(uint32_t* left, uint32_t* right)
{
	uint32_t temp, f;

	temp = *left;
	*left = *right;
	*right = temp;

	*right ^= p_box[17];

	for (int i = 16; i >= 1; i--) {
		temp = *right;

		uint8_t a = (*right >> 24) & 0xFF;
		uint8_t b = (*right >> 16) & 0xFF;
		uint8_t c = (*right >> 8) & 0xFF;
		uint8_t d = *right & 0xFF;

		f = (s_box[3][d] + s_box[2][c]) ^
			(s_box[1][b] + s_box[0][a]);

		*right = *left ^ f;
		*left = temp;
	}

	*left ^= p_box[0];
}

```

主要解密在`子密钥逆向使用`和`异或对调`

## 算法模式

Blowfish支持多种加密模式，常见的模式有：

ECB（Electronic Codebook）模式：将数据分成固定大小的块，每个块独立加密。ECB模式简单，但安全性较低，容易受到重放攻击。
CBC（Cipher Block Chaining）模式：每个数据块与前一个加密块进行异或操作后再加密，提高了安全性。CBC模式需要初始化向量（IV）。
CFB（Cipher Feedback）模式：将前一个密文块作为输入，生成密钥流，与明文进行异或操作。CFB模式可以实现流加密。
OFB（Output Feedback）模式：与CFB类似，但生成的密钥流与明文无关，适合在不可靠的信道上传输。
CTR（Counter）模式：使用计数器生成密钥流，与明文进行异或操作。CTR模式可以实现并行加密。
