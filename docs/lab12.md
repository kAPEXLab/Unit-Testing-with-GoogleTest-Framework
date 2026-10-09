# Lab 12: Type-Parameterized Tests

## Objective

Learn how to write tests that run for multiple C++ data types using GoogleTest type-parameterized tests.

At the end of this lab, you should be able to:

- Use `TYPED_TEST()`
- Create a type list with `::testing::Types<...>()`
- Test the same logic across different types
- Understand the value of generic test logic

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

---

## Production Code Change

Create a generic utility function that returns the absolute value of a numeric type.

### Header file: `number_utils.h`

```c
#ifndef NUMBER_UTILS_H
#define NUMBER_UTILS_H

#ifdef __cplusplus
extern "C" {
#endif

int abs_value(int value);

#ifdef __cplusplus
}
#endif

#endif
```

### Source file: `number_utils.c`

```c
#include "number_utils.h"

int abs_value(int value)
{
    return value < 0 ? -value : value;
}
```

---

## Background

Sometimes the same logic should be checked for multiple data types such as `int`, `float`, or `double`.

GoogleTest supports type-parameterized tests with:

```cpp
TYPED_TEST(TestSuiteName, TestName)
```

This helps write one test body that works for several types.

---

## Step 1: Define a Type List

```cpp
#include <gtest/gtest.h>

template <typename T>
T abs_template(T value)
{
    return value < 0 ? -value : value;
}

template <typename T>
class AbsValueTest : public ::testing::Test {
};

using NumericTypes = ::testing::Types<int, long, double>;
```

---

## Step 2: Write a Typed Test

```cpp
TYPED_TEST_SUITE(AbsValueTest, NumericTypes);

TYPED_TEST(AbsValueTest, ReturnsNonNegativeValue)
{
    TypeParam value = -7;
    EXPECT_GE(abs_template(value), TypeParam(0));
}
```

This test runs once for each type in `NumericTypes`:

- `int`
- `long`
- `double`

---

## Step 3: Write a More Specific Test

```cpp
TYPED_TEST(AbsValueTest, MatchesExpectedValue)
{
    TypeParam value = -9;
    EXPECT_EQ(abs_template(value), TypeParam(9));
}
```

Now the same logic is tested across multiple types.

---

## Step 4: Compile and Run

```bash
g++ -std=c++17 -I/usr/include -pthread test_number_utils.cpp number_utils.c -lgtest -lgtest_main -o test_number_utils
./test_number_utils
```

---

## Summary

In this lab, you learned:

- `TYPED_TEST()` is used for type-parameterized tests
- `::testing::Types<...>()` defines the types to test
- one test body can validate logic across many types
- this is useful when a function should behave consistently for multiple numeric types
