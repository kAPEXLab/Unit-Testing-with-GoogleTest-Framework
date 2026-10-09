# Lab 9: Fixtures with `TEST_F()`

## Objective

Learn how to use GoogleTest fixtures to share setup and teardown logic across multiple tests.

At the end of this lab, you should be able to:

- Create a simple counter module
- Use `TEST_F()` to define fixture-based tests
- Understand shared setup and teardown behavior
- Write cleaner tests that reuse common initialization

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

---

## Production Code Change

Create a simple module for a counter that can be initialized and reset.

### Header file: `counter.h`

```c
#ifndef COUNTER_H
#define COUNTER_H

#ifdef __cplusplus
extern "C" {
#endif

struct Counter {
    int value;
};

void counter_init(struct Counter* counter);
void counter_increment(struct Counter* counter);
void counter_reset(struct Counter* counter);

#ifdef __cplusplus
}
#endif

#endif
```

### Source file: `counter.c`

```c
#include "counter.h"

void counter_init(struct Counter* counter)
{
    if (counter != NULL)
        counter->value = 0;
}

void counter_increment(struct Counter* counter)
{
    if (counter != NULL)
        counter->value += 1;
}

void counter_reset(struct Counter* counter)
{
    if (counter != NULL)
        counter->value = 0;
}
```

---

## Background

Sometimes several tests need the same initial conditions. Instead of repeating setup code in every test, GoogleTest allows us to define a fixture.

A fixture is a test class that can initialize common objects before each test and clean up after each test.

The fixture style uses:

```cpp
TEST_F(FixtureName, TestCaseName)
```

This is different from the usual `TEST()` macro.

---

## Step 1: Create a Fixture

```cpp
#include <gtest/gtest.h>
#include "counter.h"

class CounterFixture : public ::testing::Test {
protected:
    struct Counter counter;

    void SetUp() override
    {
        counter_init(&counter);
    }

    void TearDown() override
    {
        counter_reset(&counter);
    }
};
```

Here:

- `SetUp()` runs before each test
- `TearDown()` runs after each test
- the same `counter` object is reused for each test in the fixture

---

## Step 2: Write Fixture Tests

```cpp
TEST_F(CounterFixture, StartsAtZero)
{
    EXPECT_EQ(counter.value, 0);
}

TEST_F(CounterFixture, IncrementsOnce)
{
    counter_increment(&counter);
    EXPECT_EQ(counter.value, 1);
}

TEST_F(CounterFixture, IncrementsMultipleTimes)
{
    counter_increment(&counter);
    counter_increment(&counter);
    EXPECT_EQ(counter.value, 2);
}
```

Each test starts with a fresh counter value because `SetUp()` runs before it.

---

## Step 3: Understand the Behavior

When using fixtures:

- test objects are initialized in a shared setup routine
- each test gets a fresh instance of the fixture state
- teardown can clean up resources after each test

This avoids duplicated setup code and keeps tests organized.

---

## Step 4: Compile and Run

```bash
g++ -std=c++17 -I/usr/include -pthread test_counter.cpp counter.c -lgtest -lgtest_main -o test_counter
./test_counter
```

---

## Summary

In this lab, you learned:

- `TEST_F()` is used for fixture-based tests
- `SetUp()` initializes common test data
- `TearDown()` cleans up after each test
- fixtures reduce repeated setup code and make tests easier to maintain

This is a very important concept when writing larger GoogleTest suites.
