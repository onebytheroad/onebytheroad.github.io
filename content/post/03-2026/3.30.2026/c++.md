---
title: "C++ 面向对象程序设计"
date: 2026-03-27
published: 2026-03-27
tags: ["C++", "编程"]
draft: false
---


# c++面向对象程序设计

最小编程单元是一个class

class分两种，带指针和不带指针

设计单一class即基于对象，将几个class连接起来即面向对象



c语言：

数据产生，编写函数处理，数据是全局的，单独的

c++：

数据与函数包在一起，称之为class，与c的结构类似



c++

complex  复数，需要有实部和虚部，不含指针，函数包含加减乘除共轭正弦

一些数据和一个函数组成class来处理数据

string  字符串，一个指针，指向了一串字符，函数包含拷贝输出附加插入



~~~c++
#include <iostream>
using namespace std;

int main()
{
	int i = 7;
	cout << "i=" << i << endl;

	return 0;
}
~~~



~~~c
#include <studio.h>

int main()
{
	int i =7;
	printf("i = %d",i);
	
	return 0;
}
~~~





Hear 头文件的布局

~~~c++
//complex.h

#ifndef __COMPLEX__//如果不曾定义过这个名词
#define __COMPLEX__//就定义出来
//布局

//forward declarations 前置声明
#include <cmath>

class ostream;
class complex;

complex&
    __doapl (complex* ths,const complex& r);


//头 声明 
class complex//class head
{//class body s
    public:
    	complex (double r = 0,double i =0)
            : re (r),im (i)
        {   }
        complex& operator += (const complex&);
        double real () const { return re;}
        double imag () const { return im;}
    private:
    	double re,im;
    	
    	friend complex& __doapl (complex*,const complex&);
    //class body e
    
    
};


//头  定义
complex::function

    


#endif

~~~

有些函数直接再class body里面定义，有些不在body里面定义



## inline （内联）函数

函数在class body里面定义完成，就成为inline,提升运行速度

函数太复杂不会成为inline，是否inline由编译器决定

```c++
class complex
{
    public:
    	complex (double r = 0,double i =0)
            : re (r),im (i)
        {   }
        complex& operator += (const complex&);
        double real () const { return re;}
        double imag () const { return im;}
    private:
    	double re,im;
    	
    	friend complex& __doapl (complex*,const complex&); 
};
```

~~~c++
inline double
imag(const complex& x)
{
    return x.imag ();
}
~~~



在本体之中，区分大段

access level 访问级别

~~~c++
class complex
{
    public:
    	complex (double r = 0,double i =0)
            : re (r),im (i)
        {   }
        complex& operator += (const complex&);
        double real () const { return re;}
        double imag () const { return im;}
    private:
    	double re,im;
    	
    	friend complex& __doapl (complex*,const complex&); 
};
~~~

public 公开的

private 私人的，一般隐藏的是数据部分

×:

~~~c++
{
complex c1(2,1);
cout << c1.re;
cout << c1.im
}
~~~

段落之间可以交错，不一定必须要集中成两段才有用

√:

```c++
{
complex c1(2,1)
cout << c1.real;
cout << c1.imag;
}
```

数据需要通过函数向外界传递，不能直接c1.re这样往外界拿





## 3 构造函数 constructor ctor 

如果想要创建一个对象，会自动调用构造函数

~~~c++
class complex
{
    public:
    	complex (double r = 0,double i =0)//默认实参,创建时未指明，即使用默认
            : re (r),im (i)  //构造函数的特别语法，初值列，初始列
        {   }//没有返回类型，大括号里面是赋值的操作
    
        complex& operator += (const complex&);
        double real () const { return re;}
        double imag () const { return im;}
    private:
    	double re,im;
    	
    	friend complex& __doapl (complex*,const complex&); 
};
~~~

