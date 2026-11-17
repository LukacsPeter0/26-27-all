import sys

N = int(input().strip())
B = list(map(int, input().strip().split()))
S = list(map(int, input().strip().split()))

lehetetlen = False

Jumps = 0
posi = 0

def erosseg():
    global posi, Jumps
    for ero in range(B[i]):
        posi += ero
        Jumps += 1

for i in range(len(B)):
    erosseg()
    if B[posi] == -1:
        erosseg()
    else:
        posi += S[posi]
    if posi != N - 1:
        lehetetlen = True

if lehetetlen:
    Jumps = -1

print(Jumps)
sys.stdout.close()