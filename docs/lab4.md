# Lab 4: Floating-Point Testing

## Objective

Learn how to test real-valued calculations correctly in GoogleTest.

At the end of this lab, you should be able to:

- Understand why floating-point comparisons are different from integer comparisons
- Use `EXPECT_FLOAT_EQ()` and `EXPECT_DOUBLE_EQ()`
- Use `EXPECT_NEAR()` with a tolerance value
- Write reliable tests for real-number calculations

---

## Prerequisites

Before starting this lab:

- Lab 0 should be completed.
- Lab 1 should be completed.
- Lab 2 should be completed.
- Lab 3 should be completed.

---

## Production Code Change

Create a small utility for calculating the average of two floating-point values.

### Header file: `float_utils.h`

```c
#ifndef FLOAT_UTILS_H
#define FLOAT_UTILS_H

#ifdef __cplusplus
extern "C" {
#endif

double average(double a, double b);

#ifdef __cplusplus
}
#endif

#endif
```

### Source file: `float_utils.c`

```c
#include "float_utils.h"

double average(double a, double b)
{
    return (a + b) / 2.0;
}
```

---

## Background

Integer values can usually be compared exactly. Floating-point values are different because they are stored in binary and may not be represented exactly.

For example:

```cpp
0.1 + 0.2
```

may not equal exactly `0.3` in binary floating-point arithmetic.

GoogleTest provides these useful macros:

```cpp
EXPECT_FLOAT_EQ(a, b);
EXPECT_DOUBLE_EQ(a, b);
EXPECT_NEAR(a, b, tolerance);
```

Use `EXPECT_NEAR()` when values are expected to be close, but not exactly identical.

---

## Step 1: Test Floating-Point Equality

```cpp
#include <gtest/gtest.h>
#include "float_utils.h"

TEST(FloatUtilsTest, AverageOfTwoValues)
{
    EXPECT_DOUBLE_EQ(average(1.0, 3.0), 2.0);
}
```

This works because the value `2.0` is represented exactly and the result is expected to match precisely.

---

## Step 2: Test Real-World Floating Values with Tolerance

```cpp
TEST(FloatUtilsTest, HandlesDecimalValues)
{
    double result = 0.1 + 0.2;
    EXPECT_NEAR(result, 0.3, 1e-6);
}
```

This is the preferred approach when you expect a result to be very close to the target, but not necessarily exact.

---

## Step 3: Understand the Tolerance

The third argument to `EXPECT_NEAR()` is the allowed difference:

```cpp
EXPECT_NEAR(actual, expected, tolerance);
```

For example:

```cpp
EXPECT_NEAR(9.9999, 10.0, 1e-4);
```

passes if the difference is less than or equal to `0.0001`.

A small tolerance keeps the test strict enough to catch real errors, but flexible enough for floating-point math.

---

## Step 4: Compile and Run

```bash
g++ -std=c++17 -I/usr/include -pthread test_float_utils.cpp float_utils.c -lgtest -lgtest_main -o test_float_utils
./test_float_utils
```

---

## Summary

In this lab, you learned:

- floating-point comparisons are not always exact
- `EXPECT_FLOAT_EQ()` and `EXPECT_DOUBLE_EQ()` are used for exact comparisons
- `EXPECT_NEAR()` is used when a small tolerance is acceptable
- real-number tests should account for numerical precision

This is important in scientific, engineering, and financial calculations where decimal precision matters.
