---
title: 12-21 AES加密
description: 
date: 2025-12-21
slug: 12-21-2025-jiami
image: bj.jpg
categories:
  - 加密算法
---

# AES加密

## 1.核心原理

AES为分组密码，将明文分为一组一组，每次加密一组数据，直到加密完所有明文。

AES标准规范中，分组长度只能是128位，即每个分组为16个字节。

密钥的长度可以为128，192，256位。根据密钥长度不同，推荐的加密轮数也不同

| AES     | 密钥长度（32位比特字) | 分组长度(32位比特字) | 加密轮数 |
| ------- | --------------------- | -------------------- | -------- |
| AES-128 | 4                     | 4                    | 10       |
| AES-192 | 6                     | 4                    | 12       |
| AES-256 | 8                     | 4                    | 14       |

### 状态矩阵

AES算法中的核心，一个状态矩阵为4x4的字节矩阵，共16个字节，作为一组明文或者加密的中间结果展现。排列规则为 “按列填充”—— 即明文第 1-4 字节为第 1 列，第 5-8 字节为第 2 列，第 9-12 字节为第 3 列，第 13-16 字节为第 4 列。
例：128 位明文00 11 22 33 44 55 66 77 88 99 aa bb cc dd ee ff（16 字节），状态矩阵为：

| 列0  | 列1  | 列2  | 列3  |
| ---- | ---- | ---- | ---- |
| 00   | 44   | 88   | cc   |
| 11   | 55   | 99   | dd   |
| 22   | 66   | aa   | ee   |
| 33   | 77   | bb   | ff   |

### 轮密钥

原始密钥通过密钥拓展的方式生成，每轮迭代需要1个与状态矩阵等大的4*4轮密钥，因此总的轮密钥数 = 轮数 + 1。（第0轮为 初始轮密钥，用于首轮“轮密钥加”）

### 有限域运算

AES 的 “列混合” 和 “密钥扩展” 依赖**GF (2⁸) 有限域**（即 8 位字节的二元域）运算，确保所有变换在固定范围内可逆

### 填充

假如一段明文长度是192bit，如果按每128bit一个明文块来拆分的话，第二个明文块只有64bit，不足128bit。这时候怎么办呢？就需要对明文块进行填充。

#### nopadding

不做任何填充，但是要求明文必须是16字节的整数倍。

#### PKCS5Padding（默认）：

如果明文块少于16个字节（128bit），在明文块末尾补足相应数量的字符，且每个字节的值等于缺少的字符数。

比如明文：{1,2,3,4,5,a,b,c,d,e},缺少6个字节，则补全为{1,2,3,4,5,a,b,c,d,e,6,6,6,6,6,6}

#### iso10126padding

如果明文块少于16个字节（128bit），在明文块末尾补足相应数量的字节，最后一个字符值等于缺少的字符数，其他字符填充随机数。

比如明文：{1,2,3,4,5,a,b,c,d,e},缺少6个字节，则可能补全为{1,2,3,4,5,a,b,c,d,e,5,c,3,G,$,6}

## 2.算法原理

| 加密阶段（AES-128）                          | 对应解密阶段（AES-128）                            | 关键差异                                                     |
| -------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| 最终轮（字节代换→行移位→轮密钥加）           | 初始轮（轮密钥加→逆行移位→逆字节代换）             | 解密初始轮需先抵消加密的 “轮密钥加”，再逆序还原 “行移位” 和 “字节代换” |
| 第 9~1 轮（字节代换→行移位→列混合→轮密钥加） | 第 1~9 轮（轮密钥加→逆列混合→逆行移位→逆字节代换） | 解密轮需先 “轮密钥加”（抵消加密的最后一步），再逆序还原 “列混合”“行移位”“字节代换” |
| 初始轮密钥加                                 | 最终轮密钥加                                       | 解密最终轮仅需 “轮密钥加”，直接还原明文                      |
| 轮密钥使用顺序：K₀→K₁→…→K₁₀                  | 轮密钥使用顺序：K₁₀→K₉→…→K₀                        | 解密轮密钥完全逆序，与加密互补                               |


