---
title: 12-18 解题
description: 最后一次见你是我做的短梦，梦里有你还有一群冬风
date: 2025-12-18
slug: 12-18
image: bj.jpg
categories:
  - BUU WP	
---

1

py在线反编译工具

~~~
print 'Welcome to Re World!'
print 'Your input1 is your flag~
l = len(input1)
for i in range(l):
    num = ((input1[i] + i) % 128 + 128) % 128
    code += num

for i in range(l - 1):
    code[i] = code[i] ^ code[i + 1]

print code
code = [
    '%1f',
    '%12',
    '%1d',
    '(',
    '0',
    '4',
    '%01',
    '%06',
    '%14',
    '4',
    ',',
    '%1b',
    'U',
    '?',
    'o',
    '6',
    '*',
    ':',
    '%01',
    'D',
    ';',
    '%',
    '%13']

~~~

逆向

```
code = [
    '%1f',
    '%12',
    '%1d',
    '(',
    '0',
    '4',
    '%01',
    '%06',
    '%14',
    '4',
    ',',
    '%1b',
    'U',
    '?',
    'o',
    '6',
    '*',
    ':',
    '%01',
    'D',
    ';',
    '%',
    '%13']

code1 = []

for i in code:
    if i.startswith('%') and len(i)>1:
        code1.append(int(i[1:],16))
    else:
        code1.append(ord(i))

for i in range(len(code)-2,0,-1):
    code1[i] = code1[i] ^ code1[i + 1]
print(code1)
code2 = ''

for i in range(len(code1)):
    num = (code1[i] - i + 128) % 128
    code2 += chr(num)
print(code2)


```

