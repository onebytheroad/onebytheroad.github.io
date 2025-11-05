---
title: 11-05 笔记
description: 而今识得愁滋味，欲说还休，欲说还休，却道天凉好个秋...
date: 2025-11-05
slug: 11-05
image: bj.jpg
categories:
    - 每日
---

# 第十五课-结构体

## （1）：结构体定义与使用

### 基本类型与构建类型

![jibenleixing](jibenleixing.png)

#### 结构体定义

![jiegoutidingyi](jiegoutidingyi.png)

一般形式

![dingyideyibanxingshi](dingyideyibanxingshi.png)

第三种没有结构体名称，不能在用来定义新的变量名，只能在这起到临时的变量名1，变量名2的作用

### 初始化定义，初始化与成员访问

![dingyichushihuafangwen](dingyichushihuafangwen.png)

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <stdbool.h>
#include <malloc.h>

typedef struct _student
{
    int id;
    int age;
    char name[20];
    char sex;
    float score;
} student, *pstudent;


int main()
{
    student s1 = { 1001,19,"tom",'m',80.5 };
    student s2 = { 0 };
    s2.id = 1001;
    s2.age = 19;
    strcpy_s(s2.name, 20, "tom");//名字是数组，需要用stucpy拷贝进去
    s2.sex = 'M';
    s2.score = 99.5f;

    printf("id:%d,age:%d,name:%s,sex:%c,%f\n", s1.id,s1.age,s1.name,s1.sex,s1.score);
    printf("id:%d,age:%d,name:%s,sex:%c,%f\n", s2.id,s2.age,s2.name,s2.sex,s2.score);

    return 0;
    
}

```

### 结构体的指针访问：->

![jiegoutidezhizhen](jiegoutidezhizhen.png)

```
    student* ps1 = &s1;
    pstudent ps2 = &s2;//pstudent = student *

    printf("id:%d,age:%d,name:%s,sex:%c,%f\n", ps1->id, ps1->age, ps1->name, ps1->sex, ps1->score);
    printf("id:%d,age:%d,name:%s,sex:%c,%f\n", ps2->id, ps2->age, ps2->name, ps2->sex, ps2->score);
```

注意，长度，加减

```
    //ps1+1
    //sizeof(ps1) 指针大小，根据平台  ,sizeof(*ps1) = sizeof(student)

    printf("sizeof(ps1)=%d,sizeof(*ps1)=%d,sizeof(student)=%d\n", sizeof(ps1),sizeof(*ps1),sizeof(student));

    printf("ps1:%p,ps1+1:%p\n", ps1, ps1 + 1);

```

在堆上分配内存来表示结构体

```
    student* ps3 = (student*)malloc(sizeof(student));
    if (ps3 == NULL)
    {
        return -1;
    }
    memset(ps3, 0, sizeof(student));
    ps3->id = 25;
    ps3->age = 21;
    strcpy_s(ps3->name, 20, "leilei");
    ps3->sex = 'm';
    ps3->score = 86.5f;

    printf("id:%d,age:%d,name:%s,sex:%c,%f\n", ps3->id, ps3->age, ps3->name, ps3->sex, ps3->score);

    free(ps3);
    ps3 = NULL;

