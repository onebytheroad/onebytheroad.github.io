---
title: ELF
description: 
date: 2026-01-06
slug: 01-06-2026
image: bj.jpg
categories:
  - ELF
---

# ELF

## 文件格式

* 可重定位文件：包含代码和数据，用来被链接成可执行文件或共享目标文件，如：编译后的目标文件(.o)，静态链接库也可以认为是可重定位文件。

### 什么是可重定位

指一种代码或文件格式，允许程序在内存中被加载到不同的地址而不需要修改代码本身

可重定位代码是在程序加载时生成绝对地址的代码，重定位由操作系统管理，确保程序可以在 不同的内存地址运行

动态重定位和静态重定位是两种主要的重定位方式。动态重定位在程序运行时进行，而静态重定位在程序加载时完成

可重定位文件通常是elf格式的二进制文件，包含了程序的可重定位信息

* 可执行文件：可直接运行的程序，包含代码、数据、入口点地址等。

* 共享目标文件：包含可链接的代码和数据，主要有两个作用：1）与其他可重定位文件或共享目标文件链接生成可执行文件；2）动态连接器在运行可执行文件时加载动态库文件，如：动态链接库(.so)。

### 什么是共享目标文件

一种特殊的目标文件，包含可以被多个程序共享的代码和数据。多个进程都可以共享这些资源。

主要优点是减少了内存占用

* 核心转储文件 ：当程序意外崩溃时，用于调试分析的内存镜像，如：core-dump文件。



## ELF文件包含