~~~c++
{
complex c1(2,1);//创建一个实部为2，虚部为1的数
complex c2;//创建一个对象，没有参数
complex* p = new complex(4);//动态的方式创建复数，得到的是一个指针
}
//三个都在创建对象
~~~

~~~c++
complex (double r = 0,double i =0)
   : re (r),im (i)//初值列，初始列
{   }
构造方式独特，函数的名称必须和类的名称相同，才能叫做构造函数
~~~





构造函数 可以有很多个  -  overloading（重载）  相同函数名称，多个以上

~~~ c++
class complex
{
    public:
    	complex (double r = 0,double i = 0 )//1
            : re (r),um(i)
            { }
    	complex () :re(0),im(0) {}//2
    	complex& perator += (const complex&);
    double real () const {return re;}//11
    double imag () const {return im;}//11
    
   private:
    	double re,im;
    
    	friend complex& __doapl(complex*, const complex&);
};
~~~

~~~c++
void real(double r) const(不允许) {re = r;}//22
~~~

~~~
11
22
一起编译后的实际名称
?real@Complex@@QBENXZ
?real@Complex@@QAENABN@Z
~~~

2中的语法是不可以的，因为有默认参数，即

~~~
{
complex c1;
complex c2();
}
对上述代码在运行中时，如果同时出现1和2两个代码，编译器会不知道该调用哪一个
~~~



构造函数被放在 private 区

 ~~~c++
 class complex
 {
     public:
     	complex (double r = 0,double i = 0 )//1
             : re (r),um(i)
             { }
     	complex () :re(0),im(0) {}//2
     	complex& perator += (const complex&);
     double real () const {return re;}//11
     double imag () const {return im;}//11
     
    private:
     	double re,im;
     
     	friend complex& __doapl(complex*, const complex&);
 };
 ~~~

这样之后就不能调用complex创建对象



==` Singleton`==  单体，只允许被调用一次

~~~c++
class A{
public:
static A& getInstance();
setup(){}
private:
A();
A(const A& rhs);
...
};

A& A::getInstance()
{
static A a;
return a;
}
~~~



## const menber functions (常量成员函数)

const  不改变数据

~~~c++
class complex
{
    public:
    	complex (double r = 0,double i = 0 )//1
            : re (r),um(i)
            { }
    	complex () :re(0),im(0) {}//2
    	complex& perator += (const complex&);
    double real () const {return re;}//11
    double imag () const {return im;}//11
    
   private:
    	double re,im;
    
    	friend complex& __doapl(complex*, const complex&);
};
~~~

```c++
{
    complex c1(2,1);
    cout << c1.real();
    cout << c1.imag();
}

√
```

```c++
{
    const complex c1(2,1);
    cout << c1.real();
    cout << c1.imag();
}
//所调用的函数没写const。可能会改变所设定不可改变的值，不能通过编译
```



## 4 参数传递 pass by value   vs   pass by reference

==double==

==const complex&==

==ostream&==

~~~c++
class complex
{
    public:
    	complex (double r = 0,double i = 0 )//1
            : re (r),um(i)
            { }
    	complex& perator += (const complex&);
    double real () const {return re;}//11
    double imag () const {return im;}//11
    
   private:
    	double re,im;
    
    	friend complex& __doapl(complex*, const complex&);
};
~~~



~~~c++
ostream&
operator << (ostream& os ,const complex& x)
{
    return os << '(' << real (x) << ','
        	  << imag (x) << ')';
}
~~~



~~~c++
{
complex c1(2,1);
complex c2;

c2+= c1;
cout << c2;
}
~~~

pass value

传递整包数据，比如double是四个字节，就传递四个字节

尽量不pass value

传递地址的指针，即c++引用，引用指针，reference。尽量传引用更快，可以使用const 传递引用，不能改



## 返回值传递 pass by value   vs   pass by reference

如果可以的话，尽量传递引用



## friend 友元

