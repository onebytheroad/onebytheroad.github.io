---
title: 12-14 TEA
description: 抓不住的东西太多了，所以要告诉自己没关系
date: 2025-12-14
slug: 12-14
image: bj.jpg
categories:
  - 加密算法
---

TEA两条基本魔改未写，两种升级版的魔改没写



# TEA算法，一种简单的分组密码算法

## 加密原理

### 1. 基本参数

- **分组大小**：64位（8字节）
- **密钥大小**：128位（16字节）
- **轮数建议**：32轮（标准）或更多
- **每轮操作**：使用加法、异或、移位等简单运算

### 2. 核心结构（Feistel网络）

TEA使用Feistel结构，将64位明文分为左右两部分各32位：

```
明文 P = (L₀, R₀)
每轮加密：Lᵢ₊₁ = Rᵢ
         Rᵢ₊₁ = Lᵢ + F(Rᵢ, Kᵢ)
```

### 3. 核心函数 F

```
F(M, K[]) = ((M << 4) + K[0]) ⊕ (M + Delta) ⊕ ((M >> 5) + K[1])
```

其中：

- `Delta` 是黄金比例常数：0x9E3779B9
- `K[]` 是每轮的子密钥（从主密钥派生）

### 4.加密示例

**第一轮前半部分：**

```
sum = 0 + 0x9E3779B9 = 0x9E3779B9

v0 += ((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >> 5) + k[1])

计算各项：
v1 << 4 = 0x89ABCDEF << 4 = 0x9ABCDEF0
(v1 << 4) + k[0] = 0x9ABCDEF0 + 0xA56BABCD = 0x14289C9D（只保留低32位）

v1 + sum = 0x89ABCDEF + 0x9E3779B9 = 0x27E347A8

v1 >> 5 = 0x89ABCDEF >> 5 = 0x0455E6F7
(v1 >> 5) + k[1] = 0x0455E6F7 + 0x00000000 = 0x0455E6F7

异或操作：
0x14289C9D ^ 0x27E347A8 = 0x35CBDB35
0x35CBDB35 ^ 0x0455E6F7 = 0x319E3DC2

v0 = 0x01234567 + 0x319E3DC2 = 0x32C18229
```

**第一轮后半部分：**

```
v1 += ((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >> 5) + k[3])

计算各项（使用更新后的v0=0x32C18229）：
v0 << 4 = 0x32C18229 << 4 = 0x2C182290
(v0 << 4) + k[2] = 0x2C182290 + 0xFFFFFFFF = 0x2C18228F

v0 + sum = 0x32C18229 + 0x9E3779B9 = 0xD0F8FBE2

v0 >> 5 = 0x32C18229 >> 5 = 0x01960C11
(v0 >> 5) + k[3] = 0x01960C11 + 0xABCD9876 = 0xAD63A487

异或操作：
0x2C18228F ^ 0xD0F8FBE2 = 0xFCE0D96D
0xFCE0D96D ^ 0xAD63A487 = 0x51837DEA

v1 = 0x89ABCDEF + 0x51837DEA = 0xDB2F4BD9
```

第一轮结束后：

```
v0 = 0x32C18229
v1 = 0xDB2F4BD9
sum = 0x9E3779B9
```

每轮sum增加delta，重复上述计算过程。



经过32轮加密后（实际计算需要编程完成，这里展示最终结果）：

```
v0 = 0x1268B5F9
v1 = 0x3E5A6F4C
```

```
密文 = 0x1268B5F9 3E5A6F4C
```



### 5.c语言实现加密

~~~
void Encrypt(unsigned int* data, unsigned int* key) {
    unsigned int v0 = data[0], v1 = data[1];
    unsigned int sum = 0, delta = 0x9E3779B9;
    for (int i = 0; i < 32; i++) {
        sum += delta;
        v0 += ((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >> 5) + key[1]);
        v1 += ((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >> 5) + key[3]);
    }
    data[0] = v0;
    data[1] = v1;
}
~~~



### 6.c语言实现解密

```
void Decrypt(unsigned int* data, unsigned int* key) {
    unsigned int v0 = data[0], v1 = data[1];
    unsigned int delta = 0x9E3779B9, sum = delta * 32;
    
    for (int i = 0; i < 32; i++) {
        v1 -= ((v0 << 4) + key[2]) ^ (v0 + sum) ^ ((v0 >> 5) + key[3]);
        v0 -= ((v1 << 4) + key[0]) ^ (v1 + sum) ^ ((v1 >> 5) + key[1]);
        sum -= delta;
    }
    data[0] = v0;
    data[1] = v1;
}
```