![图片](https://i-blog.csdnimg.cn/img_convert/c5dfe562dff72b86098cf95aa05f4e21.png)

链接视图服务于编译/链接阶段，由ELF文件头，节，节区头表组成，以section为单位，一般是可重定位的目标文件

执行视图服务于程序加载/执行阶段，由ELF文件头，程序头表，段和截取头表（可通过strip等操作取出）组成，以Segment为单位，一般是执行文件或共享库

## ELF文件头

ELF文件头描述文件类型，目标机器架构，入口地址，投标位置等信息，

在标准头文件<elf.h>中定义了elf文件格式的所有数据结构，常量，类型和宏

头文件定义了特定大小的数据类型，确保跨平台的一致性

```
/* Type for a 16-bit quantity.  */
typedef uint16_t Elf32_Half;
typedef uint16_t Elf64_Half;
 
/* Types for signed and unsigned 32-bit quantities.  */
typedef uint32_t Elf32_Word;
typedef	int32_t  Elf32_Sword;
typedef uint32_t Elf64_Word;
typedef	int32_t  Elf64_Sword;
 
/* Types for signed and unsigned 64-bit quantities.  */
typedef uint64_t Elf32_Xword;
typedef	int64_t  Elf32_Sxword;
typedef uint64_t Elf64_Xword;
typedef	int64_t  Elf64_Sxword;
 
/* Type of addresses.  */
typedef uint32_t Elf32_Addr;
typedef uint64_t Elf64_Addr;
 
/* Type of file offsets.  */
typedef uint32_t Elf32_Off;
typedef uint64_t Elf64_Off;
 
/* Type for section indices, which are 16-bit quantities.  */
typedef uint16_t Elf32_Section;
typedef uint16_t Elf64_Section;
 
/* Type for version symbol information.  */
typedef Elf32_Half Elf32_Versym;
typedef Elf64_Half Elf64_Versym;
```

<font size=3 color="red">在64位系统和32位系统中elf文件的关键区别在于地址和偏移大小的差异，以及一些字段大小的差异，其基本结构是一致的,</font>所以我们以64位系统的elf头来进行讲解。在64位系统中elf头固定为64个字节，elf头结构如下：

利用这个数据结构可以索引到ELF文件的全部信息

```
/* The ELF file header.  This appears at the start of every ELF file.  */
 
#define EI_NIDENT (16)
 
typedef struct
{
  unsigned char	e_ident[EI_NIDENT];	/* Magic number and other info */
  Elf64_Half	e_type;			/* Object file type */
  Elf64_Half	e_machine;		/* Architecture */
  Elf64_Word	e_version;		/* Object file version */
  Elf64_Addr	e_entry;		/* Entry point virtual address */
  Elf64_Off	e_phoff;		/* Program header table file offset */
  Elf64_Off	e_shoff;		/* Section header table file offset */
  Elf64_Word	e_flags;		/* Processor-specific flags */
  Elf64_Half	e_ehsize;		/* ELF header size in bytes */
  Elf64_Half	e_phentsize;		/* Program header table entry size */
  Elf64_Half	e_phnum;		/* Program header table entry count */
  Elf64_Half	e_shentsize;		/* Section header table entry size */
  Elf64_Half	e_shnum;		/* Section header table entry count */
  Elf64_Half	e_shstrndx;		/* Section header string table index */
} Elf64_Ehdr;
```

readelf 工具查看目标文件 ELF文件头，看到.o文件的类型为ET_REL（可重定位文件），程序

入口地址为0，且程序表头的大小和数量都为0，与链接视图对应

~~~
$ readelf -h elfExample.o
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00 
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              REL (Relocatable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x0
  Start of program headers:          0 (bytes into file)
  Start of section headers:          1304 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           0 (bytes)
  Number of program headers:         0
  Size of section headers:           64 (bytes)
  Number of section headers:         14
  Section header string table index: 11
~~~

上面的结构整理为下面的表格：

| e_ident[16] | ELF 文件标识  <br />Magic: 7f  45  4c  46  02  01  01  00  00  00  00  00  00  00  00  00  <br />7f  45  4c  46: ELF魔数（'DEL'   'E'   'L'   'F'）  <br />02: 目标平台文件类型(1=32位; 2=64位)  <br />01: 目标平台字节序(1=小端序; 2= 大端序)  <br />01：ELF标识版本(当前为1)  <br />00：操作系统ABI(0=System V)  <br />00：ABI版本  <br />剩余字节：填充字节(全0) |
| ----------- | ------------------------------------------------------------ |
| e_type      | 目标文件类型  <br />ET_REL:值为0x0001，可重定位文件，如.a文件  <br />ET_EXEC:值为0x0002，可执行文件  <br />ET_DYN:值为0x0003，共享目标文件，如.so文件  <br />ET_CORE:值为0x0004，核心转存储文件，如core-dump文件 |
| e_machine   | 目标CPU架构EM_X86_64: 值为0x003E，<br />X86_64 架构`EM_ARM`: 值为0x0040，<br />ARM 架构: 值为0x0040，ARM 架构 |
| e_version   | ELF文件格式版本号<br />`EV_NONE` (0)：无效版本<br />`EV_CURRENT` (1)：当前版本 |
| e_entry     | 程序开始执行的虚拟地址,<br />目标文件：总是0                 |
| e_phoff     | 程序头表偏移：程序头表在ELF文件中偏移的字节数<br />紧接这ELF头之后，所以本例为64<br />对于目标文件没有程序头表，所以总是为0 |
| e_shoff     | 节区头表偏移：节区头表在ELF文件中偏移的字节数                |
| e_flags     | 处理器特定的标记：与具体的处理其相关                         |
| e_ehsize    | ELF头大小：64位ELF文件固定为64字节                           |
| e_phentsize | 程序头表每个条目大小：64位ELF文件，固定位56字节              |
| e_phnum     | 程序头表条目数量                                             |
| e_shentsize | 节区头表每个条目的大小：64位ELF文件，固定为64字节            |
| e_shnum     | 节区头表条目数量                                             |
| e_shstrndx  | 节区名称字符串表节区的节区索引值                             |

## 节区头表

节区头表包含了ELF文件中各个节区（Section）的详细信息，如节区名称、节区大小、节区偏移、节区属性等，ELF头中的`e_shoff`字段指向节区头表的起始位置。

节区头表的结构：

```
typedef struct
{
  Elf64_Word	sh_name;		/* Section name (string tbl index) */
  Elf64_Word	sh_type;		/* Section type */
  Elf64_Xword	sh_flags;		/* Section flags */
  Elf64_Addr	sh_addr;		/* Section virtual addr at execution */
  Elf64_Off	sh_offset;		/* Section file offset */
  Elf64_Xword	sh_size;		/* Section size in bytes */
  Elf64_Word	sh_link;		/* Link to another section */
  Elf64_Word	sh_info;		/* Additional section information */
  Elf64_Xword	sh_addralign;		/* Section alignment */
  Elf64_Xword	sh_entsize;		/* Entry size if section holds table */
} Elf64_Shdr;
```



| sh_name      | 节区名称索引，是节区头部字符串表节区的索引。                 |
| ------------ | ------------------------------------------------------------ |
| sh_type      | 节区类型<br/><br/>SHT_NULL：无效节区；<br/><br/>SHT_PROGBITS：程序代码节区/数据节区/数据节区；SHT_SYMTAB：符号表；<br/><br/>SHT_STRTAB：字符串表；<br/><br/>SHT_RELA：带addend的重定位的节区；<br/><br/>SHT_HASH：符号哈希表；<br/><br/>SHT_DYNAMIC：动态链接信息；<br/><br/>SHT_NOTE：注释信息；<br/><br/>SHT_NOBITS：该节区不占用文件空间（如.bss）；<br/><br/>SHT_REL：无addend的的重定位条目；<br/><br/>SHT_DYNSYM：动态链接符号表。 |
| sh_flags     | 节区标志<br/><br/>SHF_WRITE：可写；<br/><br/>SHF_ALLOC：在内存中分配空间；<br/><br/>SHF_EXECINSTR：包含可执行指令；<br/><br/>SHF_MERGE：可合并数据；<br/><br/>SHF_STRINGS：包含以null结尾的字符串；<br/><br/>SHF_INFO_LINK：sh_info 包含节区索引；<br/><br/>SHF_LINK_ORDER：特殊链接顺序；<br/><br/>SHF_OS_NONCONFORMING：操作系统特定；<br/><br/>SHF_GROUP：节区组；<br/><br/>SHF_TLS：线程本地存储。 |
| sh_addr      | 节区加载到内存中的虚拟地址，0表示该节区不会被加载到内存。    |
| sh_offset    | 节区内容在文件中的偏移。如果节区类型是SH_NOBITS（如.bss），表示该节区不占用文件空间，该值无意义。 |
| sh_size      | 节区大小。如果节区类型是SH_NOBITS（如.bss），内存空间大小 > 文件空间大小（为0） |
| sh_link      | 节区的链接信息，依赖于节区类型，如果节区类型与链接相关（不论是动态链接或者是静态链接），比如重定位节区、符号表节区，那么这两个成员是有意义的，对于其他类型的节区是没有意义的。 |
| sh_info      | 同上                                                         |
| sh_addralign | 节区地址的对齐要求，代码节区通常对齐到16字节。               |
| sh_entsize   | 条目大小，对于表类型节区（如符号表），它的每个条目大小固定，sh_entsize指定了每个条目大小的字节数。 |

readelf查看节区表

```
$ readelf -SW elfExample.o 
There are 14 section headers, starting at offset 0x518:
 
Section Headers:
  [Nr] Name              Type            Address          Off    Size   ES Flg Lk Inf Al
  [ 0]                   NULL            0000000000000000 000000 000000 00      0   0  0
  [ 1] .text             PROGBITS        0000000000000000 000040 00006e 00  AX  0   0  1
  [ 2] .rela.text        RELA            0000000000000000 000378 0000f0 18   I 12   1  8
  [ 3] .data             PROGBITS        0000000000000000 0000b0 000010 00  WA  0   0  8
  [ 4] .rela.data        RELA            0000000000000000 000468 000018 18   I 12   3  8
  [ 5] .bss              NOBITS          0000000000000000 0000c0 000004 00  WA  0   0  4
  [ 6] .rodata           PROGBITS        0000000000000000 0000c0 000039 00   A  0   0  1
  [ 7] .comment          PROGBITS        0000000000000000 0000f9 000036 01  MS  0   0  1
  [ 8] .note.GNU-stack   PROGBITS        0000000000000000 00012f 000000 00      0   0  1
  [ 9] .eh_frame         PROGBITS        0000000000000000 000130 000058 00   A  0   0  8
  [10] .rela.eh_frame    RELA            0000000000000000 000480 000030 18   I 12   9  8
  [11] .shstrtab         STRTAB          0000000000000000 0004b0 000066 00      0   0  1
  [12] .symtab           SYMTAB          0000000000000000 000188 000198 18     13  11  8
  [13] .strtab           STRTAB          0000000000000000 000320 000058 00      0   0  1
Key to Flags:
  W (write), A (alloc), X (execute), M (merge), S (strings), l (large)
  I (info), L (link order), G (group), T (TLS), E (exclude), x (unknown)
  O (extra OS processing required) o (OS specific), p (processor specific)
```

elfExample.o节区表是以“Elf64_Shdr”结构体为元素的数组，每个“Elf64_Shdr”结构体对应一个节区，数组共有14个元素，其中第一个元素类型是“NULL”（无效段描述符），所以elfExample.o共有13个效节区。elfExample.o各字段与“Elf64_Shdr”结构体成员的含义一致。

其中，Address是程序加载到内存的虚拟地址，在目标文件中虚拟地址空间尚未分配，值全是0，链接后被自动替换为实际的虚拟地址。

## 节

### .text 节区

.text节区是存储可执行代码，节区类型是SHT_PROGBITS，

标记为SHF_ALLOC +SHF_EXECINSTR，属性为只读，

使用objdump工具对elfExample.o的.text节区反汇编，可以看到函数myPrint和main




### .data 节区

.data节区是存储已初始化的全局变量和静态变量，节区类型是SHT_PROGBITS，标记为SHF_ALLOC +SHF_WRITE，属性为可读写，

前面ELF文件的节区表中显示.data节区的size为0x10，

源码elfExample.c中包含一个常量指针const_str（64位系统占8个字节）、一个已初始化全局变量g_initVar（int类型占4个字节）和一个已初始化的静态变量s_initVar（int类型占4个字节，所以.data节区的大小=4+4+8=16，与节区表中的大小一致。




### .rodata节区

.rodata节区存放程序的只读数据，一般是只读变量（Const修饰的变量）和字符串常量。查看.rodata节区的内容，可以看到程序中所有字符串常量的完整内存布局，如：二进制“454c4620 4578616d 706c6500”对应的是"ELF Example"+'\0'；“636f6e73 745f7374 723a2025 730a00”对应的是“const_str: %s\n”+'\0'，其余字段类似。

### .bss节区

.bss节区存放未初始化的或初始化为0的全局变量和静态变量（如果全局变量或静态变量被初始化为0，编译器会将其放在.bss节区，节省文件空间），节区类型和属性与.data节区相同。

ELF文件的节区表中显示.bss节区的size为0x4，这与源码elfExample.c中g_uninitVar（int类型占4个字节）和s_uninitVar（int类型占4个字节）共8个字节不符。使用objdump查看符号表，可以看到s_uninitVar存放在目标文件的.bss节区，.g_uninitVar没有被放在任节区，只是一个未定义的“COMMON符号"，这与具体的编译器相关，有些编译器会将未初始化的全局符号放在目标文件的.bss段，有些则仅预留一个未定义符号，等到最终链接成可执行文件时再在分配空间。




### 重定位表

在节区表中有.rele.text、.rele.data和.rela.eh_frame节区，他们的类型都是SHT_RELA，即重定位表。链接器在处理目标文件时，需要对目标文件中某些部位进行重定位，如elfExample.c中对printf函数的调用。

一个重定位表同时也是ELF中的一个节区，"Lk"（也就是"sh_link"）代表符号表的下标，"Inf"（也就是"sh_info"）代表它作用于哪个节区。如:".rele.text"作用于节区text,".rele.text"的"Inf"为 1，所以".text"的下标为1 。





### 字符串表

ELF文件中有很多字符串，比如段名，变量名等，但字符串的长度不固定，一种常见做法是把字符串集中起来存放到一个表中，然后使用字符串在表中的偏移来引用字符串，'\0'作为字符串结束符。

字符串表在ELF文件中是以节区的形式保存，".shstrtab"是节区名称字符串表节区，用来保存节区名称的字符串。".strtab"是字符串表节区，用来保存普通的字符串。

通过下面的流程可以在".shstrtab"中获取到节区名称：

![图片](https://i-blog.csdnimg.cn/img_convert/750c0c27171981b998d40598e0a1cafd.png)

### 符号表

符号表中存储了程序中的各种符号及其对应的信息：函数名称、全局变量名称、局部变量名称、标签等。符号表的作用是：1）在链接阶段，链接器需要将不同的目标文件（.o）中的符号引用和符号定义进行链接匹配；2）调试器也依赖于符号表中的信息来映射源代码中的变量和函数到执行文件中的地址。符号表的类型：".symtab"（符号表）和".dynsym"(动态符号表，可执行文件和共享库中存在，用于运行时解析符号)。

| 字段     | 含义                                                         |
| -------- | ------------------------------------------------------------ |
| st_name  | 符号名称在字符串表(.strtab)中的字节偏移（与前面获取节区名称的流程相似） |
| st_info  | 符号类型（低4位）<br/>STT_NOTYPE:值为0，未知类型符号<br/>STT_OBJECT:值为1，数据对象，如变量、数组等<br/>STT_FUNC:值为2，函数或其他可执行代码<br/>STT_SECTION:值为3，该符号表示一个段<br/>STT_FILE:值位4，该符号表示文件名<br/>绑定信息（高28位）<br/>STB_LOCAL:值为0，局部符号，目标文件外部不可<br/>STB_GLOBAL:值为1，全局符号，外部可见<br/>STB_WEAK:值为2，弱引用 |
| st_other | 该成员暂未使用，值为0                                        |
| st_shndx | 符号所在的节，如果符号定义在本目标文件中，那么这个成员表示符号所在的段表中的下标 |
| st_value | 符号值，通常是符号的虚拟地址，或符号在段中的偏移             |
| st_size  | 符号大小                                                     |

## 程序头表

程序头表描述了段的结构，它指导操作系统将多个段加载到虚拟内存空间。

可以看到，程序头表中包含了9个段（Segment），段的结构如下：

| 字段     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| Type     | 段类型<br/><br/>PT_PHDR:描述程序头表自身的位置<br/><br/>PT_LOAD:可加载到内存的段，包含代码段、数据段<br/><br/>PT_DYNAMIC:包含动态链接所需的信息<br/><br/>PT_NODE:辅助信息<br/><br/>PT_INTERP:指定动态链接器的路径<br/><br/>PT_GNU_STACK:控制栈的执行权限<br/><br/>PT_GNU_RELRO:指定重定位后只读的区域 |
| Offset   | 段在ELF文件的偏移                                            |
| VirtAddr | 段在内存中的起始地址                                         |
| PhysAddr | 段的物理内存地址（在需要物理地址的系统中才需要）             |
| FileSize | 段在文件中所占的字节数                                       |
| MemSize  | 段在内存中所占的字节数                                       |
| Flags    | 段权限<br />PF_X:可执行权限<br />PF_W:可写权限<br />PF_R:可读权限<br />PF_MASKPROC:处理器架构特定的权限标记 |
| Align    | 段在内存中的对齐要求                                         |



具有相同属性的section会被链接器归类到一个Segment

![图片](https://i-blog.csdnimg.cn/img_convert/37c22f69eca256f6f8c941881d02807c.png)

一般不会过度区分节和段，基本都称之为段