```c++
class complex
{
    public:
    	complex (double r = 0,double i = 0 )
            : re (r),um(i)
            { }
    	complex& perator += (const complex&);
    double real () const {return re;}
    double imag () const {return im;}
    
   private:
    	double re,im;
    
    	friend complex& __doapl(complex*, const complex&);
};
```



~~~c++
inline complex&
__doapl (complex* ths ,const complex& r)
{
	ths->re += r.re;
	ths->im += r.im;
	return *ths;
}
//可以直接拿，
//朋友函数相当于打开了class的封装
~~~



## 相同的class的各个objects互为friends（友元）

~~~c++
class complex
{
    public:
    	complex (double r = 0,double i = 0 )
            : re (r),um(i)
            { }
int fun(const complex& param)
{return param.re + param.im }
    
   private:
    	double re,im;

};
~~~

==int fun(const complex& param)==
=={return param.re + param.im }==

没有透过函数直接拿取private的数据



~~~c++
{
complex c1(2,1);
complex c2;

c2.func(c1);
}
~~~



## class body 外的各种定义

什么情况下可以 pass by reference

什么情况下可以 return by reference



~~~c++
inline complex&
__doapl(complex* ths,const complex& r)
{
ths->re += r.re;//第一参数将会被改动
ths->im += r.im;//第二参数不会被改动
return *ths;//ths , r 是两个参数，+=，ths就作为一个存储参数
}

inline complex&
complex::operator += (const complex& r)
{
	return __doapl(this, r);
}

~~~



## header 中的防御式声明





## 5 operator overloading  (操作符重载-1，成员函数)   this





## class body 之外的各种定义

~~~c++
inline double
imag(const complex& x)
{
	return x.imag();
}

inline double
real(const complex& x)
{
	return x.real ();
}
~~~



~~~c++
{
complex c1(2,1);

cout << imag(c1);
cout << real(c1);
}
~~~





### operator overloading  (操作符重载-2，非成员函数)   无this

复数加复数

复数加double

double加复数





### temp object 临时对象  ==typename();== (    int i   )

==下面这些函数绝不可return by reference,==
==因為，它們返回的必定是個local object.==

