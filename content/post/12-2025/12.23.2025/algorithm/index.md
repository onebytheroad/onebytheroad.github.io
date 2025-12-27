---
title: 12-23 RSA
description: 从我们相遇那一刻起，你是我白天黑夜不落的星
date: 2025-12-23
slug: 12-23-2025-algor
image: bj.jpg
categories:
  - 加密算法
---

# RSA 算法

公钥加密算法，非对称算法，加密和解密使用不同密钥的一种加密方法

  RSA公钥加密算法是1977年由罗纳德·李维斯特（Ron Rivest）、阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）一起提出的。1987年首次公布，当时他们三人都在麻省理工学院工作。RSA就是他们三人姓氏开头字母拼在一起组成的。
     RSA是目前最有影响力的公钥加密算法，它能够抵抗到目前为止已知的绝大多数密码攻击，已被ISO推荐为公钥数据加密标准。
今天只有短的RSA钥匙才可能被强力方式解破。到2008年为止，世界上还没有任何可靠的攻击RSA算法的方式。只要其钥匙的长度足够长，用RSA加密的信息实际上是不能被解破的。

# 加密原理

RSA算法基于一个十分简单的数论事实：将两个大质数相乘十分容易，但是想要对其乘积进行因式分解却极其困难，因此可以将乘积公开作为加密密钥。

1.选择两个大质数`p` 和`q`,通常在1024比特位以上

2.计算 `n = p * q `

3.计算欧拉函数` φ(n) = (p-1) × (q-1) `

4.选择一个整数 e 满足 `1 < e < φ(n)` 和 `e 与 φ(n) 互质`

5.计算私钥 d   满足` d × e ≡ 1 (mod φ(n))`

## 加密

```
密文 C = M^e mod n
其中 M 是明文（需转换为整数，且 0 ≤ M < n）
```

## 解密

```
明文 M = C^d mod n
```

## 示例

```
p = 61, q = 53
n = 61 × 53 = 3233
φ(n) = (61-1) × (53-1) = 60 × 52 = 3120
选择 e = 17
计算 d = 2753（因为 17 × 2753 ≡ 1 mod 3120）

公钥: (3233, 17)
私钥: (3233, 2753)

加密: 假设 M = 65
C = 65¹⁷ mod 3233 = 2790

解密: M = 2790²⁷⁵³ mod 3233 = 65
```



## 补充

1. 欧拉函数（Euler's totient function），也称为φ函数，描述了小于某个正整数n且与n互质的正整数的个数。具体计算方法根据n的素因数分解进行推导，例如对于质数p，φ(p) = p - 1，对于两个互质的质数p和q，φ(pq) = (p - 1)(q - 1)。



# 解题

## PEM 文件

PEM 文件只是 Base64 编码的 DER 格式（基于ASN.1 编码标准）。

- 公钥 PEM：`-----BEGIN PUBLIC KEY-----` 开头
- 私钥 PEM：`-----BEGIN RSA PRIVATE KEY-----` 或 `-----BEGIN PRIVATE KEY-----`
- 密文也可能用 PEM 包装（如 `-----BEGIN CIPHERTEXT-----`）

**步骤**：

1. 去掉首尾标记行
2. 去掉换行符
3. Base64 解码得到二进制 DER 数据

## 2. **解析 ASN.1/DER 格式**

这是最复杂的部分，但 RSA 密钥的结构相对固定。

### **公钥解析**

结构：

```
SEQUENCE {
  SEQUENCE {           # AlgorithmIdentifier
    OID 1.2.840.113549.1.1.1 (rsaEncryption)
    NULL
  }
  BIT STRING {         # 实际公钥数据
    SEQUENCE {
      INTEGER n        # 模数
      INTEGER e        # 公钥指数
    }
  }
}
```

你需要：

1. 按 TLV（Type-Length-Value）解析 DER
2. 提取 n 和 e

------

## 3. **分解 n（关键步骤）**

如果 n 很小（比如 < 512 位），可以在本地分解。

### **简单分解算法（适用于小的 n）**

```
def factorize_small_n(n):
    """试除法分解"""
    i = 2
    factors = []
    # 只检查到 sqrt(n)
    while i * i <= n:
        if n % i == 0:
            factors.append(i)
            n //= i
        else:
            i += 1 if i == 2 else 2  # 跳过偶数
    if n > 1:
        factors.append(n)
    return factors

# 对于更大的 n，需要更高级的算法（Pollard's rho）
def pollard_rho(n):
    if n % 2 == 0:
        return 2
    x = 2; y = 2; d = 1
    f = lambda z: (z*z + 1) % n
    while d == 1:
        x = f(x)
        y = f(f(y))
        d = math.gcd(abs(x - y), n)
    return d if d != n else None
```

## 4. **计算私钥参数**

```
from math import gcd

def compute_private_key(p, q, e):
    n = p * q
    phi = (p-1) * (q-1)
    # 计算模逆（扩展欧几里得算法）
    def modinv(a, m):
        def egcd(a, b):
            if b == 0:
                return (1, 0, a)
            x, y, g = egcd(b, a % b)
            return (y, x - (a // b) * y, g)
        x, y, g = egcd(a, m)
        if g != 1:
            raise Exception('Modular inverse does not exist')
        return x % m
    
    d = modinv(e, phi)
    return {'n': n, 'e': e, 'd': d, 'p': p, 'q': q}
```

## 5. **解密 RSA 密文**

假设密文是整数 c*c*（可能需要先 Base64 解码，然后转整数）：

```
def decrypt_rsa(c, d, n):
    # c: 密文整数
    # 返回：明文整数 m
    m = pow(c, d, n)
    return m

# 如果密文是字节或 Base64
ciphertext_b64 = "..."  # 你的密文
ciphertext_bytes = base64.b64decode(ciphertext_b64)
c = int.from_bytes(ciphertext_bytes, 'big')
m = decrypt_rsa(c, d, n)

# 将整数转回文本（如果原始是文本）
plaintext_bytes = m.to_bytes((m.bit_length() + 7) // 8, 'big')
plaintext = plaintext_bytes.decode('utf-8', errors='ignore')
```

## 6. **完整的解密流程**

1. **解析公钥 PEM** → 得到 n, e
2. **分解 n** → 得到 p, q
3. **计算私钥** → 得到 d
4. **解析密文**（可能是 Base64/PEM 格式）→ 得到整数 c
5. **解密**：m = c^d mod n
6. **将整数 m 转回字节/文本**

