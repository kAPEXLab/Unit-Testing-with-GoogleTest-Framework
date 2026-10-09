# Lab 14: Custom Test Messages

## Objective

Learn how to add custom failure messages to GoogleTest assertions so debugging becomes easier and test output becomes more informative.

At the end of this lab, you should be able to:

- Use assertion macros with custom messages
- Understand why descriptive failure messages matter
- Improve test readability and debugging experience
- Write clearer test output for larger projects

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
- Lab 8 should be completed.
- Lab 9 should be completed.
- Lab 10 should be completed.
- Lab 11 should be completed.
- Lab 12 should be completed.
- Lab 13 should be completed.

---

## Production Code Change

Create a utility function that checks whether a value is valid for a range.

### Header file: `range_check.h`

```c
#ifndef RANGE_CHECK_H
#define RANGE_CHECK_H

#ifdef __cplusplus
extern "C" {
#endif

int in_range(int value, int min, int max);

#ifdef __cplusplus
}
#endif

#endif
```

### Source file: `range_check.c`

```c
#include "range_check.h"

int in_range(int value, int min, int max)
{
    return value >= min && value <= max;
}
```

---

## Background

By default, GoogleTest reports the expression and values involved in a failure. However, you can make output more descriptive by adding your own message.

The syntax is:

```cpp
EXPECT_EQ(actual, expected) << "message";
EXPECT_TRUE(condition) << "message";
ASSERT_NE(a, b) << "message";
```

This message appears in the failure output and helps diagnose the problem.

---

## Step 1: Use a Custom Message with `EXPECT_EQ()`

```cpp
#include <gtest/gtest.h>
#include "range_check.h"

TEST(RangeCheckTest, ValidRange)
{
    int value = 25;
    EXPECT_EQ(in_range(value, 10, 30), 1) << "Value 25 should be inside the valid range [10, 30].";
}
```

If the assertion fails, the custom message appears in the output.

---

## Step 2: Use a Custom Message with `EXPECT_TRUE()`

```cpp
TEST(RangeCheckTest, RejectsOutOfRangeValue)
{
    int value = 40;
    EXPECT_TRUE(in_range(value, 10, 30)) << "The value 40 is outside the allowed range.";
}
```

This makes the failure clearer than a plain boolean assertion.

---

## Step 3: Use a Message with `ASSERT_NE()`

```cpp
TEST(RangeCheckTest, ValuesShouldBeDifferent)
{
    int a = 7;
    int b = 7;
    ASSERT_NE(a, b) << "The test expects different values, but both are 7.";
}
```

Since this is an `ASSERT_*` macro, the test stops immediately after failure.

---

## Step 4: Compile and Run

```bash
g++ -std=c++17 -I/usr/include -pthread test_range_check.cpp range_check.c -lgtest -lgtest_main -o test_range_check
./test_range_check
```

---

## Summary

In this lab, you learned:

- assertion macros can accept a custom failure message
- messages improve readability of failed tests
- custom messages help developers understand what went wrong faster
- descriptive output is especially important in larger codebases

This is a small but very useful habit when writing professional GoogleTest suites.
