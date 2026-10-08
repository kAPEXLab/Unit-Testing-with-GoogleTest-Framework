# Lab 0: GoogleTest Installation on Ubuntu

## Objective

Install and verify GoogleTest on Ubuntu Linux.

---

## Prerequisites

- Ubuntu Linux
- Internet connectivity
- User account with sudo privileges

---

## Step 1: Update Package Repository

```bash
sudo apt update
```

---

## Step 2: Install Development Tools

Install the required development tools:

```bash
sudo apt install build-essential cmake git -y
```

This installs:

- GCC Compiler
- G++ Compiler
- GNU Make
- Development Libraries
- Git

---

## Step 3: Install GoogleTest

```bash
sudo apt install libgtest-dev -y
```

---

## Step 4: Verify GCC Installation

```bash
gcc --version
```

Expected:

```text
gcc (Ubuntu ...)
```

---

## Step 5: Verify G++ Installation

```bash
g++ --version
```

Expected:

```text
g++ (Ubuntu ...)
```

---

## Step 6: Verify CMake Installation

```bash
cmake --version
```

Expected:

```text
cmake version ...
```

---

## Step 7: Verify GoogleTest Installation

```bash
ls /usr/src/googletest
```

Expected Output:

```text
googlemock
googletest
```

---

## Step 8: Verify Installed Package

```bash
dpkg -l | grep libgtest-dev
```

Expected Output:

```text
ii  libgtest-dev ...
```

---

## Step 9: Create Workspace

Create a workspace for future experiments.

```bash
mkdir -p ~/training/gtest
```

Move to the workspace:

```bash
cd ~/training/gtest
```

Verify:

```bash
pwd
```

Example:

```text
/home/user/training/gtest
```

---

## Verification Checklist

Verify that the following commands execute successfully:

```bash
gcc --version
```

```bash
g++ --version
```

```bash
cmake --version
```

```bash
ls /usr/src/googletest
```

```bash
pwd
```

---

## Knowledge Check

### 1. Which package installs GoogleTest?

```text
libgtest-dev
```

### 2. Which command updates Ubuntu package information?

```bash
sudo apt update
```

### 3. Which command displays the GCC version?

```bash
gcc --version
```

### 4. Which command displays the G++ version?

```bash
g++ --version
```

### 5. Where is the GoogleTest source installed?

```text
/usr/src/googletest
```

---

## Lab Completion Criteria

Lab 0 is complete when:

- GoogleTest is installed.
- GCC is available.
- G++ is available.
- CMake is available.
- Workspace directory is created.

System is now ready for unit testing experiments using GoogleTest.