# Lab 15: Test Filtering and Execution Options

## Objective

Learn how to run only selected tests from a GoogleTest binary using filters and command-line options.

At the end of this lab, you should be able to:

- Use the `--gtest_filter` option
- Run only a subset of tests
- Use wildcard patterns for test selection
- Understand how to control test execution in larger suites

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
- Lab 14 should be completed.

---

## Background

When a test binary contains many tests, it is useful to run only a subset. GoogleTest provides a filter mechanism through command-line flags.

Common examples:

```bash
./test_program --gtest_filter=AddTest.*
./test_program --gtest_filter=*Positive*
./test_program --gtest_filter=AddTest.AddPositiveNumbers
```

This lets you focus on a specific suite, test name, or pattern.

---

## Example Test Suite

```cpp
#include <gtest/gtest.h>

TEST(AddTest, AddPositiveNumbers)
{
    EXPECT_EQ(2 + 3, 5);
}

TEST(AddTest, AddNegativeNumbers)
{
    EXPECT_EQ(-2 + 3, 1);
}

TEST(MultiplyTest, MultiplyPositiveNumbers)
{
    EXPECT_EQ(2 * 3, 6);
}
```

---

## Step 1: Run Only One Test Suite

```bash
./test_program --gtest_filter=AddTest.*
```

This runs only tests in the `AddTest` suite.

---

## Step 2: Run Only Matching Test Names

```bash
./test_program --gtest_filter=*Positive*
```

This runs all tests whose names contain `Positive`.

---

## Step 3: Run One Exact Test

```bash
./test_program --gtest_filter=AddTest.AddPositiveNumbers
```

This selects exactly one test case.

---

## Step 4: Combine Filters

GoogleTest also supports an expression with a colon `:` to run multiple groups.

```bash
./test_program --gtest_filter=AddTest.*:MultiplyTest.*
```

This runs tests from both suites.

---

## Step 5: Use the List Tests Option

You can view all available tests before running them:

```bash
./test_program --gtest_list_tests
```

This helps you discover names and suites without guessing.

---

## Summary

In this lab, you learned:

- `--gtest_filter` selects tests by name or suite
- wildcard patterns can match groups of tests
- `--gtest_list_tests` helps inspect the available test names
- filtering is useful when a binary contains many tests

This is extremely helpful when debugging large software projects.
