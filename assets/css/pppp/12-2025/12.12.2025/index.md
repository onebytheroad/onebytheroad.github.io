---
title: 12-12 base64
description: 抓不住的东西太多了，所以要告诉自己没关系
date: 2025-12-12
slug: 12-12
image: bj.jpg
categories:
  - 编码
---

base64编码 - 一种编码方式

## 编码原理

将每一个字符转换成二进制数字，然后按六位一组分开，用新的六位二进制值解释成新的整数，然后取对应字符

```
编码Man：
原始数据（ASCII 编码）：
M -> 01001101
a -> 01100001
n -> 01101110

合并成 24 位：
01001101 01100001 01101110

拆分为 6 位的块：
010011 010110 000101 101110

将每 6 位二进制块映射为 Base64 字符：
010011 -> 19 -> T
010110 -> 22 -> W
000101 -> 5  -> F
101110 -> 46 -> u

编码结果：
"Man" -> "TWFu"

如果输入的数据，转换成二进制数据后不是3的倍数，Base64 会在末尾补上 = 作为填充符。
解码即逆向思考，将编码转化为二进制数据，6位合并成8位，然后去掉=
```



### base64编码c语言实现

```
char* base64encry(char* input)
{
	int len = 0, str_len = 0;
	char* encry;
	char table64[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	len = strlen(input);
	if (len % 3 == 0)
		str_len = (len / 3) * 4;
	else
		str_len = ((len / 3) + 1) * 4;
	encry = (char*)malloc(sizeof(char) * str_len + 1);

	for (int i = 0, j = 0; i < len; i += 3, j += 4)
	{
		encry[j] = table64[input[i] >> 2];
		encry[j + 1] = table64[((input[i] & 0x3) << 4) | ((input[i + 1]) >> 4)];
		encry[j + 2] = table64[((input[i + 1] & 0xf) << 2) | (input[i + 2] >> 6)];
		encry[j + 3] = table64[input[i + 2] & 0x3f];
	}
	switch (len % 3)
	{
	case 1:
		encry[str_len - 1] = '=';
		encry[str_len - 2] = '=';
		break;
	case 2:
		encry[str_len - 1] = '=';
		break;
	}
	encry[str_len] = '\0';
	return encry;
}
```



### base64原码解码c语言实现

```
char* base64decry(char* input)
{
	int table[] =
	{
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,62,0,0,0,63,
	52,53,54,55,56,57,58,59,60,61,0,0,
	0,0,0,0,0,0,1,2,3,4,5,6,
	7,8,9,10,11,12,13,14,15,16,17,18,
	19,20,21,22,23,24,25,0,0,0,0,0,
	0,26,27,28,29,30,31,32,33,34,35,36,
	37,38,39,40,41,42,43,44,45,46,47,48,
	49,50,51,
	};
	
	int len = 0, str_len = 0;
	char* decry;
	len = strlen(input);
	if (strstr(input, "=="))
		str_len = (len / 4) * 3 - 2;
	else if (strstr(input, "="))
		str_len = (len / 4) * 3 - 1;
	else
		str_len = (len / 4) * 3;
	decry = (char*)malloc(sizeof(char) * str_len + 1);
	for (int i = 0, j = 0; i < len; i += 4, j += 3)
	{
		decry[j] = (table[input[i]] << 2) | (table[input[i + 1]] >> 4);
		decry[j + 1] = ((table[input[i + 1]]) & 0xf) << 4 | (table[input[i + 2]] >> 2);
		decry[j + 2] = ((table[input[i + 2]]) & 0x3) << 6 | (table[input[i + 3]]);
	}
	decry[str_len] = '\0';
	return decry;
}
```



### 映射表的生成

```
#define _CRT_SECURE_NO_WARNINGS 1
//生成映射表
#include <stdio.h>
#include <string.h>

#define TABLE_SIZE 128

// 生成解密映射表的函数
void generate_decoding_table(const char* encoding_table, int* decoding_table) {
    // 初始化解密映射表，将所有元素置为 0
    memset(decoding_table, 0, TABLE_SIZE * sizeof(int));
    // 遍历编码表中的每个字符
    for (int i = 0; i < 64; i++) {
        // 获取当前字符的 ASCII 码值
        int ascii_value = (int)encoding_table[i];
        // 将该字符在编码表中的索引值存入解密映射表对应位置
        decoding_table[ascii_value] = i;
    }
}

// 打印解密映射表的函数
void print_decoding_table(int* decoding_table) {
    printf("{\n");
    for (int i = 0; i < TABLE_SIZE - 5; i++) {
        if (i % 12 == 0 && i != 0) {
            printf("\n");
        }
        printf("%d,", decoding_table[i]);
    }
    printf("\n};\n");
}

int main() {
    // 标准的 Base64 编码字符表
    const char standard_encoding_table[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    int decoding_table[TABLE_SIZE];

    // 生成解密映射表
    generate_decoding_table(standard_encoding_table, decoding_table);

    // 打印解密映射表
    print_decoding_table(decoding_table);

    return 0;
}
```

