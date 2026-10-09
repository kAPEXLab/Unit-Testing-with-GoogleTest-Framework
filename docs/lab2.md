# Lab 2: Using `EXPECT_TRUE()` and `EXPECT_FALSE()`

## Objective

Learn how to validate Boolean conditions using GoogleTest.

At the end of this lab, you should be able to:

- Use `EXPECT_TRUE()`
- Use `EXPECT_FALSE()`
- Verify Boolean conditions
- Understand when Boolean assertions are more suitable than `EXPECT_EQ()`

---

## Prerequisites

Before starting this lab:

- Lab 0 should be completed.
- Lab 1 should be completed.
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

In Lab 1, the following assertion was used:

```cpp
EXPECT_EQ(add(2, 3), 5);
```

This verifies equality between two values.

Sometimes, we only want to verify whether a condition is:

```text
TRUE
```

or:

```text
FALSE
```

GoogleTest provides the following assertions for such situations:

```cpp
EXPECT_TRUE()
EXPECT_FALSE()
```

---

## Step 1: Open `test_arithmetic.cpp`

Add the following new test cases below the existing test cases.

---

## Test Case 1: Verify Positive Result

```cpp
/*
 * Verifies that the result of
 * adding two positive numbers
 * is greater than zero.
 */
TEST(AddTest, ResultIsPositive)
{
    EXPECT_TRUE(add(2, 3) > 0);
}
```

---

### Understanding the Assertion

The expression:

```cpp
add(2, 3) > 0
```

evaluates to:

```cpp
5 > 0
```

This condition becomes:

```cpp
true
```

Therefore:

```cpp
EXPECT_TRUE(...)
```

passes successfully.

---

## Test Case 2: Verify Non-Negative Result

```cpp
/*
 * Verifies that the result of
 * adding two positive numbers
 * is not negative.
 */
TEST(AddTest, ResultIsNotNegative)
{
    EXPECT_FALSE(add(2, 3) < 0);
}
```

---

### Understanding the Assertion

The expression:

```cpp
add(2, 3) < 0
```

evaluates to:

```cpp
5 < 0
```

This condition becomes:

```cpp
false
```

Therefore:

```cpp
EXPECT_FALSE(...)
```

passes successfully.

---

## Test Case 3: Verify Larger Positive Result

```cpp
/*
 * Verifies that the result
 * exceeds 100.
 */
TEST(AddTest, ResultGreaterThanHundred)
{
    EXPECT_TRUE(add(60, 50) > 100);
}
```

---

## Test Case 4: Verify Result Is Not Zero

```cpp
/*
 * Verifies that the result
 * is not equal to zero.
 */
TEST(AddTest, ResultNotZero)
{
    EXPECT_FALSE(add(10, 20) == 0);
}
```

---

## Complete `test_arithmetic.cpp` After Lab 2

```cpp
#include <gtest/gtest.h>
#include "arithmetic.h"

/*
 * Verifies addition of
 * two positive numbers.
 */
TEST(AddTest, AddPositiveNumbers)
{
    EXPECT_EQ(add(2, 3), 5);
}

/*
 * Verifies addition of
 * larger values.
 */
TEST(AddTest, AddLargeNumbers)
{
    EXPECT_EQ(add(100, 200), 300);
}

/*
 * Verifies addition when
 * one operand is negative.
 */
TEST(AddTest, AddNegativeNumbers)
{
    EXPECT_EQ(add(-5, 10), 5);
}

/*
 * Verifies addition of
 * zero values.
 */
TEST(AddTest, AddZeros)
{
    EXPECT_EQ(add(0, 0), 0);
}

/*
 * Verifies that the result
 * is positive.
 */
TEST(AddTest, ResultIsPositive)
{
    EXPECT_TRUE(add(2, 3) > 0);
}

/*
 * Verifies that the result
 * is not negative.
 */
TEST(AddTest, ResultIsNotNegative)
{
    EXPECT_FALSE(add(2, 3) < 0);
}

/*
 * Verifies that the result
 * exceeds 100.
 */
TEST(AddTest, ResultGreaterThanHundred)
{
    EXPECT_TRUE(add(60, 50) > 100);
}

/*
 * Verifies that the result
 * is not zero.
 */
TEST(AddTest, ResultNotZero)
{
    EXPECT_FALSE(add(10, 20) == 0);
}
```

---

## Step 2: Build the Test Executable