![img](https://i-blog.csdnimg.cn/blog_migrate/170c344422d4953193c2186534f6c61a.png#pic_center)

### 字节代换

定义S盒和逆S盒的查表操作





### 行移位

1.行移位操作
行移位是一个简单的左循环移位操作。当密钥长度为128比特时，状态矩阵的第0行左移0字节，第1行左移1字节，第2行左移2字节，第3行左移3字节
![img](https://i-blog.csdnimg.cn/blog_migrate/a3ba629bd129bec80302323bef4fdbb0.png#pic_center)

2.行移位的逆变换是将状态矩阵中的每一行执行相反的移位操作，例如AES-128中，状态矩阵的第0行右移0字节，第1行右移1字节，第2行右移2字节，第3行右移3字节。

### 列混合

**列混合操作**

列混合变换是通过矩阵相乘来实现的,经行移位后的状态矩阵与固定的矩阵相乘，得到混淆后的状态矩阵

**列混合逆运算**

逆向列混合变换可由下图的矩阵乘法定义：
![img](https://i-blog.csdnimg.cn/blog_migrate/e8498590806020fc7f54b6ebbee9f7b9.png#pic_center)
可以验证，逆变换矩阵同正变换矩阵的乘积恰好为单位矩阵。

### 轮密钥加

1238位密钥同状态矩阵中的数据进行诸位异或操作，密钥Ki中每个字W[4i],W[4i+1],W[4i+2],W[4i+3]为32位比特字，包含4个字节

轮密钥加过程可以看成是字逐位异或的结果，也可以看成字节级别或者位级别的操作。也就是说，可以看成S0 S1 S2 S3 组成的32位字与W[4i]的异或运算。

轮密钥加的逆运算同正向的轮密钥加运算完全一致，这是因为异或的逆操作是其自身。轮密钥加非常简单，但却能够影响S数组中的每一位

### 密钥扩展

AES首先将初始密钥输入到一个44的状态矩阵中，如下图所示。
![img](https://i-blog.csdnimg.cn/blog_migrate/f2f5d96365125bdbc8d60e00ed20d96f.png#pic_center)
这个44矩阵的每一列的4个字节组成一个字，矩阵4列的4个字依次命名为W[0]、W[1]、W[2]和W[3]，它们构成一个以字为单位的数组W。例如，设密钥K为"abcdefghijklmnop",则K0 = ‘a’,K1 = ‘b’, K2 = ‘c’,K3 = ‘d’,W[0] = “abcd”。
接着，对W数组扩充40个新列，构成总共44列的扩展密钥数组。新列以如下的递归方式产生：

1. 如果i不是4的倍数，那么第i列由如下等式确定：
   W[i]=W[i-4]⨁W[i-1]

2. 如果i是4的倍数，那么第i列由如下等式确定：

   W[i]=W[i-4]⨁T(W[i-1])

   其中，T是一个有点复杂的函数。

   函数T由3部分组成：字循环、字节代换和轮常量异或，这3部分的作用分别如下。

   1. 字循环：将1个字中的4个字节循环左移1个字节。即将输入字[b0, b1, b2, b3]变换成[b1,b2,b3,b0]。
   2. 字节代换：对字循环的结果使用S盒进行字节代换。
   3. 轮常量异或：将前两步的结果同轮常量Rcon[j]进行异或，其中j表示轮数。
      轮常量Rcon[j]是一个字，其值见下表。

| j       | 1           | 2           | 3           | 4           | 5           |
| ------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| Rcon[j] | 01 00 00 00 | 02 00 00 00 | 04 00 00 00 | 08 00 00 00 | 10 00 00 00 |
| j       | 6           | 7           | 8           | 9           | 10          |
| Rcon[j] | 20 00 00 00 | 40 00 00 00 | 80 00 00 00 | 1B 00 00 00 | 36 00 00 00 |



设初始的128位密钥为：
3C A1 0B 21 57 F0 19 16 90 2E 13 80 AC C1 07 BD
那么4个初始值为：
W[0] = 3C A1 0B 21
W[1] = 57 F0 19 16
W[2] = 90 2E 13 80
W[3] = AC C1 07 BD
下面求扩展的第1轮的子密钥(W[4],W[5],W[6],W[7])。
由于4是4的倍数，所以：
W[4] = W[0] ⨁ T(W[3])
T(W[3])的计算步骤如下：

1. 循环地将W[3]的元素移位：AC C1 07 BD变成C1 07 BD AC;
2. 将 C1 07 BD AC 作为S盒的输入，输出为78 C5 7A 91;
3. 将78 C5 7A 91与第一轮轮常量Rcon[1]进行异或运算，将得到79 C5 7A 91，因此，T(W[3])=79 C5 7A 91，故
   W[4] = 3C A1 0B 21 ⨁ 79 C5 7A 91 = 45 64 71 B0
   其余的3个子密钥段的计算如下：
   W[5] = W[1] ⨁ W[4] = 57 F0 19 16 ⨁ 45 64 71 B0 = 12 94 68 A6
   W[6] = W[2] ⨁ W[5] =90 2E 13 80 ⨁ 12 94 68 A6 = 82 BA 7B 26
   W[7] = W[3] ⨁ W[6] = AC C1 07 BD ⨁ 82 BA 7B 26 = 2E 7B 7C 9B
   所以，第一轮的密钥为 45 64 71 B0 12 94 68 A6 82 BA 7B 26 2E 7B 7C 9B。

## 3.算法实现

```
/**
 * 参数 p: 明文的字符串数组。
 * 参数 plen: 明文的长度。
 * 参数 key: 密钥的字符串数组。
 */
void aes(char *p, int plen, char *key){

    int keylen = strlen(key);
    if(plen == 0 || plen % 16 != 0) {
        printf("明文字符长度必须为16的倍数！\n");
        exit(0);
    }

    if(!checkKeyLen(keylen)) {
        printf("密钥字符长度错误！长度必须为16、24和32。当前长度为%d\n",keylen);
        exit(0);
    }

    extendKey(key);//扩展密钥
    int pArray[4][4];

    for(int k = 0; k < plen; k += 16) {
        convertToIntArray(p + k, pArray);

        addRoundKey(pArray, 0);//一开始的轮密钥加

        for(int i = 1; i < 10; i++){//前9轮

            subBytes(pArray);//字节代换

            shiftRows(pArray);//行移位

            mixColumns(pArray);//列混合

            addRoundKey(pArray, i);

        }

        //第10轮
        subBytes(pArray);//字节代换

        shiftRows(pArray);//行移位

        addRoundKey(pArray, 10);

        convertArrayToStr(pArray, p + k);
    }
}
```



### 各个对应函数的实现

#### 1 密钥拓展

```
//密钥对应的扩展数组
static int w[44];

/**
 * 扩展密钥，结果是把w[44]中的每个元素初始化
 */
static void extendKey(char *key) {
    for(int i = 0; i < 4; i++)
        w[i] = getWordFromStr(key + i * 4); 

    for(int i = 4, j = 0; i < 44; i++) {
        if( i % 4 == 0) {
            w[i] = w[i - 4] ^ T(w[i - 1], j); 
            j++;//下一轮
        }else {
            w[i] = w[i - 4] ^ w[i - 1]; 
        }
    }   

}


```

T函数

```
/**
 * 常量轮值表
 */
static const int Rcon[10] = { 0x01000000, 0x02000000,
    0x04000000, 0x08000000,
    0x10000000, 0x20000000,
    0x40000000, 0x80000000,
    0x1b000000, 0x36000000 };
/**
 * 密钥扩展中的T函数
 */
static int T(int num, int round) {
    int numArray[4];
    splitIntToArray(num, numArray);
    leftLoop4int(numArray, 1);//字循环

    //字节代换
    for(int i = 0; i < 4; i++)
        numArray[i] = getNumFromSBox(numArray[i]);

    int result = mergeArrayToInt(numArray);
    return result ^ Rcon[round];
}


```



#### 2 字节代换

```

/**
 * 根据索引，从S盒中获得元素
 */
static int getNumFromSBox(int index) {
    int row = getLeft4Bit(index);
    int col = getRight4Bit(index);
    return S[row][col];
}

/**
 * 字节代换
 */
static void subBytes(int array[4][4]){
    for(int i = 0; i < 4; i++)
        for(int j = 0; j < 4; j++)
            array[i][j] = getNumFromSBox(array[i][j]);
}


```

#### 3 行移位的实现

```

/**
 * 将数组中的元素循环左移step位
 */
static void leftLoop4int(int array[4], int step) {
    int temp[4];
    for(int i = 0; i < 4; i++)
        temp[i] = array[i];

    int index = step % 4 == 0 ? 0 : step % 4;
    for(int i = 0; i < 4; i++){
        array[i] = temp[index];
        index++;
        index = index % 4;
    }
}

/**
 * 行移位
 */
static void shiftRows(int array[4][4]) {
    int rowTwo[4], rowThree[4], rowFour[4];
    //复制状态矩阵的第2,3,4行
    for(int i = 0; i < 4; i++) {
        rowTwo[i] = array[1][i];
        rowThree[i] = array[2][i];
        rowFour[i] = array[3][i];
    }
    //循环左移相应的位数
    leftLoop4int(rowTwo, 1);
    leftLoop4int(rowThree, 2);
    leftLoop4int(rowFour, 3);

    //把左移后的行复制回状态矩阵中
    for(int i = 0; i < 4; i++) {
        array[1][i] = rowTwo[i];
        array[2][i] = rowThree[i];
        array[3][i] = rowFour[i];
    }
}


```

#### 4 列混合

```
/**
 * 列混合要用到的矩阵
 */
static const int colM[4][4] = { 2, 3, 1, 1,
    1, 2, 3, 1,
    1, 1, 2, 3,
    3, 1, 1, 2 };

static int GFMul2(int s) {
    int result = s << 1;
    int a7 = result & 0x00000100;

    if(a7 != 0) {
        result = result & 0x000000ff;
        result = result ^ 0x1b;
    }

    return result;
}

static int GFMul3(int s) {
    return GFMul2(s) ^ s;
}

/**
 * GF上的二元运算
 */
static int GFMul(int n, int s) {
    int result;

    if(n == 1)
        result = s;
    else if(n == 2)
        result = GFMul2(s);
    else if(n == 3)
        result = GFMul3(s);
    else if(n == 0x9)
        result = GFMul9(s);
    else if(n == 0xb)//11
        result = GFMul11(s);
    else if(n == 0xd)//13
        result = GFMul13(s);
    else if(n == 0xe)//14
        result = GFMul14(s);

    return result;
}

/**
 * 列混合
 */
static void mixColumns(int array[4][4]) {

    int tempArray[4][4];

    for(int i = 0; i < 4; i++)
        for(int j = 0; j < 4; j++)
            tempArray[i][j] = array[i][j];

    for(int i = 0; i < 4; i++)
        for(int j = 0; j < 4; j++){
            array[i][j] = GFMul(colM[i][0],tempArray[0][j]) ^ GFMul(colM[i][1],tempArray[1][j])
                ^ GFMul(colM[i][2],tempArray[2][j]) ^ GFMul(colM[i][3], tempArray[3][j]);
        }
}


```

#### 5 轮钥加密

```

/**
 * 轮密钥加
 */
static void addRoundKey(int array[4][4], int round) {
    int warray[4];
    for(int i = 0; i < 4; i++) {

        splitIntToArray(w[ round * 4 + i], warray);

        for(int j = 0; j < 4; j++) {
            array[j][i] = array[j][i] ^ warray[j];
        }
    }
}



```



# AES解密

```
/**
 * 参数 c: 密文的字符串数组。
 * 参数 clen: 密文的长度。
 * 参数 key: 密钥的字符串数组。
 */
void deAes(char *c, int clen, char *key) {

    int keylen = strlen(key);
    if(clen == 0 || clen % 16 != 0) {
        printf("密文字符长度必须为16的倍数！现在的长度为%d\n",clen);
        exit(0);
    }

    if(!checkKeyLen(keylen)) {
        printf("密钥字符长度错误！长度必须为16、24和32。当前长度为%d\n",keylen);
        exit(0);
    }

    extendKey(key);//扩展密钥
    int cArray[4][4];
    for(int k = 0; k < clen; k += 16) {
        convertToIntArray(c + k, cArray);


        addRoundKey(cArray, 10);

        int wArray[4][4];
        for(int i = 9; i >= 1; i--) {
            deSubBytes(cArray);

            deShiftRows(cArray);

            deMixColumns(cArray);
            getArrayFrom4W(i, wArray);
            deMixColumns(wArray);

            addRoundTowArray(cArray, wArray);
        }

        deSubBytes(cArray);

        deShiftRows(cArray);

        addRoundKey(cArray, 0);

        convertArrayToStr(cArray, c + k);

    }
}
```











