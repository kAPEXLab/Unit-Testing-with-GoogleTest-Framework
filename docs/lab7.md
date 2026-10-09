# Lab 7: Relational Assertions with `EXPECT_GT()`, `EXPECT_LT()`, `EXPECT_GE()`, and `EXPECT_LE()`

## Objective

Learn how to compare numeric values using relational assertions in GoogleTest.

At the end of this lab, you should be able to:

- Use `EXPECT_GT()` for greater-than comparisons
- Use `EXPECT_LT()` for less-than comparisons
- Use `EXPECT_GE()` for greater-than-or-equal comparisons
- Use `EXPECT_LE()` for less-than-or-equal comparisons
- Add a `subtract()` function and validate it with relational assertions

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

---

## Production Code Change

Add a new function named `subtract()` to your project. This function subtracts the second integer from the first.

### Header file: `arithmetic.h`

```c
#ifndef arithmetic_H
#define arithmetic_H

#ifdef __cplusplus
extern "C" {
#endif

int add(int a, int b);
int subtract(int a, int b);

#ifdef __cplusplus
}
#endif

#endif
```

### Source file: `arithmetic.c`

```c
#include "arithmetic.h"

int add(int a, int b)
{
    return a + b;
}

int subtract(int a, int b)
{
    return a - b;
}
```

---

## Background

In earlier labs, we used equality and boolean checks. Sometimes tests need to compare values mathematically using relational operators.

GoogleTest provides these relational assertions:

```cpp
EXPECT_GT(value1, value2);  // value1 > value2
EXPECT_LT(value1, value2);  // value1 < value2
EXPECT_GE(value1, value2);  // value1 >= value2
EXPECT_LE(value1, value2);  // value1 <= value2
```

---

## Step 1: Write the Test Cases

```cpp
#include <gtest/gtest.h>

extern "C" {
#include "arithmetic.h"
}

TEST(SubtractTest, PositiveDifference)
{
    EXPECT_GT(subtract(10, 3), 0);
    EXPECT_GE(subtract(10, 3), 7);
}

TEST(SubtractTest, SmallDifference)
{
    EXPECT_LT(subtract(5, 9), 0);
    EXPECT_LE(subtract(5, 9), -4);
}
```

---

## Step 2: Understand Each Assertion

### `EXPECT_GT()`

Checks whether the first value is greater than the second.

```cpp
EXPECT_GT(subtract(10, 3), 0);
```

This passes because `7 > 0`.

### `EXPECT_LT()`

Checks whether the first value is less than the second.

```cpp
EXPECT_LT(subtract(5, 9), 0);
```

This passes because `-4 < 0`.

### `EXPECT_GE()`

Checks whether the first value is greater than or equal to the second.

```cpp
EXPECT_GE(subtract(10, 3), 7);
```

This passes because `7 >= 7`.

### `EXPECT_LE()`

Checks whether the first value is less than or equal to the second.

```cpp
EXPECT_LE(subtract(5, 9), -4);
```

This passes because `-4 <= -4`.

---

## Step 3: Compile and Run

After updating the header and source file, compile and run the test binary.

```bash
g++ -std=c++17 -I/usr/include -pthread test_arithmetic.cpp arithmetic.c -lgtest -lgtest_main -o test_arithmetic
./test_arithmetic
```

---

## Understanding the Result

These assertions are useful when the logic depends on ordering rather than exact equality.

For example:

- checking whether a score is above a threshold
- verifying that a value is not too large
- testing whether a result is within an acceptable range

---

## Summary

In this lab, you learned:

- `EXPECT_GT()` checks for greater-than conditions
- `EXPECT_LT()` checks for less-than conditions
- `EXPECT_GE()` checks for greater-than-or-equal conditions
- `EXPECT_LE()` checks for less-than-or-equal conditions
- relational assertions are useful for comparing numeric values meaningfully