~~~c++
inline complex
operator (const complex&x,const complex&y)
{
return complex  (real(x)+real(y)
			    imag (x)+imag(y);
}
                 
inline complex
operator (const complex&x,double y)
{
return complex (real (x)+y,imag (x));
}
                
inline complex
operator (double x,const complex&y)
{
return complex (x real (y),imag (y));
}
~~~



### operator overloading 操作符重载，非成员函数

~~~c++
inline bool
operator == (const complex&x,
             const complex&y)

{
return real(x) == real(y)
    && imag(x) == imag(y）;
}

inline bool
operator == (const complex&x,double y)
{
return real (x) - y && imag (x) == 0;
}

inline bool
operator == (double x,const complex&y)
{
return x == real(y）&& imag(y）== 0;
}
~~~



## 6 复习complex类的实现过程

首先是防卫式函数定义

然后设计class head

考虑复数需要什么数据，数据放在private里,应该有实部虚部，考虑实部虚部是什么类型

考虑写一些什么函数，函数应该是对外发表的，public里

任何一个class都要去想他的构造函数 - 构造函数的语法 - 没有返回类型

构造函数应该接受哪些参数，再考量要不要默认值，考虑参数的传递是value，reference

构造函数的特别语法-初值列--

然后设计函数，全局函数或者class的成员函数

再思考我们设计的函数需不需要加const

friend 函数，可以直接取得private的数据，即想要直接取得data

public  已经写了是内联函数

接着处理class外围的代码

~~~c++

#ifndef __COMPLEX__
#define __COMPLEX__

class complex
{
public:
	complex(double r = 0, double i = 0)
		: re(r), im(i)//实部虚部设为传进来的初值r和i
	{ }
	complex& operator += (const complex&);//设计为成员函数写在class里
	double real  () const { return re; }
	double imag  () const { return im; }//再设定函数，取得实部和虚部,因为设定的是取出不是改动，所以需要加const
private:
	double re, im;

	friend complex& __doapl(complex*, const complex&);
};

inline complex&
__doapl(complex* ths, const complex& r)
{
	ths->re += r.re;
	ths->im += r.im;
	return *ths;
}

inline complex&//接口，不一定会成为inline
complex::operator += (const complex& r)
{
	return __doapl(this,r);//丢给另外一个函数
}
//操作符重载，属于complex class里的，所以函数名是这样
//思考+=的参数，由于是一个成员函数，作用在左边身上，作为一个隐藏的函数放进来，参数只写右边
//这个函数中，右边加到左边，右边不动，即const
//左手边是复数

inline complex
operator + (const complex& x, const complex& y)//设计非成员函数，复数可以加很多数，设计在成员里面会有限制
{
	return complex( real(x) + real(y),
	                imag(x) + real(y)           );//创建新的，直接在类的后面加小括号就算创建了
	//新东西里面可以给初值，一口气在创建的新东西里面完成相加

}
//因为两个传入数据都没改变，必须要用一个新东西来作为相加的结果
//新东西必须在函数里，新的local，一定不能传引用
//如果 + 设计在class里，那么后续的实数加复数无法实现

inline complex
operator + (const complex& x, double y)
{
	return complex(real(x) + y, imag(x));
}

inline complex
operator + (double x, const complex& y)
{
	return complex(x + real(y), imag(y));
}



#endif
~~~



## 7 classes 的两个经典分类

class without pointer member(s)

​	complex

class with pointer menber(s)

​	string

指针传参

~~~c++
#ifndef __MYSTRING__
#define __MYSTRING__

class String
{
public:
	string(const char* cstr = 0);
	string(const string& str);
	string& operator = (const string& str)
	~string();
	char* get_c_str() const { return m_data}
private:
	char* m_data;
};

String::function()

Global-function()


inline
String::String(const char* cstr = 0)
{
	if(cstr){
	m_data = new char[strlen(cstr)+1];
	strcpy(m_data,cstr);
	}
	else {
		m_data = new char[1];//new 即是分配内存
		*m_data ='\0';
	
	}
}
//有动态分配的内存，需要把内存清理掉，否则会造成内存泄漏
inline
String::~String()
{
    delete[] m_data;//在调动之后函数死亡前需要是释放
}

#endif
~~~



~~~c++
{
	String s1(),
	String s2("hello");
	
	String* p = new String("hello");//new 动态创建一个字符串
	delete p;

}
~~~



## class with pointer members 必须有 copy ctor 和 copy op (拷贝构造和拷贝赋值)

![1](C:\Users\14671\Desktop\1.png)

希望赋值之后，两边都有相同内容，并不是两个指针指向同一处，右边的没有指针指向，如果修改a的内容，会导致b的内容一起被修改      浅拷贝

### copy ctor 拷贝构造函数

2-2

~~~c++
inline
String::String(const String& str)
{
	m_data = new char[ strlen(str.m_data) + 1];
	strcpy(m_data, str.m_data);
}
~~~

~~~c++
String s1("hello ");
String s2(s1);
//string s2 = s1;这两行意思相同，符号不同
~~~

### 拷贝赋值函数

2-3

~~~c++
inline
String& String::operator=(const Strinf& str)
{
if(this == &str)//检测自我赋值
	return *this;

delete[] m_data;
m_data = new char[ strlen(str.m_data) + 1];
strcpy(m_data,str.m_data);
return *this;
}
~~~

赋值已经有了的数据，需要先将拷贝数据delete，然后分配与被拷贝数据相同的空间，再赋值过去

~~~c++
//自我赋值
{
String s1("hello");
String s2(s1);
s2 = s1;

}
//如果是自我赋值的情况下，a = a 
//没有自我赋值检测，程序的第一个动作就是把原本的数据删掉，这样会导致拷贝和被拷贝都没有数据
~~~



### output 函数

~~~c++
#include <iosteam.h>
ostream& operator<<(ostream& os,const String& str )
{
	os << str.get_c_str();
	return 0s;
}
~~~

~~~c++
{
	String s1("hello ");
	cout << s1;
}
~~~



# stack 栈，heap 堆

## stack objects 生命周期

~~~
class Complex {};

{
	Complex c1(1,2);
}
~~~

自动清理



## static local objects 生命

~~~
class Complex {};

{
	static Complex c1(1,2);
}
~~~

静态函数，static object  在作用域结束之后仍存在，直到整个程序结束



## global objects

~~~
class Complex {};

Complex c3(1,2);

int main()
{

}
~~~

c3 global object  整个程序结束之后才结束



## heap  object

~~~
class Complex{};

{
Complex* p = new Complex;

delete p;
}
~~~

~~~
class Complex{};

{
Complex* p = new Complex;
}
~~~

delete结束之后其生命周期结束，如果没用delete会造成内存泄漏



## new :先分配memory 再调用ctor

`complex* pc = new Complex(1,2);`

~~~
String* ps;

void* mem = operator new(sizeof(String));
ps = static_cast<String*>(mem);
ps->String:String("Hello");
~~~



## delete 先调用dtor（虚构） 再释放memory（内存）

Complex* pc = new Complex(1,2);

delete pc;

~~~
String::~String(ps);
operator delete(ps);
~~~

delete c++库函数，实际上调用free

对指针和字符串的不同删除，调用字符串时，删除一次指针，free用来释放字符串



## 动态分配所得的内存块

指针，字符串，数组，分配内存块

用cookie包裹，cookie被指针指向，用来标记最后需要被释放的内存

内存分配需要满足16的边界

![2](C:\Users\14671\Desktop\2.png)

array new 一定要用 array delete 来释放

![3](C:\Users\14671\Desktop\3.png)





## 复习string类实现过程

~~~c++
class String
{
public:
	String(const char* cstr = 0);
	String(const string& str);//拷贝构造
	String& operator=(const String& str);//来源端
	~String();
	char* get_c_str()     { return m_data; }

private:
	char* m_data;
};
~~~

ctor 和 dtor

~~~c++
inline
String::String(const char* cstr = 0)
{
    if(cstr){
        m_data = new char[strlen(cstr)+1];
        strcpy(m_data,cstr);
        
    }
    else{	//未指定初值
 	   m_data = new char [1];
 	   *m_data = '\0';
    }
}

inline
String::String()
{
    delete[] m_data;
}
~~~

copy ctor

~~~c++
inline
String::String(const String& str)
{
	m_data = new char[strlen(str.m_data) + 1];
	strcpy(m_data,str.data)
}		
~~~

copy 赋值函数

~~~c++
inline
String& String::operator=(const String&/*引用 */str )
{
    if(this == &/*取地址*/str)
        return *this;
    
	
	delete[] m_data;
	m_data = new char[ strlen(str.m_data) ];
	strcpy(m_data,str.m_data);
    return *this;
}
~~~



## 扩展补充，类模板，函数模板

### 进一步补充：static















class template 模板简介

需求是，在写class的时候不把实部和虚部的类型写死，希望在用的时候再指定，如果写死了，在后续添加其他类型的数据的时候还需要重复添加其他的包含不同类型的class

```c++
template<typename T>//T 只是一个符号，任何带啊吗都可
class complex
{
    public:
    	complex (T r = 0,T i =0)
            : re (r),im (i)
        {   }
        complex& operator += (const complex&);
        T real () const { return re;}
        T imag () const { return im;}
    private:
    	T re,im;
    	
    	friend complex& __doapl (complex*,const complex&);
};
```

指定的时候：

```c++
{
complex<double> c1(2.5,1.5)
complex<int> c2(2,6)

}
```



  
