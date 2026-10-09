# Lab 5: Organising Tests with Test Suites

## Objective

Learn how to organise test cases into logical groups using test suites and clear test names.

At the end of this lab, you should be able to:

- Create multiple test cases in one file
- Group related tests under a common suite name
- Use meaningful names for test cases
- Understand why organised tests are easier to maintain

---

## Prerequisites

Before starting this lab:

- Lab 0 should be completed.
- Lab 1 should be completed.
- Lab 2 should be completed.
- Lab 3 should be completed.
- Lab 4 should be completed.

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

A test file can contain many test cases. It is important to group them logically so they are easy to understand and debug.

GoogleTest uses the following format:

```cpp
TEST(SuiteName, TestName)
```

For example:

```cpp
TEST(AddTest, AddsPositiveNumbers)
TEST(AddTest, AddsNegativeNumbers)
```

Both belong to the same suite named `AddTest`.

---

## Step 1: Create a Test Suite for Addition

Here is a sample test file:

```cpp
#include <gtest/gtest.h>

extern "C" {
#include "arithmetic.h"
}

TEST(AddTest, AddsPositiveNumbers)
{
    EXPECT_EQ(add(2, 3), 5);
}

TEST(AddTest, AddsNegativeNumbers)
{
    EXPECT_EQ(add(-2, -3), -5);
}

TEST(AddTest, AddsZero)
{
    EXPECT_EQ(add(5, 0), 5);
}
```

These tests are grouped under the suite name `AddTest`.

---

## Step 2: Understand the Naming Convention

The pattern is:

```cpp
TEST(SuiteName, TestName)
```

Where:

- `SuiteName` identifies the group of tests
- `TestName` identifies the specific behavior being checked

This makes results easier to read when GoogleTest prints output.

Example output may look like:

```text
[==========] Running 3 tests from 1 test suite.
[----------] 3 tests from AddTest
[ RUN      ] AddTest.AddsPositiveNumbers
[       OK ] AddTest.AddsPositiveNumbers
[ RUN      ] AddTest.AddsNegativeNumbers
[       OK ] AddTest.AddsNegativeNumbers
[ RUN      ] AddTest.AddsZero
[       OK ] AddTest.AddsZero
```

---

## Step 3: Keep Test Names Meaningful

Good names describe the behavior clearly.

Examples:

```cpp
TEST(AddTest, AddsPositiveNumbers)
TEST(AddTest, AddsNegativeNumbers)
TEST(AddTest, AddsZero)
```

Avoid vague names like:

```cpp
TEST(AddTest, Test1)
TEST(AddTest, Test2)
```

Meaningful names help developers understand what failed without reading the implementation.

---

## Step 4: Group Related Scenarios Together

Use one suite for all tests related to the same unit or functionality.

For example:

```cpp
TEST(AddTest, AddsPositiveNumbers)
TEST(AddTest, AddsNegativeNumbers)
TEST(AddTest, ReturnsZeroWhenBothValuesAreZero)
```

This keeps the tests consistent and easy to maintain.

---

## Summary

In this lab, you learned:

- Tests can be grouped under a suite name
- Suite names help organise related tests
- Test names should clearly describe the behavior being checked
- Good naming makes debugging easier and output more readable

This is an important habit when writing larger test files.

