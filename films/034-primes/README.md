# 034 · AURIC FIB ATOM PYRAMID V · 金字塔 V：二三五七只出现一次

A film of about 7¾ minutes, the fifth part on the FIB atom pyramid. Its subject is §§6–16 of
`AURIC_FIB_ATOM_OBSERVER_AND_ARITHMETIC_RELATIONS.md` in trureturing at subject commit `8064a2b440`.

In the first window, the five patterns of one ordered atom carry the numbers 0, 2, 3, 5, 7. The film follows why
these four primes appear together exactly once, and what the same atom still says about primes afterwards:

- **Windows.** Each window multiplies by S = M³. Window j carries 0, F_{n−1}, F_n, F_{n+1} and L_n with n = 3j + 4.
  The first windows are 2, 3, 5, 7; 8, 13, 21, 29; 34, 55, 89, 123; …; 610, 987, 1597, 2207.
- **Only once.**
  - From window 1 on, the low value F_{3j+3} is even and greater than 2.
  - In odd windows the high value is composite, and in even windows the middle value is composite.
  - So all four values are prime only in window 0.
- **Coprime windows.**
  - Inside every window the four values are pairwise coprime, because gcd(F_n, L_n) = gcd(F_n, 2) and n = 3j + 4
    is never divisible by 3.
  - F_{2n} = F_n L_n and L_n² − 5F_n² = 4(−1)ⁿ.
- **Fermat and Mersenne indices.**
  - In an even window, the high value and the Lucas value are both prime only when n = 2^(2^t), so that n + 1 is a
    Fermat prime.
  - Index 16 works: 1597 and 2207 are both prime, in window 4.
  - At index 256, 257 is prime, but 5653 | F₂₅₇ and 34303 | L₂₅₆.
  - When 2ˢ − 1 is prime and s ≡ 3 (mod 4), it divides L_{2^(s−1)}. For s = 7,
    L₆₄ = 127 × 186 812 208 641 in window 20, and the cofactor is prime.
- **Collisions.**
  - The ten differences of 0, 2, 3, 5, 7 multiply to 50 400 = 10 · 7! = 2⁵ · 3² · 5² · 7, so only 2, 3, 5 and 7 can
    make two patterns agree.
  - The depth of a collision is the p-adic valuation of the difference: 3 and 7 agree modulo 4 but not modulo 8.
- **Rank roles.**
  - The rank r_p is the first index a with p | F_a.
  - When 3 | r_p, the prime only hits the low value (2, 17, 19, 23, 31).
  - Odd ranks with 3 ∤ r_p never hit the Lucas value (5, 13).
  - Even ranks with 3 ∤ r_p can hit all four values (3, 7, 11, 29, 41, 47).
- **Rank closure.**
  - Following ranks downward, 59 → 29 → 7 → 2.
  - Any finite set of primes, closed under the prime factors of ranks, stays finite and below its largest member.
- **2-adic beats.**
  - An odd prime dividing L_a has v₂(r_p) = v₂(a) + 1.
  - 3 and 7 therefore never divide the same Lucas number, and every Lucas number divisible by 41 is also divisible
    by 3 (L₁₀ = 123 = 3 · 41).
  - Across windows, the three events repeat every 4, 8 and 20 windows, and they are not independent.
- **The 7! clock.**
  - Modulo 5040 the matrix has order 240, so window values repeat every 80 windows.
  - Primality does not repeat: window 80 has an even low value of 51 digits.
  - The middle and Lucas values avoid 2, 3, 5 and 7 for 4/15 of all indices.
- **Hidden κ.**
  - For a random pattern, the chance of a prime depends on the joint probability κ, not only on the three averages:
    ½δ₀ + ½δ₁₃ and ½δ₁ + ½δ₃ have the same averages but give a prime with probability ½ and 1.
  - Testing divisibility by 7 before the value is discarded recovers κ.
  - Two laws with identical averages are then rejected one time in six and one time in two, where independence
    predicts one in three.
- **Every number.**
  - Six windows plus a unit bit write every N < 10 946 exactly once.
  - The triplet shape N, N + 2, N + 6 survives the sieve by 2, 3, 5, 7 for 418 of them.
  - A candidate is not a triplet (143 = 11 · 13), and whether prime triplets go on forever is the Hardy–Littlewood
    conjecture, which is open.

一部约七分四十五秒的片子：一个有序原子在第一个窗口给出 0、2、3、5、7——最前面的四个素数只同时出现一次；此后秩决定素数落在哪里，二进节拍决定谁能一起落下，而七的阶乘这个时钟只能做筛子。

## Outputs · 产物

Rendered films are published as GitHub [Releases](../../../../releases) (tag `film-034-<version>`) by
`.github/workflows/release-film.yml`. Nothing rendered is committed.

## Evidence notes · 证据说明

- **Lean-frozen.** The state files `Golden/Frozen/state/<module>.lean.json` exist at the subject commit for these
  three modules:
  - `D5/S3/Arith/Primes/FiniteFibonacciRankClosure.finite_fibonacci_rank_closure`. For a finite set S of primes
    above 5, the closure H obtained by adding 2, 3, 5 and closing under prime factors of Fibonacci ranks contains the
    seed, consists of primes, has every member at most max(5, max S), is closed, and is the least such set.
  - `D5/S3/Arith/Primes/GoldenPrimePowerMatrixPeriod.golden_matrix_prime_power_period`. For p > 5 the order of the
    Fibonacci matrix modulo pᵃ is τ · p^(a−h), where τ is the order modulo p and h = v_p(F_{r_p}).
  - `D5/S3/Arith/Congruence/ObserverCollisionOrder.observer_collision_order_eq_padic_valuation_and_exists`. Two
    integer readings that agree modulo pʳ but not modulo pʳ⁺¹ differ by p-adic valuation exactly r.
