# Lab 6: Multiple Assertions in a Test

## Objective

Learn how to include several assertions in a single test case.

At the end of this lab, you should be able to:

- Write multiple assertions inside one test
- Understand how one failure affects the rest of the test
- Choose between `EXPECT_*` and `ASSERT_*` when using multiple checks
- Keep tests readable and meaningful

---

## Prerequisites

Before starting this lab:

- Lab 0 should be completed.
- Lab 1 should be completed.
- Lab 2 should be completed.
- Lab 3 should be completed.
- Lab 4 should be completed.
- Lab 5 should be completed.

---

## Project Structure

```text
gtest/
├── arithmetic.h
├── arithmetic.c
├── arithmetic.o
└── test_arithmetic.cpp
```

---

## Background

A single test case can contain more than one assertion. This is useful when you want to validate several related conditions for the same scenario.

For example, a function may:

- produce the correct value
- return a positive number
- not return a zero

Each condition can be tested in one function.

---

## Step 1: Write a Test with Multiple Assertions

```cpp
#include <gtest/gtest.h>

extern "C" {
#include "arithmetic.h"
}

TEST(AddTest, ValidatesMultipleConditions)
{
    int result = add(2, 3);

    EXPECT_EQ(result, 5);
    EXPECT_TRUE(result > 0);
    EXPECT_NE(result, 0);
}
```

This single test checks three conditions:

- result is equal to `5`
- result is greater than `0`
- result is not equal to `0`

---

## Step 2: Understand the Behavior

When using `EXPECT_*`:

- each assertion is evaluated independently
- if one assertion fails, the test continues to the next one
- the test reports all failures together

This is helpful for checking multiple aspects of the same scenario.

Example:

```cpp
TEST(AddTest, MixedChecks)
{
    int result = add(2, 3);

    EXPECT_EQ(result, 5);
    EXPECT_TRUE(result > 0);
    EXPECT_FALSE(result < 0);
}
```

Even if one check fails, the remaining checks still run.

---

## Step 3: Use `ASSERT_*` Carefully

If a failure makes the rest of the test meaningless, use `ASSERT_*` instead.

Example:

```cpp
TEST(AddTest, CriticalCondition)
{
    int result = add(2, 3);

    ASSERT_NE(result, 0);
    EXPECT_EQ(result, 5);
    EXPECT_TRUE(result > 0);
}
```

If `result` is zero, the test stops immediately and does not continue to the remaining assertions.

---

## Step 4: Keep Tests Focused

It is fine to have multiple assertions in one test, but the test should still focus on one behavior.

Good example:

```cpp
TEST(AddTest, AddsNumbersCorrectly)
{
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_EQ(add(-2, -3), -5);
    EXPECT_EQ(add(0, 0), 0);
}
```

This test is about verifying addition behavior across several inputs.

---

## Summary

In this lab, you learned:

- A single test can contain multiple assertions
- `EXPECT_*` continues even after a failure
- `ASSERT_*` stops the test immediately when a critical check fails
- Multiple assertions are useful when one scenario has several related checks

This helps you write concise but complete tests.

