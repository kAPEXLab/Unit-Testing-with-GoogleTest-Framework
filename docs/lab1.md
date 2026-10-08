# Lab 1: Creating and Executing Your First GoogleTest

## Objective

Create and execute your first unit test using the GoogleTest framework.

At the end of this lab, you should be able to:

- Create a GoogleTest source file
- Write test cases using `TEST()`
- Verify results using `EXPECT_EQ()`
- Compile a test executable
- Execute tests
- Interpret PASS and FAIL results

---

## Prerequisites

Before starting this lab:

- GoogleTest must be installed.
- GCC and G++ must be installed.
- CMake must be installed.
- Ubuntu terminal should be available.

---

## Project Structure

Create the following files inside your workspace:

```text
gtest/
├── add.h
├── add.c
├── main.c
└── test_add.cpp
```

---

## Step 1: Create the Header File

Create a file named:

```text
add.h
```

Contents:

```c
#ifndef ADD_H
#define ADD_H

/*

Header file for add.c

This file contains the function declaration that
can be used by multiple source files.

The __cplusplus check ensures that the function
can be called correctly from C++ code.

GoogleTest is a C++ framework, therefore the
test file will be written in C++.

*/

#ifdef __cplusplus
extern "C" {
#endif

/* Returns the sum of two integers */
int add(int a, int b);

#ifdef __cplusplus
}
#endif

#endif
```

---

## Step 2: Create the Source File

Create a file named:

```text
add.c
```

Contents:

```c
#include "add.h"

/*
 * Function Name : add
 *
 * Description :
 * Adds two integer values and returns the result.
 *
 * Parameters :
 * a -> First integer
 * b -> Second integer
 *
 * Returns :
 * Sum of a and b
 */
int add(int a, int b)
{
    return a + b;
}
```

---

## Step 3: Create the GoogleTest File

Create a file named:

```text
test_add.cpp
```

Contents:

```cpp
/*
 * GoogleTest header file
 *
 * Provides:
 * TEST()
 * EXPECT_EQ()
 * ASSERT_EQ()
 * and other testing utilities
 */
#include <gtest/gtest.h>

/*
 * Include the C header file.
 *
 * The header already contains the required
 * extern "C" guard.
 */
#include "add.h"

/*
 * Test Suite  : AddTest
 * Test Case   : AddPositiveNumbers
 *
 * Verifies that add() correctly adds
 * two positive numbers.
 */
TEST(AddTest, AddPositiveNumbers)
{
    EXPECT_EQ(add(2, 3), 5);
}

/*
 * Verifies addition of larger values.
 */
TEST(AddTest, AddLargeNumbers)
{
    EXPECT_EQ(add(100, 200), 300);
}

/*
 * Verifies addition when one input
 * value is negative.
 */
TEST(AddTest, AddNegativeNumbers)
{
    EXPECT_EQ(add(-5, 10), 5);
}

/*
 * Verifies addition of zero values.
 */
TEST(AddTest, AddZeros)
{
    EXPECT_EQ(add(0, 0), 0);
}


```

---

## Understanding the TEST Macro

General syntax:

```cpp
TEST(TestSuiteName, TestCaseName)
{
    // Test logic
}
```

Example:

```cpp
TEST(AddTest, AddPositiveNumbers)
{
    EXPECT_EQ(add(2, 3), 5);
}
```

Where:

```text
Test Suite  : AddTest
Test Case   : AddPositiveNumbers
```

---

## Understanding EXPECT_EQ

Syntax:

```cpp
EXPECT_EQ(actual, expected);
```

Example:

```cpp
EXPECT_EQ(add(2, 3), 5);
```

GoogleTest compares:

```text
Actual   = add(2,3)
Expected = 5
```

If both values are equal, the test passes.

---

## Step 4: Compile the C Source File

Compile the C source file:

```bash
gcc -c add.c -o add.o
```

Verify:

```bash
ls
```

Expected:

```text
add.o
```

---

## Step 5: Build the Test Executable

Compile and link the test executable:

```bash
g++ test_add.cpp add.o \
    -lgtest \
    -lgtest_main \
    -pthread \
    -o test_add
```

Verify:

```bash
ls
```

Expected:

```text
test_add
```

---

## Step 6: Execute the Tests

Run:

```bash
./test_add
```

Expected Output:

```text
Running main() from ./googletest/src/gtest_main.cc

[==========] Running 4 tests from 1 test suite.

[ RUN      ] AddTest.AddPositiveNumbers
[       OK ] AddTest.AddPositiveNumbers

[ RUN      ] AddTest.AddLargeNumbers
[       OK ] AddTest.AddLargeNumbers

[ RUN      ] AddTest.AddNegativeNumbers
[       OK ] AddTest.AddNegativeNumbers

[ RUN      ] AddTest.AddZeros
[       OK ] AddTest.AddZeros

[==========] 4 tests from 1 test suite ran.
[  PASSED  ] 4 tests.
```

---

## Understanding the Output

### Test Execution

```text
[ RUN      ]
```

Indicates a test has started.

---

### Successful Execution

```text
[       OK ]
```

Indicates the test passed.

---

### Summary

```text
[  PASSED  ] 4 tests.
```

Indicates all test cases passed.

---

## Step 7: Observe a Failure

Modify the following test:

```cpp
TEST(AddTest, AddLargeNumbers)
{
    EXPECT_EQ(add(100, 200), 301);
}
```

Build again:

```bash
g++ test_add.cpp add.o \
    -lgtest \
    -lgtest_main \
    -pthread \
    -o test_add
```

Execute:

```bash
./test_add
```

Sample Output:

```text
Expected equality of these values:
  add(100, 200)
    Which is: 300
  301
```

Observe how GoogleTest automatically detects the failure.

---

## Knowledge Check

### 1. Which macro creates a test case?

```cpp
TEST()
```

---

### 2. Which macro compares two values?

```cpp
EXPECT_EQ()
```

---

### 3. Which compiler is used to compile the test file?

```text
g++
```

---

### 4. Which command executes the tests?

```bash
./test_add
```

---

### 5. How many tests are present in this lab?

```text
4
```

---

## Lab Completion Criteria

Lab 1 is complete when:

- `add.c` compiles successfully
- `test_add.cpp` compiles successfully
- Test executable is generated
- All four test cases pass successfully
- You intentionally create one failing test and observe the failure report

---

## Expected Learning Outcome

After completing this lab, you should be able to:

- Write a basic GoogleTest test case
- Use `TEST()`
- Use `EXPECT_EQ()`
- Execute a GoogleTest application
- Understand PASS and FAIL reports
- Test a C function using GoogleTest