### 7.py实现解密

```
def tea_decrypt(ciphertext, key):
    delta = 0x9e3779b9
    v0, v1 = ciphertext
    k0, k1, k2, k3 = key

    sum = (delta * 32) & 0xffffffff

    for _ in range(32):
        v1 = (v1 - (((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >> 5) + k3))) & 0xffffffff
        v0 = (v0 - (((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >> 5) + k1))) & 0xffffffff
        sum = (sum - delta) & 0xffffffff

    return v0, v1


ciphertext = (0xD1B29C78, 0xF70D98A7)
key = (0x01234567, 0x89ABCDEF, 0xFEDCBA98, 0x76543210)

v0, v1 = tea_decrypt(ciphertext, key)

print(hex(v0), hex(v1))

# 转成字节（大端）
plaintext = v0.to_bytes(4, 'big') + v1.to_bytes(4, 'big')
print("明文 bytes:", plaintext)

try:
    print("明文字符串:", plaintext.decode())
except:
    print("不是 ASCII / UTF-8 文本")

```

# xTEA算法-TEA的升级版本

## 加密原理

XTEA 跟 TEA 使用了相同的简单运算，但它采用了截然不同的顺序，为了阻止密钥表攻击，四个子密钥（在加密过程中，原 128 位的密钥被拆分为 4 个 32 位的子密钥）采用了一种不太正规的方式进行混合。总的来说 xTEA就是在TEA算法基础上加了一些内容，而加解密过程基本没变。

与TEA的区别

### 1.直观对比表

| 方面           | TEA                                              | XTEA                                       |
| :------------- | :----------------------------------------------- | :----------------------------------------- |
| **轮函数结构** | `((v1<<4)+key[0]) ^ (v1+sum) ^ ((v1>>5)+key[1])` | `(((v1<<4)^(v1>>5))+v1) ^ (sum+key[索引])` |
| **密钥调度**   | 固定模式：奇偶轮使用不同密钥对                   | 动态模式：依赖sum值选择密钥                |
| **轮数**       | 通常32轮（64次操作）                             | 通常64轮（128次操作）                      |
| **DELTA作用**  | 每轮增加sum                                      | 每轮增加sum，同时参与密钥索引计算          |
| **安全性**     | 较弱，存在相关密钥攻击                           | 较强，修复了TEA的弱点                      |

**特点**：

1. 轮函数先计算`((v1 << 4) ^ (v1 >> 5)) + v1`，再与轮密钥异或
2. **密钥选择依赖sum**：`key[(sum >> 11) & 3]`或`key[sum & 3]`
3. 推荐64轮（128次Feistel操作）

###  2.c语言加密解密实现

```
void encipher(unsigned int num_rounds, uint32_t v[2], uint32_t const key[4])
{
    unsigned int i;
    uint32_t v0=v[0],v1=v[1],delta=0x9E3779B9,sum=delta*num_rounds;
    for(i=0;i<num_rounds;i++){
        v0+=(((v1<<4)^(v1>>5))+v1)^(sum+key[sum&3]);
        sum += delta;
        v1 += (((v0 << 4) ^ (v0 >> 5)) + v0) ^ (sum + key[(sum>>11) & 3]);
    }
    v[0]=v0;v[1]=v1;
}


void decipher(unsigned int num_rounds, uint32_t v[2], uint32_t const key[4])
{
    unsigned int i;
    uint32_t v0=v[0],v1=v[1],delta=0x9E3779B9,sum=delta*num_rounds;
    for(i=0;i<num_rounds;i++){
        v1 -= (((v0 << 4) ^ (v0 >> 5)) + v0) ^ (sum + key[(sum>>11) & 3]);
        sum -= delta;
        v0-=(((v1<<4)^(v1>>5))+v1)^(sum+key[sum&3]);
    }
    v[0]=v0;v[1]=v1;
}
```

# xxTEA算法-TEA系列改进版

## 加密原理

### **1. 传入参数**

```
void xxtea_encrypt(uint32_t *v, int n, uint32_t const key[4]);
```

- `v`：要加密的数据（数组）
- `n`：数组长度（有多少个32位数字）
- `key`：密钥（4个32位数字，共128位）

### **2. 核心运算**（加密特征）

```
// 核心混合公式（记住这个特征）
MX = ((z>>5 ^ y<<2) + (y>>3 ^ z<<4)) ^ ((sum^y) + (key[编号] ^ z));
```

