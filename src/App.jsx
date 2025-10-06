import React, { useState, useEffect } from 'react';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const quizData = {
  unit1: [
    { id: 1, question: "What is the purpose of Java Streams API?", options: ["File I/O operations", "Functional-style operations on collections", "Network streaming", "Audio streaming"], answer: "Functional-style operations on collections" },
    { id: 2, question: "Which method is used to filter elements in a Stream?", options: ["map()", "filter()", "reduce()", "collect()"], answer: "filter()" },
    { id: 3, question: "What does the forEach() method do in Stream API?", options: ["Returns a new stream", "Performs an action for each element", "Filters elements", "Sorts elements"], answer: "Performs an action for each element" },
    { id: 4, question: "Lambda expressions were introduced in which Java version?", options: ["Java 6", "Java 7", "Java 8", "Java 9"], answer: "Java 8" },
    { id: 5, question: "What is a functional interface?", options: ["Interface with multiple methods", "Interface with exactly one abstract method", "Interface with no methods", "Interface with static methods only"], answer: "Interface with exactly one abstract method" },
    { id: 6, question: "Which annotation marks a functional interface?", options: ["@Override", "@FunctionalInterface", "@Lambda", "@Interface"], answer: "@FunctionalInterface" },
    { id: 7, question: "What is method reference syntax?", options: ["Class::method", "Class->method", "Class.method", "Class#method"], answer: "Class::method" },
    { id: 8, question: "Stream operations are divided into?", options: ["Sequential and parallel", "Intermediate and terminal", "Input and output", "Read and write"], answer: "Intermediate and terminal" },
    { id: 9, question: "Which is a terminal operation?", options: ["map()", "filter()", "collect()", "peek()"], answer: "collect()" },
    { id: 10, question: "Optional class is used to?", options: ["Handle null values", "Optimize performance", "Create objects", "Handle exceptions"], answer: "Handle null values" },
    { id: 11, question: "Collectors.toList() returns?", options: ["ArrayList", "LinkedList", "List implementation", "Vector"], answer: "List implementation" },
    { id: 12, question: "What does flatMap() do?", options: ["Flattens nested streams", "Creates 2D arrays", "Sorts elements", "Filters duplicates"], answer: "Flattens nested streams" },
    { id: 13, question: "Parallel streams use which framework?", options: ["Thread Pool", "Fork/Join", "Executor", "Concurrency"], answer: "Fork/Join" },
    { id: 14, question: "Which method creates a parallel stream?", options: ["stream()", "parallelStream()", "parallel()", "asyncStream()"], answer: "parallelStream()" },
    { id: 15, question: "Predicate functional interface method?", options: ["apply()", "test()", "accept()", "get()"], answer: "test()" },
    { id: 16, question: "Consumer functional interface method?", options: ["apply()", "test()", "accept()", "get()"], answer: "accept()" },
    { id: 17, question: "Supplier functional interface method?", options: ["apply()", "test()", "accept()", "get()"], answer: "get()" },
    { id: 18, question: "Function<T,R> functional interface method?", options: ["apply()", "test()", "accept()", "get()"], answer: "apply()" },
    { id: 19, question: "Stream.of() creates stream from?", options: ["Collection", "Array", "Individual elements", "File"], answer: "Individual elements" },
    { id: 20, question: "Which operation is lazy?", options: ["forEach()", "collect()", "map()", "count()"], answer: "map()" }
  ],
  unit2: [
    { id: 1, question: "What is a thread in Java?", options: ["A process", "Lightweight sub-process", "A method", "A class"], answer: "Lightweight sub-process" },
    { id: 2, question: "Which class is used to create threads?", options: ["Process", "Thread", "Runnable", "Executor"], answer: "Thread" },
    { id: 3, question: "Runnable interface has how many methods?", options: ["0", "1", "2", "3"], answer: "1" },
    { id: 4, question: "What is synchronization in Java?", options: ["Thread scheduling", "Controlling access to shared resources", "Thread creation", "Thread termination"], answer: "Controlling access to shared resources" },
    { id: 5, question: "synchronized keyword is used for?", options: ["Creating threads", "Thread-safe access", "Starting threads", "Stopping threads"], answer: "Thread-safe access" },
    { id: 6, question: "What is deadlock?", options: ["Thread termination", "Circular waiting for resources", "Thread creation failure", "Memory leak"], answer: "Circular waiting for resources" },
    { id: 7, question: "wait() method belongs to which class?", options: ["Thread", "Runnable", "Object", "System"], answer: "Object" },
    { id: 8, question: "notify() wakes up how many threads?", options: ["All waiting threads", "One waiting thread", "Two threads", "No threads"], answer: "One waiting thread" },
    { id: 9, question: "Thread priority range in Java?", options: ["0-10", "1-10", "0-100", "1-5"], answer: "1-10" },
    { id: 10, question: "Which method starts thread execution?", options: ["run()", "start()", "execute()", "begin()"], answer: "start()" },
    { id: 11, question: "Daemon thread is?", options: ["High priority thread", "Low priority service thread", "Main thread", "User thread"], answer: "Low priority service thread" },
    { id: 12, question: "join() method is used to?", options: ["Start thread", "Wait for thread completion", "Stop thread", "Pause thread"], answer: "Wait for thread completion" },
    { id: 13, question: "Thread states include?", options: ["New, Running, Dead", "New, Runnable, Terminated", "Start, Run, Stop", "Begin, Execute, End"], answer: "New, Runnable, Terminated" },
    { id: 14, question: "volatile keyword ensures?", options: ["Thread safety", "Visibility across threads", "Synchronization", "Atomicity"], answer: "Visibility across threads" },
    { id: 15, question: "ExecutorService is part of?", options: ["java.lang", "java.util", "java.util.concurrent", "java.thread"], answer: "java.util.concurrent" },
    { id: 16, question: "Callable interface returns?", options: ["void", "Future", "Thread", "Result"], answer: "Future" },
    { id: 17, question: "CountDownLatch is used for?", options: ["Counting threads", "Thread synchronization", "Thread pool", "Thread priority"], answer: "Thread synchronization" },
    { id: 18, question: "CyclicBarrier allows?", options: ["Thread reuse", "Threads to wait for each other", "Thread creation", "Thread termination"], answer: "Threads to wait for each other" },
    { id: 19, question: "ReentrantLock is?", options: ["Synchronized block", "Advanced locking mechanism", "Thread class", "Interface"], answer: "Advanced locking mechanism" },
    { id: 20, question: "ThreadLocal provides?", options: ["Global variables", "Thread-specific variables", "Static variables", "Instance variables"], answer: "Thread-specific variables" }
  ],
  unit3: [
    { id: 1, question: "What is JDBC?", options: ["Java Database Connection", "Java Database Connectivity", "Java Data Business Class", "Java Direct Base Connection"], answer: "Java Database Connectivity" },
    { id: 2, question: "Which package contains JDBC classes?", options: ["java.db", "java.sql", "java.database", "java.jdbc"], answer: "java.sql" },
    { id: 3, question: "DriverManager class is used to?", options: ["Create drivers", "Manage database connections", "Execute queries", "Close connections"], answer: "Manage database connections" },
    { id: 4, question: "Connection interface represents?", options: ["Database driver", "Database session", "SQL query", "Result set"], answer: "Database session" },
    { id: 5, question: "Statement interface is used to?", options: ["Connect to database", "Execute static SQL", "Close connections", "Load drivers"], answer: "Execute static SQL" },
    { id: 6, question: "PreparedStatement is used for?", options: ["Static queries", "Parameterized queries", "Stored procedures", "Database metadata"], answer: "Parameterized queries" },
    { id: 7, question: "ResultSet represents?", options: ["Database connection", "Query result", "SQL statement", "Database driver"], answer: "Query result" },
    { id: 8, question: "executeQuery() returns?", options: ["int", "boolean", "ResultSet", "void"], answer: "ResultSet" },
    { id: 9, question: "executeUpdate() returns?", options: ["ResultSet", "boolean", "int", "String"], answer: "int" },
    { id: 10, question: "Which method closes database connection?", options: ["disconnect()", "close()", "end()", "terminate()"], answer: "close()" },
    { id: 11, question: "CallableStatement is used for?", options: ["Simple queries", "Batch updates", "Stored procedures", "Metadata"], answer: "Stored procedures" },
    { id: 12, question: "Transaction control method?", options: ["beginTransaction()", "commit()", "startTransaction()", "saveTransaction()"], answer: "commit()" },
    { id: 13, question: "setAutoCommit(false) enables?", options: ["Automatic commits", "Manual transaction control", "Connection pooling", "Result caching"], answer: "Manual transaction control" },
    { id: 14, question: "ResultSetMetaData provides?", options: ["Query results", "Column information", "Connection details", "Driver info"], answer: "Column information" },
    { id: 15, question: "DatabaseMetaData contains?", options: ["Query results", "Database information", "Connection pool", "Transactions"], answer: "Database information" },
    { id: 16, question: "Batch processing improves?", options: ["Security", "Performance", "Readability", "Portability"], answer: "Performance" },
    { id: 17, question: "addBatch() is used with?", options: ["ResultSet", "Connection", "Statement", "DriverManager"], answer: "Statement" },
    { id: 18, question: "JDBC driver types are?", options: ["2", "3", "4", "5"], answer: "4" },
    { id: 19, question: "Type 4 JDBC driver is?", options: ["JDBC-ODBC bridge", "Native-API driver", "Network protocol driver", "Pure Java driver"], answer: "Pure Java driver" },
    { id: 20, question: "Connection pooling provides?", options: ["Security", "Reusable connections", "Faster queries", "Better SQL"], answer: "Reusable connections" }
  ],
  unit4: [
    { id: 1, question: "Servlet is?", options: ["Java application", "Server-side Java program", "Client application", "JavaScript program"], answer: "Server-side Java program" },
    { id: 2, question: "GenericServlet is in which package?", options: ["javax.servlet", "javax.servlet.http", "java.servlet", "java.http"], answer: "javax.servlet" },
    { id: 3, question: "HttpServlet extends?", options: ["Servlet", "GenericServlet", "Object", "HttpServer"], answer: "GenericServlet" },
    { id: 4, question: "doGet() method handles?", options: ["POST requests", "GET requests", "PUT requests", "DELETE requests"], answer: "GET requests" },
    { id: 5, question: "doPost() method handles?", options: ["GET requests", "POST requests", "PUT requests", "DELETE requests"], answer: "POST requests" },
    { id: 6, question: "ServletConfig provides?", options: ["Application context", "Servlet initialization parameters", "Session data", "Request parameters"], answer: "Servlet initialization parameters" },
    { id: 7, question: "ServletContext represents?", options: ["Single servlet", "Entire web application", "HTTP session", "Request"], answer: "Entire web application" },
    { id: 8, question: "HttpSession is used for?", options: ["Database connection", "State management", "Request handling", "Response generation"], answer: "State management" },
    { id: 9, question: "setAttribute() stores data in?", options: ["Database", "Session/Request/Context", "File", "Memory"], answer: "Session/Request/Context" },
    { id: 10, question: "getAttribute() retrieves data from?", options: ["Database", "Session/Request/Context", "File", "URL"], answer: "Session/Request/Context" },
    { id: 11, question: "RequestDispatcher is used for?", options: ["Sending response", "Forwarding request", "Creating session", "Closing connection"], answer: "Forwarding request" },
    { id: 12, question: "forward() vs sendRedirect()?", options: ["Same functionality", "Server-side vs client-side", "GET vs POST", "HTTP vs HTTPS"], answer: "Server-side vs client-side" },
    { id: 13, question: "Cookie stores data on?", options: ["Server", "Client browser", "Database", "Session"], answer: "Client browser" },
    { id: 14, question: "Cookie size limit?", options: ["2KB", "4KB", "8KB", "16KB"], answer: "4KB" },
    { id: 15, question: "Filter interface is used for?", options: ["Filtering results", "Request/Response preprocessing", "Database queries", "Session management"], answer: "Request/Response preprocessing" },
    { id: 16, question: "Servlet life cycle methods?", options: ["start, run, stop", "init, service, destroy", "begin, execute, end", "create, process, remove"], answer: "init, service, destroy" },
    { id: 17, question: "web.xml is?", options: ["Java file", "Deployment descriptor", "Configuration class", "Properties file"], answer: "Deployment descriptor" },
    { id: 18, question: "@WebServlet is used for?", options: ["Creating servlets", "Annotation-based configuration", "Mapping URLs", "Both annotation and mapping"], answer: "Both annotation and mapping" },
    { id: 19, question: "ServletException is?", options: ["Checked exception", "Unchecked exception", "Error", "RuntimeException"], answer: "Checked exception" },
    { id: 20, question: "Servlet container example?", options: ["Eclipse", "NetBeans", "Tomcat", "IntelliJ"], answer: "Tomcat" }
  ],
  unit5: [
    { id: 1, question: "JSP stands for?", options: ["Java Server Pages", "Java Standard Pages", "Java Servlet Pages", "Java Script Pages"], answer: "Java Server Pages" },
    { id: 2, question: "JSP is converted to?", options: ["HTML", "Servlet", "JavaScript", "XML"], answer: "Servlet" },
    { id: 3, question: "JSP scriptlet syntax?", options: ["<% %>", "<$ $>", "<# #>", "<@ @>"], answer: "<% %>" },
    { id: 4, question: "JSP expression syntax?", options: ["<% %>", "<%= %>", "<%! %>", "<%@ %>"], answer: "<%= %>" },
    { id: 5, question: "JSP declaration syntax?", options: ["<% %>", "<%= %>", "<%! %>", "<%@ %>"], answer: "<%! %>" },
    { id: 6, question: "JSP directive syntax?", options: ["<% %>", "<%= %>", "<%! %>", "<%@ %>"], answer: "<%@ %>" },
    { id: 7, question: "page directive is used for?", options: ["Including files", "Page configuration", "Tag libraries", "Error handling"], answer: "Page configuration" },
    { id: 8, question: "include directive includes?", options: ["At runtime", "At compile time", "At deployment", "At initialization"], answer: "At compile time" },
    { id: 9, question: "taglib directive is for?", options: ["Page attributes", "Custom tags", "File inclusion", "Error pages"], answer: "Custom tags" },
    { id: 10, question: "JSP implicit object 'request' type?", options: ["HttpRequest", "ServletRequest", "HttpServletRequest", "Request"], answer: "HttpServletRequest" },
    { id: 11, question: "JSP implicit object 'response' type?", options: ["HttpResponse", "ServletResponse", "HttpServletResponse", "Response"], answer: "HttpServletResponse" },
    { id: 12, question: "JSP implicit object 'out' type?", options: ["PrintWriter", "JspWriter", "Writer", "OutputStream"], answer: "JspWriter" },
    { id: 13, question: "JSP implicit object 'session' type?", options: ["Session", "HttpSession", "ServletSession", "WebSession"], answer: "HttpSession" },
    { id: 14, question: "How many JSP implicit objects?", options: ["7", "8", "9", "10"], answer: "9" },
    { id: 15, question: "JSP action tag <jsp:include>?", options: ["Static inclusion", "Dynamic inclusion", "Compile-time inclusion", "No inclusion"], answer: "Dynamic inclusion" },
    { id: 16, question: "JSP action tag <jsp:forward>?", options: ["Includes page", "Forwards request", "Creates bean", "Sets property"], answer: "Forwards request" },
    { id: 17, question: "JSP action tag <jsp:useBean>?", options: ["Forwards request", "Includes page", "Creates/locates bean", "Sets attribute"], answer: "Creates/locates bean" },
    { id: 18, question: "EL expression syntax?", options: ["<% %>", "${ }", "#{ }", "@{ }"], answer: "${ }" },
    { id: 19, question: "JSTL stands for?", options: ["Java Standard Tag Library", "JSP Standard Tag Library", "Java Server Tag Library", "JSP Servlet Tag Library"], answer: "JSP Standard Tag Library" },
    { id: 20, question: "JSTL core tag prefix?", options: ["c", "core", "jsp", "std"], answer: "c" }
  ]
};