```

注意，在free之后，ps3指针依旧指向之前的地址，如果后续还要使用ps3指针，需要重新设为null，否是使用则是垃圾值

### 运算符

![yunsuanfu](yunsuanfu.png)

*pstdt->sex  第一个，箭头优先级高，箭头指向运算之后，所表示的值不是一个地址，无法解引用

*pstdt->name  依旧是箭头优先级高，取出了name，name是数组名，代表数组指针，可以解引用

*pstdt.sex  点号优先级高，指针没有点号这个运算

(*pstdt).sex  解引用指针，解出来是结构体的名字

### 结构体中的结构体

![jiegoutizhongdejiegouti](jiegoutizhongdejiegouti.png)

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <stdbool.h>
#include <malloc.h>

typedef struct _date
{
    int year;
    int month;
    int day;
}date, *pdate;

typedef struct _student
{
    int id;
    int age;
    char name[20];
    char sex;
    float score;
    date birthday;
} student, *pstudent;


int main()
{
    student s1 = { 1001,19,"tom",'m',80.5f,{1995,2,5} };
    student s2 = { 0 };
    s2.id = 1001;
    s2.age = 19;
    strcpy_s(s2.name, 20, "tom");//名字是数组，需要用stucpy拷贝进去
    s2.sex = 'M';
    s2.score = 99.5f;
    s2.birthday.year = 1997;
    s2.birthday.month = 6;
    s2.birthday.day = 21;

    printf("id:%d,age:%d,name:%s,sex:%c,%f,year:%d,month:%d,day:%d\n", s1.id,s1.age,s1.name,s1.sex,s1.score, s2.birthday.year, s2.birthday.month, s2.birthday.day);
    printf("id:%d,age:%d,name:%s,sex:%c,%f\n", s2.id,s2.age,s2.name,s2.sex,s2.score);

    student* ps1 = &s1;
    pstudent ps2 = &s2;//pstudent = student *

    printf("id:%d,age:%d,name:%s,sex:%c,%f\n", ps1->id, ps1->age, ps1->name, ps1->sex, ps1->score);
    printf("id:%d,age:%d,name:%s,sex:%c,%f\n", ps2->id, ps2->age, ps2->name, ps2->sex, ps2->score);

    //ps1+1
    //sizeof(ps1) 指针大小，根据平台  ,sizeof(*ps1) = sizeof(student)

    printf("sizeof(ps1)=%d,sizeof(*ps1)=%d,sizeof(student)=%d\n", sizeof(ps1),sizeof(*ps1),sizeof(student));

    printf("ps1:%p,ps1+1:%p\n", ps1, ps1 + 1);

    printf("sizeof(student *):%d\n", sizeof(student*));

    student* ps3 = (student*)malloc(sizeof(student));
    if (ps3 == NULL)
    {
        return -1;
    }
    memset(ps3, 0, sizeof(student));
    ps3->id = 25;
    ps3->age = 21;
    strcpy_s(ps3->name, 20, "leilei");
    ps3->sex = 'm';
    ps3->score = 86.5f;
    ps3->birthday.year=1996;
    ps3->birthday.month = 8;
    ps3->birthday.day = 1;

    printf("id:%d,age:%d,name:%s,sex:%c,%f,year:%d,month:%d,day:%d\n", ps3->id, ps3->age, ps3->name, ps3->sex, ps3->score,ps3->birthday.year, ps3->birthday.month, ps3->birthday.day);

    free(ps3);
    ps3 = NULL;


    return 0;
    
}
```

### 结构体中的指针

![jiegouti](jiegoutizhongdezhizhen.png)

结构体中有指针必须要为这个指针赋值一个有效的内存

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h> 
#include <stdbool.h>
#include <malloc.h>

typedef struct _student
{
    int id;
    int age;
    char* name;//char name[20]  有指针的话，需要专门为指针指定内存
    char sex;
    float score;
}student, * pstudent;




int main()
{
    student s1 = { 11,21,"tom",'m',97.5f };//tom存储在静态常量区，name可以指向
    student s2 = { 0 };

    s2.id = 15;
    s2.age = 22;

    s2.name = (char*)malloc(20);//指向了堆上的内存
    if (s2.name == NULL)
    {
        return -1;
    }
    memset(s2.name, 0, 20);
    strcpy_s(s2.name,20,"lily");
    s2.sex = 'F';
    s2.score = 94.5f;



    student* s3 = (student*)malloc(sizeof(student));
    if (s3 == NULL)
    {
        free(s2.name);
        return -1;
    }
    memset(s3, 0, sizeof(student));
    s3->id=18;
    s3->age = 23;
    s3->name = (char*)malloc(20);
    if (s3->name == NULL)
    {
        
        free(s3);
        return -1;
    }
    memset(s3->name, 0, 20);

    strcpy_s(s3->name, 20, "david");
    s3->sex = 'M';
    s3->score = 87.5f;

    printf("s1:name:%s\n", s1.name);
    printf("s2:name:%s\n", s2.name);
    printf("s3:name:%s\n", s3->name);

    free(s2.name);
    s2.name = NULL;

    free(s3->name);
    s3->name = NULL;

    free(s3);
    s3 = NULL;

    return 0;
}

```

赋值要注意进行深拷贝

![lianbiaoheshu](lianbiaoheshu.png) 

左边，链表节点  右边，二叉树

作业

![zuoye](zuoye.png)



