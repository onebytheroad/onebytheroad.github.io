---
title: Chinese Test
description: 这是一个副标题
date: 2020-09-09
slug: test-chinese
image: helena-hertz-wWZzXlDpMog-unsplash.jpg
categories:
    - Test
    - 测试
---

# 第一周学习总结（未完）
首先是在ctfplus做的题  
做了一部分misc和一部分re的题  
先说re  
有两到sign题  
sign1 在ida中反编译在代码中直接能看到flag  
![photo by sign1](sign1.jpg)  
sign2 根据运行提示和代码分析，flag应该是通过ROT47方式加密的  
ROT47：凯撒加密变种，通过映射ASCII 字符集进行移位加密。可以将数字，字母，符号全部混合互换  
加密解密算法完全相同  
此题已知flag开头为"0xGame",将问题喂给ai，通过python代码暴力破解可以得到答案  
不过此题中还进行了一个变换  
其中decrypt是一个解密函数，并不是常规rot47解密，此题是一个rot47的变种  
![photo by sing2](sign2.jpg)  