// Custom hook for session storage management
const useSessionStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
};

// Custom hook for local storage management
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
};

function App() {
  // Session and local storage management
  const [currentUser, setCurrentUser] = useSessionStorage('currentUser', null);
  const [registeredUsers, setRegisteredUsers] = useLocalStorage('registeredUsers', [
    { username: "admin", password: "admin123", role: "admin", name: "Buvana M" },
    { username: "teacher1", password: "teacher123", role: "teacher", name: "Dr. Faculty" },
  ]);
  const [allQuizResults, setAllQuizResults] = useLocalStorage('quizResults', []);
  
  const [view, setView] = useState('login');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', name: '', regNo: '', role: 'student' });
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [showResults, setShowResults] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    if (currentUser) {
      setView(currentUser.role === 'student' ? 'student-dashboard' : 'admin-dashboard');
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (quizActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (quizActive && timeLeft === 0) {
      handleQuizSubmit();
    }
  }, [quizActive, timeLeft]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = registeredUsers.find(u => u.username === loginData.username && u.password === loginData.password);
    if (user) {
      setCurrentUser(user);
      setView(user.role === 'student' ? 'student-dashboard' : 'admin-dashboard');
      setLoginData({ username: '', password: '' });
    } else {
      alert('❌ Invalid credentials! Please try again.');
    }
    setIsLoading(false);
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingUser = registeredUsers.find(u => u.username === registerData.username);
    if (existingUser) {
      alert('❌ Username already exists! Please choose another.');
      setIsLoading(false);
      return;
    }
    
    // Validate registration number for students
    if (registerData.role === 'student' && !registerData.regNo) {
      alert('❌ Registration number is required for students!');
      setIsLoading(false);
      return;
    }
    
    const newUser = { ...registerData, id: Date.now() };
    setRegisteredUsers([...registeredUsers, newUser]);
    alert('✅ Registration successful! Please login.');
    setView('login');
    setRegisterData({ username: '', password: '', name: '', regNo: '', role: 'student' });
    setIsLoading(false);
  };

  // Start quiz with shuffled questions
  const startQuiz = (unit) => {
    const originalQuestions = quizData[unit];
    
    // Shuffle questions for this user
    const shuffled = shuffleArray(originalQuestions);
    
    // Also shuffle options for each question
    const shuffledWithOptions = shuffled.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    
    setSelectedUnit(unit);
    setShuffledQuestions(shuffledWithOptions);
    setQuizActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(600);
    setShowResults(false);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  // Navigate questions
  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit quiz
  const handleQuizSubmit = () => {
    let score = 0;
    shuffledQuestions.forEach(q => {
      if (userAnswers[q.id] === q.answer) score++;
    });
    
    const result = {
      id: Date.now(),
      student: currentUser.name,
      regNo: currentUser.regNo,
      username: currentUser.username,
      unit: selectedUnit,
      score: score,
      total: shuffledQuestions.length,
      percentage: ((score / shuffledQuestions.length) * 100).toFixed(2),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now()
    };
    
    setAllQuizResults([...allQuizResults, result]);
    setQuizActive(false);
    setShowResults(true);
    
    if (parseFloat(result.percentage) >= 50) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
    setQuizActive(false);
    setSelectedUnit(null);
    sessionStorage.clear();
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Confetti component
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            width: '10px',
            height: '10px',
            backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      <span className="ml-2">Processing...</span>
    </div>
  );

  // Render login page
  const renderLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-20 animate-blob top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-1/2"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 animate-slideUp">
        <div className="text-center mb-8">
          <div className="inline-block animate-bounce-slow mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-2 animate-fadeIn">Advanced Java Quiz</h1>
          <p className="text-gray-600 text-sm animate-fadeIn animation-delay-300">Sri Shakthi Institute of Engineering and Technology</p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
            <svg className="w-5 h-5 text-green-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{registeredUsers.filter(u => u.role === 'student').length} students registered</span>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="animate-slideInLeft animation-delay-500">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="animate-slideInRight animation-delay-700">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-slideUp animation-delay-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? <LoadingSpinner /> : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center animate-fadeIn animation-delay-1100">
          <button
            onClick={() => setView('register')}
            disabled={isLoading}
            className="text-green-600 hover:text-green-700 font-medium transition-all duration-300 hover:underline disabled:opacity-50"
          >
            Don't have an account? Register
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500 animate-fadeIn animation-delay-1300">
          <p>Developed by Buvana M, IT Assistant Professor</p>
          <p className="mt-1">© 2025 Sri Shakthi Institute of Engineering and Technology</p>
        </div>
      </div>
    </div>
  );

  // Render register page
  const renderRegister = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-20 animate-blob top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-1/2"></div>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 animate-slideUp max-h-screen overflow-y-auto">
        <div className="text-center mb-6">
          <div className="inline-block animate-bounce-slow mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-2 animate-fadeIn">Create Account</h1>
          <p className="text-gray-600 text-sm animate-fadeIn animation-delay-300">Join our learning platform</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="animate-slideInLeft animation-delay-500">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="animate-slideInRight animation-delay-600">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Username *</label>
            <input
              type="text"
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              placeholder="Choose a unique username"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="animate-slideInLeft animation-delay-700">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
            <input
              type="password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              placeholder="Create a strong password"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>
          
          {registerData.role === 'student' && (
            <div className="animate-slideInRight animation-delay-800">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Registration Number *</label>
              <input
                type="text"
                value={registerData.regNo}
                onChange={(e) => setRegisterData({ ...registerData, regNo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                placeholder="e.g., 20IT001"
                required
                disabled={isLoading}
              />
            </div>
          )}
          
          <div className="animate-slideInLeft animation-delay-900">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Role *</label>
            <select
              value={registerData.role}
              onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              disabled={isLoading}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-slideUp animation-delay-1000 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? <LoadingSpinner /> : 'Register'}
          </button>
        </form>
        
        <div className="mt-6 text-center animate-fadeIn animation-delay-1100">
          <button
            onClick={() => setView('login')}
            disabled={isLoading}
            className="text-green-600 hover:text-green-700 font-medium transition-all duration-300 hover:underline disabled:opacity-50"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );

  // Render student dashboard
  const renderStudentDashboard = () => {
    const studentResults = allQuizResults.filter(r => r.username === currentUser.username);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 shadow-2xl animate-slideDown">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="animate-slideInLeft">
              <h1 className="text-3xl font-bold flex items-center">
                <span className="animate-wave inline-block mr-3">👋</span>
                Student Dashboard
              </h1>
              <p className="text-green-100 mt-1">Welcome back, {currentUser.name} ({currentUser.regNo})</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-slideInRight"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg animate-fadeIn">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-blue-700">📝 Questions are randomized for each attempt!</p>
                <p className="text-sm text-blue-600 mt-1">Each quiz will have different question order and option order to ensure fair assessment.</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fadeIn">Select Unit for Quiz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['unit1', 'unit2', 'unit3', 'unit4', 'unit5'].map((unit, index) => {
              const unitAttempts = studentResults.filter(r => r.unit === unit);
              const bestScore = unitAttempts.length > 0 
                ? Math.max(...unitAttempts.map(r => parseFloat(r.percentage)))
                : null;
              
              return (
                <div 
                  key={unit} 
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-scaleIn cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl transform group-hover:rotate-12 transition-transform duration-300 shadow-lg animate-pulse-slow">
                      {index + 1}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">Unit {index + 1}</h3>
                      <p className="text-gray-500 text-sm">Advanced Java</p>
                    </div>
                  </div>
                  
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      20 Questions (Shuffled)
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      10 Minutes
                    </div>
                    {bestScore !== null && (
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Best: {bestScore}%
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => startQuiz(unit)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
                  >
                    {unitAttempts.length > 0 ? 'Retake Quiz' : 'Start Quiz'} →
                  </button>
                </div>
              );
            })}
          </div>
          
          {studentResults.length > 0 && (
            <div className="mt-10 bg-white rounded-xl shadow-2xl p-8 animate-slideUp">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-8 h-8 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Your Quiz History
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gradient-to-r from-green-50 to-green-100">
                    <tr>
                      <th className="p-4 text-green-700 font-bold">Unit</th>
                      <th className="p-4 text-green-700 font-bold">Score</th>
                      <th className="p-4 text-green-700 font-bold">Percentage</th>
                      <th className="p-4 text-green-700 font-bold">Date</th>
                      <th className="p-4 text-green-700 font-bold">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentResults.sort((a, b) => b.timestamp - a.timestamp).map((result, idx) => (
                      <tr key={result.id} className="border-b hover:bg-green-50 transition-colors duration-200 animate-fadeIn" style={{ animationDelay: `${idx * 50}ms` }}>
                        <td className="p-4 font-semibold text-green-600">{result.unit.toUpperCase()}</td>
                        <td className="p-4">{result.score}/{result.total}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full font-semibold ${parseFloat(result.percentage) >= 50 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {result.percentage}%
                          </span>
                        </td>
                        <td className="p-4">{result.date}</td>
                        <td className="p-4">{result.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render admin dashboard
  const renderAdminDashboard = () => {
    const students = registeredUsers.filter(u => u.role === 'student');
    const avgScore = allQuizResults.length > 0 
      ? (allQuizResults.reduce((sum, r) => sum + parseFloat(r.percentage), 0) / allQuizResults.length).toFixed(1)
      : 0;
      
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 shadow-2xl animate-slideDown">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="animate-slideInLeft">
              <h1 className="text-3xl font-bold flex items-center">
                <svg className="w-8 h-8 mr-3 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin Dashboard
              </h1>
              <p className="text-green-100 mt-1">Welcome, {currentUser.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-slideInRight"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 animate-scaleIn cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold opacity-90">Total Students</h3>
                <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-5xl font-bold animate-countUp">{students.length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 animate-scaleIn animation-delay-200 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold opacity-90">Total Quizzes</h3>
                <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-5xl font-bold animate-countUp">{allQuizResults.length}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300 animate-scaleIn animation-delay-400 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold opacity-90">Average Score</h3>
                <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-5xl font-bold animate-countUp">{avgScore}%</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-2xl p-8 animate-slideUp">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-8 h-8 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              All Quiz Results
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-green-50 to-green-100">
                  <tr>
                    <th className="p-4 text-green-700 font-bold">Student</th>
                    <th className="p-4 text-green-700 font-bold">Reg No</th>
                    <th className="p-4 text-green-700 font-bold">Unit</th>
                    <th className="p-4 text-green-700 font-bold">Score</th>
                    <th className="p-4 text-green-700 font-bold">Percentage</th>
                    <th className="p-4 text-green-700 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allQuizResults.length > 0 ? (
                    allQuizResults.sort((a, b) => b.timestamp - a.timestamp).map((result, idx) => (
                      <tr key={result.id} className="border-b hover:bg-green-50 transition-colors duration-200 animate-fadeIn" style={{ animationDelay: `${idx * 50}ms` }}>
                        <td className="p-4 font-semibold">{result.student}</td>
                        <td className="p-4 text-gray-600">{result.regNo}</td>
                        <td className="p-4 font-semibold text-green-600">{result.unit.toUpperCase()}</td>
                        <td className="p-4">{result.score}/{result.total}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full font-semibold ${parseFloat(result.percentage) >= 50 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {result.percentage}%
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{result.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg">No quiz results available yet</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render quiz interface
  const renderQuiz = () => {
    if (shuffledQuestions.length === 0) return null;
    
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const answeredCount = Object.keys(userAnswers).length;
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 shadow-2xl sticky top-0 z-40 animate-slideDown">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <span className="animate-pulse mr-2">📝</span>
                {selectedUnit.toUpperCase()} Quiz
              </h1>
              <p className="text-green-100 text-sm mt-1">Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold transition-all duration-300 ${timeLeft < 60 ? 'text-red-300 animate-pulse' : 'animate-countUp'}`}>
                {formatTime(timeLeft)}
              </div>
              <p className="text-sm text-green-100 mt-1">Time Remaining</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="max-w-4xl mx-auto mt-4">
            <div className="w-full bg-green-400 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-2 transition-all duration-500 ease-out animate-shimmer"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 transform transition-all duration-500 animate-slideUp">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-600 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Answered: {answeredCount}/{shuffledQuestions.length}
                </span>
                <span className="text-sm font-semibold text-green-600 px-3 py-1 bg-green-50 rounded-full animate-pulse-slow">
                  Question {currentQuestionIndex + 1}
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-8 animate-fadeIn leading-relaxed">{currentQuestion.question}</h2>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 animate-slideInLeft ${
                    userAnswers[currentQuestion.id] === option
                      ? 'border-green-600 bg-gradient-to-r from-green-50 to-green-100 shadow-lg scale-102'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 transition-all duration-300 ${
                      userAnswers[currentQuestion.id] === option
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="font-medium flex-1">{option}</span>
                    {userAnswers[currentQuestion.id] === option && (
                      <svg className="w-6 h-6 text-green-600 animate-checkmark" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 rounded-xl font-semibold hover:from-gray-400 hover:to-gray-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md hover:shadow-lg"
            >
              ← Previous
            </button>
            
            {currentQuestionIndex === shuffledQuestions.length - 1 ? (
              <button
                onClick={handleQuizSubmit}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl animate-pulse-slow"
              >
                Submit Quiz ✓
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Next →
              </button>
            )}
          </div>
          
          {/* Question navigation */}
          <div className="bg-white rounded-2xl shadow-xl p-6 animate-slideUp animation-delay-300">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-10 gap-2">
              {shuffledQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`aspect-square rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 ${
                    idx === currentQuestionIndex
                      ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg scale-110'
                      : userAnswers[q.id]
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render results
  const renderResults = () => {
    const lastResult = allQuizResults[allQuizResults.length - 1];
    const percentage = parseFloat(lastResult.percentage);
    const passed = percentage >= 50;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center p-4 relative overflow-hidden">
        {showConfetti && <Confetti />}
        
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-30 animate-blob top-0 -left-20"></div>
          <div className="absolute w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000 top-0 right-0"></div>
          <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4000 bottom-0 left-1/2"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl relative z-10 animate-scaleIn">
          <div className="text-center mb-8">
            <div className={`w-40 h-40 mx-auto mb-6 rounded-full flex items-center justify-center relative ${
              passed ? 'bg-gradient-to-br from-green-400 to-green-600 animate-success' : 'bg-gradient-to-br from-red-400 to-red-600'
            } shadow-2xl`}>
              <div className="absolute inset-0 rounded-full animate-ping-slow opacity-75 bg-white"></div>
              <div className="relative">
                <span className="text-6xl font-bold text-white animate-countUp">{lastResult.score}</span>
                <span className="text-3xl text-white opacity-90">/{lastResult.total}</span>
              </div>
            </div>
            
            <div className="mb-6 animate-fadeIn animation-delay-500">
              {passed ? (
                <div className="text-6xl mb-4 animate-bounce-slow">🎉</div>
              ) : (
                <div className="text-6xl mb-4 animate-bounce-slow">📚</div>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-3 animate-slideDown">Quiz Completed!</h1>
            <p className="text-2xl text-gray-600 animate-fadeIn animation-delay-300">Your Score: <span className={`font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>{lastResult.percentage}%</span></p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 animate-slideUp animation-delay-500">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-600 font-semibold">Correct</p>
                </div>
                <p className="text-4xl font-bold text-green-600 animate-countUp">{lastResult.score}</p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-600 font-semibold">Wrong</p>
                </div>
                <p className="text-4xl font-bold text-red-600 animate-countUp">{lastResult.total - lastResult.score}</p>
              </div>
            </div>
          </div>
          
          <div className={`p-6 rounded-2xl mb-6 transform hover:scale-102 transition-all duration-300 animate-slideUp animation-delay-700 ${
            passed ? 'bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300' : 'bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300'
          }`}>
            <p className={`font-bold text-center text-xl ${passed ? 'text-green-700' : 'text-red-700'}`}>
              {passed ? '🎊 Congratulations! You passed with flying colors!' : '💪 Keep practicing! You\'ll ace it next time!'}
            </p>
          </div>
          
          <div className="flex gap-4 animate-slideUp animation-delay-900">
            <button
              onClick={() => {
                setShowResults(false);
                setView('student-dashboard');
              }}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => startQuiz(selectedUnit)}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main render logic
  if (view === 'login') return renderLogin();
  if (view === 'register') return renderRegister();
  if (showResults) return renderResults();
  if (quizActive) return renderQuiz();
  if (view === 'student-dashboard') return renderStudentDashboard();
  if (view === 'admin-dashboard' || view === 'teacher-dashboard') return renderAdminDashboard();
}
export default App;