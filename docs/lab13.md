# Lab 13: Death Tests

## Objective

Learn how to test that a program exits when invalid input is used in a C project.

At the end of this lab, you should be able to:

- Use `EXPECT_EXIT()`
- Understand the difference between normal execution and a terminated process
- Validate defensive shutdown logic in C code
- Test invalid-input paths safely

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

---

## Production Code Change

Create a function that terminates when a bad input is provided.

### Header file: `guarded_math.h`

```c
#ifndef GUARDED_MATH_H
#define GUARDED_MATH_H

#ifdef __cplusplus
extern "C" {
#endif

void require_positive(int value);

#ifdef __cplusplus
}
#endif

#endif
```

### Source file: `guarded_math.c`

```c
#include "guarded_math.h"
#include <stdlib.h>

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

In C, a function may terminate the program using `exit()`. GoogleTest can test this behavior using:

```cpp
EXPECT_EXIT(statement, predicate, regex);
ASSERT_EXIT(statement, predicate, regex);
```

This checks that the process exits and that it exits with the expected status.

---

## Step 1: Write a Death Test

```cpp
#include <gtest/gtest.h>
#include "guarded_math.h"

TEST(GuardedMathTest, RequiresPositiveValue)
{
    EXPECT_EXIT(
        require_positive(0),
        ::testing::ExitedWithCode(1),
        ""
    );
}
```

This verifies that calling `require_positive(0)` terminates the process with exit code `1`.

---

## Step 2: Understand the Use Case

Death tests are useful when:

- invalid data must stop execution immediately
- a validation check intentionally exits the process
- safety-critical code must not continue in an invalid state

This is especially common in C code that validates inputs before continuing.

---

## Step 3: Compile and Run

```bash
g++ -std=c++17 -I/usr/include -pthread test_guarded_math.cpp guarded_math.c -lgtest -lgtest_main -o test_guarded_math
./test_guarded_math
```

---

## Summary

In this lab, you learned:

- C-style defensive code often exits with `exit()`
- `EXPECT_EXIT()` checks that the program terminates as expected
- this is the C-friendly approach to death testing
- it is useful when invalid input must stop execution immediately