- **Published results cited by the volume** (badged as published):
  - the index conditions (F_m prime ⇒ m prime or m = 4; L_m prime ⇒ m prime or a power of 2) and the classical
    identities, from Somer & Křížek, *On Primes in Lucas Sequences*, Fibonacci Quarterly 53(1), 2015, §§1–2;
  - the Mersenne Lucas factor, from the same paper, Theorem 1.3(ii) and Example 1.4;
  - the rank of apparition and the Lucas half-period, with Ballot & Elia (2007) cited for rank and period.
- **Open conjecture, cited.** The Hardy–Littlewood prime-tuples conjecture, as stated in Tao's 2013 post. The film
  states it as open and does not use it.
- **Theory volume, argued but not kernel-checked.** Everything else comes from §§6–16 of the volume, and the film
  badges it accordingly:
  - the window values and the uniqueness of the all-prime window;
  - pairwise coprimality inside windows;
  - the Fermat-index consequence for even windows;
  - the collision determinant and its window factorization;
  - the three rank-role classes;
  - the 2-adic rule, the 3–7 exclusion, 41 ⇒ 3 and the window event periods;
  - the 240/80 clock, the gcd-with-210 rule and the 4/15 ratio;
  - the prime-probability formula, the d₇ readout and the two-law example;
  - the finite Zeckendorf cover and the 418-candidate count.
- **Recomputed for this film** by an independent Python/sympy script:
  - **Windows.**
    - The window table for j = 0…5 matches.
    - The all-prime windows for j < 200 are exactly {0}.
    - The low value is never prime for j ≥ 1. The high value is composite for odd j, and the middle value is
      composite for even j ≥ 2.
    - The four values are pairwise coprime for j < 200.
    - gcd(F_n, L_n) = gcd(F_n, 2), F_{2n} = F_n L_n and L_n² − 5F_n² = 4(−1)ⁿ.
  - **Fermat and Mersenne indices.**
    - The even standard n < 700 with F_{n+1} and L_n both prime are exactly 4 and 16.
    - 257 is prime, F₂₅₇ ≡ 0 (mod 5653) and L₂₅₆ ≡ 0 (mod 34303).
    - The Mersenne divisibility holds for s = 3, 7, 19, 31.
    - L₆₄ = 127 × 186 812 208 641, and the cofactor is prime.
  - **Collisions.**
    - det V = −2a⁴b²(a − b)(a + b)²(2a + b) symbolically.
    - det V₀ = 50 400 = 2⁵ · 3² · 5² · 7.
  - **Ranks.**
    - The ranks of the thirteen primes shown match the table.
    - The role of each prime matches its rank class over 400 windows.
    - 19 | L₉ = 76, yet 19 divides no L_{3j+4} for j < 300. 13 divides no L_a for a < 500.
    - The rank closures of {7}, {13}, {29}, {47}, {59}, {89}, {97} and {1597} match the film.
  - **2-adic beats.**
    - 3 and 7 never divide the same L_a for a < 700, and 41 | L_a ⇒ 3 | L_a.
    - E3, E7 and E41 occur at j ≡ 2 (mod 4), j ≡ 0 (mod 8) and j ≡ 2 (mod 20).
    - The 2-adic rule holds for 3, 7, 11, 29, 41 and 47.
  - **The clock.**
    - The matrix orders are 24, 24, 20 and 16 modulo 16, 9, 5 and 7, and 240 modulo 5040. S has order 80.
    - The period is 112 modulo 49 and 784 modulo 343.
    - Window values repeat modulo 5040 every 80 windows, and F₂₄₃ is even with 51 digits.
    - gcd(F_a L_a, 210) = 1 ⇔ a is odd, 3 ∤ a and 5 ∤ a. The window classes are j ≡ 1, 3, 5, 9 (mod 10).
  - **Hidden κ.**
    - The prime-event masks for j = 0…4 match.
    - The same-means laws give ½ and 1.
    - p⁻ and p⁺ give X = Y = 2/5 and Z = 1/5, with d₇ = 1/5 and 3/5.
    - Their replies are 18 : 26 : ⊥ = 1/3 : 1/2 : 1/6 and 1/3 : 1/6 : 1/2, and the independence prediction for ⊥ is
      1/3. The reply values 18 and 26 match.
  - **Every number.**
    - The 19-bit words with no adjacent ones cover 0…10 945 exactly once.
    - There are 6765 six-window words.
    - 418 sieve candidates lie below 10 946.
    - After the prefix (1, 0), the next values are 34, 36, 37, 39, 41.
    - (3, 5, 7) is the only prime triple N, N + 2, N + 4 below 10 000, and 143 = 11 · 13.
- **Illustrative visuals.** These are illustrations, not data:
  - the rotating pyramids and the vertex weights in the random-atom shot;
  - the clock rings;
  - the rank-chain layout, whose heights are on a log scale;
  - the hyperbola panel, which is drawn to scale only where labelled;
  - the bar lengths, which are drawn to scale only where labelled.

## Build · 构建

Same pipeline as film 022:

1. `python3 tts.py`
2. `python3 build.py`
3. `python3 music.py && python3 mix.py`
4. `bash render_all.sh && bash mux.sh && bash small.sh`