### 3.c语言加密实现

```
void xxtea_encrypt(unsigned int* v, int n, unsigned int const key[4]) {
    unsigned int y, z, sum = 0;
    unsigned int e, DELTA = 0x9e3779b9;
    int p, rounds = 6 + 52 / n;

    z = v[n - 1];
    do {
        sum += DELTA;
        e = (sum >> 2) & 3;
        for (p = 0; p < n - 1; p++) {
            y = v[p + 1];
            z = v[p] += ((z >> 5 ^ y << 2) + (y >> 3 ^ z << 4)) ^ ((sum ^ y) + (key[(p & 3) ^ e] ^ z));
        }
        y = v[0];
        z = v[n - 1] += ((z >> 5 ^ y << 2) + (y >> 3 ^ z << 4)) ^ ((sum ^ y) + (key[(p & 3) ^ e] ^ z));
    } while (--rounds);
}
```

### 4.c语言解密实现

```
 #include <stdio.h>
#include <stdint.h>
#define DELTA 0x9e3779b9
#define MX (((z>>5^y<<2)+(y>>3^z<<4))^((sum^y)+(key[(p&3)^e]^z)))
void dtea(uint32_t *v,int n,uint32_t const key[4])//n为v数组长度 {
 rounds = 6 + 52/n;
 sum = rounds*DELTA;
    y = v[0];
    do {
        e = (sum >> 2) & 3;
        for (p=n-1; p>0; p--) {
          z = v[p-1];
          y = v[p] -= MX;
        }
        z = v[n-1];
        y = v[0] -= MX;
        sum -= DELTA;
      } while (--rounds);
}
```





# 魔改算法

## 三、常见 TEA 魔改手法（逆向重点）

### 1. 轮数魔改

```
for (int i = 0; i < 16; i++)  // 不再是 32
```

**逆向策略**

- 观察 `sum` 累加次数
- 看 delta 被加了多少次
- 用调试器统计循环次数

题目代码：

~~~
void encrypt(uint32_t v[2], uint32_t k[4]) {
    uint32_t v0 = v[0], v1 = v[1];
    uint32_t sum = 0;
    uint32_t delta = 0x9E3779B9;

    for (int i = 0; i < 12; i++) {
        sum += delta;
        v0 += ((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >> 5) + k[1]);
        v1 += ((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >> 5) + k[3]);
    }
    v[0] = v0; v[1] = v1;
}
~~~

解密：

~~~
void decrypt1(unsigned int v[2], unsigned int k[4])
{
    unsigned int v0 = v[0], v1 = v[1];
    unsigned int delta = 0x9E3779B9;
    unsigned int sum = delta * 12;
    for (int i = 0; i < 12; i++) {
        v1 -= ((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >> 5) + k[3]);
        v0 -= ((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >> 5) + k[1]);
        sum -= delta;
    }
        v[0] = v0;
        v[1] = v1;
}
~~~

多轮加密，逆向 `unsigned int sum = delta * 12`  只变化轮数即可

### 2. delta 魔改

```
delta = 0x11451419;
```

或者

```
sum += delta ^ 0x12345678;
```

 **逆向策略**

- 搜索常数
- 计算 `sum` 的变化规律
- 回推等效 delta

加密

```
void encrypt(uint32_t *v, uint32_t *k) {
    uint32_t v0 = v[0], v1 = v[1];
    uint32_t sum = 0;
    uint32_t delta = 0x11451419;
    
    for (int i = 0; i < 32; i++) {
        sum += delta;
        v0 += ((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >> 5) + k[1]);
        v1 += ((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >> 5) + k[3]);
    }
    v[0] = v0; v[1] = v1;
}
```

解密

```
void decrypt2(unsigned int* v, unsigned int* k) {
    unsigned int v0 = v[0], v1 = v[1];
    
    unsigned int delta = 0x11451419;
    unsigned int sum = delta * 32;
    for (int i = 0; i < 32; i++) {
        v1 -= ((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >> 5) + k[3]);
        v0 -= ((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >> 5) + k[1]);
        sum -= delta;
    }
    v[0] = v0; v[1] = v1;
}
很类似
```

### 3. 位移参数魔改（最常见）

```
(v1 << 3) ^ (v1 >> 7)
```

代替：

```
(v1 << 4) ^ (v1 >> 5)
```

 **逆向策略**

- 关注移位指令（shl / shr）
- 不要死记 TEA 的 4 和 5

加密

