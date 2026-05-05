export const terms = [
  // ─── Git & Version Control ─────────────────────────
  {
    "id": 1001,
    "term": "Commit",
    "definition": "A saved snapshot of your code changes recorded in the project history with a message describing what changed.",
    "scenario": "You stage two files, type a message describing the fix, and run a Git command that records this point in history.",
    "category": "Git & Version Control"
  },
  {
    "id": 1002,
    "term": "Branch",
    "definition": "An independent line of development that lets you work on a feature without affecting the main codebase.",
    "scenario": "Before starting a new login feature, you create a parallel line of work off main so your changes stay isolated.",
    "category": "Git & Version Control"
  },
  {
    "id": 1003,
    "term": "Merge",
    "definition": "The act of combining changes from one line of development into another, preserving both histories.",
    "scenario": "Your feature is reviewed and approved, so you bring its commits into main, ending up with one combined history.",
    "category": "Git & Version Control"
  },
  {
    "id": 1004,
    "term": "Rebase",
    "definition": "Replays your commits on top of another branch's tip to produce a linear history without a merge commit.",
    "scenario": "Before opening a PR you run a Git command that moves your commits onto the latest main tip, avoiding a merge bubble.",
    "category": "Git & Version Control"
  },
  {
    "id": 1005,
    "term": "Pull Request",
    "definition": "A GitHub proposal to merge changes from one branch into another, with diffs, reviews, and discussion.",
    "scenario": "You push your feature branch and open a request on GitHub asking teammates to review and approve before it merges.",
    "category": "Git & Version Control"
  },
  {
    "id": 1006,
    "term": "Fork",
    "definition": "A personal copy of someone else's repository under your account that you can modify independently.",
    "scenario": "You want to contribute to an open-source project, so you click a button on GitHub to make your own copy of their repo.",
    "category": "Git & Version Control"
  },
  {
    "id": 1007,
    "term": "Clone",
    "definition": "Downloads a complete copy of a remote repository to your local machine, including its full history.",
    "scenario": "You join a new team, copy the HTTPS link from GitHub, and run a command that pulls the full repo onto your laptop.",
    "category": "Git & Version Control"
  },
  {
    "id": 1008,
    "term": "Merge Conflict",
    "definition": "Occurs when two branches change the same lines and Git cannot automatically reconcile them.",
    "scenario": "You try to merge a teammate's branch and Git stops, marking lines with arrows and equals signs that you must resolve by hand.",
    "category": "Git & Version Control"
  },
  {
    "id": 1009,
    "term": ".gitignore",
    "definition": "A file listing patterns of files Git should never track, such as node_modules, .env, and build output.",
    "scenario": "You don't want your secrets file or dependency folder pushed to GitHub, so you list them in this special config file.",
    "category": "Git & Version Control"
  },
  {
    "id": 1010,
    "term": "HEAD",
    "definition": "A pointer to the current commit on the currently checked-out branch in a Git repository.",
    "scenario": "You run `git log` and the topmost entry has an arrow indicating the tip of your current branch — that pointer is what moved.",
    "category": "Git & Version Control"
  },

  // ─── DevOps & Deployment ───────────────────────────
  {
    "id": 1011,
    "term": "CI/CD",
    "definition": "Automated pipelines that build, test, and deploy code every time changes are pushed.",
    "scenario": "Every push to main triggers GitHub Actions to run tests and deploy to production automatically — no manual upload needed.",
    "category": "DevOps & Deployment"
  },
  {
    "id": 1012,
    "term": "Docker",
    "definition": "A platform that packages an app with all its dependencies into a portable, lightweight unit that runs the same anywhere.",
    "scenario": "You write a Dockerfile so your Node app runs identically on your laptop, the CI runner, and the production server.",
    "category": "DevOps & Deployment"
  },
  {
    "id": 1013,
    "term": "Container",
    "definition": "An isolated running instance of an image that bundles application code and runtime so it works consistently across environments.",
    "scenario": "Your `docker run` command spins up an isolated unit with its own filesystem and network that runs your Express app.",
    "category": "DevOps & Deployment"
  },
  {
    "id": 1014,
    "term": "Environment Variable",
    "definition": "A configuration value injected into a process at runtime, often used for secrets like API keys and database URLs.",
    "scenario": "You read `process.env.STRIPE_SECRET` so the same code works locally and in production with different values for each.",
    "category": "DevOps & Deployment"
  },
  {
    "id": 1015,
    "term": "GitHub Actions",
    "definition": "GitHub's built-in automation service that runs workflows defined in YAML files inside a repo.",
    "scenario": "You add a YAML file under `.github/workflows/` so every push runs your tests and deploys to GitHub Pages.",
    "category": "DevOps & Deployment"
  },
  {
    "id": 1016,
    "term": "Build",
    "definition": "The compiled, bundled, optimized output that gets shipped to users — typically a `dist/` folder of static assets.",
    "scenario": "You run `npm run build` and Vite produces a folder of minified JS, CSS, and HTML ready for upload to a CDN.",
    "category": "DevOps & Deployment"
  },
  {
    "id": 1017,
    "term": "Pipeline",
    "definition": "A defined series of automated steps — lint, test, build, deploy — that runs on each code change.",
    "scenario": "Your YAML config defines a multi-stage flow: install dependencies → run Jest → build → push to Vercel.",
    "category": "DevOps & Deployment"
  },
  {
    "id": 1018,
    "term": "Rollback",
    "definition": "Reverting a deployment to a previous working version after a bad release.",
    "scenario": "Production starts throwing 500s after you deploy v2.4, so you click a button in Vercel to switch traffic back to v2.3.",
    "category": "DevOps & Deployment"
  },
  {
    "id": 1019,
    "term": "Staging Environment",
    "definition": "A near-identical copy of production used for final testing before releasing to real users.",
    "scenario": "Your team merges to a pre-prod URL where QA verifies the checkout flow with real-looking data before shipping live.",
    "category": "DevOps & Deployment"
  },
  {
    "id": 1020,
    "term": "Production",
    "definition": "The live environment that real users hit — where bugs cost money and downtime matters.",
    "scenario": "Your app is now serving real customers at example.com, so any deploy here gets reviewed twice and watched closely.",
    "category": "DevOps & Deployment"
  },

  // ─── Databases ─────────────────────────────────────
  {
    "id": 1021,
    "term": "SQL",
    "definition": "A query language for relational databases used to read and modify rows in tables.",
    "scenario": "You write `SELECT name FROM users WHERE id = 5;` to pull a single user record from a Postgres table.",
    "category": "Databases"
  },
  {
    "id": 1022,
    "term": "NoSQL",
    "definition": "A family of non-relational databases that store data as documents, key-value pairs, or graphs instead of tables.",
    "scenario": "Instead of rigid schemas you store user profiles as flexible JSON documents in MongoDB, each with whatever fields you need.",
    "category": "Databases"
  },
  {
    "id": 1023,
    "term": "JOIN",
    "definition": "A SQL operation that combines rows from two or more tables based on a related column.",
    "scenario": "You connect the orders table to the users table on `users.id = orders.user_id` to get each order alongside its buyer's name.",
    "category": "Databases"
  },
  {
    "id": 1024,
    "term": "Primary Key",
    "definition": "A column that uniquely identifies each row in a table; no two rows can share the same value.",
    "scenario": "Every user gets an auto-incrementing `id` column that uniquely identifies them across the entire users table.",
    "category": "Databases"
  },
  {
    "id": 1025,
    "term": "Foreign Key",
    "definition": "A column referencing the primary key of another table, enforcing a relationship between rows.",
    "scenario": "Each order has a `user_id` column that references the users table, so the database can ensure no orphaned records exist.",
    "category": "Databases"
  },
  {
    "id": 1026,
    "term": "Index",
    "definition": "A database structure that speeds up reads on a column at the cost of slower writes and extra storage.",
    "scenario": "Searching by email is slow, so you add a B-tree on the `email` column and queries drop from 2 seconds to 5 milliseconds.",
    "category": "Databases"
  },
  {
    "id": 1027,
    "term": "Migration",
    "definition": "A versioned script that applies a schema change — adding a column, creating a table — across all environments.",
    "scenario": "You add a `phone_number` column by writing a timestamped script that the team runs in dev, staging, and prod in order.",
    "category": "Databases"
  },
  {
    "id": 1028,
    "term": "ORM",
    "definition": "A library that maps database tables to language objects so you can query without writing raw SQL.",
    "scenario": "Instead of writing SQL strings, you call `User.findById(5)` in Prisma and the library generates and runs the query for you.",
    "category": "Databases"
  },
  {
    "id": 1029,
    "term": "Schema",
    "definition": "The blueprint of a database — its tables, columns, types, and relationships.",
    "scenario": "Before writing any code, you sketch which tables exist, what columns they have, and how they connect via foreign keys.",
    "category": "Databases"
  },
  {
    "id": 1030,
    "term": "Transaction",
    "definition": "A group of database operations that succeed or fail as one atomic unit.",
    "scenario": "Transferring money between accounts must debit one and credit the other together — if either fails, both must roll back.",
    "category": "Databases"
  },

  // ─── Frontend Frameworks ───────────────────────────
  {
    "id": 1031,
    "term": "React",
    "definition": "A JavaScript library by Meta for building user interfaces from reusable component trees.",
    "scenario": "You bootstrap a project with `create-react-app` and write components in JSX that re-render when state changes.",
    "category": "Frontend Frameworks"
  },
  {
    "id": 1032,
    "term": "Vue",
    "definition": "A progressive JavaScript framework that pairs reactive state with single-file `.vue` components.",
    "scenario": "You write a `.vue` file with three sections — template, script, and style — and Vite hot-reloads as you edit.",
    "category": "Frontend Frameworks"
  },
  {
    "id": 1033,
    "term": "Component",
    "definition": "A reusable piece of UI that encapsulates its own markup, logic, and styles.",
    "scenario": "You build a `<Button>` once with its own props and styles, then drop it into ten different pages of your app.",
    "category": "Frontend Frameworks"
  },
  {
    "id": 1034,
    "term": "Props",
    "definition": "Read-only inputs passed from a parent component down to a child to configure its behavior or appearance.",
    "scenario": "Your `<Avatar>` accepts a `size` and `imageUrl` from its parent and uses them to render — but it can't change them itself.",
    "category": "Frontend Frameworks"
  },
  {
    "id": 1035,
    "term": "State",
    "definition": "Internal, mutable data owned by a component; changing it triggers a re-render.",
    "scenario": "A counter component holds its own `count` value, and clicking the button updates it, causing the UI to re-render automatically.",
    "category": "Frontend Frameworks"
  },
  {
    "id": 1036,
    "term": "Hook",
    "definition": "A React function like `useState` or `useEffect` that lets functional components use state and lifecycle features.",
    "scenario": "Inside a function component you call `useState(0)` to add reactive state without converting it to a class.",
    "category": "Frontend Frameworks"
  },
  {
    "id": 1037,
    "term": "JSX",
    "definition": "A syntax extension that lets you write HTML-like markup directly inside JavaScript code.",
    "scenario": "Inside a React function you write `return <h1>Hello {name}</h1>;` — the build tool turns those tags into JS calls.",
    "category": "Frontend Frameworks"
  },
  {
    "id": 1038,
    "term": "Virtual DOM",
    "definition": "An in-memory tree representation that frameworks diff against the previous version to compute minimal real DOM updates.",
    "scenario": "React keeps a lightweight in-memory tree of your UI; when state changes, it diffs old vs new and patches only what's different.",
    "category": "Frontend Frameworks"
  },
  {
    "id": 1039,
    "term": "Single Page Application",
    "definition": "A web app that loads once and updates the view via JavaScript without full page reloads.",
    "scenario": "Clicking links in your Gmail-like app swaps the content area instantly without the browser ever doing a full reload.",
    "category": "Frontend Frameworks"
  },
  {
    "id": 1040,
    "term": "Client-Side Routing",
    "definition": "Navigation handled in the browser by JavaScript, swapping views without a server round-trip.",
    "scenario": "React Router intercepts clicks on `<Link to=\"/about\">` and swaps the rendered component without hitting the server.",
    "category": "Frontend Frameworks"
  },

  // ─── Backend & APIs ────────────────────────────────
  {
    "id": 1041,
    "term": "REST",
    "definition": "An architectural style for APIs that uses HTTP verbs and resource URLs like `/users/5` to perform CRUD.",
    "scenario": "Your API exposes `GET /users`, `POST /users`, and `DELETE /users/5` — verbs map to actions, URLs map to resources.",
    "category": "Backend & APIs"
  },
  {
    "id": 1042,
    "term": "Endpoint",
    "definition": "A specific URL path on a server that accepts requests and returns a response.",
    "scenario": "Your frontend hits `/api/users/login` with credentials, and the server's matching handler returns a JWT token.",
    "category": "Backend & APIs"
  },
  {
    "id": 1043,
    "term": "Route",
    "definition": "A mapping in a backend framework that connects a URL pattern and HTTP verb to a handler function.",
    "scenario": "In Express you write `app.get('/products/:id', ...)` to wire a URL pattern to the function that returns that product.",
    "category": "Backend & APIs"
  },
  {
    "id": 1044,
    "term": "Middleware",
    "definition": "Functions that run between a request arriving and a response being sent, often for auth, logging, or parsing.",
    "scenario": "In Express, `app.use(express.json())` plugs in a function that parses JSON bodies before any of your route handlers run.",
    "category": "Backend & APIs"
  },
  {
    "id": 1045,
    "term": "Controller",
    "definition": "A backend layer that receives requests, calls business logic, and returns the response.",
    "scenario": "Your `userController.js` exports `getUser` and `createUser` functions that the router maps URLs to.",
    "category": "Backend & APIs"
  },
  {
    "id": 1046,
    "term": "Server",
    "definition": "A program that listens on a port and responds to incoming network requests from clients.",
    "scenario": "Your Node process calls `app.listen(3000)` and from then on it answers HTTP requests until you kill it.",
    "category": "Backend & APIs"
  },
  {
    "id": 1047,
    "term": "MVC",
    "definition": "A code-organization pattern that separates data (Model), display (View), and request handling (Controller).",
    "scenario": "Your Rails app puts database logic in models, HTML templates in views, and request-handling code in controllers — all separate folders.",
    "category": "Backend & APIs"
  },
  {
    "id": 1048,
    "term": "Request",
    "definition": "The message a client sends to a server, containing a method, URL, headers, and optional body.",
    "scenario": "Your browser sends method, path, headers, and a JSON body to your API — the server reads all of that off the incoming object.",
    "category": "Backend & APIs"
  },
  {
    "id": 1049,
    "term": "Response",
    "definition": "The message a server returns to the client, containing a status code, headers, and a body.",
    "scenario": "Your handler calls `res.status(200).json({ ok: true })` to send back a status, headers, and a body to the client.",
    "category": "Backend & APIs"
  },
  {
    "id": 1050,
    "term": "API",
    "definition": "A defined contract that lets one program request services or data from another.",
    "scenario": "Your frontend uses fetch to consume the Stripe service's documented endpoints to charge a card without touching its internals.",
    "category": "Backend & APIs"
  },

  // ─── HTML & CSS ────────────────────────────────────
  {
    "id": 1051,
    "term": "Semantic HTML",
    "definition": "Using HTML tags that describe meaning — `<nav>`, `<article>`, `<header>` — instead of generic `<div>` everywhere.",
    "scenario": "Instead of nesting fifteen divs, you wrap content in `<main>`, `<article>`, and `<aside>` so screen readers can navigate.",
    "category": "HTML & CSS"
  },
  {
    "id": 1052,
    "term": "Flexbox",
    "definition": "A one-dimensional CSS layout system for arranging items in a row or column with alignment controls.",
    "scenario": "You set `display: flex` on a container and use `justify-content: space-between` to evenly space three buttons in a row.",
    "category": "HTML & CSS"
  },
  {
    "id": 1053,
    "term": "Grid",
    "definition": "A two-dimensional CSS layout system for arranging items in rows and columns simultaneously.",
    "scenario": "You define `grid-template-columns: repeat(3, 1fr)` to lay out a three-column photo gallery that wraps responsively.",
    "category": "HTML & CSS"
  },
  {
    "id": 1054,
    "term": "Selector",
    "definition": "A CSS pattern that picks which elements a rule applies to — by tag, class, id, or attribute.",
    "scenario": "You write `.btn-primary` in your stylesheet to target every element with that class and apply blue styling.",
    "category": "HTML & CSS"
  },
  {
    "id": 1055,
    "term": "Media Query",
    "definition": "A CSS feature that applies different styles based on viewport width, resolution, or other device traits.",
    "scenario": "You wrap mobile rules in `@media (max-width: 600px) { ... }` so the layout collapses to one column on phones.",
    "category": "HTML & CSS"
  },
  {
    "id": 1056,
    "term": "Pseudo-class",
    "definition": "A CSS keyword like `:hover` or `:focus` that styles an element only in a particular state.",
    "scenario": "You add `button:hover { background: blue; }` so buttons turn blue only while the mouse is over them.",
    "category": "HTML & CSS"
  },
  {
    "id": 1057,
    "term": "Box Model",
    "definition": "The rectangular layout of every element: content, padding, border, and margin nested outward.",
    "scenario": "Your div looks too big, and DevTools reveals 20px of padding plus 5px border are adding to its rendered width.",
    "category": "HTML & CSS"
  },
  {
    "id": 1058,
    "term": "Specificity",
    "definition": "The CSS scoring system that decides which conflicting rule wins based on selector type counts.",
    "scenario": "Your `.btn` style isn't applying because an earlier `#submit` rule has higher score and overrides it on the same button.",
    "category": "HTML & CSS"
  },
  {
    "id": 1059,
    "term": "Cascade",
    "definition": "The CSS algorithm that resolves conflicting rules using origin, specificity, and source order.",
    "scenario": "Two stylesheets define rules for the same element, and the browser resolves the conflict by walking through origin, specificity, then order.",
    "category": "HTML & CSS"
  },
  {
    "id": 1060,
    "term": "Accessibility",
    "definition": "Designing UIs so people using screen readers, keyboards, or assistive tech can use them effectively.",
    "scenario": "You add `alt` text to images, label form inputs, and ensure tab order makes sense for keyboard-only and screen-reader users.",
    "category": "HTML & CSS"
  },

  // ─── JavaScript ────────────────────────────────────
  {
    "id": 1061,
    "term": "Closure",
    "definition": "A function that remembers the variables from its surrounding scope even after that scope has finished executing.",
    "scenario": "Your `makeCounter()` returns an inner function that still has access to the `count` variable defined in its parent — even after the parent returned.",
    "category": "JavaScript"
  },
  {
    "id": 1062,
    "term": "Callback",
    "definition": "A function passed as an argument to another function, to be called later when something finishes.",
    "scenario": "You pass an arrow function as the second argument to `array.map()`, and it gets invoked once for each element.",
    "category": "JavaScript"
  },
  {
    "id": 1063,
    "term": "Promise",
    "definition": "An object representing the eventual result of an asynchronous operation — either resolved with a value or rejected with an error.",
    "scenario": "Your `fetch('/api')` immediately returns an object on which you chain `.then()` to handle the eventual response.",
    "category": "JavaScript"
  },
  {
    "id": 1064,
    "term": "Async/Await",
    "definition": "Syntax that lets you write asynchronous code that reads like synchronous code, pausing on the keyword.",
    "scenario": "You mark a function with one keyword and use another inside it to pause until a fetch resolves, no `.then()` chain needed.",
    "category": "JavaScript"
  },
  {
    "id": 1065,
    "term": "Arrow Function",
    "definition": "A concise function syntax `() => {}` that doesn't bind its own `this` or `arguments`.",
    "scenario": "You replace `function(x) { return x*2 }` with `x => x*2` for a one-line callback in your `map` call.",
    "category": "JavaScript"
  },
  {
    "id": 1066,
    "term": "Destructuring",
    "definition": "Syntax that unpacks values from arrays or properties from objects into distinct variables in one statement.",
    "scenario": "Instead of `const name = user.name; const age = user.age;`, you write `const { name, age } = user;` in one line.",
    "category": "JavaScript"
  },
  {
    "id": 1067,
    "term": "Spread Operator",
    "definition": "Three dots `...` that expand an iterable's elements or an object's properties into another array or object.",
    "scenario": "You combine two arrays with `[...arr1, ...arr2]` or copy an object with `{ ...original, name: 'new' }`.",
    "category": "JavaScript"
  },
  {
    "id": 1068,
    "term": "Hoisting",
    "definition": "JavaScript's behavior of moving variable and function declarations to the top of their scope before execution.",
    "scenario": "You call `greet()` on line 2 and define `function greet()` on line 10 — and it works because the declaration was lifted.",
    "category": "JavaScript"
  },
  {
    "id": 1069,
    "term": "Template Literal",
    "definition": "Backtick-delimited strings that allow embedded expressions with `${...}` and multi-line content without escapes.",
    "scenario": "You write `` `Hello, ${name}!` `` instead of `'Hello, ' + name + '!'` to interpolate a variable into a string.",
    "category": "JavaScript"
  },
  {
    "id": 1070,
    "term": "this",
    "definition": "A keyword whose value depends on how a function is called — the object before the dot, or the global object.",
    "scenario": "Inside `user.greet()`, the keyword refers to `user`; but inside a plain `setTimeout(fn)` call, it refers to something else entirely.",
    "category": "JavaScript"
  },

  // ─── HTTP & Networking ─────────────────────────────
  {
    "id": 1071,
    "term": "GET",
    "definition": "An HTTP method for retrieving data without modifying server state; parameters go in the URL.",
    "scenario": "Your browser asks the server for `/api/users/5` using this safe, idempotent method that should never change data.",
    "category": "HTTP & Networking"
  },
  {
    "id": 1072,
    "term": "POST",
    "definition": "An HTTP method for submitting data to create a new resource on the server; data goes in the body.",
    "scenario": "Submitting a sign-up form sends user data in the body of a request that creates a new row in the users table.",
    "category": "HTTP & Networking"
  },
  {
    "id": 1073,
    "term": "Status Code",
    "definition": "A three-digit number returned by the server indicating the outcome of a request — 200, 404, 500, etc.",
    "scenario": "DevTools shows a 404 for `/api/cat` — the server's three-digit code that tells you the resource wasn't found.",
    "category": "HTTP & Networking"
  },
  {
    "id": 1074,
    "term": "HTTP Header",
    "definition": "A key-value pair in a request or response that carries metadata like Content-Type, Authorization, or Cache-Control.",
    "scenario": "You attach `Authorization: Bearer abc123` as metadata on each request so the server can identify the logged-in user.",
    "category": "HTTP & Networking"
  },
  {
    "id": 1075,
    "term": "Cookie",
    "definition": "A small piece of data the server sets in the browser, sent back automatically with every subsequent request to that domain.",
    "scenario": "After login the server sends `Set-Cookie: session=abc`, and the browser attaches it to every future request to that domain.",
    "category": "HTTP & Networking"
  },
  {
    "id": 1076,
    "term": "CORS",
    "definition": "A browser security mechanism that controls which other origins can make requests to your API.",
    "scenario": "Your React app on port 3000 fails to fetch your API on port 8000 until the API adds the right `Access-Control-Allow-Origin` header.",
    "category": "HTTP & Networking"
  },
  {
    "id": 1077,
    "term": "HTTPS",
    "definition": "HTTP layered over TLS, encrypting all traffic between client and server.",
    "scenario": "The browser shows a padlock icon because traffic to the site is encrypted end-to-end via TLS, not sent in plaintext.",
    "category": "HTTP & Networking"
  },
  {
    "id": 1078,
    "term": "URL",
    "definition": "A string that identifies a web resource, made of scheme, host, path, and optional query and fragment.",
    "scenario": "`https://shop.example.com/products/42?ref=email` breaks into a scheme, host, path, and query string the browser parses.",
    "category": "HTTP & Networking"
  },
  {
    "id": 1079,
    "term": "Query Parameter",
    "definition": "Key-value data appended to a URL after `?` and separated by `&`, typically for filters or pagination.",
    "scenario": "You filter a list page by appending `?status=active&page=2` to the URL — the server reads those values to scope the results.",
    "category": "HTTP & Networking"
  },
  {
    "id": 1080,
    "term": "Payload",
    "definition": "The body data carried inside a request or response, typically JSON for modern APIs.",
    "scenario": "When you POST a new comment, the JSON body of your request — `{ text: 'Hi' }` — is the meaningful data being delivered.",
    "category": "HTTP & Networking"
  },

  // ─── Auth & Security ───────────────────────────────
  {
    "id": 1081,
    "term": "JWT",
    "definition": "A signed, base64-encoded token containing user claims, sent on each request to prove identity.",
    "scenario": "After login the server signs a three-part dotted string the client stores and sends as `Authorization: Bearer ...` on each call.",
    "category": "Auth & Security"
  },
  {
    "id": 1082,
    "term": "OAuth",
    "definition": "An open standard for delegated authorization that lets users grant apps access to their data on another service.",
    "scenario": "Clicking 'Sign in with Google' sends you to Google's consent screen, then back with a token your app uses to call Google's APIs.",
    "category": "Auth & Security"
  },
  {
    "id": 1083,
    "term": "Session",
    "definition": "Server-side state tied to a logged-in user, identified by an ID stored in a cookie.",
    "scenario": "After login the server stores user info in memory or Redis under an ID, and the cookie sent back identifies which user is making each request.",
    "category": "Auth & Security"
  },
  {
    "id": 1084,
    "term": "Password Hashing",
    "definition": "Running a password through a one-way function like bcrypt before storing it so the original can't be recovered.",
    "scenario": "You never store raw passwords in the DB — you save the bcrypt output, and on login you compare hashes, never plaintext.",
    "category": "Auth & Security"
  },
  {
    "id": 1085,
    "term": "CSRF",
    "definition": "An attack where a malicious site tricks a logged-in user's browser into making unwanted requests to another site.",
    "scenario": "An evil site embeds a hidden form that POSTs to your bank — and the user's auth cookie rides along, performing an action they didn't intend.",
    "category": "Auth & Security"
  },
  {
    "id": 1086,
    "term": "XSS",
    "definition": "An attack where malicious JavaScript is injected into a page and executed in another user's browser.",
    "scenario": "A comment field doesn't sanitize input, so an attacker posts a `<script>` tag that runs in every visitor's browser, stealing cookies.",
    "category": "Auth & Security"
  },
  {
    "id": 1087,
    "term": "SQL Injection",
    "definition": "An attack where malicious input is concatenated into a SQL query, letting attackers run arbitrary database commands.",
    "scenario": "Your login form concatenates the input into a query string, so a user types `' OR 1=1 --` and bypasses authentication entirely.",
    "category": "Auth & Security"
  },
  {
    "id": 1088,
    "term": "Authentication",
    "definition": "Verifying who a user is — typically via password, token, or biometric.",
    "scenario": "When the user logs in with email and password, the server is doing the 'who are you' step before any permissions are checked.",
    "category": "Auth & Security"
  },
  {
    "id": 1089,
    "term": "Authorization",
    "definition": "Deciding what an already-identified user is allowed to do — read, write, admin actions, etc.",
    "scenario": "The user is logged in, but only those with role=admin can access `/admin/users` — that 'are you allowed' check is this step.",
    "category": "Auth & Security"
  },
  {
    "id": 1090,
    "term": "API Key",
    "definition": "A secret string passed with requests to identify and authenticate the calling application.",
    "scenario": "Your backend stores `STRIPE_SECRET_KEY` and includes it in every call to Stripe so they know which account is making the charge.",
    "category": "Auth & Security"
  },

  // ─── Data & Formats ────────────────────────────────
  {
    "id": 1091,
    "term": "JSON",
    "definition": "A lightweight text-based format for structured data using objects, arrays, strings, numbers, and booleans.",
    "scenario": "Your API returns `{ \"name\": \"Ada\", \"age\": 30 }` — a text format that parses cleanly into a JS object on the client.",
    "category": "Data & Formats"
  },
  {
    "id": 1092,
    "term": "XML",
    "definition": "A verbose tag-based markup format historically used for data exchange before JSON took over.",
    "scenario": "An old SOAP API returns `<user><name>Ada</name></user>` in a tag-based format — heavier and less common in modern web work.",
    "category": "Data & Formats"
  },
  {
    "id": 1093,
    "term": "GraphQL",
    "definition": "A query language for APIs where clients specify exactly which fields they want, and the server returns only that.",
    "scenario": "Instead of fetching whole user objects, your client sends a query asking for just `name` and `email` and gets back exactly those fields.",
    "category": "Data & Formats"
  },
  {
    "id": 1094,
    "term": "fetch",
    "definition": "The modern browser API for making HTTP requests, returning a Promise.",
    "scenario": "You call this built-in browser function with a URL, and it returns a Promise that resolves to a Response object you can `.json()`.",
    "category": "Data & Formats"
  },
  {
    "id": 1095,
    "term": "AJAX",
    "definition": "A technique for loading data from the server in the background without a full page reload.",
    "scenario": "Clicking 'Load More' on a feed updates only the list section by background-requesting fresh items — no full page reload happens.",
    "category": "Data & Formats"
  },
  {
    "id": 1096,
    "term": "Serialization",
    "definition": "Converting an in-memory object into a string or byte format suitable for sending over the network or saving to disk.",
    "scenario": "You call `JSON.stringify(user)` to turn a JS object into a string before sending it as the body of a POST request.",
    "category": "Data & Formats"
  },
  {
    "id": 1097,
    "term": "Webhook",
    "definition": "A user-defined HTTP callback URL that an external service hits when an event happens.",
    "scenario": "Stripe sends a POST to your `/stripe/event` URL whenever a charge succeeds, so your app reacts to events instead of polling.",
    "category": "Data & Formats"
  },
  {
    "id": 1098,
    "term": "Rate Limit",
    "definition": "A cap on how many requests a client can make to an API within a time window.",
    "scenario": "GitHub's API caps you at 60 unauthenticated requests per hour and returns 429 once you exceed that quota.",
    "category": "Data & Formats"
  },
  {
    "id": 1099,
    "term": "Pagination",
    "definition": "Splitting a large result set into smaller pages, navigated via parameters like `page` and `per_page` or cursors.",
    "scenario": "Your API returns 20 items at a time with `?page=3` parameters so the client doesn't fetch 10,000 records all at once.",
    "category": "Data & Formats"
  },
  {
    "id": 1100,
    "term": "WebSocket",
    "definition": "A persistent two-way connection between client and server allowing real-time data push without polling.",
    "scenario": "Your chat app keeps a long-lived bidirectional connection open so the server can push new messages instantly without client polling.",
    "category": "Data & Formats"
  },

  // ─── Build Tools ───────────────────────────────────
  {
    "id": 1101,
    "term": "npm",
    "definition": "Node's default package manager; installs libraries listed in package.json into node_modules.",
    "scenario": "You run a command starting with `n` and the library name to download Express into your project's `node_modules` folder.",
    "category": "Build Tools"
  },
  {
    "id": 1102,
    "term": "package.json",
    "definition": "The manifest file at the root of a Node project listing dependencies, scripts, and metadata.",
    "scenario": "You open the file at the root of your project to see the `dependencies` map and the `scripts` like `dev`, `build`, `test`.",
    "category": "Build Tools"
  },
  {
    "id": 1103,
    "term": "Vite",
    "definition": "A fast modern dev server and build tool that uses native ES modules in development.",
    "scenario": "You run `npm run dev` and your dev server starts in under a second with instant hot module replacement on save.",
    "category": "Build Tools"
  },
  {
    "id": 1104,
    "term": "webpack",
    "definition": "A module bundler that recursively walks imports to produce one or more output files for the browser.",
    "scenario": "Your config has loaders for CSS, images, and TypeScript, and the tool walks every import to produce a single `bundle.js`.",
    "category": "Build Tools"
  },
  {
    "id": 1105,
    "term": "ESLint",
    "definition": "A JavaScript linter that flags problematic patterns — unused vars, missing returns, style issues — based on configurable rules.",
    "scenario": "You leave a stray `var` in a file and red squiggles appear in VS Code complaining about a rule defined in `.eslintrc`.",
    "category": "Build Tools"
  },
  {
    "id": 1106,
    "term": "Prettier",
    "definition": "An opinionated code formatter that rewrites your code to a consistent style on save or in CI.",
    "scenario": "You hit save and your file's quotes, semicolons, and indentation get auto-fixed to match the team's shared style — no debate.",
    "category": "Build Tools"
  },
  {
    "id": 1107,
    "term": "Transpile",
    "definition": "Converting source code in one language or version to another — typically modern JS/TS to older browser-compatible JS.",
    "scenario": "Babel converts your TypeScript and modern arrow-function syntax into ES5 JavaScript so older browsers can run it.",
    "category": "Build Tools"
  },
  {
    "id": 1108,
    "term": "Bundler",
    "definition": "A tool that combines many source files and their dependencies into one or a few optimized output files.",
    "scenario": "Vite or Rollup walks all your imports and produces a small set of optimized output files instead of shipping 200 individual modules.",
    "category": "Build Tools"
  },
  {
    "id": 1109,
    "term": "Dependency",
    "definition": "An external package your project relies on, listed in package.json and downloaded into node_modules.",
    "scenario": "Your project lists `react` and `axios` in package.json — without them in node_modules, the import statements would fail.",
    "category": "Build Tools"
  },
  {
    "id": 1110,
    "term": "Lockfile",
    "definition": "An auto-generated file like package-lock.json that pins exact versions of every transitive dependency for reproducible installs.",
    "scenario": "You commit `package-lock.json` so every teammate and CI runner installs the exact same versions of every transitive dep.",
    "category": "Build Tools"
  },

  // ─── Testing ───────────────────────────────────────
  {
    "id": 1111,
    "term": "Unit Test",
    "definition": "A test that exercises a single function or module in isolation, usually fast and numerous.",
    "scenario": "You write a small fast test that calls `add(2, 3)` and asserts the result is 5 — no DB, no network, no other modules involved.",
    "category": "Testing"
  },
  {
    "id": 1112,
    "term": "Integration Test",
    "definition": "A test that exercises multiple modules together — for example a route handler hitting a real test database.",
    "scenario": "You spin up a test database and have your test hit `/api/users` end to end, verifying the route, controller, and DB all work together.",
    "category": "Testing"
  },
  {
    "id": 1113,
    "term": "End-to-End Test",
    "definition": "A test that drives the full app like a real user — browser, frontend, backend, database — using tools like Playwright or Cypress.",
    "scenario": "Cypress launches a real browser, fills the signup form, clicks submit, and asserts the dashboard appears — full stack flow tested.",
    "category": "Testing"
  },
  {
    "id": 1114,
    "term": "Mock",
    "definition": "A fake replacement for a real dependency that returns predetermined values, isolating the code under test.",
    "scenario": "Instead of hitting the real Stripe API, you swap in a stub that returns `{ id: 'fake_charge' }` so your test runs offline.",
    "category": "Testing"
  },
  {
    "id": 1115,
    "term": "Assertion",
    "definition": "A statement in a test that fails the test if a condition isn't met, like `expect(x).toBe(5)`.",
    "scenario": "Your test ends with `expect(total).toEqual(15)` — a check that fails the test if the computed value doesn't match.",
    "category": "Testing"
  },
  {
    "id": 1116,
    "term": "Jest",
    "definition": "A popular JavaScript testing framework with built-in assertions, mocking, and snapshot support.",
    "scenario": "You run `npx jest` and a popular test framework discovers `.test.js` files, runs them in parallel, and prints pass/fail.",
    "category": "Testing"
  },
  {
    "id": 1117,
    "term": "Test Runner",
    "definition": "The program that discovers test files, executes them, and reports the results.",
    "scenario": "Vitest or Jest scans your repo for `.test.js` files, executes them in workers, and reports pass/fail/coverage at the end.",
    "category": "Testing"
  },
  {
    "id": 1118,
    "term": "TDD",
    "definition": "A workflow where you write a failing test first, then write the minimum code to make it pass, then refactor.",
    "scenario": "Before writing the `discount()` function you write a failing test for it, then implement just enough code to pass — red, green, refactor.",
    "category": "Testing"
  },
  {
    "id": 1119,
    "term": "Fixture",
    "definition": "A piece of pre-defined test data used to set up a known state before a test runs.",
    "scenario": "Your `users.json` test data file gets loaded into the test DB before each spec runs, so every test starts with the same known state.",
    "category": "Testing"
  },
  {
    "id": 1120,
    "term": "Code Coverage",
    "definition": "A percentage measuring how much of your source code is executed by your test suite.",
    "scenario": "Your CI badge shows 87% — meaning that fraction of source lines were executed by tests at least once during the run.",
    "category": "Testing"
  },

  // ─── Cloud & Hosting ───────────────────────────────
  {
    "id": 1121,
    "term": "AWS",
    "definition": "Amazon's cloud platform offering compute, storage, databases, and dozens of other services on demand.",
    "scenario": "You spin up an EC2 instance, store images in S3, and proxy requests through CloudFront — all on Amazon's cloud platform.",
    "category": "Cloud & Hosting"
  },
  {
    "id": 1122,
    "term": "Vercel",
    "definition": "A hosting platform optimized for frontend frameworks, with Git integration and automatic deployments per push.",
    "scenario": "You connect your GitHub repo and every push to main triggers a deploy of your Next.js app to a `.vercel.app` URL automatically.",
    "category": "Cloud & Hosting"
  },
  {
    "id": 1123,
    "term": "Netlify",
    "definition": "A hosting platform for static sites and serverless functions with built-in CI from your Git repo.",
    "scenario": "You drop a `dist/` folder onto a hosting service that also handles forms, redirects, and serverless functions out of the box.",
    "category": "Cloud & Hosting"
  },
  {
    "id": 1124,
    "term": "CDN",
    "definition": "A network of servers around the world that cache static assets close to users for fast delivery.",
    "scenario": "Your static JS bundle gets cached on edge servers near every user, so a viewer in Tokyo loads it in 30ms instead of 300ms.",
    "category": "Cloud & Hosting"
  },
  {
    "id": 1125,
    "term": "Serverless",
    "definition": "A model where you write functions and the cloud provider handles provisioning, scaling, and teardown.",
    "scenario": "You upload a single function to AWS Lambda or Cloudflare Workers — no servers to manage, billed per-request only.",
    "category": "Cloud & Hosting"
  },
  {
    "id": 1126,
    "term": "S3",
    "definition": "Amazon's object storage service for files, images, backups, and static site hosting.",
    "scenario": "You upload user-avatar images to a bucket on Amazon's object store, then serve them via CDN-cached URLs.",
    "category": "Cloud & Hosting"
  },
  {
    "id": 1127,
    "term": "Auto-scaling",
    "definition": "Automatically adding or removing server instances based on traffic or load metrics.",
    "scenario": "Traffic spikes during a sale and the cloud platform spins up four extra instances on its own, then removes them when the load drops.",
    "category": "Cloud & Hosting"
  },
  {
    "id": 1128,
    "term": "Load Balancer",
    "definition": "A component that distributes incoming traffic across multiple backend servers to improve reliability and throughput.",
    "scenario": "Requests hit a single front-door host that round-robins them across five backend instances so no one server gets overwhelmed.",
    "category": "Cloud & Hosting"
  },
  {
    "id": 1129,
    "term": "DNS",
    "definition": "The internet's phone book — translates human-readable hostnames like example.com into IP addresses.",
    "scenario": "You point `app.example.com` at Vercel's nameservers via a CNAME record so the browser knows which IP to actually contact.",
    "category": "Cloud & Hosting"
  },
  {
    "id": 1130,
    "term": "Static Hosting",
    "definition": "Serving pre-built HTML, CSS, and JS files without any backend processing per request.",
    "scenario": "Your built `dist/` folder of HTML, CSS, and JS gets dropped onto GitHub Pages — no server runtime needed at all.",
    "category": "Cloud & Hosting"
  },

  // ─── Tools & Editors ───────────────────────────────
  {
    "id": 1131,
    "term": "VS Code",
    "definition": "Microsoft's free, extensible code editor — the most popular IDE among web developers.",
    "scenario": "You install extensions for ESLint, Prettier, and GitLens in Microsoft's free editor and it becomes your daily driver.",
    "category": "Tools & Editors"
  },
  {
    "id": 1132,
    "term": "Terminal",
    "definition": "A text-based interface for running commands, navigating the filesystem, and interacting with tools.",
    "scenario": "You hit ``Ctrl + ` `` in VS Code to open the integrated text-based interface where you run `npm install` and `git status`.",
    "category": "Tools & Editors"
  },
  {
    "id": 1133,
    "term": "Command Line",
    "definition": "The text-input prompt where you type commands like `ls`, `cd`, and `npm run` to interact with your system.",
    "scenario": "Instead of clicking through Finder, you type `cd ~/projects && code .` at the prompt to jump straight to your project.",
    "category": "Tools & Editors"
  },
  {
    "id": 1134,
    "term": "Debugger",
    "definition": "A tool that lets you pause code execution, inspect variables, and step through line-by-line.",
    "scenario": "You set a breakpoint on line 42, the program pauses there, and you step through one line at a time to inspect variables.",
    "category": "Tools & Editors"
  },
  {
    "id": 1135,
    "term": "Browser DevTools",
    "definition": "Built-in browser panels for inspecting elements, debugging JS, watching network traffic, and profiling.",
    "scenario": "You hit F12 to open panels for inspecting elements, watching network traffic, and pausing JS — all built into Chrome.",
    "category": "Tools & Editors"
  },
  {
    "id": 1136,
    "term": "Hot Reload",
    "definition": "A dev-server feature that re-renders updated modules without losing app state or requiring a full page refresh.",
    "scenario": "You change a CSS color in dev and the page updates instantly without losing your form state or scroll position.",
    "category": "Tools & Editors"
  },
  {
    "id": 1137,
    "term": "IDE",
    "definition": "An integrated development environment combining editor, debugger, build tools, and project navigation in one app.",
    "scenario": "WebStorm bundles editor, debugger, terminal, Git client, and refactoring tools into one app — that whole-package category.",
    "category": "Tools & Editors"
  },
  {
    "id": 1138,
    "term": "Linter",
    "definition": "A tool that statically analyzes code for likely bugs, anti-patterns, and style violations without running it.",
    "scenario": "ESLint scans your JS files without running them and warns about unused variables, unreachable code, and style violations.",
    "category": "Tools & Editors"
  },
  {
    "id": 1139,
    "term": "Code Formatter",
    "definition": "A tool that rewrites source code to a consistent style — indentation, quotes, line breaks — automatically.",
    "scenario": "Prettier rewrites your file on save with consistent indentation and quote style, so the team's diffs only show meaningful changes.",
    "category": "Tools & Editors"
  },
  {
    "id": 1140,
    "term": "REPL",
    "definition": "An interactive prompt that reads an expression, evaluates it, prints the result, and loops — like the Node or browser console.",
    "scenario": "You type `node` in your terminal and get an interactive prompt where you can paste expressions and see results immediately.",
    "category": "Tools & Editors"
  }
];