建立索引 `decoding_table[ascii_value] = i;`

**建立解码映射**：

- `i` 是字符在编码表中的位置（0~63）
- `ascii_value` 是字符的 ASCII 码（如 'A'=65）
- `decoding_table[ascii_value] = i` 表示：
  **当遇到 ASCII 码为 `ascii_value` 的字符时，它对应的 Base64 索引值是 `i`**

**示例**：
若编码表第一个字符是 'A'（ASCII 65），`i=0`，则执行：
`decoding_table[65] = 0`
这样解码时，遇到字符 'A'，查 `decoding_table[65]` 就直接得到索引 0。


## 魔改原理

base64的魔改主要有两个方式

### 修改索引的魔改，俗称换表

对下标进行额外的的偏移

1. 魔改加密时：原始数据 → 标准Base64编码 → 将编码结果按 `b` 表替换（`a[j]` 换成 `b[j]`）。
2. 这段解密代码：将 `c` 每个字符在魔改表 `b` 中找到位置 `j` → 换成标准表 `a` 中同一位置的字符。
3. 结果 `c` 变成了标准Base64字符串，之后可用标准Base64解码得到原始数据。

**本质**：换表只是字符替换密码，不改变Base64编码结构，只改变了字符外观。解密就是查反向映射还原为标准Base64，再正常解码。

#### 换表的c语言解密

~~~
static void main()
{
	char a[64] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	char b[64] = "ZYXABCDEFGHIJKLMNOPQRSTUVWzyxabcdefghijklmnopqrstuvw0123456789+/";
	char c[] = "Wj1gWE9xPSGUQ0KCPCGET09WR1qSzZ";
	for (int i = 0; i < strlen(c); i++)
	{
		for (int j = 0; j < 64; j++)
		{
			if (c[i] == b[j])
			{
				c[i] = a[j];
				break;
			}
		}
	}
	for (int i = 0; i < strlen(c); i++)
	{
		printf("%c", c[i]);
	}
	printf("\n");
	printf("%s", c);
}
循环寻找解密字符串在魔改表中的对应，然后映射到原表的码，最后用原表解密
~~~



#### 换表的py解密

```
import base64  # 导入base64模块用于解密
#这里是先把密文映射替换相当于原表还是标准表
s1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'  
s2 = 'ZYXABCDEFGHIJKLMNOPQRSTUVWzyxabcdefghijklmnopqrstuvw0123456789+/'  
en_text = 'Wj1gWE9xPSGUQ0KCPCGET09WR1qSzZ=='  # 密文

map = str.maketrans(s2, s1)  
# 用str类中的maketrans建立映射，注意第一个参数是需要映射的字符串，第二个参数是映射的目标
map_text = en_text.translate(map)  
# 映射实现替换密文，替换前是base64换表加密，替换后则是base64标准表加密
print(map_text)  # 可以先看看标准表加密的原base64密文
print(base64.b64decode(map_text))  # 直接使用提供的base64解密函数解密

```

密文处如果不是4的倍数需要填充`=`

第二种代码

```
import base64
a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
b = "ZYXABCDEFGHIJKLMNOPQRSTUVWzyxabcdefghijklmnopqrstuvw0123456789+/"
c = "Wj1gWE9xPSGUQ0KCPCGET09WR1qSzZ"

mapping = dict(zip(b, a))
standard_base64 = ''.join(mapping[ch] for ch in c)
# 补足填充符
padding = 4 - len(standard_base64) % 4
if padding != 4: 
    standard_base64 += '=' * padding

decoded = base64.b64decode(standard_base64.encode()).decode()  
decodedd = base64.b64decode(standard_base64) 
print(decoded)
print(decodedd)
```



### 改索引/移位密钥的处理

**加密过程**

1. 原始数据 → 标准Base64编码 → 得到标准Base64字符串。
2. 对每个字符：查标准Base64表得到索引值 → 加上密钥 `key[i % 4]` → 用魔改表（或原表）根据新索引取字符输出。

```
原始数据 → 标准Base64编码 → 得到标准字符 → 查标准表得索引 → 索引+密钥 → 查自定义表 → 输出密文
         (内置b64encode)   (如"QQ==")      (如索引0)     (如+5→5)   (取第5个字符)  (如"f")
```

**解密过程**

1. 对密文字符：查魔改表得到索引值 → 减去密钥 `key[i % 4]`（负数则+64）→ 得到标准Base64索引值。
2. 将索引值按Base64规则重组为字节数据。