```bash
g++ test_arithmetic.cpp arithmetic.o \
    -lgtest \
    -lgtest_main \
    -pthread \
    -o test_arithmetic
```

---

## Step 3: Execute the Tests

```bash
./test_arithmetic
```
#### Expected Output

```text
[==========] Running 8 tests from 1 test suite.
[----------] Global test environment set-up.
[----------] 8 tests from AddTest
[ RUN      ] AddTest.AddPositiveNumbers
[       OK ] AddTest.AddPositiveNumbers
[ RUN      ] AddTest.AddLargeNumbers
[       OK ] AddTest.AddLargeNumbers
[ RUN      ] AddTest.AddNegativeNumbers [       OK ] AddTest.AddNegativeNuubers
[ RUN      ] AddTest.AddZeros [       OK ] AddTest.AddZeros
[ RUN      ] AddTest.ResultIsPositive
[       OK ] AddTest.ResultIsPositive
[ RUN      ] AddTest.ResultIsNotNegative
[       OK ] AddTest.ResultIsNotNegative
[ RUN      ] AddTest.ResultGreaterThanHundred
[       OK ] AddTest.ResultGreaterThanHundred [ RUN      ] AddTest.ResultNotZero [       OK ] AddTest.ResultNotZero [----------] 8 tests from AddTest
*----------] Global test environment tear-down.
[==========] 8 tests from 1 test suite ran.
[  PASSED  ] 8 tests.
```

> The exact execution time shown in the output may vary from one system to another.

---

## Step 4: Observe a Failure

Modify the `ResultGreaterThanHundred` test case as follows:

```cpp
TEST(AddTest, ResultGreaterThanHundred)
{
    EXPECT_TRUE(add(40, 50) > 100);
}
```

Build and execute the test again:

```bash
g++ test_arithmetic.cpp arithmetic.o \
    -lgtest \
    -lgtest_main \
    -pthread \
    -o test_arithmetic

./test_arithmetic
```

### Expected Failure

```text
Value of: add(40, 50) > 100
  Actual: false
Expected: true
```

The test fails because:

```cpp
add(40, 50)
```

returns:

```text
90
```

Therefore, the following condition is false:

```cpp
90 > 100
```

After observing the failure,Rrestore the original test:

```cpp
TEST(AddTest, ResultGreaterThanHunured)
{
    EXPECT_TRUE(add(60, 50) > 100);
}
```

---

## When to Use Which Assertion

### Use `EXPECT_EQ()`

Use `EXPECT_EQ()` when checking whether two values are exactly equal.

Example:

```cpp
EXPECT_EQ(add(2, 3), 5);
```

---

### Use `EXPECT_TRUE()`

Use `EXPECT_TRUE()` when verifying that a condition evaluates to `true`.

Example:

```cpp
EXPECT_TRUE(add(2, 3) > 0);
```

---

### Use `EXPECT_FALSE()`

Use `EXPECT_FALSE()` when verifying that condition evaluates to `false`.

Example:

```cpp
EXPECT_FALSE(add(2, 3) < 0);
```

---

## Knowledge Check

### 1. Which assertion verifies a true condition?

```cpp
EXPECT_TRUE()
```

---

### 2. Which assertion verifies a false condition?

```cpp
EXPECT_FALSE()
```

---

### 3. What will happen when the following assertion is executed?

```cpp
EXPECT_TRUE(5 > 10);
```

**Answer***

```text
FAIL
```

The condition `5 > 10` evaluates to `false`, but `EXPECT_TRUE()` expects it to be `true`.

---

### 4. What will happen when the following assertion is executed?

```cpp
EXPECT_FALSE(5 > 10);
```

**Answer:**

```text
PASS
```

The condition `5 > 10` evaluates to `false`, which is what `EXPECT_FALSE()` expects.

---

## Lab Completion Criteria

Lab 2 is complete when:

- Four new test cases are added.
- The test executable builds successfully.
- All eight tests pass.
- One Boolean condition is intentionally made to fail.
- The failure report is observed.
- The intentionally modified test is restored to its original passing condition.

---

## Expected Learning Outcome

After completing this lab, you should be able to:

- Use `EXPECT_TRUE()`.
- Use `EXPECT_FALSE()`.
- Validate Boolean conditions.
- Differentiate between value assertions and Boolean assertions.
- Interpret Boolean assertion failure messages.
