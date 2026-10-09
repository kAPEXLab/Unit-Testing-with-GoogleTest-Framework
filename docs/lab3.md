# Lab 3: Using `ASSERT_EQ()` and `ASSERT_NE()`

## Objective

Learn the difference between non-fatal and fatal assertions in GoogleTest.

At the end of this lab, you should be able to:

- Use `ASSERT_EQ()`
- Use `ASSERT_NE()`
- Distinguish between `EXPECT_*` and `ASSERT_*`
- Understand when a test should stop immediately

---

## Prerequisites

Before starting this lab:

- Lab 0 should be completed.
- Lab 1 should be completed.
- Lab 2 should be completed.
- GoogleTest should be installed and working.

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

In earlier labs, we used assertions like:

```cpp
EXPECT_EQ(add(2, 3), 5);
EXPECT_TRUE(add(2, 3) > 0);
```

These are called non-fatal assertions. If they fail, the test continues to run the remaining code in the same test function.

GoogleTest also provides fatal assertions:

```cpp
ASSERT_EQ()
ASSERT_NE()
```

A fatal assertion stops the current test function immediately when it fails.

---

## Step 1: Understand `ASSERT_EQ()`

`ASSERT_EQ()` checks whether two values are equal.

If the values are not equal, the test fails and execution ends for that test immediately.

Example:

```cpp
TEST(AddTest, AddsTwoNumbers)
{
    ASSERT_EQ(add(2, 3), 5);
    std::cout << "This line is not reached if the assertion fails." << std::endl;
}
```

If `add(2, 3)` returns anything other than `5`, the test stops right there.

---

## Step 2: Understand `ASSERT_NE()`

`ASSERT_NE()` checks whether two values are not equal.

Example:

```cpp
TEST(AddTest, ResultIsNotZero)
{
    ASSERT_NE(add(2, 3), 0);
    std::cout << "This is executed only if the value is not zero." << std::endl;
}
```

This is useful when you want to confirm that a value is definitely not a specific value such as `0`.

---

## Step 3: Compare `EXPECT_*` vs `ASSERT_*`

Use `EXPECT_*` when:

- you want the test to keep running after a failure
- you want to see multiple failures in the same test

Use `ASSERT_*` when:

- a failed condition means the remaining part of the test is no longer valid
- the test cannot continue meaningfully

Example:

```cpp
TEST(AddTest, VerifyBehavior)
{
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_TRUE(add(2, 3) > 0);

    ASSERT_NE(add(2, 3), 10);
    EXPECT_EQ(add(2, 3), 5);
}
```

Here:

- the `EXPECT_*` checks may still let the test continue
- the `ASSERT_NE()` will stop execution if the value becomes `10`

---

## Step 4: Write a Sample Test

```cpp
#include <gtest/gtest.h>

extern "C" {
#include "arithmetic.h"
}

TEST(AddTest, EqualityCheck)
{
    ASSERT_EQ(add(2, 3), 5);
    ASSERT_NE(add(2, 3), 10);
}
```

This test will pass only if:

- `add(2, 3) == 5`
- `add(2, 3) != 10`

---

## Understanding the Result

If the test fails:

- `EXPECT_*` reports the failure but continues
- `ASSERT_*` reports the failure and aborts the current test immediately

This is important when a failed precondition makes the remaining checks meaningless.

---

## Summary

In this lab, you learned:

- `ASSERT_EQ()` is used for equality checks that should stop the test on failure
- `ASSERT_NE()` is used for non-equality checks that should stop the test on failure
- `ASSERT_*` is fatal, while `EXPECT_*` is non-fatal

This helps you write robust and meaningful GoogleTest cases.

