---
title: 12-20 笔记
description: 出师未捷身先死，常使英雄泪满襟
date: 2025-12-20
slug: 12-20-2025-biji
image: bj.jpg
categories:
  - 笔记
---

# API

它预先把这些复杂的操作写在一个函数里面，编译成一个组件（一般是动态链接库），随操作系统一起发布，并配上说明文档，程序员只需要简单地调用这些函数就可以完成复杂的工作，让编程变得简单有趣。这些封装好的函数，就叫做API(Application Programming Interface)，即应用程序编程接口。

API（Application Programming Interface）是软件系统之间的桥梁，定义了一套规则，使得调用方（客户端）可以通过接口与服务端进行交互，而无需了解服务端的内部实现。例如，当你在应用中查询天气或进行支付时，实际上是通过 API 与天气服务或支付系统进行通信。

# OLLVM

OLLVM是一款针对于LLVM的代码混淆工具，整个项目包含数个独立功能的LLVM Pass，每个pass对应实现一种特定的混淆方式，这些pass将在后面进行细说，通过pass可以改变源程序的CFG和源程序的结构。

## 三大功能

（1）指令替换功能：随机选择一种功能上等效但更复杂的指令序列替换标准二元运算符；适用范围：加法操作、减法操作、布尔操作（与或非操作）且只能为整数类型。

（2）混淆控制流功能：

1.在当前基本块之前添加基本块来修改函数调用图。

2.原始基本块也被克隆并填充随机选择的垃圾指令。

（3）控制流平展功能：目的是完全展平程序的控制流程图。

 将 `if/else`、`for` 等结构转为 **switch + 状态机**

“压扁逻辑”：所有分支从同一个入口进入

## 二、原始 C 代码示例

```
// original.c
int main() {
    int x = 5;
    if (x > 0) {
        printf("Positive\n");
    } else if (x < 0) {
        printf("Negative\n");
    } else {
        printf("Zero\n");
    }
    return 0;
}
```

这是一个典型的三路分支结构。

------

### 应用 `-bcf`（虚假控制流）

**效果**：插入看似有用、实则无害的“垃圾分支”。

```
int main() {
    int x = 5;

    // 虚假分支 1（永远不执行）
    if ((rand() % 100) < -1) {
        dummy_function(); // 无副作用
    }

    if (x > 0) {
        printf("Positive\n");
    } 
    // 虚假分支 2
    else if ((x ^ x) == 1) { // 永远 false
        fake_print();
    }
    else if (x < 0) {
        printf("Negative\n");
    } 
    // 虚假分支 3
    else if (0) {
        unreachable_code();
    }
    else {
        printf("Zero\n");
    }

    // 更多无意义跳转...
    goto label_end;
label_end:
    return 0;
}
```

- 原逻辑不变
- 多出很多“看起来像分支”的代码
- 反编译后流程图变得杂乱

------

### 应用 `-fla`（控制流平展）

**效果**：把 `if-else` 变成 `switch` + 状态变量。

```
int main() {
    int x = 5;
    int state = 0;

    // 初始化状态
    if (x > 0) state = 1;
    else if (x < 0) state = 2;
    else state = 3;

    // 平展后的主循环
    while (1) {
        switch (state) {
            case 1:
                printf("Positive\n");
                state = 4; // 跳转到结束
                break;
            case 2:
                printf("Negative\n");
                state = 4;
                break;
            case 3:
                printf("Zero\n");
                state = 4;
                break;
            case 4:
                goto end_loop; // 结束
        }
    }
end_loop:
    return 0;
}
```

 **特点**：

- 所有逻辑都在 `switch` 里
- 原始条件判断被“隐藏”在状态赋值中
- 静态分析难以还原 `if-else` 结构

------

###  应用 `-split`（基本块分割）

**效果**：把一行代码拆成多行，插入无意义中间变量。

原始片段：

```
printf("Positive\n");
```

分割后可能变成：

```
char* str1 = "Pos";
char* str2 = "itive\n";
char full[20];
strcpy(full, str1);
strcat(full, str2);
printf("%s", full);
```
