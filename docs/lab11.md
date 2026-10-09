# Lab 11: Safe Exit and Failure Conditions

## Objective

Learn how to test code paths that should fail safely in a C program, especially when invalid input should stop execution.

At the end of this lab, you should be able to:

- Understand safe exit behavior in C
- Use GoogleTest to validate termination on invalid input
- Distinguish between valid execution and invalid execution paths
- Write tests for defensive C code

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

---

## Production Code Change

Create a C function that exits the program when an invalid input is received.

### Header file: `safe_math.h`

```c
#ifndef SAFE_MATH_H
#define SAFE_MATH_H

#ifdef __cplusplus
extern "C" {
#endif

int square(int value);
void require_positive(int value);

#ifdef __cplusplus
}
#endif

#endif
```

### Source file: `safe_math.c`

```c
#include "safe_math.h"
#include <stdlib.h>

int square(int value)
{
    return value * value;
}

void require_positive(int value)
{
    if (value <= 0)
    {
        exit(1);
    }
}
```

---

## Background

In C, functions do not throw exceptions. Instead, they may terminate the process using `exit()` when invalid input is encountered.

For this reason, the testing pattern in a C-only project focuses on verifying that invalid execution exits, rather than throwing a C++ exception.

---

## Step 1: Write a Safe Execution Test

```cpp
#include <gtest/gtest.h>
#include "safe_math.h"

TEST(SafeMathTest, SquareReturnsExpectedValue)
{
    EXPECT_EQ(square(5), 25);
    EXPECT_EQ(square(-3), 9);
}
```

This confirms the normal execution path works correctly.

---

## Step 2: Write a Failure Condition Test

```cpp
#include <gtest/gtest.h>
#include "safe_math.h"

TEST(SafeMathTest, RequiresPositiveValue)
{
    EXPECT_EXIT(
        require_positive(0),
        ::testing::ExitedWithCode(1),
        ""
    );
}
```

This is the C-style equivalent of testing a failure path.

`EXPECT_EXIT` checks whether the process exits with the expected status code.

---

## Step 3: Understand the Purpose

This is useful when:

- invalid data should terminate a program
- defensive checks are required before continuing
- you want to validate that unsafe inputs do not proceed

This is a common pattern in C programs, especially in system-level and embedded code.

---

## Step 4: Compile and Run

```bash
g++ -std=c++17 -I/usr/include -pthread test_safe_math.cpp safe_math.c -lgtest -lgtest_main -o test_safe_math
./test_safe_math
```

---

## Summary

In this lab, you learned:

- C programs often use `exit()` rather than exceptions
- `EXPECT_EXIT` validates that a process terminates with the expected code
- defensive C code should be tested for invalid input paths
- this is the C-friendly version of a failure-condition test

