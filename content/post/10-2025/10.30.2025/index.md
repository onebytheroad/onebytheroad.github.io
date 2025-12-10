---
title: 10-30 程序中的字符串
description: 相见时难别亦难，东风无力百花残。
date: 2025-10-30
slug: 10-30
image: bj.jpg
categories:
    - c语言基础
---

## (2):程序中的字符串

![chengxuzhongshiyongzifuchuan](C:/blog/my-blog/content/post/10-2025/10.29.2025/chengxuzhongshiyongzifuchuan.png)

1.赋值给了字符指针，其字符存放在静态常量区，赋值是将字符内存的首地址赋给了该指针

通过指针++，可以不断的扫描该字符，直到遇到\0字符为止

2.赋值给了字符数组 str2   ，与上面不同，是将静态区的字符拷贝到str2数组里面，而且字符数组的内存是可以修改的，元素个数，即包含0字符在内的所有字符

3.该字符数组包含了100个元素，赋值的字符串没有100个元素，多余的部分默认为0

4.该字符数组占12个字符，相当于整体的字符串赋值进入，sizeof(str4)=12,但是如果用strlen来计算字符串的值的话，会在第一个\0截断

#### 程序中使用字符串 堆上

![duishang](C:/blog/my-blog/content/post/10-2025/10.29.2025/duishang.png)

![zifuchuan](C:/blog/my-blog/content/post/10-2025/10.29.2025/zifuchuan.png)

可以存在全局数组里面，可以用指针指向，可以拷贝到栈上，可以从堆里分配字节来存放

堆上用了之后需要free，否则会造成内存的泄露

s2指向了hello world的地址，不能通过s2来更改数组里元素的值   **编译发现不了，但是程序会崩溃**

静态常量区是不可以修改的

#### 字符串的遍历

![zifuchuanbianli](C:/blog/my-blog/content/post/10-2025/10.29.2025/zifuchuanbianli.png)

#### 字符串做参数

![zifuchuanzuohanshucanshu](C:/blog/my-blog/content/post/10-2025/10.29.2025/zifuchuanzuohanshucanshu.png)

#### 字符串与字符数组

![zifuchuanyuzifushuzu](C:/blog/my-blog/content/post/10-2025/10.29.2025/zifuchuanyuzifushuzu.png)

1.纯粹的字符数组

2.可以当作一个字符串

3.作为字符数组有5个元素，作为字符串有前面三个元素

4.即是数组也是字符串

### 字符串数组

![zifuchuanshuzu](C:/blog/my-blog/content/post/10-2025/10.29.2025/zifuchuanshuzu.png)

作业

![zuoye](zuoye.png)



作业

1.

```
sizeof(p1)=4 x86
sizeof(p2)=9
sizeof(p3)=1024
sizeof(p4)=8

strlen(p1)=8
strlen(p2)=8
strlen(p3)=1024
strlen(p4)=8

```

2.

```
char name1[3][20]=     定义一个二维数组，有三行，每一行能存20个字节，引号中的字符存入数组中，按顺序排列，然后数组存放在内存中
char *name2{3}=       定义一个一维数组指针，存放了三个元素，三个元素存在静态常量区，将字符内存的首地址赋值给了指针

char *S1 = "hello world"    定义一个指针指向存放在静态常量区的一个字符串
char s2[] = "hello world"   定义了一个数组，存放了字符串
```



## 
