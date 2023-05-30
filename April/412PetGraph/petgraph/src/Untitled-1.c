
do_thing_2(int j, arr[int] a, int m, int n) {
    if (m > n) return -1
    int i = (m+n)/2
    if (a[i] == j) return i
    if (j < a[i]) {
        do_thing_2(j, a, m, i-1)
    } else {
        do_thing_2(j, a, i+1, n)
    }
}

array[int] a = [0,1,2,3,4,5,6,7,8]

do_thing_2(7, a, 0, len(a)-1)