```
void encrypt(uint32_t v[2], uint32_t k[4]) {
    uint32_t v0 = v[0], v1 = v[1];
    uint32_t sum = 0;
    uint32_t delta = 0x9E3779B9;

    for (int i = 0; i < 16; i++) {
        sum += delta;
        v0 += ((v1 << 3) + k[1]) ^ (v1 + sum) ^ ((v1 >> 7) + k[2]);
        v1 += ((v0 << 6) + k[3]) ^ (v0 + sum) ^ ((v0 >> 1) + k[0]);
    }
    v[0] = v0; v[1] = v1;
}
```

解密

```''
void decrypt3(unsigned int v[2], unsigned int  k[4]) 
{
    unsigned int v0 = v[0], v1 = v[1];
    unsigned int delta = 0x9E3779B9;
    unsigned int sum = delta * 16;
    for (int i = 0; i < 16; i++) 
    {
        v1 -= ((v0 << 6) + k[3]) ^ (v0 + sum) ^ ((v0 >> 1) + k[0]);
        v0 -= ((v1 << 3) + k[1]) ^ (v1 + sum) ^ ((v1 >> 7) + k[2]);
        sum -= delta;
    }
    v[0] = v0; v[1] = v1;
}
```

位移参数魔改



### 4. 加减顺序魔改

```
v0 ^= ((v1 << 4) + k[0]);
v0 += (v1 + sum);
```

而不是一行完成。

 **逆向策略**

- **合并表达式**
- 数学上恢复原式

加密：

~~~
void encrypt(uint32_t *v, uint32_t *k) {
    uint32_t v0 = v[0], v1 = v[1];
    uint32_t sum = 0;
    uint32_t delta = 0x9E3779B9;

    for (int i = 0; i < 32; i++) {
        sum += delta;
        v0 ^= ((v1 << 4) + k[0]) ^ (v1 + sum);
        v1 += ((v0 >> 5) + k[1]) ^ (v0 + sum);
    }
    v[0] = v0; v[1] = v1;
}
~~~

解密：

```
void decrypt4(unsigned int* v, unsigned int* k) {
    unsigned int v0 = v[0], v1 = v[1];
    
    unsigned int delta = 0x9E3779B9;
    unsigned int sum = delta * 32;

    for (int i = 0; i < 32; i++) 
    {
        v1 -= ((v0 >> 5) + k[1]) ^ (v0 + sum);
        v0 ^= ((v1 << 4) + k[0]) ^ (v1 + sum);
        sum -= delta;
    }
    v[0] = v0; v[1] = v1;
}
```

本质依然是f函数的对称

### 5. key 使用顺序魔改

```
k[(sum >> 11) & 3]
```

**逆向策略**

- 看 key 数组索引计算
- 不要假设 k0~k3 固定位置

加密：

~~~
void encrypt(uint32_t *v, uint32_t *k) {
    uint32_t v0 = v[0], v1 = v[1];
    uint32_t sum = 0;
    uint32_t delta = 0x9E3779B9;

    for (int i = 0; i < 32; i++) {
        sum += delta;
        v0 += ((v1 << 4) + k[sum & 3]) ^ (v1 + sum);
        v1 += ((v0 >> 5) + k[(sum >> 11) & 3]) ^ (v0 + sum);
    }
    v[0] = v0; v[1] = v1;
}
~~~

解密：

~~~
void decrypt5(unsigned int* v, unsigned int* k) {
    unsigned int v0 = v[0], v1 = v[1];
    unsigned int delta = 0x9E3779B9;
    unsigned int sum = 32 * delta;

    for (int i = 0; i < 32; i++) {
        v1 -= ((v0 >> 5) + k[(sum >> 11) & 3]) ^ (v0 + sum);
        v0 -= ((v1 << 4) + k[sum & 3]) ^ (v1 + sum);
        sum -= delta;
    }
    v[0] = v0; v[1] = v1;
}
~~~

key的数目不影响加密解密结果

------

### 6. XOR / ADD 混用

```
v0 += expr;
```

变成：

```
v0 ^= expr;
```

 **逆向策略**

- 注意是否仍然可逆
- XOR ≠ ADD，但仍可反推

加密：

```
void decrypt6(unsigned int* v, unsigned int* k) {
    unsigned int v0 = v[0], v1 = v[1];
    unsigned int sum = 0;
    unsigned int delta = 0xA56BABCD;

    for (int i = 0; i < 20; i++) {
        sum += delta;
        v0 += (v1 ^ (v1 << 5) ^ (v1 >> 3)) + k[(sum >> 13) & 3];
        v1 += (v0 ^ (v0 << 4) ^ (v0 >> 7)) + k[sum & 3];
    }
    v[0] = v0; v[1] = v1;
}
```