```
密文 → 查自定义表得索引 → 索引-密钥 → 得标准索引 → 查标准表得字符 → 拼接 → 标准Base64解码 → 原始数据
(如"f")  (如得到5)      (5-5→0)    (索引0)      (字符"Q")    ("QQ==")   (内置b64decode)  (如"@")
```

**本质**：在Base64编码的**索引层**做了加法掩蔽，相当于在6位值上做了循环移位混淆。这比单纯换表多了一层算术变换，但仍是可逆的简单混淆。

```
table = "CDABGHEFKLIJOPMNSTQRWXUVabYZefcdijghmnklqropuvstyzwx23016745+/89"  # base64当前表
cipher = "TqK1YUSaQryEMHaLMnWhYU+Fe0WPenqhRXahfkV6WE2fa3iRW197Za62eEaD"  # 密文
cipher = cipher.rstrip('=') #去除密文多余的'='
_index = []
key = [1, 2, 3, 4]  #正常设置为[0,0,0,0]就可以
for i in range(len(cipher)):
    tmp = table.index(cipher[i]) - key[i % 4]  # 减去加密时加上的key
    if tmp >= 0:
        _index.append(tmp)
    else:  # 因为减去key会导致索引变成负数，+64保证在正常索引范围
        _index.append(tmp + 64)
#print(_index)

for i in range(0, len(_index), 4):
    a = _index[i]
    b = _index[i + 1]
    c = _index[i + 2] if i + 2 < len(_index) else 0  # 添加范围检查，为未处理部分设为0
    d = _index[i + 3] if i + 3 < len(_index) else 0
    sum = a << 18 | b << 12 | c << 6 | d
    for j in range(3):
        if i * 6 + j * 8 < len(cipher) * 8:  # 检查是否超出原始编码长度
            print(chr((sum >> ((2 - j) * 8)) & 0xff), end="")

后续可利用py带的base64库快速解码
std_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
b64_str = ''.join(std_table[i] for i in _index)
print(base64.b64decode(b64_str))
```

#### 注意事项

1.设定的key在ida中可能不会显示出来，直接就导入在算法里面成为固定的整数

2.变索引有很多类型

* +key
* ^ key
* *k
* imul
* and 3Fh

都可以进行索引的更改，此处只例举了加索引的例子，其他的需要有遇到例题再添加

3.key也会有不同的形式

* Step 3：判断 key 的形式
* 常量？
* 数组？
* i % n？
* 跟位置相关？

都是需要在解题过程中注意

~~~
例题
#include <stdio.h>
#include <string.h>
#include <malloc.h>

