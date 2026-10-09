# Lab 10: Parameterized Tests with `TEST_P()`

## Objective

Learn how to write parameterized tests in GoogleTest so the same test logic runs against multiple values.

At the end of this lab, you should be able to:

- Use `TEST_P()` and `::testing::TestWithParam<T>`
- Create a parameterized test suite
- Test multiple inputs with one common test body
- Understand how parameterized tests reduce duplication

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

---

## Production Code Change

Create a simple utility function that doubles a number.

### Header file: `math_utils.h`

```c
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

#ifdef __cplusplus
extern "C" {
#endif

int double_value(int value);

#ifdef __cplusplus
}
#endif

#endif
```

### Source file: `math_utils.c`

```c
#include "math_utils.h"

int double_value(int value)
{
    return value * 2;
}
```

---

## Background

Sometimes the same test logic should run for several input values. Instead of writing separate test cases manually, GoogleTest lets you use parameterized tests.

A parameterized test uses:

```cpp
TEST_P(TestSuiteName, TestCaseName)
```

and a parameter list created with `INSTANTIATE_TEST_SUITE_P(...)`.

---

## Step 1: Create a Parameterized Test

### Example 1: Single parameter

```cpp
#include <gtest/gtest.h>
#include "math_utils.h"

class DoubleValueTest : public ::testing::TestWithParam<int> {
};

TEST_P(DoubleValueTest, DoublesTheInput)
{
    int input = GetParam();
    EXPECT_EQ(double_value(input), input * 2);
}

INSTANTIATE_TEST_SUITE_P(
    DoubleValueCases,
    DoubleValueTest,
    ::testing::Values(0, 1, 2, 5, 10, -3)
);
```

This creates a single test body that runs for all supplied values.

### Example 2: Multiple arguments

When a function needs more than one input, use a tuple or a small struct to carry the parameters.

```cpp
#include <gtest/gtest.h>
#include <tuple>

int add_with_scale(int a, int b, int scale)
{
    return (a + b) * scale;
}

class AddWithScaleTest : public ::testing::TestWithParam<std::tuple<int, int, int>> {
};

TEST_P(AddWithScaleTest, ComputesCorrectValue)
{
    auto [a, b, scale] = GetParam();
    EXPECT_EQ(add_with_scale(a, b, scale), (a + b) * scale);
}

INSTANTIATE_TEST_SUITE_P(
    AddWithScaleCases,
    AddWithScaleTest,
    ::testing::Values(
        std::make_tuple(2, 3, 1),
        std::make_tuple(2, 3, 2),
        std::make_tuple(5, 1, 3),
        std::make_tuple(-2, 4, 2)
    )
);
```

This is the usual pattern when a test needs multiple arguments.

---

## Step 2: Understand the Parameter List

The `Values(...)` argument defines the data values to test.

For example:

```cpp
::testing::Values(0, 1, 2, 5, 10, -3)
```

means the test runs once for each value in that list.

For multiple arguments, use a tuple:

```cpp
::testing::Values(
    std::make_tuple(2, 3, 1),
    std::make_tuple(2, 3, 2)
)
```

So the framework executes one test case for each tuple.

---

## Step 2: Understand the Parameter List

The `Values(...)` argument defines the data values to test.

For example:

```cpp
::testing::Values(0, 1, 2, 5, 10, -3)
```

means the test runs once for each value in that list.

So the framework executes:

- `input = 0`
- `input = 1`
- `input = 2`
- `input = 5`
- `input = 10`
- `input = -3`

---

## Step 3: Compile and Run

```bash
g++ -std=c++17 -I/usr/include -pthread test_math_utils.cpp math_utils.c -lgtest -lgtest_main -o test_math_utils
./test_math_utils
```

---

## Summary

In this lab, you learned:

- parameterized tests let you reuse one test body for many values
- `TEST_P()` is used for parameterized tests
- `INSTANTIATE_TEST_SUITE_P()` supplies the test inputs
- this approach reduces repetition and makes test coverage easier to expand