解密：

```
void decrypt6(unsigned int* v, unsigned int* k) {
    unsigned int v0 = v[0], v1 = v[1];
    unsigned int delta = 0xA56BABCD;
    unsigned int sum = 20 * delta;
    for (int i = 0; i < 20; i++) {
        v1 -= (v0 ^ (v0 << 4) ^ (v0 >> 7)) + k[sum & 3];
        v0 -= (v1 ^ (v1 << 5) ^ (v1 >> 3)) + k[(sum >> 13) & 3];
        sum -= delta;
    }
    v[0] = v0; v[1] = v1;
}
```

# 知识补充

## Feistel网络

一种对称加密算法的基本结构，它通过将明文分组并多轮迭代处理，实现加密和解密的功能。

Feistel网络的核心特点是加密和解密流程完全相同，仅密钥使用顺序相反。

F函数是Feistel网络的核心，用于对右半部分进行复杂变换。一个好的F函数需满足非线性、扩散性、雪崩效应等特性。以DES为例，其F函数包括扩展、异或、S盒替换和P盒置换等步骤。

- **分组大小**：64位（被分成两个32位的左半部分`L`和右半部分`R`）。
- **密钥大小**：128位。
- **轮数**：推荐64轮（但可调整，必须是偶数轮，因为每两轮构成一个完整的Feistel回合）。

Feistel结构的特点是，每一轮只加密一半的数据块，并与另一半进行交换。这使得加解密过程非常相似，只是子密钥的使用顺序不同。

~~~
#include <stdint.h>
#include <string.h>
#include <stdio.h>

#define DELTA 0x9e3779b9
#define MX (((z>>5^y<<2) + (y>>3^z<<4)) ^ ((sum^y) + (key[(p&3)^e] ^ z)))

// XXTEA 加密
void btea_encrypt(uint32_t *v, int n, uint32_t const key[4]) {
    uint32_t y, z, sum;
    unsigned p, rounds, e;
    
    if (n < 1) return;
    
    rounds = 6 + 52/n;
    sum = 0;
    z = v[n-1];
    
    do {
        sum += DELTA;
        e = (sum >> 2) & 3;
        
        for (p = 0; p < n-1; p++) {
            y = v[p+1];
            v[p] += MX;
            z = v[p];
        }
        
        y = v[0];
        v[n-1] += MX;
        z = v[n-1];
    } while (--rounds);
}

// XXTEA 解密
void btea_decrypt(uint32_t *v, int n, uint32_t const key[4]) {
    uint32_t y, z, sum;
    unsigned p, rounds, e;
    
    if (n < 1) return;
    
    rounds = 6 + 52/n;
    sum = rounds * DELTA;
    y = v[0];
    
    do {
        e = (sum >> 2) & 3;
        
        for (p = n-1; p > 0; p--) {
            z = v[p-1];
            v[p] -= MX;
            y = v[p];
        }
        
        z = v[n-1];
        v[0] -= MX;
        y = v[0];
        sum -= DELTA;
    } while (--rounds);
}

// 示例：加密字符串
void example_string_encryption() {
    char plaintext[] = "Hello, XXTEA! This is a test message.";
    uint32_t key[4] = {0x12345678, 0x9ABCDEF0, 0x11223344, 0x55667788};
    
    // 计算需要多少32位字
    int len = strlen(plaintext);
    int n = (len + 3) / 4;  // 向上取整
    uint32_t *data = (uint32_t*)malloc(n * 4);
    
    // 复制数据并填充
    memset(data, 0, n * 4);
    memcpy(data, plaintext, len);
    
    printf("Original text: %s\n", plaintext);
    printf("Text length: %d bytes\n", len);
    printf("Block size: %d words (%d bytes)\n", n, n * 4);
    
    // 加密
    btea_encrypt(data, n, key);
    
    printf("\nEncrypted data (hex):\n");
    for (int i = 0; i < n; i++) {
        printf("%08X ", data[i]);
        if ((i + 1) % 4 == 0) printf("\n");
    }
    
    // 解密
    btea_decrypt(data, n, key);
    
    printf("\nDecrypted text: %s\n", (char*)data);
    
    free(data);
}

int main() {
    example_string_encryption();
    return 0;
}
~~~