char* base64encry(char* input)
{
	int len = 0, str_len = 0;
	char* encry;
	char table64[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	len = strlen(input);
	if (len % 3 == 0)
		str_len = (len / 3) * 4;
	else
		str_len = ((len / 3) + 1) * 4;
	encry = (char*)malloc(sizeof(char) * str_len + 1);

	for (int i = 0, j = 0; i < len; i += 3, j += 4)
	{
		encry[j] = table64[input[i] >> 2];
		encry[j + 1] = table64[((input[i] & 0x3) << 4) | ((input[i + 1]) >> 4)];
		encry[j + 2] = table64[((input[i + 1] & 0xf) << 2) | (input[i + 2] >> 6)];
		encry[j + 3] = table64[input[i + 2] & 0x3f];
	}
	switch (len % 3)
	{
	case 1:
		encry[str_len - 1] = '=';
		encry[str_len - 2] = '=';
		break;
	case 2:
		encry[str_len - 1] = '=';
		break;
	}
	encry[str_len] = '\0';
	return encry;
}

char* base64(char* input)
{
	int len = 0, str_len = 0;
	char* encry;
	char table64[] = "CDABGHEFKLIJOPMNSTQRWXUVabYZefcdijghmnklqropuvstyzwx23016745+/89";
	int key[] = { 1, 2, 3, 4 };
	len = strlen(input);
	if (len % 3 == 0)
		str_len = (len / 3) * 4;
	else
		str_len = ((len / 3) + 1) * 4;
	encry = (char*)malloc(sizeof(char) * str_len + 1);

	for (int i = 0, j = 0; i < len; i += 3, j += 4)
	{
		unsigned char k1 = input[i] >> 2;
		unsigned char k2 = ((input[i] & 0x3) << 4) | (input[i + 1] >> 4);
		unsigned char k3 = ((input[i + 1] & 0xf) << 2) | (input[i + 2] >> 6);
		unsigned char k4 = input[i + 2] & 0x3f;

		encry[j] = table64[(k1 + key[0]) & 0x3F];
		encry[j + 1] = table64[(k2 + key[1]) & 0x3F];
		encry[j + 2] = table64[(k3 + key[2]) & 0x3F];
		encry[j + 3] = table64[(k4 + key[3]) & 0x3F];
	}
	switch (len % 3)
	{
	case 1:
		encry[str_len - 1] = '=';
		encry[str_len - 2] = '=';
		break;
	case 2:
		encry[str_len - 1] = '=';
		break;
	}
	encry[str_len] = '\0';
	return encry;

}

int main()
{
	char v1[] = "X0iYf6OJNaebeVZ0VlmMdluYNUWqQ1lD";
	char v2[100] = {0};
	printf("请输入flag：");
	scanf("%s",v2);
	char* v3,*v4,*v5;
	v3 = base64encry(v2);
	v5 = base64(v3);
	if (*v1 == *v5)
		printf("success");
	else
		printf("wrong");
	return 0;
}
编译成exe，然后在ida中看

这是解密脚本
import base64
t2 = 'CDABGHEFKLIJOPMNSTQRWXUVabYZefcdijghmnklqropuvstyzwx23016745+/89'
t3 = 'X0iYf6OJNaebeVZ0VlmMdluYNUWqQ1lD'
key = [1,2,3,4]
_index = []
for i in range(len(t3)):
    tmp = t2.index(t3[i]) - key[i % 4]
    if tmp >= 0:
        _index.append(tmp)
    else:
        _index.append(tmp + 64)
std_table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
b64_str = ''.join(std_table[i] for i in _index)
print(base64.b64decode(b64_str))
~~~









## base64模块的语法使用

**1. 编码**

- `base64.b64encode(s)`
  参数：`s` 必须是 bytes
  返回：bytes（Base64 编码结果）
- `base64.b64encode(s).decode()`
  把 bytes 结果转为字符串

**2. 解码**

- `base64.b64decode(s)`
  参数：`s` 可以是 bytes 或 str（只含 Base64 字符）
  返回：bytes（解码后的原始数据）
- `base64.b64decode(s).decode('utf-8')`
  把解码结果转为 UTF-8 字符串

**3. 处理换行/URL安全**

- `base64.standard_b64encode(s)` / `standard_b64decode(s)`
  标准 Base64
- `base64.urlsafe_b64encode(s)` / `urlsafe_b64decode(s)`
  URL 安全（`+`→`-`，`/`→`_`）

**4. 带填充控制**

- `base64.b64decode(s, validate=True)`
  `validate=False` 时忽略非 Base64 字符

**示例**：

python

```
import base64

# 编码
enc = base64.b64encode(b"hello").decode()  # 'aGVsbG8='

# 解码
dec = base64.b64decode("aGVsbG8=").decode()  # 'hello'

# URL安全
url_enc = base64.urlsafe_b64encode(b"data").decode()  # 'ZGF0YQ=='
```



**关键点**：

- 输入输出默认都是 bytes，字符串需用 `.encode()` 和 `.decode()` 转换
- 解码自动处理填充符 `=`
- 模块还有 `b32encode`、`b16encode` 等其他进制编码



## 重要概念:

#### 1.映射表

解码实现中`table`表即原码的映射表，用来表示至少为123位（ z 的ASCII码是 122 ）数组的解码，用索引字符的ASCII值作为小标，直接取出字符对应的6位数值，是一种用空间换时间的方式。

~~~
举例：
原base64编码表为 table64= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
而字符`B`的 ASCII 是 66，那么 table[66] 就等于 1，因为`B`在 Base64 编码表中排第 1（从`A`为 0 开始）

如果不使用映射表的话
就必须手动判断输入字符的范围并计算对应值在填充:
int val = 0;
if(ch >= 'A' && ch <= 'Z') val = ch - 'A';
else if(ch >= 'a' && ch <= 'z') val = ch - 'a' + 26;
else if(ch >= '0' && ch <= '9') val = ch - '0' + 52;
else if(ch == '+') val = 62;
else if(ch == '/') val = 63;
else if(ch == '=') val = 0; // 填充符

~~~

#### 不可见字符的处理

Base64规范中只有64个字符和`=`，其他都应忽略。处理方式：遍历输入字符串，跳过非Base64字符（即不在`A-Za-z0-9+/=`中的字符），将有效字符复制到新缓冲区再进行解码。否则直接解码会因`table`索引越界或取到错误值导致乱码或崩溃。



#### memset

```
memset(起始地址, 要设置的值, 要设置的字节数)
```

**常见用途**：

1. **数组/内存块清零**：`memset(arr, 0, sizeof(arr))`
2. **初始化结构体**：`memset(&obj, 0, sizeof(obj))`（注意会清空所有成员，包括指针）
3. **填充特定值**：如 `memset(buffer, 0xFF, size)` 全填为 255
4. **字符串结尾安全处理**：在敏感数据使用后填充 0 防残留

