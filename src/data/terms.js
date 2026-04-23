export const terms = [
  {
    "id": 1,
    "term": "Procedural Programming",
    "definition": "A programming style where code runs in a fixed sequence of step-by-step procedures, like following a recipe.",
    "scenario": "Your team decides each script should run start-to-finish, with each function calling the next in a fixed order and no classes involved.",
    "category": "Core Programming"
  },
  {
    "id": 2,
    "term": "Object-Oriented Programming (OOP)",
    "definition": "A paradigm based on creating objects that bundle data and behavior, using concepts like inheritance and encapsulation.",
    "scenario": "You model a shopping app with a Cart class that bundles items and methods like addItem() and checkout(), while User inherits from Person.",
    "category": "Core Programming"
  },
  {
    "id": 3,
    "term": "Functional Programming",
    "definition": "A style of programming that uses pure functions and avoids changing data, making behavior predictable.",
    "scenario": "You refactor code to replace loops with map and filter, avoid mutating state, and pass functions as arguments for predictable behavior.",
    "category": "Core Programming"
  },
  {
    "id": 4,
    "term": "Declarative Programming",
    "definition": "A programming approach where you describe the desired result without specifying the exact steps to achieve it.",
    "scenario": "Instead of writing a loop to filter users, you write users.filter(u => u.active) — describing what you want, not how to compute it.",
    "category": "Core Programming"
  },
  {
    "id": 5,
    "term": "Imperative Programming",
    "definition": "A style where you explicitly define each step the program takes to change its state and reach a result.",
    "scenario": "You write 'for (let i = 0; i < arr.length; i++) sum += arr[i]', explicitly telling the computer each step to compute the total.",
    "category": "Core Programming"
  },
  {
    "id": 6,
    "term": "Event-Driven Programming",
    "definition": "A model where code runs in response to events like clicks, inputs, or system signals instead of a fixed sequence.",
    "scenario": "You attach an onClick handler to a button so your code only runs when the user clicks, not on a fixed schedule.",
    "category": "Core Programming"
  },
  {
    "id": 7,
    "term": "Reactive Programming",
    "definition": "A programming style where programs automatically react to changes in data streams over time.",
    "scenario": "You use RxJS observables so the UI automatically updates whenever the underlying data stream emits new values.",
    "category": "Core Programming"
  },
  {
    "id": 8,
    "term": "Aspect-Oriented Programming",
    "definition": "A technique for separating cross-cutting concerns like logging or security from the main logic of a program.",
    "scenario": "You add logging to every service method without touching their code by wrapping them with an annotation that handles the cross-cutting concern.",
    "category": "Core Programming"
  },
  {
    "id": 9,
    "term": "Generic Programming",
    "definition": "Writing flexible code that works with multiple data types using templates or generics.",
    "scenario": "You write a List<T> class that works for List<int>, List<string>, and List<User> without duplicating any code.",
    "category": "Core Programming"
  },
  {
    "id": 10,
    "term": "Metaprogramming",
    "definition": "A technique where programs can generate, analyze, or modify other programs or themselves.",
    "scenario": "You write a Python decorator that inspects a function's signature at runtime and generates a wrapper around it.",
    "category": "Core Programming"
  },
  {
    "id": 11,
    "term": "Multithreading",
    "definition": "Running multiple threads within a single program so tasks can happen at the same time.",
    "scenario": "Your image editor spawns a new Thread to apply filters in the background so the UI stays responsive.",
    "category": "Concurrency"
  },
  {
    "id": 12,
    "term": "Multiprocessing",
    "definition": "Running multiple independent processes simultaneously, each with its own memory space.",
    "scenario": "Your Python data pipeline uses multiprocessing.Pool to spin up 4 independent OS processes, each with its own memory, to crunch batches in parallel.",
    "category": "Concurrency"
  },
  {
    "id": 13,
    "term": "Parallel Computing",
    "definition": "Performing many computations at the same time using multiple processors or cores.",
    "scenario": "You split a 1-billion-element matrix multiply across 16 CPU cores, performing the operations simultaneously for a near-linear speedup.",
    "category": "Concurrency"
  },
  {
    "id": 14,
    "term": "Concurrency",
    "definition": "Handling multiple tasks that overlap in execution, even if they are not truly simultaneous.",
    "scenario": "Your web server juggles thousands of requests by interleaving them on a few threads — tasks overlap in time even though only one runs at each instant.",
    "category": "Concurrency"
  },
  {
    "id": 15,
    "term": "Thread Pool",
    "definition": "A reusable group of threads that efficiently execute multiple tasks without constantly creating new threads.",
    "scenario": "Rather than create a new worker on every request, your server checks one out from a fixed-size group of pre-created workers and returns it when done.",
    "category": "Concurrency"
  },
  {
    "id": 16,
    "term": "Race Condition",
    "definition": "A bug where the result depends on which thread runs first when accessing shared data.",
    "scenario": "Two threads both read counter=5, each increments it, and both write back 6 — you lost an increment because access to the shared variable wasn't synchronized.",
    "category": "Concurrency"
  },
  {
    "id": 17,
    "term": "Deadlock",
    "definition": "A situation where two or more threads are stuck waiting on each other forever.",
    "scenario": "Thread A holds lock X and waits for Y; thread B holds Y and waits for X; neither can ever make progress.",
    "category": "Concurrency"
  },
  {
    "id": 18,
    "term": "Livelock",
    "definition": "A situation where threads keep reacting to each other but never make actual progress.",
    "scenario": "Two threads keep politely yielding whenever they detect the other wants the lock, so neither ever acquires it and no work gets done.",
    "category": "Concurrency"
  },
  {
    "id": 19,
    "term": "Starvation",
    "definition": "When a thread never gets access to needed resources because others keep taking priority.",
    "scenario": "Your low-priority batch job never runs because higher-priority tasks keep arriving and the scheduler never gives it a turn.",
    "category": "Concurrency"
  },
  {
    "id": 20,
    "term": "Mutex (Mutual Exclusion)",
    "definition": "A locking mechanism that ensures only one thread can access a resource at a time.",
    "scenario": "You wrap the shared balance variable with a lock so only one thread at a time can enter the critical section that reads and updates it.",
    "category": "Concurrency"
  },
  {
    "id": 21,
    "term": "Semaphore",
    "definition": "A synchronization tool that controls access to resources using a counter.",
    "scenario": "You limit downloads to 5 concurrent connections using a counter-based primitive that blocks the 6th request until a slot is released.",
    "category": "Concurrency"
  },
  {
    "id": 22,
    "term": "Monitor",
    "definition": "A high-level structure that controls access to shared data using built-in synchronization.",
    "scenario": "In Java you mark a method 'synchronized' so the language's built-in per-object lock automatically serializes access to its shared data.",
    "category": "Concurrency"
  },
  {
    "id": 23,
    "term": "Lock-Free Programming",
    "definition": "A method of writing concurrent code without locks, using atomic operations instead.",
    "scenario": "You implement a concurrent queue using compare-and-swap atomic operations instead of mutexes to avoid blocking threads.",
    "category": "Concurrency"
  },
  {
    "id": 24,
    "term": "Wait-Free Algorithms",
    "definition": "Algorithms that guarantee every thread completes its task in a limited number of steps.",
    "scenario": "You design a data structure so that every thread is guaranteed to finish its operation in a bounded number of steps, regardless of what other threads do.",
    "category": "Concurrency"
  },
  {
    "id": 25,
    "term": "Context Switching",
    "definition": "The process where the CPU switches from one task or thread to another.",
    "scenario": "The OS saves thread A's registers and loads thread B's so the CPU can start executing B — a costly operation that adds overhead.",
    "category": "Concurrency"
  },
  {
    "id": 26,
    "term": "Synchronous Programming",
    "definition": "A style where tasks run one after another, blocking execution until each finishes.",
    "scenario": "Your function calls readFileSync() and the whole program pauses on that line until the file finishes loading.",
    "category": "Synchronization"
  },
  {
    "id": 27,
    "term": "Asynchronous Programming",
    "definition": "A style where tasks run independently without blocking the main program flow.",
    "scenario": "Your function calls fetch(url) and keeps running; the response is handled later when it arrives.",
    "category": "Synchronization"
  },
  {
    "id": 28,
    "term": "Callback Function",
    "definition": "A function passed into another function to be executed later, often after an event or task completes.",
    "scenario": "You pass an (err, data) => {...} handler as the second argument to fs.readFile so Node can invoke it once the file is read.",
    "category": "Synchronization"
  },
  {
    "id": 29,
    "term": "Promise/Future",
    "definition": "An object representing a value that will be available later after an asynchronous operation finishes.",
    "scenario": "Instead of nested callbacks, you write fetchData().then(handle) — the returned object represents a value that will resolve later.",
    "category": "Synchronization"
  },
  {
    "id": 30,
    "term": "Event Loop",
    "definition": "A system that continuously checks for and executes asynchronous tasks and callbacks.",
    "scenario": "Your Node.js app keeps processing queued callbacks and microtasks in a continuous cycle that drives all async work.",
    "category": "Synchronization"
  },
  {
    "id": 31,
    "term": "Non-blocking I/O",
    "definition": "Input/output operations that allow the program to continue running without waiting for completion.",
    "scenario": "Your server calls read() on a socket and immediately gets 'would block' instead of freezing, so it can handle other clients in the meantime.",
    "category": "Synchronization"
  },
  {
    "id": 32,
    "term": "Blocking I/O",
    "definition": "Input/output operations that pause program execution until the task is complete.",
    "scenario": "Your script calls socket.recv() and execution halts on that line until bytes actually arrive from the network.",
    "category": "Synchronization"
  },
  {
    "id": 33,
    "term": "Coroutines",
    "definition": "Functions that can pause execution and resume later, allowing cooperative multitasking.",
    "scenario": "You use Python's 'async def' and 'await' to write functions that can suspend and resume at specific points without OS threads.",
    "category": "Synchronization"
  },
  {
    "id": 34,
    "term": "Fibers",
    "definition": "Lightweight threads that rely on manual control rather than the operating system for scheduling.",
    "scenario": "You use a Ruby Fiber to manually pause execution inside one function and resume it later from another, outside the OS scheduler.",
    "category": "Synchronization"
  },
  {
    "id": 35,
    "term": "Actor Model",
    "definition": "A concurrency model where independent actors communicate only through message passing.",
    "scenario": "Your Erlang system models each user session as an isolated actor that communicates with others only by sending messages, with no shared memory.",
    "category": "Synchronization"
  },
  {
    "id": 36,
    "term": "Array",
    "definition": "A fixed-size collection of elements stored in contiguous memory locations for fast access.",
    "scenario": "You declare 'int scores[100]' and access any score in O(1) time using scores[i] thanks to contiguous memory.",
    "category": "Data Structures"
  },
  {
    "id": 37,
    "term": "Linked List",
    "definition": "A data structure made of nodes where each node points to the next one in sequence.",
    "scenario": "You implement a structure where each node holds a value and a pointer to the next node, allowing O(1) insertion at the head.",
    "category": "Data Structures"
  },
  {
    "id": 38,
    "term": "Doubly Linked List",
    "definition": "A linked list where each node points both forward and backward.",
    "scenario": "You build a list where each node has both 'next' and 'prev' pointers, making it efficient to iterate in either direction.",
    "category": "Data Structures"
  },
  {
    "id": 39,
    "term": "Stack",
    "definition": "A data structure that follows Last-In, First-Out (LIFO), like a stack of plates.",
    "scenario": "You push function calls onto a structure and pop them as they return — LIFO order, like plates.",
    "category": "Data Structures"
  },
  {
    "id": 40,
    "term": "Queue",
    "definition": "A data structure that follows First-In, First-Out (FIFO), like a line of people.",
    "scenario": "You enqueue print jobs at the tail and dequeue them from the head so the first one submitted prints first.",
    "category": "Data Structures"
  },
  {
    "id": 41,
    "term": "Deque",
    "definition": "A double-ended queue that allows adding and removing elements from both the front and the back.",
    "scenario": "You use Python's collections.deque to efficiently append and popleft from both ends in O(1) time.",
    "category": "Data Structures"
  },
  {
    "id": 42,
    "term": "Hash Table",
    "definition": "A data structure that stores key-value pairs and uses a hash function for fast lookup.",
    "scenario": "You store user sessions in a Map<string, Session> so lookups by session id run in O(1) average time.",
    "category": "Data Structures"
  },
  {
    "id": 43,
    "term": "Binary Tree",
    "definition": "A tree data structure where each node can have at most two children, called left and right.",
    "scenario": "You build a structure where each node has at most two children (left and right), modeling a simple family tree.",
    "category": "Data Structures"
  },
  {
    "id": 44,
    "term": "Binary Search Tree",
    "definition": "A binary tree where left children are smaller and right children are larger, enabling fast searching.",
    "scenario": "You insert numbers such that smaller values go left and larger values go right, letting lookups run in O(log n).",
    "category": "Data Structures"
  },
  {
    "id": 45,
    "term": "AVL Tree",
    "definition": "A self-balancing binary search tree that keeps its height balanced for efficient operations.",
    "scenario": "After every insert you rebalance by rotating subtrees so heights differ by at most one, keeping operations O(log n).",
    "category": "Data Structures"
  },
  {
    "id": 46,
    "term": "Red-Black Tree",
    "definition": "A balanced binary search tree that uses node colors to maintain roughly equal path lengths.",
    "scenario": "Your language's standard library orders a map using a balanced BST where nodes are colored to maintain roughly equal path lengths.",
    "category": "Data Structures"
  },
  {
    "id": 47,
    "term": "Heap (Min/Max Heap)",
    "definition": "A tree-based structure where the smallest or largest element is always at the root, used for priority queues.",
    "scenario": "You implement a priority queue using a binary tree where the smallest element always sits at the root.",
    "category": "Data Structures"
  },
  {
    "id": 48,
    "term": "Trie",
    "definition": "A tree structure used to store strings efficiently, often for fast prefix searching.",
    "scenario": "You implement autocomplete by walking down a tree of characters where each path from the root spells a word prefix.",
    "category": "Data Structures"
  },
  {
    "id": 49,
    "term": "Graph",
    "definition": "A collection of nodes connected by edges, used to represent relationships between data.",
    "scenario": "You model a social network as nodes (users) connected by edges (friendships) so you can run BFS to find mutual friends.",
    "category": "Data Structures"
  },
  {
    "id": 50,
    "term": "Adjacency Matrix",
    "definition": "A 2D array used to represent a graph, where rows and columns indicate connections between nodes.",
    "scenario": "You store graph edges in a 6x6 grid where M[i][j] = 1 means node i connects to node j.",
    "category": "Data Structures"
  },
  {
    "id": 51,
    "term": "Adjacency List",
    "definition": "A graph representation where each node stores a list of its connected neighbors.",
    "scenario": "You represent the graph as a map where each vertex points to an array of its directly connected neighbors.",
    "category": "Data Structures"
  },
  {
    "id": 52,
    "term": "Bloom Filter",
    "definition": "A space-efficient structure that checks if an element might be present, allowing false positives but no false negatives.",
    "scenario": "Before doing an expensive DB lookup, you check a probabilistic set that says either 'definitely not present' or 'maybe present' with a small false-positive rate.",
    "category": "Data Structures"
  },
  {
    "id": 53,
    "term": "Skip List",
    "definition": "A layered linked list that allows fast searching by skipping over multiple elements.",
    "scenario": "You implement a sorted structure with multiple linked-list layers that let searches jump over many elements for O(log n) lookups.",
    "category": "Data Structures"
  },
  {
    "id": 54,
    "term": "Segment Tree",
    "definition": "A tree structure used to efficiently answer range queries and update values in an array.",
    "scenario": "You preprocess an array so you can answer 'sum of range [l, r]' queries and point updates in O(log n).",
    "category": "Data Structures"
  },
  {
    "id": 55,
    "term": "Disjoint Set (Union-Find)",
    "definition": "A structure that keeps track of elements split into groups and supports merging and finding groups efficiently.",
    "scenario": "You group nodes during Kruskal's MST algorithm using a structure that supports find(x) and union(a, b) in near-constant time.",
    "category": "Data Structures"
  },
  {
    "id": 56,
    "term": "Binary Search",
    "definition": "A fast search algorithm that repeatedly divides a sorted list in half to find a target value.",
    "scenario": "You find 42 in a sorted list of 1 million numbers by repeatedly cutting the search range in half, taking about 20 comparisons.",
    "category": "Algorithms"
  },
  {
    "id": 57,
    "term": "Linear Search",
    "definition": "A simple search that checks each element one by one until the target is found.",
    "scenario": "You scan through an unsorted array element by element until you find the target, with worst-case O(n).",
    "category": "Algorithms"
  },
  {
    "id": 58,
    "term": "Depth-First Search (DFS)",
    "definition": "A graph traversal method that explores as far as possible along one branch before backtracking.",
    "scenario": "You explore a maze by walking as deep as you can down one path before backtracking and trying another.",
    "category": "Algorithms"
  },
  {
    "id": 59,
    "term": "Breadth-First Search (BFS)",
    "definition": "A graph traversal method that explores all neighbors at the current level before moving deeper.",
    "scenario": "You find the shortest path in an unweighted graph by exploring all neighbors at distance 1, then 2, then 3 — using a queue.",
    "category": "Algorithms"
  },
  {
    "id": 60,
    "term": "Dijkstra's Algorithm",
    "definition": "An algorithm that finds the shortest path from one node to all others in a graph with non-negative weights.",
    "scenario": "You compute the shortest driving distance from your house to every other city in a map with non-negative road weights using a priority queue.",
    "category": "Algorithms"
  },
  {
    "id": 61,
    "term": "Bellman-Ford Algorithm",
    "definition": "An algorithm that finds shortest paths and can handle graphs with negative edge weights.",
    "scenario": "You compute shortest paths in a graph that includes negative-weight edges by relaxing every edge V-1 times.",
    "category": "Algorithms"
  },
  {
    "id": 62,
    "term": "Floyd-Warshall Algorithm",
    "definition": "An algorithm that computes shortest paths between all pairs of nodes in a graph.",
    "scenario": "You build a table of shortest distances between every pair of nodes in a weighted graph via dynamic programming in O(V^3).",
    "category": "Algorithms"
  },
  {
    "id": 63,
    "term": "A* Search Algorithm",
    "definition": "A pathfinding algorithm that uses heuristics to efficiently find the shortest path.",
    "scenario": "You find the shortest path in a game grid by combining actual cost from the start with a heuristic estimate to the goal, speeding up the search.",
    "category": "Algorithms"
  },
  {
    "id": 64,
    "term": "Merge Sort",
    "definition": "A divide-and-conquer sorting algorithm that splits data and merges it back in sorted order.",
    "scenario": "You recursively split the array in half, sort each half, then merge the two sorted halves back together in O(n log n).",
    "category": "Algorithms"
  },
  {
    "id": 65,
    "term": "Quick Sort",
    "definition": "A sorting algorithm that partitions data around a pivot and recursively sorts the parts.",
    "scenario": "You pick a pivot, partition elements around it, and recursively sort the two partitions — average O(n log n) but O(n^2) worst case.",
    "category": "Algorithms"
  },
  {
    "id": 66,
    "term": "Heap Sort",
    "definition": "A sorting algorithm that uses a heap structure to repeatedly extract the largest or smallest element.",
    "scenario": "You repeatedly extract the max element from a binary heap to sort an array in-place in O(n log n).",
    "category": "Algorithms"
  },
  {
    "id": 67,
    "term": "Bubble Sort",
    "definition": "A simple sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.",
    "scenario": "You repeatedly walk the list, swapping adjacent pairs when out of order, until a full pass makes no swaps — O(n^2).",
    "category": "Algorithms"
  },
  {
    "id": 68,
    "term": "Insertion Sort",
    "definition": "A sorting algorithm that builds a sorted list by inserting elements into their correct position one at a time.",
    "scenario": "You walk the array left to right, inserting each new element into its correct position among the already-sorted prefix.",
    "category": "Algorithms"
  },
  {
    "id": 69,
    "term": "Selection Sort",
    "definition": "A sorting algorithm that repeatedly selects the smallest element and moves it to the correct position.",
    "scenario": "You repeatedly scan the unsorted part of the array for the smallest remaining element and swap it into the next position.",
    "category": "Algorithms"
  },
  {
    "id": 70,
    "term": "Dynamic Programming",
    "definition": "A method for solving problems by breaking them into subproblems and storing results to avoid recomputation.",
    "scenario": "You compute the nth Fibonacci number by filling a memo table bottom-up so each subproblem is solved only once.",
    "category": "Algorithms"
  },
  {
    "id": 71,
    "term": "Greedy Algorithm",
    "definition": "An approach that makes the best local choice at each step in hopes of finding a global optimum.",
    "scenario": "You make change for 87 cents by always grabbing the largest coin less than or equal to the remaining amount, hoping local choices yield the global optimum.",
    "category": "Algorithms"
  },
  {
    "id": 72,
    "term": "Backtracking",
    "definition": "A method that tries all possible solutions and abandons paths that fail to meet conditions.",
    "scenario": "You solve a Sudoku by placing a digit, recursing, and undoing the placement if a later constraint fails.",
    "category": "Algorithms"
  },
  {
    "id": 73,
    "term": "Divide and Conquer",
    "definition": "A strategy that breaks a problem into smaller parts, solves them, and combines the results.",
    "scenario": "You solve a problem by splitting it into smaller subproblems, solving each independently, then combining the results — as in merge sort.",
    "category": "Algorithms"
  },
  {
    "id": 74,
    "term": "Branch and Bound",
    "definition": "An optimization method that explores solutions while pruning paths that cannot produce better results.",
    "scenario": "You solve the traveling salesman problem by exploring partial tours and pruning any branch whose lower-bound exceeds the best tour found so far.",
    "category": "Algorithms"
  },
  {
    "id": 75,
    "term": "Topological Sort",
    "definition": "An ordering of nodes in a directed acyclic graph where dependencies are respected.",
    "scenario": "You order course prerequisites so that for every edge u -> v, u comes before v in the linear ordering.",
    "category": "Algorithms"
  },
  {
    "id": 76,
    "term": "Big-O Notation",
    "definition": "A way of describing the upper limit of an algorithm's growth rate as input size increases.",
    "scenario": "You describe the running time of your nested loops over n items as O(n^2), capturing the upper bound of growth.",
    "category": "Complexity"
  },
  {
    "id": 77,
    "term": "Big-Theta Notation",
    "definition": "A notation that describes the exact growth rate of an algorithm within tight bounds.",
    "scenario": "You assert your algorithm's runtime is tightly bounded both above and below by n log n, writing it as Θ(n log n).",
    "category": "Complexity"
  },
  {
    "id": 78,
    "term": "Big-Omega Notation",
    "definition": "A notation that describes the minimum growth rate of an algorithm.",
    "scenario": "You say your search has a lower bound of Ω(log n), meaning it can't do better than logarithmic in the worst case.",
    "category": "Complexity"
  },
  {
    "id": 79,
    "term": "Time Complexity",
    "definition": "A measure of how an algorithm's runtime increases as the input size grows.",
    "scenario": "You benchmark how your algorithm's runtime scales with larger input sizes to show it grows linearly with n.",
    "category": "Complexity"
  },
  {
    "id": 80,
    "term": "Space Complexity",
    "definition": "A measure of how much memory an algorithm uses relative to input size.",
    "scenario": "You trace how much extra memory your recursive algorithm allocates and conclude it uses O(n) additional space for the call stack.",
    "category": "Complexity"
  },
  {
    "id": 81,
    "term": "Amortized Analysis",
    "definition": "A method of analyzing performance by averaging the cost of operations over time.",
    "scenario": "You prove that although a dynamic array's occasional resize is O(n), the average cost of a push over many operations is O(1).",
    "category": "Complexity"
  },
  {
    "id": 82,
    "term": "Worst-Case Complexity",
    "definition": "The maximum time or space an algorithm could take in the most difficult scenario.",
    "scenario": "You analyze the slowest possible input to quicksort and conclude it takes O(n^2) when the pivot is always the smallest element.",
    "category": "Complexity"
  },
  {
    "id": 83,
    "term": "Average-Case Complexity",
    "definition": "The expected performance of an algorithm across typical inputs.",
    "scenario": "You compute the expected runtime of your hash map's insertion over random keys and show it's O(1) under a good hash function.",
    "category": "Complexity"
  },
  {
    "id": 84,
    "term": "Best-Case Complexity",
    "definition": "The minimum time or space an algorithm requires under ideal conditions.",
    "scenario": "You note that an already-sorted list makes insertion sort run in O(n), its fastest possible scenario.",
    "category": "Complexity"
  },
  {
    "id": 85,
    "term": "NP-Completeness",
    "definition": "A class of problems that are very hard to solve but easy to verify once a solution is found.",
    "scenario": "You try to solve 3-SAT and realize no known polynomial-time algorithm exists, though you can verify any given solution quickly.",
    "category": "Complexity"
  },
  {
    "id": 86,
    "term": "CPU Pipeline",
    "definition": "A technique where multiple instruction steps are processed simultaneously in stages.",
    "scenario": "Your processor fetches instruction N+3 while decoding N+2, executing N+1, and writing back N — multiple steps in flight at once.",
    "category": "Architecture"
  },
  {
    "id": 87,
    "term": "Instruction Set Architecture (ISA)",
    "definition": "The set of commands a CPU understands and can execute.",
    "scenario": "You port your compiler's backend from x86 to ARM, which means emitting a different set of native machine instructions the CPU understands.",
    "category": "Architecture"
  },
  {
    "id": 88,
    "term": "RISC Architecture",
    "definition": "A CPU design that uses simple instructions for faster execution.",
    "scenario": "Your ARM chip uses a small, simple set of fixed-length instructions to keep decoding fast and the pipeline efficient.",
    "category": "Architecture"
  },
  {
    "id": 89,
    "term": "CISC Architecture",
    "definition": "A CPU design that uses complex instructions to perform more work per command.",
    "scenario": "Your x86 processor provides complex variable-length instructions like REP MOVSB that do a lot of work in a single opcode.",
    "category": "Architecture"
  },
  {
    "id": 90,
    "term": "Cache Memory",
    "definition": "A small, fast memory that stores frequently used data for quick CPU access.",
    "scenario": "Your CPU keeps the hottest data in a small, fast on-die memory so frequent accesses don't hit slow DRAM.",
    "category": "Architecture"
  },
  {
    "id": 91,
    "term": "L1/L2/L3 Cache",
    "definition": "Levels of cache memory with different speeds and sizes, closest to farthest from the CPU.",
    "scenario": "Your profile shows data hits the first tier (fastest, per-core), falls back to a larger shared tier, and finally a third tier before main memory.",
    "category": "Architecture"
  },
  {
    "id": 92,
    "term": "Cache Coherence",
    "definition": "Ensuring that multiple caches store consistent data across a system.",
    "scenario": "On a multi-core CPU, when core 1 writes to a memory line, core 2's cached copy is invalidated via the MESI protocol so all cores see consistent data.",
    "category": "Architecture"
  },
  {
    "id": 93,
    "term": "Branch Prediction",
    "definition": "A CPU technique that guesses which path a program will take to improve performance.",
    "scenario": "Your CPU guesses which way an 'if' will go and speculatively executes the predicted path to keep the pipeline full.",
    "category": "Architecture"
  },
  {
    "id": 94,
    "term": "SIMD (Single Instruction Multiple Data)",
    "definition": "A method where a single instruction processes multiple data points simultaneously.",
    "scenario": "You use _mm256_add_ps to add eight 32-bit floats with a single AVX instruction, vectorizing your inner loop.",
    "category": "Architecture"
  },
  {
    "id": 95,
    "term": "GPU Architecture",
    "definition": "A design optimized for handling many parallel tasks, often used in graphics and AI.",
    "scenario": "You run your physics simulation on a chip with thousands of small cores optimized for massive parallel workloads like graphics and ML.",
    "category": "Architecture"
  },
  {
    "id": 96,
    "term": "CUDA Programming",
    "definition": "A model for writing programs that run on GPUs for parallel computation.",
    "scenario": "You write an NVIDIA kernel as '__global__ void vecAdd(...)' and launch it with <<<blocks, threads>>> to parallelize across GPU cores.",
    "category": "Architecture"
  },
  {
    "id": 97,
    "term": "Memory Hierarchy",
    "definition": "The organization of storage from fastest and smallest (cache) to slowest and largest (disk).",
    "scenario": "You design your data access patterns knowing the system has registers, L1/L2/L3 cache, RAM, SSD, and disk — each slower and larger than the last.",
    "category": "Architecture"
  },
  {
    "id": 98,
    "term": "Virtual Memory",
    "definition": "An abstraction that allows programs to use more memory than physically available.",
    "scenario": "Your process accesses addresses that don't physically exist in RAM; the OS pages data in from disk on demand so you appear to have more memory than you do.",
    "category": "Architecture"
  },
  {
    "id": 99,
    "term": "Paging",
    "definition": "A memory management technique that divides memory into fixed-size blocks called pages.",
    "scenario": "Your OS divides memory into 4KB blocks and maps virtual blocks to physical frames via a page table.",
    "category": "Architecture"
  },
  {
    "id": 100,
    "term": "Segmentation",
    "definition": "A memory management method that divides memory into logical segments like code and data.",
    "scenario": "Your OS divides a process's address space into logical regions like code, data, and stack, each with its own base and limit.",
    "category": "Architecture"
  },
  {
    "id": 101,
    "term": "Process",
    "definition": "An independent program in execution with its own memory space.",
    "scenario": "You spawn a new program using fork(); it gets its own PID, its own memory space, and runs independently of its parent.",
    "category": "Operating Systems"
  },
  {
    "id": 102,
    "term": "Thread",
    "definition": "A smaller unit of a process that can run concurrently with others.",
    "scenario": "Within your web server, each request is handled by a lightweight execution unit that shares memory with the rest of the process.",
    "category": "Operating Systems"
  },
  {
    "id": 103,
    "term": "Scheduling Algorithm",
    "definition": "A method used by the OS to decide which process or thread runs next.",
    "scenario": "The OS picks which runnable task gets the CPU next, balancing fairness and throughput.",
    "category": "Operating Systems"
  },
  {
    "id": 104,
    "term": "Round Robin Scheduling",
    "definition": "A scheduling method where each process gets a fixed time slice in rotation.",
    "scenario": "Each ready process gets a 10ms time slice on the CPU in strict rotation, preempted when the quantum expires.",
    "category": "Operating Systems"
  },
  {
    "id": 105,
    "term": "Priority Scheduling",
    "definition": "A scheduling method where tasks are executed based on priority levels.",
    "scenario": "Your real-time audio thread is marked higher priority so the OS always runs it before the background indexer.",
    "category": "Operating Systems"
  },
  {
    "id": 106,
    "term": "Deadlock Prevention",
    "definition": "Techniques used to ensure that deadlocks cannot occur in a system.",
    "scenario": "You enforce that locks are always acquired in a fixed global order so a cycle of waits can never form.",
    "category": "Operating Systems"
  },
  {
    "id": 107,
    "term": "Deadlock Avoidance",
    "definition": "Strategies that keep the system in a safe state to avoid deadlocks.",
    "scenario": "The OS uses the Banker's Algorithm to only grant a resource request if doing so leaves the system in a safe state.",
    "category": "Operating Systems"
  },
  {
    "id": 108,
    "term": "Memory Management",
    "definition": "The process of allocating and freeing memory for programs efficiently.",
    "scenario": "Your runtime tracks which regions of RAM are free and which are allocated, handing out and reclaiming heap memory as programs request it.",
    "category": "Operating Systems"
  },
  {
    "id": 109,
    "term": "File System",
    "definition": "The structure used by an OS to store, organize, and retrieve files.",
    "scenario": "Your OS organizes persistent data into directories and files with inodes, permissions, and metadata on disk.",
    "category": "Operating Systems"
  },
  {
    "id": 110,
    "term": "System Call",
    "definition": "A way for programs to request services from the operating system.",
    "scenario": "Your C program invokes write(fd, buf, len), trapping into the kernel so the OS can perform the I/O on its behalf.",
    "category": "Operating Systems"
  },
  {
    "id": 111,
    "term": "Kernel Mode",
    "definition": "A privileged mode where the OS has full access to hardware resources.",
    "scenario": "The scheduler and device drivers run with full CPU privileges, able to execute privileged instructions and access any memory.",
    "category": "Operating Systems"
  },
  {
    "id": 112,
    "term": "User Mode",
    "definition": "A restricted mode where applications run without direct hardware access.",
    "scenario": "Your application code runs with restricted privileges and must trap into the kernel for any operation touching hardware.",
    "category": "Operating Systems"
  },
  {
    "id": 113,
    "term": "Interrupt",
    "definition": "A signal that temporarily stops the CPU to handle an urgent task.",
    "scenario": "The network card raises a signal on the CPU line, causing it to pause your program and run the driver's packet handler.",
    "category": "Operating Systems"
  },
  {
    "id": 114,
    "term": "Context Switch",
    "definition": "Saving and restoring a process's state so the CPU can switch tasks.",
    "scenario": "The scheduler saves thread A's registers into its PCB and restores thread B's so the CPU can resume B.",
    "category": "Operating Systems"
  },
  {
    "id": 115,
    "term": "Virtualization",
    "definition": "Creating virtual versions of hardware or systems to run multiple environments.",
    "scenario": "Your laptop runs Ubuntu inside a VM on top of Windows, with a hypervisor creating an emulated hardware environment.",
    "category": "Operating Systems"
  },
  {
    "id": 116,
    "term": "TCP/IP",
    "definition": "The core set of protocols used for communication over the internet.",
    "scenario": "Your browser's connection uses a reliable stream protocol on top of a packet-routed network protocol to talk to the server.",
    "category": "Networking"
  },
  {
    "id": 117,
    "term": "HTTP/HTTPS",
    "definition": "Protocols used for transferring web data, with HTTPS adding encryption.",
    "scenario": "Your browser sends a GET request and receives a response; the secure variant adds TLS for encryption.",
    "category": "Networking"
  },
  {
    "id": 118,
    "term": "REST",
    "definition": "An API design style that uses stateless requests and standard HTTP methods.",
    "scenario": "You expose /users/:id with GET/POST/PUT/DELETE methods, each request stateless and self-contained.",
    "category": "Networking"
  },
  {
    "id": 119,
    "term": "GraphQL",
    "definition": "An API query language that lets clients request exactly the data they need.",
    "scenario": "Your client sends a single query specifying exactly which user fields it needs, avoiding over-fetching from multiple REST endpoints.",
    "category": "Networking"
  },
  {
    "id": 120,
    "term": "DNS",
    "definition": "A system that translates domain names into IP addresses.",
    "scenario": "Your browser resolves claude.ai to 104.18.26.90 by asking a resolver to translate the name to an IP.",
    "category": "Networking"
  },
  {
    "id": 121,
    "term": "DHCP",
    "definition": "A protocol that automatically assigns IP addresses to devices on a network.",
    "scenario": "When your laptop joins the coffee-shop Wi-Fi, a server automatically hands it an IP address, gateway, and DNS settings.",
    "category": "Networking"
  },
  {
    "id": 122,
    "term": "FTP",
    "definition": "A protocol used to transfer files between computers over a network.",
    "scenario": "You use an old-school file transfer protocol with PUT/GET commands over a TCP connection to move files to a remote server.",
    "category": "Networking"
  },
  {
    "id": 123,
    "term": "SMTP",
    "definition": "A protocol used to send emails between servers.",
    "scenario": "Your mail server pushes outgoing messages to the recipient's mail server on TCP port 25 using the standard mail delivery protocol.",
    "category": "Networking"
  },
  {
    "id": 124,
    "term": "WebSocket",
    "definition": "A protocol that enables real-time, two-way communication between client and server.",
    "scenario": "Your chat app opens a persistent full-duplex connection so the server can push new messages to the browser in real time.",
    "category": "Networking"
  },
  {
    "id": 125,
    "term": "Load Balancing",
    "definition": "Distributing incoming traffic across multiple servers to improve performance and reliability.",
    "scenario": "An NGINX instance in front of your 10 backend servers distributes incoming requests across them to even out the load.",
    "category": "Networking"
  },
  {
    "id": 126,
    "term": "Reverse Proxy",
    "definition": "A server that forwards client requests to backend servers and returns responses.",
    "scenario": "NGINX receives the client's request, forwards it to one of your backend Node servers, and returns the response.",
    "category": "Networking"
  },
  {
    "id": 127,
    "term": "CDN (Content Delivery Network)",
    "definition": "A network of servers that delivers content from locations closest to users.",
    "scenario": "Your static images are cached on edge servers worldwide so a user in Tokyo loads them from a nearby node rather than your origin.",
    "category": "Networking"
  },
  {
    "id": 128,
    "term": "NAT (Network Address Translation)",
    "definition": "A method that maps private IP addresses to a public IP for internet access.",
    "scenario": "Your home router maps all your private 192.168.x.x devices to a single public IP when they talk to the internet.",
    "category": "Networking"
  },
  {
    "id": 129,
    "term": "IPv4",
    "definition": "A 32-bit addressing system used to identify devices on a network.",
    "scenario": "You configure a 32-bit address like 192.168.1.10 — a total of about 4.3 billion possible addresses.",
    "category": "Networking"
  },
  {
    "id": 130,
    "term": "IPv6",
    "definition": "A newer 128-bit addressing system designed to replace IPv4 and support more devices.",
    "scenario": "You configure a 128-bit address like 2001:db8::1 to support the explosion of internet-connected devices.",
    "category": "Networking"
  },
  {
    "id": 131,
    "term": "Cloud Computing",
    "definition": "Using remote servers over the internet to store data and run applications.",
    "scenario": "Instead of buying physical servers, you rent compute and storage from AWS and scale up on demand.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 132,
    "term": "IaaS (Infrastructure as a Service)",
    "definition": "Cloud service providing virtual machines, storage, and networking resources.",
    "scenario": "You rent EC2 virtual machines, EBS volumes, and VPC networking from AWS and manage the OS and software yourself.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 133,
    "term": "PaaS (Platform as a Service)",
    "definition": "Cloud service offering a platform to build and deploy applications without managing infrastructure.",
    "scenario": "You deploy your Node app to Heroku, which handles the OS, runtime, and scaling — you just push code.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 134,
    "term": "SaaS (Software as a Service)",
    "definition": "Software delivered over the internet without needing installation.",
    "scenario": "Your company pays a monthly subscription for Gmail instead of running a local email server.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 135,
    "term": "Microservices Architecture",
    "definition": "An architecture where applications are built as small, independent services.",
    "scenario": "You split your monolith into auth-service, billing-service, and search-service, each deployed independently and talking over HTTP.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 136,
    "term": "Monolithic Architecture",
    "definition": "An architecture where all components are combined into a single unified system.",
    "scenario": "Your entire app — UI, business logic, database layer — lives in one Rails codebase and deploys as a single unit.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 137,
    "term": "Serverless Computing",
    "definition": "A cloud model where developers run code without managing servers.",
    "scenario": "You deploy a single AWS Lambda function that runs only when triggered — no VM or container to manage.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 138,
    "term": "Containerization",
    "definition": "Packaging applications with their dependencies into isolated environments.",
    "scenario": "You package your app with its dependencies into an isolated, reproducible image that runs the same everywhere.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 139,
    "term": "Docker",
    "definition": "A platform used to create and run containers.",
    "scenario": "You write a Dockerfile describing your app's environment and run 'docker build' to produce a portable image.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 140,
    "term": "Kubernetes",
    "definition": "A system for managing and scaling containerized applications.",
    "scenario": "You describe your deployment in YAML and a cluster orchestrator schedules, scales, and heals containers across many nodes.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 141,
    "term": "Distributed System",
    "definition": "A system where multiple computers work together as one.",
    "scenario": "Your service is spread across 100 machines that coordinate via the network to present a single logical service to users.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 142,
    "term": "CAP Theorem",
    "definition": "A principle stating that a distributed system can only guarantee two of consistency, availability, and partition tolerance.",
    "scenario": "You realize your replicated key-value store, during a network partition, must choose between returning stale data or refusing requests.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 143,
    "term": "Consistency Models",
    "definition": "Rules that define how and when changes to data become visible across a system.",
    "scenario": "You choose between strong, causal, or eventual guarantees that define when writes become visible to readers across your replicas.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 144,
    "term": "Eventual Consistency",
    "definition": "A model where all nodes will eventually have the same data, given enough time.",
    "scenario": "In your DynamoDB table, a write may take a moment to propagate, but all replicas will agree on the value given no further updates.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 145,
    "term": "Message Queue",
    "definition": "A system that allows asynchronous communication by passing messages between services.",
    "scenario": "Your checkout service drops an 'order-placed' event into RabbitMQ; downstream shipping and analytics services consume it asynchronously.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 146,
    "term": "Authentication",
    "definition": "The process of verifying a user's identity.",
    "scenario": "Your login endpoint verifies a user's password and returns a session token so you know they are who they claim to be.",
    "category": "Security"
  },
  {
    "id": 147,
    "term": "Authorization",
    "definition": "The process of determining what actions a user is allowed to perform.",
    "scenario": "After logging in, your middleware checks whether the user has permission to access /admin before serving it.",
    "category": "Security"
  },
  {
    "id": 148,
    "term": "Encryption",
    "definition": "Converting data into a secure format that can only be read with a key.",
    "scenario": "You use AES-256 to scramble a credit-card number before storing it, so only holders of the key can read it.",
    "category": "Security"
  },
  {
    "id": 149,
    "term": "Symmetric Encryption",
    "definition": "Encryption where the same key is used to both encrypt and decrypt data.",
    "scenario": "You use AES with a shared secret to both encrypt and decrypt traffic between two services.",
    "category": "Security"
  },
  {
    "id": 150,
    "term": "Asymmetric Encryption",
    "definition": "Encryption that uses a public key to encrypt and a private key to decrypt.",
    "scenario": "You publish your RSA public key so anyone can encrypt a message that only your private key can decrypt.",
    "category": "Security"
  },
  {
    "id": 151,
    "term": "Hashing",
    "definition": "Transforming data into a fixed-size value that cannot be reversed.",
    "scenario": "You store user passwords as bcrypt digests so the original plaintext can't be recovered even if the database leaks.",
    "category": "Security"
  },
  {
    "id": 152,
    "term": "Salting",
    "definition": "Adding random data to input before hashing to improve security.",
    "scenario": "Before hashing each password, you concatenate a unique random value so identical passwords produce different hashes.",
    "category": "Security"
  },
  {
    "id": 153,
    "term": "Public Key Infrastructure (PKI)",
    "definition": "A system for managing digital certificates and public-key encryption.",
    "scenario": "Your browser trusts a certificate because it's signed by a chain of authorities rooted in a CA it ships with.",
    "category": "Security"
  },
  {
    "id": 154,
    "term": "TLS/SSL",
    "definition": "Protocols that encrypt data sent over networks for secure communication.",
    "scenario": "Your browser negotiates a secure channel using certificates and a key exchange, then encrypts all HTTP traffic flowing through it.",
    "category": "Security"
  },
  {
    "id": 155,
    "term": "OAuth",
    "definition": "A protocol that allows secure delegated access without sharing passwords.",
    "scenario": "Your app lets users log in with 'Sign in with Google' without ever seeing their Google password — Google grants you an access token.",
    "category": "Security"
  },
  {
    "id": 156,
    "term": "JWT (JSON Web Token)",
    "definition": "A compact token used to securely transmit user authentication data.",
    "scenario": "Your API issues a signed eyJhbGci... string containing the user's claims so later requests can be authenticated statelessly.",
    "category": "Security"
  },
  {
    "id": 157,
    "term": "Cross-Site Scripting (XSS)",
    "definition": "A vulnerability where attackers inject malicious scripts into web pages.",
    "scenario": "An attacker posts a comment containing <script>stealCookies()</script> that runs in other users' browsers when the page renders it unescaped.",
    "category": "Security"
  },
  {
    "id": 158,
    "term": "SQL Injection",
    "definition": "An attack where malicious SQL is inserted into queries to manipulate a database.",
    "scenario": "An attacker submits ' OR 1=1 -- in your unsanitized login form, turning your SELECT query into a full table dump.",
    "category": "Security"
  },
  {
    "id": 159,
    "term": "CSRF (Cross-Site Request Forgery)",
    "definition": "An attack that tricks a user into performing unintended actions on a website.",
    "scenario": "A malicious site embeds <img src='https://bank.com/transfer?to=evil&amt=1000'> — if the victim is logged in, their browser silently submits the transfer.",
    "category": "Security"
  },
  {
    "id": 160,
    "term": "Zero Trust Architecture",
    "definition": "A security model that assumes no user or system is trusted by default.",
    "scenario": "Your enterprise network requires every service-to-service call to be authenticated and authorized, even inside the firewall.",
    "category": "Security"
  },
  {
    "id": 161,
    "term": "HTML",
    "definition": "The standard language used to structure content on web pages.",
    "scenario": "You write <h1>Welcome</h1><p>Hello</p> to structure the content that browsers will render as a page.",
    "category": "Web Dev"
  },
  {
    "id": 162,
    "term": "CSS",
    "definition": "A language used to style and layout web pages.",
    "scenario": "You add '.btn { background: blue; padding: 8px; }' to style all your buttons consistently across pages.",
    "category": "Web Dev"
  },
  {
    "id": 163,
    "term": "JavaScript",
    "definition": "A programming language used to add interactivity to web pages.",
    "scenario": "You add document.getElementById('btn').onclick = () => alert('hi') to make the page interactive on click.",
    "category": "Web Dev"
  },
  {
    "id": 164,
    "term": "DOM (Document Object Model)",
    "definition": "A representation of a web page that allows scripts to modify its structure and content.",
    "scenario": "Your script calls document.createElement('div') to add a new node to the tree that represents the rendered page.",
    "category": "Web Dev"
  },
  {
    "id": 165,
    "term": "AJAX",
    "definition": "A technique for updating web pages asynchronously without reloading.",
    "scenario": "Your page uses XMLHttpRequest or fetch to update a portion of the page with new data without a full reload.",
    "category": "Web Dev"
  },
  {
    "id": 166,
    "term": "Single Page Application (SPA)",
    "definition": "A web app that dynamically updates content without full page reloads.",
    "scenario": "Your React app handles routing in the browser with react-router, never fully reloading when the user navigates between views.",
    "category": "Web Dev"
  },
  {
    "id": 167,
    "term": "Progressive Web App (PWA)",
    "definition": "A web app that behaves like a native app with offline support and installability.",
    "scenario": "Your web app registers a service worker and manifest so users can install it to their home screen and use it offline.",
    "category": "Web Dev"
  },
  {
    "id": 168,
    "term": "Web Accessibility (a11y)",
    "definition": "Designing websites so they are usable by people with disabilities.",
    "scenario": "You add alt text, ARIA labels, and keyboard navigation so screen-reader users can still use your site.",
    "category": "Web Dev"
  },
  {
    "id": 169,
    "term": "Responsive Design",
    "definition": "Designing layouts that adapt to different screen sizes and devices.",
    "scenario": "You write CSS media queries so your layout reflows cleanly on phones, tablets, and desktops.",
    "category": "Web Dev"
  },
  {
    "id": 170,
    "term": "CORS (Cross-Origin Resource Sharing)",
    "definition": "A security feature that controls how resources are shared across different domains.",
    "scenario": "Your React app at app.example.com can't call API api.example.com until the API sets Access-Control-Allow-Origin on its responses.",
    "category": "Web Dev"
  },
  {
    "id": 171,
    "term": "React",
    "definition": "A library for building user interfaces using reusable components.",
    "scenario": "You build your UI as a tree of components like <Button onClick={handle}> with props and hooks managing state.",
    "category": "Front-End"
  },
  {
    "id": 172,
    "term": "Angular",
    "definition": "A full-featured framework for building large-scale web applications.",
    "scenario": "Your team uses a full opinionated framework with TypeScript, decorators, RxJS, and dependency injection built in.",
    "category": "Front-End"
  },
  {
    "id": 173,
    "term": "Vue.js",
    "definition": "A progressive framework for building user interfaces incrementally.",
    "scenario": "You use <template>, <script setup>, and reactive refs to build a component with a gentle learning curve.",
    "category": "Front-End"
  },
  {
    "id": 174,
    "term": "Svelte",
    "definition": "A framework that compiles code into efficient JavaScript at build time.",
    "scenario": "Your components are compiled at build time into minimal vanilla JS, with no virtual DOM at runtime.",
    "category": "Front-End"
  },
  {
    "id": 175,
    "term": "Redux",
    "definition": "A library for managing application state in a predictable way.",
    "scenario": "You dispatch actions to a single store, reducers compute the next state, and components subscribe to changes predictably.",
    "category": "Front-End"
  },
  {
    "id": 176,
    "term": "Next.js",
    "definition": "A framework built on React that supports server-side rendering.",
    "scenario": "You build a React app where pages can be server-rendered, statically generated, or client-rendered, with file-based routing.",
    "category": "Front-End"
  },
  {
    "id": 177,
    "term": "Webpack",
    "definition": "A tool that bundles JavaScript modules into optimized files.",
    "scenario": "Your webpack.config.js bundles your ES modules, CSS, and images into optimized chunks for the browser.",
    "category": "Front-End"
  },
  {
    "id": 178,
    "term": "Babel",
    "definition": "A tool that converts modern JavaScript into compatible versions.",
    "scenario": "Your build pipeline transpiles modern JS (arrow functions, optional chaining) down to ES5 so older browsers can run it.",
    "category": "Front-End"
  },
  {
    "id": 179,
    "term": "Tailwind CSS",
    "definition": "A utility-first CSS framework for building custom designs quickly.",
    "scenario": "You style a button with utility classes like class='px-4 py-2 bg-blue-500 rounded' instead of writing custom CSS.",
    "category": "Front-End"
  },
  {
    "id": 180,
    "term": "Bootstrap",
    "definition": "A CSS framework that provides pre-built components and styles.",
    "scenario": "You drop in a framework with pre-built .btn, .navbar, .modal components so your MVP looks polished without custom CSS.",
    "category": "Front-End"
  },
  {
    "id": 181,
    "term": "Native Development",
    "definition": "Building apps specifically for one platform using its official tools and languages.",
    "scenario": "You build an iPhone-only app in Swift using Xcode and the official iOS SDK for maximum platform performance.",
    "category": "Mobile"
  },
  {
    "id": 182,
    "term": "Cross-Platform Development",
    "definition": "Building apps that run on multiple platforms using a single codebase.",
    "scenario": "You write one codebase and ship it to iOS, Android, and web without rewriting the UI for each platform.",
    "category": "Mobile"
  },
  {
    "id": 183,
    "term": "Flutter",
    "definition": "A UI toolkit for building cross-platform apps with a single codebase.",
    "scenario": "You build a mobile UI in Dart using a widget tree that renders the same on iOS and Android.",
    "category": "Mobile"
  },
  {
    "id": 184,
    "term": "React Native",
    "definition": "A framework for building mobile apps using JavaScript and React.",
    "scenario": "You build a mobile app in JavaScript using components like <View> and <Text> that map to native UI on both platforms.",
    "category": "Mobile"
  },
  {
    "id": 185,
    "term": "Swift (iOS)",
    "definition": "A programming language used for building iOS applications.",
    "scenario": "You write '@State var count = 0' in a SwiftUI view to build an iOS app using Apple's modern language.",
    "category": "Mobile"
  },
  {
    "id": 186,
    "term": "Kotlin (Android)",
    "definition": "A programming language used for building Android applications.",
    "scenario": "You build an Android activity using the JetBrains-created JVM language that replaced Java as Google's preferred option.",
    "category": "Mobile"
  },
  {
    "id": 187,
    "term": "Mobile UI/UX",
    "definition": "Designing mobile apps for usability, accessibility, and user satisfaction.",
    "scenario": "You redesign your app's onboarding with larger tap targets, thumb-friendly nav, and haptic feedback for a better user experience.",
    "category": "Mobile"
  },
  {
    "id": 188,
    "term": "App Lifecycle",
    "definition": "The stages an app goes through from launch to termination.",
    "scenario": "Your Android Activity's onCreate, onResume, onPause, and onDestroy methods fire as the user opens, backgrounds, and closes your app.",
    "category": "Mobile"
  },
  {
    "id": 189,
    "term": "Push Notifications",
    "definition": "Messages sent from a server to a user's device in real time.",
    "scenario": "Your server uses APNs or FCM to deliver a message to a user's device even when the app isn't running.",
    "category": "Mobile"
  },
  {
    "id": 190,
    "term": "Offline-first Apps",
    "definition": "Apps designed to work without internet and sync data when reconnected.",
    "scenario": "Your app caches data locally with SQLite and queues mutations, syncing to the server once a connection returns.",
    "category": "Mobile"
  },
  {
    "id": 191,
    "term": "Supervised Learning",
    "definition": "Training a model using labeled data with known outputs.",
    "scenario": "You train a spam classifier on 100,000 emails that are already labeled 'spam' or 'ham'.",
    "category": "ML & Data Science"
  },
  {
    "id": 192,
    "term": "Unsupervised Learning",
    "definition": "Finding patterns in data without labeled outputs.",
    "scenario": "You cluster customers into segments using k-means on purchase data with no predefined labels.",
    "category": "ML & Data Science"
  },
  {
    "id": 193,
    "term": "Reinforcement Learning",
    "definition": "Training models through rewards and penalties based on actions.",
    "scenario": "You train an agent to play chess by giving it a reward for winning and penalties for losing, letting it learn the policy over time.",
    "category": "ML & Data Science"
  },
  {
    "id": 194,
    "term": "Neural Networks",
    "definition": "Models inspired by the brain that learn patterns through layers of nodes.",
    "scenario": "You stack layers of neurons with weights and activations, training them via backprop to recognize handwritten digits.",
    "category": "ML & Data Science"
  },
  {
    "id": 195,
    "term": "Deep Learning",
    "definition": "A subset of machine learning using large neural networks with many layers.",
    "scenario": "You train a 50-layer convolutional network on millions of images to recognize cats.",
    "category": "ML & Data Science"
  },
  {
    "id": 196,
    "term": "Gradient Descent",
    "definition": "An optimization method that minimizes error by adjusting parameters step by step.",
    "scenario": "You update weights in the direction of steepest descent of the loss function, with learning rate alpha, iterating until convergence.",
    "category": "ML & Data Science"
  },
  {
    "id": 197,
    "term": "Overfitting",
    "definition": "When a model learns training data too well and performs poorly on new data.",
    "scenario": "Your model gets 99% train accuracy but 60% test accuracy — it memorized the training set instead of learning general patterns.",
    "category": "ML & Data Science"
  },
  {
    "id": 198,
    "term": "Pandas (Data Library)",
    "definition": "A Python library used for data analysis and manipulation.",
    "scenario": "You load a CSV into a DataFrame with pd.read_csv and group by date to compute daily averages.",
    "category": "ML & Data Science"
  },
  {
    "id": 199,
    "term": "NumPy",
    "definition": "A Python library for numerical computations and array operations.",
    "scenario": "You use np.dot(a, b) to multiply two large numeric arrays efficiently with vectorized C-backed operations.",
    "category": "ML & Data Science"
  },
  {
    "id": 200,
    "term": "TensorFlow / PyTorch",
    "definition": "Popular frameworks used to build and train machine learning models.",
    "scenario": "You define a model with nn.Sequential(...), call loss.backward(), and step the optimizer to train on GPU.",
    "category": "ML & Data Science"
  }
];