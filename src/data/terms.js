// Auto-generated from 200 Computer Science Technical Terms.docx
// 200 terms across 15 categories.

export const terms = [
  {
    "id": 1,
    "term": "Procedural Programming",
    "definition": "A programming style where code runs in a fixed sequence of step-by-step procedures, like following a recipe.",
    "category": "Core Programming"
  },
  {
    "id": 2,
    "term": "Object-Oriented Programming (OOP)",
    "definition": "A paradigm based on creating objects that bundle data and behavior, using concepts like inheritance and encapsulation.",
    "category": "Core Programming"
  },
  {
    "id": 3,
    "term": "Functional Programming",
    "definition": "A style of programming that uses pure functions and avoids changing data, making behavior predictable.",
    "category": "Core Programming"
  },
  {
    "id": 4,
    "term": "Declarative Programming",
    "definition": "A programming approach where you describe the desired result without specifying the exact steps to achieve it.",
    "category": "Core Programming"
  },
  {
    "id": 5,
    "term": "Imperative Programming",
    "definition": "A style where you explicitly define each step the program takes to change its state and reach a result.",
    "category": "Core Programming"
  },
  {
    "id": 6,
    "term": "Event-Driven Programming",
    "definition": "A model where code runs in response to events like clicks, inputs, or system signals instead of a fixed sequence.",
    "category": "Core Programming"
  },
  {
    "id": 7,
    "term": "Reactive Programming",
    "definition": "A programming style where programs automatically react to changes in data streams over time.",
    "category": "Core Programming"
  },
  {
    "id": 8,
    "term": "Aspect-Oriented Programming",
    "definition": "A technique for separating cross-cutting concerns like logging or security from the main logic of a program.",
    "category": "Core Programming"
  },
  {
    "id": 9,
    "term": "Generic Programming",
    "definition": "Writing flexible code that works with multiple data types using templates or generics.",
    "category": "Core Programming"
  },
  {
    "id": 10,
    "term": "Metaprogramming",
    "definition": "A technique where programs can generate, analyze, or modify other programs or themselves.",
    "category": "Core Programming"
  },
  {
    "id": 11,
    "term": "Multithreading",
    "definition": "Running multiple threads within a single program so tasks can happen at the same time.",
    "category": "Concurrency"
  },
  {
    "id": 12,
    "term": "Multiprocessing",
    "definition": "Running multiple independent processes simultaneously, each with its own memory space.",
    "category": "Concurrency"
  },
  {
    "id": 13,
    "term": "Parallel Computing",
    "definition": "Performing many computations at the same time using multiple processors or cores.",
    "category": "Concurrency"
  },
  {
    "id": 14,
    "term": "Concurrency",
    "definition": "Handling multiple tasks that overlap in execution, even if they are not truly simultaneous.",
    "category": "Concurrency"
  },
  {
    "id": 15,
    "term": "Thread Pool",
    "definition": "A reusable group of threads that efficiently execute multiple tasks without constantly creating new threads.",
    "category": "Concurrency"
  },
  {
    "id": 16,
    "term": "Race Condition",
    "definition": "A bug where the result depends on which thread runs first when accessing shared data.",
    "category": "Concurrency"
  },
  {
    "id": 17,
    "term": "Deadlock",
    "definition": "A situation where two or more threads are stuck waiting on each other forever.",
    "category": "Concurrency"
  },
  {
    "id": 18,
    "term": "Livelock",
    "definition": "A situation where threads keep reacting to each other but never make actual progress.",
    "category": "Concurrency"
  },
  {
    "id": 19,
    "term": "Starvation",
    "definition": "When a thread never gets access to needed resources because others keep taking priority.",
    "category": "Concurrency"
  },
  {
    "id": 20,
    "term": "Mutex (Mutual Exclusion)",
    "definition": "A locking mechanism that ensures only one thread can access a resource at a time.",
    "category": "Concurrency"
  },
  {
    "id": 21,
    "term": "Semaphore",
    "definition": "A synchronization tool that controls access to resources using a counter.",
    "category": "Concurrency"
  },
  {
    "id": 22,
    "term": "Monitor",
    "definition": "A high-level structure that controls access to shared data using built-in synchronization.",
    "category": "Concurrency"
  },
  {
    "id": 23,
    "term": "Lock-Free Programming",
    "definition": "A method of writing concurrent code without locks, using atomic operations instead.",
    "category": "Concurrency"
  },
  {
    "id": 24,
    "term": "Wait-Free Algorithms",
    "definition": "Algorithms that guarantee every thread completes its task in a limited number of steps.",
    "category": "Concurrency"
  },
  {
    "id": 25,
    "term": "Context Switching",
    "definition": "The process where the CPU switches from one task or thread to another.",
    "category": "Concurrency"
  },
  {
    "id": 26,
    "term": "Synchronous Programming",
    "definition": "A style where tasks run one after another, blocking execution until each finishes.",
    "category": "Synchronization"
  },
  {
    "id": 27,
    "term": "Asynchronous Programming",
    "definition": "A style where tasks run independently without blocking the main program flow.",
    "category": "Synchronization"
  },
  {
    "id": 28,
    "term": "Callback Function",
    "definition": "A function passed into another function to be executed later, often after an event or task completes.",
    "category": "Synchronization"
  },
  {
    "id": 29,
    "term": "Promise/Future",
    "definition": "An object representing a value that will be available later after an asynchronous operation finishes.",
    "category": "Synchronization"
  },
  {
    "id": 30,
    "term": "Event Loop",
    "definition": "A system that continuously checks for and executes asynchronous tasks and callbacks.",
    "category": "Synchronization"
  },
  {
    "id": 31,
    "term": "Non-blocking I/O",
    "definition": "Input/output operations that allow the program to continue running without waiting for completion.",
    "category": "Synchronization"
  },
  {
    "id": 32,
    "term": "Blocking I/O",
    "definition": "Input/output operations that pause program execution until the task is complete.",
    "category": "Synchronization"
  },
  {
    "id": 33,
    "term": "Coroutines",
    "definition": "Functions that can pause execution and resume later, allowing cooperative multitasking.",
    "category": "Synchronization"
  },
  {
    "id": 34,
    "term": "Fibers",
    "definition": "Lightweight threads that rely on manual control rather than the operating system for scheduling.",
    "category": "Synchronization"
  },
  {
    "id": 35,
    "term": "Actor Model",
    "definition": "A concurrency model where independent actors communicate only through message passing.",
    "category": "Synchronization"
  },
  {
    "id": 36,
    "term": "Array",
    "definition": "A fixed-size collection of elements stored in contiguous memory locations for fast access.",
    "category": "Data Structures"
  },
  {
    "id": 37,
    "term": "Linked List",
    "definition": "A data structure made of nodes where each node points to the next one in sequence.",
    "category": "Data Structures"
  },
  {
    "id": 38,
    "term": "Doubly Linked List",
    "definition": "A linked list where each node points both forward and backward.",
    "category": "Data Structures"
  },
  {
    "id": 39,
    "term": "Stack",
    "definition": "A data structure that follows Last-In, First-Out (LIFO), like a stack of plates.",
    "category": "Data Structures"
  },
  {
    "id": 40,
    "term": "Queue",
    "definition": "A data structure that follows First-In, First-Out (FIFO), like a line of people.",
    "category": "Data Structures"
  },
  {
    "id": 41,
    "term": "Deque",
    "definition": "A double-ended queue that allows adding and removing elements from both the front and the back.",
    "category": "Data Structures"
  },
  {
    "id": 42,
    "term": "Hash Table",
    "definition": "A data structure that stores key-value pairs and uses a hash function for fast lookup.",
    "category": "Data Structures"
  },
  {
    "id": 43,
    "term": "Binary Tree",
    "definition": "A tree data structure where each node can have at most two children, called left and right.",
    "category": "Data Structures"
  },
  {
    "id": 44,
    "term": "Binary Search Tree",
    "definition": "A binary tree where left children are smaller and right children are larger, enabling fast searching.",
    "category": "Data Structures"
  },
  {
    "id": 45,
    "term": "AVL Tree",
    "definition": "A self-balancing binary search tree that keeps its height balanced for efficient operations.",
    "category": "Data Structures"
  },
  {
    "id": 46,
    "term": "Red-Black Tree",
    "definition": "A balanced binary search tree that uses node colors to maintain roughly equal path lengths.",
    "category": "Data Structures"
  },
  {
    "id": 47,
    "term": "Heap (Min/Max Heap)",
    "definition": "A tree-based structure where the smallest or largest element is always at the root, used for priority queues.",
    "category": "Data Structures"
  },
  {
    "id": 48,
    "term": "Trie",
    "definition": "A tree structure used to store strings efficiently, often for fast prefix searching.",
    "category": "Data Structures"
  },
  {
    "id": 49,
    "term": "Graph",
    "definition": "A collection of nodes connected by edges, used to represent relationships between data.",
    "category": "Data Structures"
  },
  {
    "id": 50,
    "term": "Adjacency Matrix",
    "definition": "A 2D array used to represent a graph, where rows and columns indicate connections between nodes.",
    "category": "Data Structures"
  },
  {
    "id": 51,
    "term": "Adjacency List",
    "definition": "A graph representation where each node stores a list of its connected neighbors.",
    "category": "Data Structures"
  },
  {
    "id": 52,
    "term": "Bloom Filter",
    "definition": "A space-efficient structure that checks if an element might be present, allowing false positives but no false negatives.",
    "category": "Data Structures"
  },
  {
    "id": 53,
    "term": "Skip List",
    "definition": "A layered linked list that allows fast searching by skipping over multiple elements.",
    "category": "Data Structures"
  },
  {
    "id": 54,
    "term": "Segment Tree",
    "definition": "A tree structure used to efficiently answer range queries and update values in an array.",
    "category": "Data Structures"
  },
  {
    "id": 55,
    "term": "Disjoint Set (Union-Find)",
    "definition": "A structure that keeps track of elements split into groups and supports merging and finding groups efficiently.",
    "category": "Data Structures"
  },
  {
    "id": 56,
    "term": "Binary Search",
    "definition": "A fast search algorithm that repeatedly divides a sorted list in half to find a target value.",
    "category": "Algorithms"
  },
  {
    "id": 57,
    "term": "Linear Search",
    "definition": "A simple search that checks each element one by one until the target is found.",
    "category": "Algorithms"
  },
  {
    "id": 58,
    "term": "Depth-First Search (DFS)",
    "definition": "A graph traversal method that explores as far as possible along one branch before backtracking.",
    "category": "Algorithms"
  },
  {
    "id": 59,
    "term": "Breadth-First Search (BFS)",
    "definition": "A graph traversal method that explores all neighbors at the current level before moving deeper.",
    "category": "Algorithms"
  },
  {
    "id": 60,
    "term": "Dijkstra’s Algorithm",
    "definition": "An algorithm that finds the shortest path from one node to all others in a graph with non-negative weights.",
    "category": "Algorithms"
  },
  {
    "id": 61,
    "term": "Bellman-Ford Algorithm",
    "definition": "An algorithm that finds shortest paths and can handle graphs with negative edge weights.",
    "category": "Algorithms"
  },
  {
    "id": 62,
    "term": "Floyd-Warshall Algorithm",
    "definition": "An algorithm that computes shortest paths between all pairs of nodes in a graph.",
    "category": "Algorithms"
  },
  {
    "id": 63,
    "term": "A* Search Algorithm",
    "definition": "A pathfinding algorithm that uses heuristics to efficiently find the shortest path.",
    "category": "Algorithms"
  },
  {
    "id": 64,
    "term": "Merge Sort",
    "definition": "A divide-and-conquer sorting algorithm that splits data and merges it back in sorted order.",
    "category": "Algorithms"
  },
  {
    "id": 65,
    "term": "Quick Sort",
    "definition": "A sorting algorithm that partitions data around a pivot and recursively sorts the parts.",
    "category": "Algorithms"
  },
  {
    "id": 66,
    "term": "Heap Sort",
    "definition": "A sorting algorithm that uses a heap structure to repeatedly extract the largest or smallest element.",
    "category": "Algorithms"
  },
  {
    "id": 67,
    "term": "Bubble Sort",
    "definition": "A simple sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.",
    "category": "Algorithms"
  },
  {
    "id": 68,
    "term": "Insertion Sort",
    "definition": "A sorting algorithm that builds a sorted list by inserting elements into their correct position one at a time.",
    "category": "Algorithms"
  },
  {
    "id": 69,
    "term": "Selection Sort",
    "definition": "A sorting algorithm that repeatedly selects the smallest element and moves it to the correct position.",
    "category": "Algorithms"
  },
  {
    "id": 70,
    "term": "Dynamic Programming",
    "definition": "A method for solving problems by breaking them into subproblems and storing results to avoid recomputation.",
    "category": "Algorithms"
  },
  {
    "id": 71,
    "term": "Greedy Algorithm",
    "definition": "An approach that makes the best local choice at each step in hopes of finding a global optimum.",
    "category": "Algorithms"
  },
  {
    "id": 72,
    "term": "Backtracking",
    "definition": "A method that tries all possible solutions and abandons paths that fail to meet conditions.",
    "category": "Algorithms"
  },
  {
    "id": 73,
    "term": "Divide and Conquer",
    "definition": "A strategy that breaks a problem into smaller parts, solves them, and combines the results.",
    "category": "Algorithms"
  },
  {
    "id": 74,
    "term": "Branch and Bound",
    "definition": "An optimization method that explores solutions while pruning paths that cannot produce better results.",
    "category": "Algorithms"
  },
  {
    "id": 75,
    "term": "Topological Sort",
    "definition": "An ordering of nodes in a directed acyclic graph where dependencies are respected.",
    "category": "Algorithms"
  },
  {
    "id": 76,
    "term": "Big-O Notation",
    "definition": "A way of describing the upper limit of an algorithm’s growth rate as input size increases.",
    "category": "Complexity"
  },
  {
    "id": 77,
    "term": "Big-Theta Notation",
    "definition": "A notation that describes the exact growth rate of an algorithm within tight bounds.",
    "category": "Complexity"
  },
  {
    "id": 78,
    "term": "Big-Omega Notation",
    "definition": "A notation that describes the minimum growth rate of an algorithm.",
    "category": "Complexity"
  },
  {
    "id": 79,
    "term": "Time Complexity",
    "definition": "A measure of how an algorithm’s runtime increases as the input size grows.",
    "category": "Complexity"
  },
  {
    "id": 80,
    "term": "Space Complexity",
    "definition": "A measure of how much memory an algorithm uses relative to input size.",
    "category": "Complexity"
  },  {
    "id": 81,
    "term": "Amortized Analysis",
    "definition": "A method of analyzing performance by averaging the cost of operations over time.",
    "category": "Complexity"
  },
  {
    "id": 82,
    "term": "Worst-Case Complexity",
    "definition": "The maximum time or space an algorithm could take in the most difficult scenario.",
    "category": "Complexity"
  },
  {
    "id": 83,
    "term": "Average-Case Complexity",
    "definition": "The expected performance of an algorithm across typical inputs.",
    "category": "Complexity"
  },
  {
    "id": 84,
    "term": "Best-Case Complexity",
    "definition": "The minimum time or space an algorithm requires under ideal conditions.",
    "category": "Complexity"
  },
  {
    "id": 85,
    "term": "NP-Completeness",
    "definition": "A class of problems that are very hard to solve but easy to verify once a solution is found.",
    "category": "Complexity"
  },
  {
    "id": 86,
    "term": "CPU Pipeline",
    "definition": "A technique where multiple instruction steps are processed simultaneously in stages.",
    "category": "Architecture"
  },
  {
    "id": 87,
    "term": "Instruction Set Architecture (ISA)",
    "definition": "The set of commands a CPU understands and can execute.",
    "category": "Architecture"
  },
  {
    "id": 88,
    "term": "RISC Architecture",
    "definition": "A CPU design that uses simple instructions for faster execution.",
    "category": "Architecture"
  },
  {
    "id": 89,
    "term": "CISC Architecture",
    "definition": "A CPU design that uses complex instructions to perform more work per command.",
    "category": "Architecture"
  },
  {
    "id": 90,
    "term": "Cache Memory",
    "definition": "A small, fast memory that stores frequently used data for quick CPU access.",
    "category": "Architecture"
  },
  {
    "id": 91,
    "term": "L1/L2/L3 Cache",
    "definition": "Levels of cache memory with different speeds and sizes, closest to farthest from the CPU.",
    "category": "Architecture"
  },
  {
    "id": 92,
    "term": "Cache Coherence",
    "definition": "Ensuring that multiple caches store consistent data across a system.",
    "category": "Architecture"
  },
  {
    "id": 93,
    "term": "Branch Prediction",
    "definition": "A CPU technique that guesses which path a program will take to improve performance.",
    "category": "Architecture"
  },
  {
    "id": 94,
    "term": "SIMD (Single Instruction Multiple Data)",
    "definition": "A method where a single instruction processes multiple data points simultaneously.",
    "category": "Architecture"
  },
  {
    "id": 95,
    "term": "GPU Architecture",
    "definition": "A design optimized for handling many parallel tasks, often used in graphics and AI.",
    "category": "Architecture"
  },
  {
    "id": 96,
    "term": "CUDA Programming",
    "definition": "A model for writing programs that run on GPUs for parallel computation.",
    "category": "Architecture"
  },
  {
    "id": 97,
    "term": "Memory Hierarchy",
    "definition": "The organization of storage from fastest and smallest (cache) to slowest and largest (disk).",
    "category": "Architecture"
  },
  {
    "id": 98,
    "term": "Virtual Memory",
    "definition": "An abstraction that allows programs to use more memory than physically available.",
    "category": "Architecture"
  },
  {
    "id": 99,
    "term": "Paging",
    "definition": "A memory management technique that divides memory into fixed-size blocks called pages.",
    "category": "Architecture"
  },
  {
    "id": 100,
    "term": "Segmentation",
    "definition": "A memory management method that divides memory into logical segments like code and data.",
    "category": "Architecture"
  },
  {
    "id": 101,
    "term": "Process",
    "definition": "An independent program in execution with its own memory space.",
    "category": "Operating Systems"
  },
  {
    "id": 102,
    "term": "Thread",
    "definition": "A smaller unit of a process that can run concurrently with others.",
    "category": "Operating Systems"
  },
  {
    "id": 103,
    "term": "Scheduling Algorithm",
    "definition": "A method used by the OS to decide which process or thread runs next.",
    "category": "Operating Systems"
  },
  {
    "id": 104,
    "term": "Round Robin Scheduling",
    "definition": "A scheduling method where each process gets a fixed time slice in rotation.",
    "category": "Operating Systems"
  },
  {
    "id": 105,
    "term": "Priority Scheduling",
    "definition": "A scheduling method where tasks are executed based on priority levels.",
    "category": "Operating Systems"
  },
  {
    "id": 106,
    "term": "Deadlock Prevention",
    "definition": "Techniques used to ensure that deadlocks cannot occur in a system.",
    "category": "Operating Systems"
  },
  {
    "id": 107,
    "term": "Deadlock Avoidance",
    "definition": "Strategies that keep the system in a safe state to avoid deadlocks.",
    "category": "Operating Systems"
  },
  {
    "id": 108,
    "term": "Memory Management",
    "definition": "The process of allocating and freeing memory for programs efficiently.",
    "category": "Operating Systems"
  },
  {
    "id": 109,
    "term": "File System",
    "definition": "The structure used by an OS to store, organize, and retrieve files.",
    "category": "Operating Systems"
  },
  {
    "id": 110,
    "term": "System Call",
    "definition": "A way for programs to request services from the operating system.",
    "category": "Operating Systems"
  },
  {
    "id": 111,
    "term": "Kernel Mode",
    "definition": "A privileged mode where the OS has full access to hardware resources.",
    "category": "Operating Systems"
  },
  {
    "id": 112,
    "term": "User Mode",
    "definition": "A restricted mode where applications run without direct hardware access.",
    "category": "Operating Systems"
  },
  {
    "id": 113,
    "term": "Interrupt",
    "definition": "A signal that temporarily stops the CPU to handle an urgent task.",
    "category": "Operating Systems"
  },
  {
    "id": 114,
    "term": "Context Switch",
    "definition": "Saving and restoring a process’s state so the CPU can switch tasks.",
    "category": "Operating Systems"
  },
  {
    "id": 115,
    "term": "Virtualization",
    "definition": "Creating virtual versions of hardware or systems to run multiple environments.",
    "category": "Operating Systems"
  },
  {
    "id": 116,
    "term": "TCP/IP",
    "definition": "The core set of protocols used for communication over the internet.",
    "category": "Networking"
  },
  {
    "id": 117,
    "term": "HTTP/HTTPS",
    "definition": "Protocols used for transferring web data, with HTTPS adding encryption.",
    "category": "Networking"
  },
  {
    "id": 118,
    "term": "REST",
    "definition": "An API design style that uses stateless requests and standard HTTP methods.",
    "category": "Networking"
  },
  {
    "id": 119,
    "term": "GraphQL",
    "definition": "An API query language that lets clients request exactly the data they need.",
    "category": "Networking"
  },
  {
    "id": 120,
    "term": "DNS",
    "definition": "A system that translates domain names into IP addresses.",
    "category": "Networking"
  },
  {
    "id": 121,
    "term": "DHCP",
    "definition": "A protocol that automatically assigns IP addresses to devices on a network.",
    "category": "Networking"
  },
  {
    "id": 122,
    "term": "FTP",
    "definition": "A protocol used to transfer files between computers over a network.",
    "category": "Networking"
  },
  {
    "id": 123,
    "term": "SMTP",
    "definition": "A protocol used to send emails between servers.",
    "category": "Networking"
  },
  {
    "id": 124,
    "term": "WebSocket",
    "definition": "A protocol that enables real-time, two-way communication between client and server.",
    "category": "Networking"
  },
  {
    "id": 125,
    "term": "Load Balancing",
    "definition": "Distributing incoming traffic across multiple servers to improve performance and reliability.",
    "category": "Networking"
  },
  {
    "id": 126,
    "term": "Reverse Proxy",
    "definition": "A server that forwards client requests to backend servers and returns responses.",
    "category": "Networking"
  },
  {
    "id": 127,
    "term": "CDN (Content Delivery Network)",
    "definition": "A network of servers that delivers content from locations closest to users.",
    "category": "Networking"
  },
  {
    "id": 128,
    "term": "NAT (Network Address Translation)",
    "definition": "A method that maps private IP addresses to a public IP for internet access.",
    "category": "Networking"
  },
  {
    "id": 129,
    "term": "IPv4",
    "definition": "A 32-bit addressing system used to identify devices on a network.",
    "category": "Networking"
  },
  {
    "id": 130,
    "term": "IPv6",
    "definition": "A newer 128-bit addressing system designed to replace IPv4 and support more devices.",
    "category": "Networking"
  },
  {
    "id": 131,
    "term": "Cloud Computing",
    "definition": "Using remote servers over the internet to store data and run applications.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 132,
    "term": "IaaS (Infrastructure as a Service)",
    "definition": "Cloud service providing virtual machines, storage, and networking resources.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 133,
    "term": "PaaS (Platform as a Service)",
    "definition": "Cloud service offering a platform to build and deploy applications without managing infrastructure.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 134,
    "term": "SaaS (Software as a Service)",
    "definition": "Software delivered over the internet without needing installation.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 135,
    "term": "Microservices Architecture",
    "definition": "An architecture where applications are built as small, independent services.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 136,
    "term": "Monolithic Architecture",
    "definition": "An architecture where all components are combined into a single unified system.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 137,
    "term": "Serverless Computing",
    "definition": "A cloud model where developers run code without managing servers.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 138,
    "term": "Containerization",
    "definition": "Packaging applications with their dependencies into isolated environments.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 139,
    "term": "Docker",
    "definition": "A platform used to create and run containers.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 140,
    "term": "Kubernetes",
    "definition": "A system for managing and scaling containerized applications.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 141,
    "term": "Distributed System",
    "definition": "A system where multiple computers work together as one.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 142,
    "term": "CAP Theorem",
    "definition": "A principle stating that a distributed system can only guarantee two of consistency, availability, and partition tolerance.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 143,
    "term": "Consistency Models",
    "definition": "Rules that define how and when changes to data become visible across a system.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 144,
    "term": "Eventual Consistency",
    "definition": "A model where all nodes will eventually have the same data, given enough time.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 145,
    "term": "Message Queue",
    "definition": "A system that allows asynchronous communication by passing messages between services.",
    "category": "Cloud & Distributed"
  },
  {
    "id": 146,
    "term": "Authentication",
    "definition": "The process of verifying a user's identity.",
    "category": "Security"
  },
  {
    "id": 147,
    "term": "Authorization",
    "definition": "The process of determining what actions a user is allowed to perform.",
    "category": "Security"
  },
  {
    "id": 148,
    "term": "Encryption",
    "definition": "Converting data into a secure format that can only be read with a key.",
    "category": "Security"
  },
  {
    "id": 149,
    "term": "Symmetric Encryption",
    "definition": "Encryption where the same key is used to both encrypt and decrypt data.",
    "category": "Security"
  },
  {
    "id": 150,
    "term": "Asymmetric Encryption",
    "definition": "Encryption that uses a public key to encrypt and a private key to decrypt.",
    "category": "Security"
  },
  {
    "id": 151,
    "term": "Hashing",
    "definition": "Transforming data into a fixed-size value that cannot be reversed.",
    "category": "Security"
  },
  {
    "id": 152,
    "term": "Salting",
    "definition": "Adding random data to input before hashing to improve security.",
    "category": "Security"
  },
  {
    "id": 153,
    "term": "Public Key Infrastructure (PKI)",
    "definition": "A system for managing digital certificates and public-key encryption.",
    "category": "Security"
  },
  {
    "id": 154,
    "term": "TLS/SSL",
    "definition": "Protocols that encrypt data sent over networks for secure communication.",
    "category": "Security"
  },
  {
    "id": 155,
    "term": "OAuth",
    "definition": "A protocol that allows secure delegated access without sharing passwords.",
    "category": "Security"
  },
  {
    "id": 156,
    "term": "JWT (JSON Web Token)",
    "definition": "A compact token used to securely transmit user authentication data.",
    "category": "Security"
  },
  {
    "id": 157,
    "term": "Cross-Site Scripting (XSS)",
    "definition": "A vulnerability where attackers inject malicious scripts into web pages.",
    "category": "Security"
  },
  {
    "id": 158,
    "term": "SQL Injection",
    "definition": "An attack where malicious SQL is inserted into queries to manipulate a database.",
    "category": "Security"
  },
  {
    "id": 159,
    "term": "CSRF (Cross-Site Request Forgery)",
    "definition": "An attack that tricks a user into performing unintended actions on a website.",
    "category": "Security"
  },
  {
    "id": 160,
    "term": "Zero Trust Architecture",
    "definition": "A security model that assumes no user or system is trusted by default.",
    "category": "Security"
  },
  {
    "id": 161,
    "term": "HTML",
    "definition": "The standard language used to structure content on web pages.",
    "category": "Web Dev"
  },
  {
    "id": 162,
    "term": "CSS",
    "definition": "A language used to style and layout web pages.",
    "category": "Web Dev"
  },
  {
    "id": 163,
    "term": "JavaScript",
    "definition": "A programming language used to add interactivity to web pages.",
    "category": "Web Dev"
  },
  {
    "id": 164,
    "term": "DOM (Document Object Model)",
    "definition": "A representation of a web page that allows scripts to modify its structure and content.",
    "category": "Web Dev"
  },
  {
    "id": 165,
    "term": "AJAX",
    "definition": "A technique for updating web pages asynchronously without reloading.",
    "category": "Web Dev"
  },
  {
    "id": 166,
    "term": "Single Page Application (SPA)",
    "definition": "A web app that dynamically updates content without full page reloads.",
    "category": "Web Dev"
  },
  {
    "id": 167,
    "term": "Progressive Web App (PWA)",
    "definition": "A web app that behaves like a native app with offline support and installability.",
    "category": "Web Dev"
  },
  {
    "id": 168,
    "term": "Web Accessibility (a11y)",
    "definition": "Designing websites so they are usable by people with disabilities.",
    "category": "Web Dev"
  },
  {
    "id": 169,
    "term": "Responsive Design",
    "definition": "Designing layouts that adapt to different screen sizes and devices.",
    "category": "Web Dev"
  },
  {
    "id": 170,
    "term": "CORS (Cross-Origin Resource Sharing)",
    "definition": "A security feature that controls how resources are shared across different domains.",
    "category": "Web Dev"
  },
  {
    "id": 171,
    "term": "React",
    "definition": "A library for building user interfaces using reusable components.",
    "category": "Front-End"
  },
  {
    "id": 172,
    "term": "Angular",
    "definition": "A full-featured framework for building large-scale web applications.",
    "category": "Front-End"
  },
  {
    "id": 173,
    "term": "Vue.js",
    "definition": "A progressive framework for building user interfaces incrementally.",
    "category": "Front-End"
  },
  {
    "id": 174,
    "term": "Svelte",
    "definition": "A framework that compiles code into efficient JavaScript at build time.",
    "category": "Front-End"
  },
  {
    "id": 175,
    "term": "Redux",
    "definition": "A library for managing application state in a predictable way.",
    "category": "Front-End"
  },
  {
    "id": 176,
    "term": "Next.js",
    "definition": "A framework built on React that supports server-side rendering.",
    "category": "Front-End"
  },
  {
    "id": 177,
    "term": "Webpack",
    "definition": "A tool that bundles JavaScript modules into optimized files.",
    "category": "Front-End"
  },
  {
    "id": 178,
    "term": "Babel",
    "definition": "A tool that converts modern JavaScript into compatible versions.",
    "category": "Front-End"
  },
  {
    "id": 179,
    "term": "Tailwind CSS",
    "definition": "A utility-first CSS framework for building custom designs quickly.",
    "category": "Front-End"
  },
  {
    "id": 180,
    "term": "Bootstrap",
    "definition": "A CSS framework that provides pre-built components and styles.",
    "category": "Front-End"
  },
  {
    "id": 181,
    "term": "Native Development",
    "definition": "Building apps specifically for one platform using its official tools and languages.",
    "category": "Mobile"
  },
  {
    "id": 182,
    "term": "Cross-Platform Development",
    "definition": "Building apps that run on multiple platforms using a single codebase.",
    "category": "Mobile"
  },
  {
    "id": 183,
    "term": "Flutter",
    "definition": "A UI toolkit for building cross-platform apps with a single codebase.",
    "category": "Mobile"
  },
  {
    "id": 184,
    "term": "React Native",
    "definition": "A framework for building mobile apps using JavaScript and React.",
    "category": "Mobile"
  },
  {
    "id": 185,
    "term": "Swift (iOS)",
    "definition": "A programming language used for building iOS applications.",
    "category": "Mobile"
  },
  {
    "id": 186,
    "term": "Kotlin (Android)",
    "definition": "A programming language used for building Android applications.",
    "category": "Mobile"
  },
  {
    "id": 187,
    "term": "Mobile UI/UX",
    "definition": "Designing mobile apps for usability, accessibility, and user satisfaction.",
    "category": "Mobile"
  },
  {
    "id": 188,
    "term": "App Lifecycle",
    "definition": "The stages an app goes through from launch to termination.",
    "category": "Mobile"
  },
  {
    "id": 189,
    "term": "Push Notifications",
    "definition": "Messages sent from a server to a user's device in real time.",
    "category": "Mobile"
  },
  {
    "id": 190,
    "term": "Offline-first Apps",
    "definition": "Apps designed to work without internet and sync data when reconnected.",
    "category": "Mobile"
  },
  {
    "id": 191,
    "term": "Supervised Learning",
    "definition": "Training a model using labeled data with known outputs.",
    "category": "ML & Data Science"
  },
  {
    "id": 192,
    "term": "Unsupervised Learning",
    "definition": "Finding patterns in data without labeled outputs.",
    "category": "ML & Data Science"
  },
  {
    "id": 193,
    "term": "Reinforcement Learning",
    "definition": "Training models through rewards and penalties based on actions.",
    "category": "ML & Data Science"
  },
  {
    "id": 194,
    "term": "Neural Networks",
    "definition": "Models inspired by the brain that learn patterns through layers of nodes.",
    "category": "ML & Data Science"
  },
  {
    "id": 195,
    "term": "Deep Learning",
    "definition": "A subset of machine learning using large neural networks with many layers.",
    "category": "ML & Data Science"
  },
  {
    "id": 196,
    "term": "Gradient Descent",
    "definition": "An optimization method that minimizes error by adjusting parameters step by step.",
    "category": "ML & Data Science"
  },
  {
    "id": 197,
    "term": "Overfitting",
    "definition": "When a model learns training data too well and performs poorly on new data.",
    "category": "ML & Data Science"
  },
  {
    "id": 198,
    "term": "Pandas (Data Library)",
    "definition": "A Python library used for data analysis and manipulation.",
    "category": "ML & Data Science"
  },
  {
    "id": 199,
    "term": "NumPy",
    "definition": "A Python library for numerical computations and array operations.",
    "category": "ML & Data Science"
  },
  {
    "id": 200,
    "term": "TensorFlow / PyTorch",
    "definition": "Popular frameworks used to build and train machine learning models.",
    "category": "ML & Data Science"
  }]
