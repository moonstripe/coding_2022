/*
 * Find the index value, given a number n in the Fibonacci sequence
 * 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ....
 * A Fibonacci is a sequence of number where the current number is the result of the sum of the previous two numbers. For example, fib(5) should return 5.
 */

const fib = (n) => {
    let prev = 0;
    let current = 1;
    let indexValue = 0;

    for (let i = 0; i < n; i++) {
        // console.log(prev, current)
        let oldPrev = prev
        prev = current;
        current = sumLastTwo(oldPrev, prev)
        indexValue += 1;
    }
    console.log(current, indexValue)
}

const sumLastTwo = (p, c) => {
    return p + c
}

fib(5)