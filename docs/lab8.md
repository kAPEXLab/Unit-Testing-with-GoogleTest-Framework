# Lab 8: String Assertions with `EXPECT_STREQ()` and `EXPECT_STRNE()`

## Objective

Learn how to validate C-style strings using GoogleTest string assertions.

At the end of this lab, you should be able to:

- Add a `is_palindrome()` function
- Use `EXPECT_STREQ()` to compare strings
- Use `EXPECT_STRNE()` to compare strings for inequality
- Understand the difference between string comparison and numeric comparison

---

## Prerequisites

Before starting this lab:

- Lab 0 should be completed.
- Lab 1 should be completed.
- Lab 2 should be completed.
- Lab 3 should be completed.
- Lab 4 should be completed.
- Lab 5 should be completed.
- Lab 6 should be completed.
- Lab 7 should be completed.

---

## Production Code Change

Add a dedicated string helper module for palindrome checking.

### Header file: `string_utils.h`

```c
#ifndef STRING_UTILS_H
#define STRING_UTILS_H

#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

bool is_palindrome(const char* text);

#ifdef __cplusplus
}
#endif

#endif
```

### Source file: `string_utils.c`

```c
#include "string_utils.h"
#include <string.h>

bool is_palindrome(const char* text)
{
    if (text == NULL)
        return false;

    size_t length = strlen(text);
    if (length <= 1)
        return true;

    for (size_t i = 0; i < length / 2; ++i)
    {
        if (text[i] != text[length - 1 - i])
            return false;
    }

    return true;
}
```

---

## Background

String comparison is different from numeric comparison. For C-style strings, we cannot compare them directly using `==` because they are arrays.

GoogleTest provides specific string assertions:

```cpp
EXPECT_STREQ(str1, str2);
EXPECT_STRNE(str1, str2);
```

These assertions compare C-style strings safely and clearly.

---

## Step 1: Understand `EXPECT_STREQ()`

`EXPECT_STREQ()` checks whether two C-style strings are equal.

Example:

```cpp
TEST(PalindromeTest, StringEquality)
{
    EXPECT_STREQ("madam", "madam");
}
```

This passes because both strings are exactly the same.

---

## Step 2: Understand `EXPECT_STRNE()`

`EXPECT_STRNE()` checks whether two C-style strings are not equal.

Example:

```cpp
TEST(PalindromeTest, DifferentStrings)
{
    EXPECT_STRNE("hello", "world");
}
```

This passes because the strings are different.

---

## Step 3: Write a Palindrome Test

Create a separate test file named `test_string_utils.cpp`.

```cpp
#include <gtest/gtest.h>

extern "C" {
#include "string_utils.h"
}

TEST(PalindromeTest, RecognizesPalindrome)
{
    EXPECT_TRUE(is_palindrome("madam"));
    EXPECT_TRUE(is_palindrome("racecar"));
    EXPECT_TRUE(is_palindrome("level"));
}

TEST(PalindromeTest, RejectsNonPalindrome)
{
    EXPECT_FALSE(is_palindrome("hello"));
    EXPECT_FALSE(is_palindrome("india"));
}

TEST(PalindromeTest, StringComparison)
{
    EXPECT_STREQ("madam", "madam");
    EXPECT_STRNE("madam", "hello");
}
```

---

## Step 4: Compile and Run

```bash
g++ -std=c++17 -I/usr/include -pthread test_string_utils.cpp string_utils.c -lgtest -lgtest_main -o test_string_utils
./test_string_utils
```

---

## Understanding the Result

These string assertions are especially useful when:

- validating input values
- checking command names or messages
- comparing C-style strings in a safe and readable way

Unlike numeric comparison, string comparison needs dedicated assertions because arrays are not compared by value directly.

---

## Summary

In this lab, you learned:

- `EXPECT_STREQ()` checks if two strings are equal
- `EXPECT_STRNE()` checks if two strings are different
- string testing requires special assertions because C-style strings are not simple values
- palindrome logic can be tested as a real-world example of string validation
