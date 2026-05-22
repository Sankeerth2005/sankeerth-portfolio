/* ==========================================================================
   PORTFOLIO ENGINE // INTERACTIVE APPLICATIONS CORE
   SAI SANKEERTH ANCHURU // CYBERPUNK 2026 EDITION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------------------------------------------------------------
       01. DYNAMIC SYSTEM GLOBALS & DATA ARCHIVES
       -------------------------------------------------------------------------- */
    const PROJECT_ARCHIVES = {
        dukaanledger: {
            title: "DukaanLedger — Multi-Tenant SaaS Retail POS Platform",
            category: "SAAS // MICROSERVICES // POS & ANALYTICS",
            summary: "A highly resilient enterprise-grade POS and financial reporting engine architected to isolate multi-tenant operations securely under deep AI data pipelines.",
            tech: ["Python", "React.js", "Spring Boot", "REST APIs", "AWS"],
            specs: [
                "<strong>Multi-Tenant Vault:</strong> Engineered granular row-level data boundaries, securing active data segregation across diverse retail vendors.",
                "<strong>Spring Boot Pipeline:</strong> Formulated independent microservices handles for real-time inventory adjustments and automated invoice generation.",
                "<strong>AI Predictive Engine:</strong> Embedded custom LLM prompts via GPT APIs to automate inventory restocking calculations and parse receipts dynamically.",
                "<strong>Performance Metrics:</strong> Achieved sub-80ms transaction log speeds using Redis transaction memory caches on Amazon Web Services clusters."
            ],
            architecture: `
+------------------+     +------------------------+     +-------------------+
|  React.js UI     | --> |  Spring Gateway REST   | --> |  Microservice Log |
|  [Hologram View] |     |  [Token Validation]    |     |  [Inventory/POS]  |
+------------------+     +------------------------+     +-------------------+
                                                                  |
                                                                  v
+------------------+     +------------------------+     +-------------------+
|  AWS RDS Secure  | <-- |  AI REST Proxy Node    | <-- |  Redis Core Cache |
|  [Isolated DB]   |     |  [GPT/Gemini Parsing]  |     |  [Transaction Sync|
+------------------+     +------------------------+     +-------------------+
`
        },
        textrewriter: {
            title: "AI-Based Automated Text Rewriter Pipeline",
            category: "GENERATIVE AI // CONTAINERIZED PIPELINE",
            summary: "Scalable enterprise automation service designed to rewrite, translate, and synthesize bulk corporate document repositories with hot-swappable LLM modules.",
            tech: ["Python", "GPT API", "Gemini API", "Docker", "AWS"],
            specs: [
                "<strong>Abstract Pipeline:</strong> Coded a modular orchestration class allowing dynamic run-time switching of model backends (OpenAI GPT, Google Gemini).",
                "<strong>DevOps Cluster:</strong> Fully containerized using Docker, orchestrating zero-downtime rolling updates via AWS ECS hosting instances.",
                "<strong>Batch Threading:</strong> Handled multi-threaded stream parsing to rewrite large files asynchronously without hanging main HTTP processes.",
                "<strong>Throughput Capacity:</strong> Confirmed error-free processing of 15,000+ words per minute under standard sandbox stress bounds."
            ],
            architecture: `
+------------------+     +------------------------+     +-------------------+
| Corporate Assets | --> |  FastAPI Stream Broker | --> |  Docker Thread Pool|
| [PDF / DOC Docs] |     |  [Request Handlers]    |     |  [Async Execution] |
+------------------+     +------------------------+     +-------------------+
                                                                  |
                                                                  v
+------------------+     +------------------------+     +-------------------+
| Deployed Output  | <-- |  AWS ECS Core Cluster  | <-- |  Hot-Swap Prompt  |
| [Synthesized CV] |     |  [Resilient Scaling]   |     |  [GPT / Gemini API|
+------------------+     +------------------------+     +-------------------+
`
        },
        blockchain: {
            title: "AI-Driven Blockchain Performance Optimizer",
            category: "DATA ANALYSIS // PREDICTIVE FORECASTING",
            summary: "A mathematical machine learning module checking transaction speed variances and scaling efficiency targets across distributed ledger models.",
            tech: ["Python", "Machine Learning", "Data Analysis", "Pandas"],
            specs: [
                "<strong>Anomaly Detection:</strong> Trained customized Scikit-Learn models to scan block creation latencies and locate gas bottleneck anomalies.",
                "<strong>Data-Driven Scaling:</strong> Implemented optimization algorithms that boosted mock transaction throughput by 22%.",
                "<strong>Stakeholder Reports:</strong> Visualized performance gains using rich Seaborn analytics graphics presented to academic researchers."
            ],
            architecture: `
+------------------+     +------------------------+     +-------------------+
| Distributed Nodes| --> |  Telemetry Ingest Pipe | --> |  Scikit-Learn ML  |
| [Block Logs / GAS|     |  [Pandas Normalizing]  |     |  [Classification] |
+------------------+     +------------------------+     +-------------------+
                                                                  |
                                                                  v
+------------------+     +------------------------+     +-------------------+
| Optimized Nodes  | <-- |  Dispatch Decision     | <-- |  Predictive Map   |
| [Gas Safe Sync]  |     |  [Throughput Adjust]   |     |  [Bottleneck Info]|
+------------------+     +------------------------+     +-------------------+
`
        }
    };

    /* --------------------------------------------------------------------------
       02. DYNAMIC REAL-TIME CLOCKS & GREETINGS
       -------------------------------------------------------------------------- */
    function updateHUDClocks() {
        const now = new Date();
        
        // System clock (Visitor time)
        const formatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const timeStr = now.toLocaleTimeString([], formatOptions);
        
        // Display inside navbar and mobile header
        const navClock = document.getElementById('nav-system-clock');
        const mobClock = document.getElementById('mobile-system-clock');
        if (navClock) navClock.textContent = `${timeStr} SYS`;
        if (mobClock) mobClock.textContent = `${timeStr} SYS`;

        // India Time for Profile Availability (Hyderabad, GMT+5:30)
        const optionsIST = {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const istStr = new Intl.DateTimeFormat([], optionsIST).format(now);
        const profileClock = document.getElementById('profile-availability-clock');
        if (profileClock) profileClock.textContent = `${istStr} IST (GMT+5:30)`;
    }
    
    setInterval(updateHUDClocks, 1000);
    updateHUDClocks();

    // Time-based system greeting
    function setSystemGreeting() {
        const hours = new Date().getHours();
        let greet = "";
        if (hours < 12) greet = "GREETINGS_USER: MORNING_LINK_ESTABLISHED";
        else if (hours < 18) greet = "GREETINGS_USER: AFTERNOON_LINK_ESTABLISHED";
        else greet = "GREETINGS_USER: NIGHT_COMMS_ON_LINE";
        
        const greetingField = document.getElementById('dynamic-greeting');
        if (greetingField) greetingField.textContent = greet;
    }
    setSystemGreeting();

    /* --------------------------------------------------------------------------
       03. HIGH-PERFORMANCE CANVAS BACKGROUND ENGINE
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById('cyber-backdrop-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        let mouse = { x: width / 2, y: height / 2, active: false };
        
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        });
        
        window.addEventListener('mouseleave', () => {
            mouse.active = false;
        });

        // Neural Particles
        const particles = [];
        const particleCount = Math.min(65, Math.floor(width / 20));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.6 ? 'rgba(16, 185, 129, 0.4)' : (Math.random() > 0.5 ? '#a1a1aa' : '#71717a'),
                origVx: 0,
                origVy: 0
            });
        }
        
        // Meteor/Star trails
        const meteors = [];
        for (let i = 0; i < 4; i++) {
            resetMeteor(i);
        }
        
        function resetMeteor(index) {
            meteors[index] = {
                x: Math.random() * width * 1.5,
                y: -50,
                vx: -Math.random() * 3 - 2,
                vy: Math.random() * 3 + 2,
                length: Math.random() * 80 + 40,
                speed: Math.random() * 2 + 2,
                opacity: Math.random() * 0.4 + 0.1
            };
        }

        // Main Graphics Loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw background space grids
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.005)';
            ctx.lineWidth = 1;
            const gridSpacing = 40;
            
            for (let x = 0; x < width; x += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Draw Meteor Trails
            meteors.forEach((m, idx) => {
                m.x += m.vx * m.speed;
                m.y += m.vy * m.speed;
                
                ctx.strokeStyle = `rgba(255, 255, 255, ${m.opacity * 0.3})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x + m.length * 0.7, m.y - m.length * 0.7);
                ctx.stroke();
                
                if (m.x < -100 || m.y > height + 100) {
                    resetMeteor(idx);
                }
            });

            // Draw Connected Particles
            particles.forEach((p, i) => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce at boundaries
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse Repulsion
                if (mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const force = (120 - dist) / 120;
                        p.x += (dx / dist) * force * 1.5;
                        p.y += (dy / dist) * force * 1.5;
                    }
                }

                // Draw node circle
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.45;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;

                // Neural line links
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 130) {
                        const alpha = (130 - dist) / 130;
                        ctx.strokeStyle = p.color.startsWith('rgba') ? `rgba(16, 185, 129, ${alpha * 0.03})` : `rgba(255, 255, 255, ${alpha * 0.02})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        }
        animate();
    }

    /* --------------------------------------------------------------------------
       04. LIGHTING OVERLAYS & SPOTLIGHT SPOTTERS
       -------------------------------------------------------------------------- */
    const spotlight = document.getElementById('mouse-spotlight');
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Spring physics update for spotlight mask overlay
    function updateSpotlight() {
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        currentX += dx * 0.09; // Easing parameter
        currentY += dy * 0.09;

        if (spotlight) {
            spotlight.style.setProperty('--mouse-x', `${currentX}px`);
            spotlight.style.setProperty('--mouse-y', `${currentY}px`);
        }
        requestAnimationFrame(updateSpotlight);
    }
    updateSpotlight();

    /* --------------------------------------------------------------------------
       05. DYNAMIC MAGNETIC BUTTONS & AUDIO CORE
       -------------------------------------------------------------------------- */
    const audioClick = document.getElementById('audio-click');
    const magnetics = document.querySelectorAll('.magnetic-hover');

    magnetics.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const bounds = el.getBoundingClientRect();
            const x = e.clientX - bounds.left - bounds.width / 2;
            const y = e.clientY - bounds.top - bounds.height / 2;
            
            // Repel or pull slightly (magnetic pull effect)
            el.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0) scale(1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });

        el.addEventListener('click', () => {
            if (audioClick) {
                // Audio synthesis mock for retro click feel using simple Web Audio API if browser blocked
                audioClick.currentTime = 0;
                audioClick.play().catch(() => {});
            }
        });
    });

    /* --------------------------------------------------------------------------
       06. HERO PROCESSOR ROLE TYPEWRITER MODULE
       -------------------------------------------------------------------------- */
    const roleText = document.getElementById('role-text');
    const roles = [
        "AI ENGINEER",
        "CLOUD DEVELOPER",
        "DEVOPS INTEGRATOR",
        "AUTOMATION ARCHITECT",
        "PYTHON PROGRAMMER"
    ];
    let currentRoleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function processTypewriter() {
        const currentRole = roles[currentRoleIdx];
        
        if (isDeleting) {
            roleText.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            roleText.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2200; // Pause at full word
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            currentRoleIdx = (currentRoleIdx + 1) % roles.length;
            typingSpeed = 300; // Delay before typing next
        }

        setTimeout(processTypewriter, typingSpeed);
    }
    if (roleText) processTypewriter();

    /* --------------------------------------------------------------------------
       07. DYNAMIC HUD BAR CHARTS
       -------------------------------------------------------------------------- */
    const hudBarsGrid = document.getElementById('neural-capacity-bars');
    if (hudBarsGrid) {
        // Build 18 bars
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('span');
            bar.className = 'hud-bar';
            hudBarsGrid.appendChild(bar);
        }

        function flickerHUDBars() {
            const bars = hudBarsGrid.querySelectorAll('.hud-bar');
            const targetFillCount = Math.floor(Math.random() * 8) + 10; // fill 10-18 bars
            
            bars.forEach((b, idx) => {
                if (idx < targetFillCount) {
                    b.className = 'hud-bar filled';
                    b.style.height = `${Math.floor(Math.random() * 40) + 60}%`;
                } else {
                    b.className = 'hud-bar';
                    b.style.height = '10%';
                }
            });
        }
        setInterval(flickerHUDBars, 700);
        flickerHUDBars();
    }

    // Diagnostics mini log logs rotator
    const miniLog = document.getElementById('hero-mini-log');
    const logs = [
        "Ingesting transaction analytics logs...",
        "CI/CD payload ready for Mroads deployment.",
        "Refactoring microservices hooks in Spring...",
        "Optimizing thread count pools inside ECS clusters.",
        "Executing container vulnerability tests...",
        "Latency values stabilized [IST region: 25ms]."
    ];
    let logIdx = 0;
    
    if (miniLog) {
        setInterval(() => {
            const line = document.createElement('span');
            line.className = 'log-line text-glow-green';
            line.textContent = `> ${logs[logIdx]}`;
            
            miniLog.appendChild(line);
            if (miniLog.children.length > 3) {
                miniLog.removeChild(miniLog.children[0]);
            }
            logIdx = (logIdx + 1) % logs.length;
            
            // Randomly flash latency value in panel stats
            const latVal = document.getElementById('hud-latency-value');
            if (latVal) {
                const randLat = Math.floor(Math.random() * 18) + 12; // 12-30ms
                latVal.textContent = `${randLat}ms`;
            }
        }, 3000);
    }

    /* --------------------------------------------------------------------------
       08. INTERACTIVE SHELL SIMULATOR CORE
       -------------------------------------------------------------------------- */
    const termInput = document.getElementById('terminal-user-input');
    const termHistory = document.getElementById('terminal-history');
    const termQuickBtns = document.querySelectorAll('.quick-btn');
    
    const COMMAND_ARCHIVES = {
        help: `
Available execution nodes:
  <span class="text-glow-green">bio.md</span>         : Display biological summary and values
  <span class="text-glow-green">skills.sys</span>     : Print specialized tech arrays
  <span class="text-glow-green">projects.db</span>    : View full deployment shards list
  <span class="text-glow-green">connect.net</span>    : Display secure syndicate comm channels
  <span class="text-glow-green">clear</span>          : Clear log terminal viewport
  <span class="text-glow-green">exit</span>           : Terminate SSH session
`,
        'bio.md': `
[IDENTIFIER]: Sai Sankeerth Anchuru
[SPECIALIZATION]: AI, Machine Learning, Cloud Systems Optimization
[LOC]: Hyderabad, India

Fresh Computer Science graduate specializing in AI/ML from Sreyas Institute. I focus on developing clean, self-healing Python scripts, integrating state-of-the-art Generative AI nodes, securing AWS infrastructure, and mapping bulletproof container pipelines.
`,
        'skills.sys': `
AI & DEEP INT: Python Orchestration, GPT/Gemini LLM Prompting, Agentic Systems.
BACKEND CORE : REST Web APIs, Java Spring Boot Microservices, C# .NET Core.
CLOUD & OPS  : AWS (EC2/S3/IAM), Docker Containers, Bash Shell Automation.
SECONDARY SYS: React.js, Git Pipeline Hooks, OOP Architecture, DSA.
`,
        'projects.db': `
ACTIVE SHARDS LISTING:
  [1] <strong class="text-glow-green">DukaanLedger</strong>: Multi-tenant POS microservice system.
  [2] <strong class="text-glow-cyan">AI Text Rewriter</strong>: Enterprise GPT-integrated translation node.
  [3] <strong class="text-glow-green">AI Blockchain Optimizer</strong>: Predictive anomaly engine on distributed ledgers.

Type <span class="text-glow-cyan">'decompile [project_name]'</span> (e.g., 'decompile dukaanledger') to read the specific technical schema.
`,
        'connect.net': `
DOWNLINK CHANNELS:
  [MAIL] : <a href="mailto:anchurusaisankeerth@gmail.com" class="text-glow-green">anchurusaisankeerth@gmail.com</a>
  [LINK] : <a href="https://linkedin.com/in/saisankeerthanchuru" target="_blank" class="text-glow-green">linkedin.com/in/saisankeerthanchuru</a>
  [GITH] : <a href="https://github.com/Sankeerth2005" target="_blank" class="text-glow-green">github.com/Sankeerth2005</a>
`,
        clear: ''
    };

    function parseTerminalCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        
        // Log user command execution
        const userLine = document.createElement('p');
        userLine.className = 'terminal-output';
        userLine.innerHTML = `<span class="terminal-prompt">sankeerth@net:~#</span> ${rawCmd}`;
        termHistory.appendChild(userLine);

        if (cmd === 'clear') {
            termHistory.innerHTML = '';
            return;
        }

        if (cmd === 'exit') {
            const outLine = document.createElement('p');
            outLine.className = 'terminal-output text-glow-cyan';
            outLine.textContent = "Downlink decoupled. Initializing auto-reboot in 3s...";
            termHistory.appendChild(outLine);
            setTimeout(() => {
                termHistory.innerHTML = `<p class="terminal-output text-dim">SANKEERTH CORE OPERATING SYSTEM [Reconnected]</p>
                <p class="terminal-output">Ready to decompile professional archives. Type <span class="text-glow-cyan">'help'</span>.</p>`;
            }, 3000);
            return;
        }

        // Check for project decompilation arguments
        if (cmd.startsWith('decompile ')) {
            const projKey = cmd.replace('decompile ', '').trim();
            if (PROJECT_ARCHIVES[projKey]) {
                const specData = PROJECT_ARCHIVES[projKey];
                const outLine = document.createElement('p');
                outLine.className = 'terminal-output narrative-output';
                outLine.innerHTML = `
<strong>${specData.title}</strong>
<br>
<em>${specData.summary}</em>
<br><br>
Tech Matrix: ${specData.tech.join(', ')}
<br><br>
Architecture Model:
<pre class="font-mono text-glow-green" style="font-size:0.75rem; overflow-x:auto;">${specData.architecture}</pre>
`;
                termHistory.appendChild(outLine);
            } else {
                const errLine = document.createElement('p');
                errLine.className = 'terminal-output text-glow-cyan';
                errLine.textContent = `Target database [${projKey}] not indexed. Try 'decompile dukaanledger'`;
                termHistory.appendChild(errLine);
            }
            scrollToBottom();
            return;
        }

        // Map general key aliases
        let responseKey = cmd;
        if (cmd === 'skills') responseKey = 'skills.sys';
        if (cmd === 'bio') responseKey = 'bio.md';
        if (cmd === 'projects') responseKey = 'projects.db';
        if (cmd === 'contact') responseKey = 'connect.net';

        if (COMMAND_ARCHIVES[responseKey]) {
            const responseLine = document.createElement('p');
            responseLine.className = 'terminal-output';
            responseLine.innerHTML = COMMAND_ARCHIVES[responseKey];
            termHistory.appendChild(responseLine);
        } else {
            const errLine = document.createElement('p');
            errLine.className = 'terminal-output text-glow-cyan';
            errLine.textContent = `Command core [${cmd}] unrecognized. Type 'help' for instruction protocols.`;
            termHistory.appendChild(errLine);
        }

        scrollToBottom();
    }

    function scrollToBottom() {
        const scrollArea = termHistory.parentElement;
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = termInput.value;
                if (val.trim() !== '') {
                    parseTerminalCommand(val);
                    termInput.value = '';
                }
            }
        });
    }

    termQuickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) {
                parseTerminalCommand(cmd);
            }
        });
    });

    /* --------------------------------------------------------------------------
       09. DYNAMIC SHARDS FILTER SYSTEM (PROJECTS)
       -------------------------------------------------------------------------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                
                // Add fade scale transition
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       10. MOCK GITHUB COMMITS RENDERER
       -------------------------------------------------------------------------- */
    const gitGraph = document.getElementById('contribution-graph-grid');
    if (gitGraph) {
        // Map 28 columns * 5 rows = 140 pixels represent yearly commits
        const pixelCount = 140;
        
        for (let i = 0; i < pixelCount; i++) {
            const pixel = document.createElement('span');
            
            // Form random contribution grids (high commits mid-week, etc.)
            let level = 0;
            const randVal = Math.random();
            
            if (randVal > 0.85) level = 4;
            else if (randVal > 0.65) level = 3;
            else if (randVal > 0.45) level = 2;
            else if (randVal > 0.2) level = 1;
            
            pixel.className = `git-pixel level-${level}`;
            gitGraph.appendChild(pixel);
        }

        // Dynamic git commit flicker simulation
        setInterval(() => {
            const pixels = gitGraph.querySelectorAll('.git-pixel');
            const targetPixel = pixels[Math.floor(Math.random() * pixels.length)];
            
            // Boost contribution shade temporarily
            const curClass = targetPixel.className;
            targetPixel.className = 'git-pixel level-4';
            
            // Randomly increment simulated commits total count
            const commitCounter = document.getElementById('git-commits-count');
            if (commitCounter) {
                const currentCount = parseInt(commitCounter.textContent.replace(',', ''));
                commitCounter.textContent = (currentCount + 1).toLocaleString();
            }

            setTimeout(() => {
                targetPixel.className = curClass;
            }, 1000);
        }, 4000);
    }

    /* --------------------------------------------------------------------------
       11. DYNAMIC SYSTEM METRICS IN FOOTER
       -------------------------------------------------------------------------- */
    const visitorCounter = document.getElementById('footer-visitor-counter');
    const pingCounter = document.getElementById('footer-ping-counter');

    if (visitorCounter) {
        setInterval(() => {
            const currentVis = parseInt(visitorCounter.textContent.replace(',', ''));
            // Increment visitor metric incrementally
            visitorCounter.textContent = (currentVis + Math.floor(Math.random() * 3) + 1).toLocaleString();
        }, 5000);
    }

    if (pingCounter) {
        setInterval(() => {
            // Flicker ping value in milliseconds
            const randPing = Math.floor(Math.random() * 12) + 14; // 14-26ms
            pingCounter.textContent = `${randPing}ms`;
        }, 6000);
    }

    /* --------------------------------------------------------------------------
       12. PERSISTENT MODALS CONTROLLER & SPEC DECOMPILER
       -------------------------------------------------------------------------- */
    const resumeModal = document.getElementById('resume-modal');
    const projectModal = document.getElementById('project-modal');
    const resumeTriggers = [document.getElementById('resume-trigger')];
    const resumeClose = document.getElementById('modal-close-trigger');
    const closeDots = document.querySelectorAll('.modal-close-dot');

    // Trigger CV modal
    resumeTriggers.forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', () => {
                resumeModal.classList.add('modal-active');
            });
        }
    });

    if (resumeClose) {
        resumeClose.addEventListener('click', () => {
            resumeModal.classList.remove('modal-active');
        });
    }

    // Project decompilation triggers
    const decompileBtns = document.querySelectorAll('.decompile-btn');
    const projClose = document.getElementById('project-modal-close-trigger');
    const projTitle = document.getElementById('modal-project-title');
    const projContent = document.getElementById('modal-project-content');

    decompileBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projKey = btn.getAttribute('data-project');
            const data = PROJECT_ARCHIVES[projKey];
            
            if (data && projectModal && projTitle && projContent) {
                projTitle.textContent = `${projKey.toUpperCase()}_SPEC.db [DECOMPILED]`;
                
                // Form spec details
                let specsHTML = '';
                data.specs.forEach(s => {
                    specsHTML += `<li>${s}</li>`;
                });

                let techHTML = '';
                data.tech.forEach(t => {
                    techHTML += `<span>${t}</span>`;
                });

                projContent.innerHTML = `
                    <div class="project-modal-body-container font-mono">
                        <h3 class="text-glow-cyan" style="font-size: 1.4rem; margin-bottom: 5px;">${data.title}</h3>
                        <p class="text-dim" style="font-size: 0.8rem; margin-bottom: 20px;">CATEGORY: ${data.category}</p>
                        
                        <p style="font-size: 0.9rem; margin-bottom: 20px; line-height: 1.5;">${data.summary}</p>
                        
                        <div class="project-tech-badges" style="margin-bottom: 25px;">
                            ${techHTML}
                        </div>
                        
                        <h4 class="text-glow-green" style="font-size: 1rem; margin-bottom: 12px;"><i class="fa-solid fa-list-check"></i> DECOMPILED SPECIFICATIONS</h4>
                        <ul class="timeline-bullets" style="margin-bottom: 30px; font-size: 0.85rem;">
                            ${specsHTML}
                        </ul>
                        
                        <div class="proj-modal-block">
                            <h4 class="text-glow-cyan" style="font-size: 0.9rem; margin-bottom: 10px;"><i class="fa-solid fa-network-wired"></i> HARDWARE/SOFTWARE INTEGRATION TOPOLOGY</h4>
                            <pre class="text-glow-green" style="font-size: 0.75rem; overflow-x: auto; white-space: pre; line-height: 1.3;">${data.architecture}</pre>
                        </div>
                    </div>
                `;
                
                projectModal.classList.add('modal-active');
            }
        });
    });

    if (projClose) {
        projClose.addEventListener('click', () => {
            projectModal.classList.remove('modal-active');
        });
    }

    // Close on overlay click
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(o => {
        o.addEventListener('click', () => {
            if (resumeModal) resumeModal.classList.remove('modal-active');
            if (projectModal) projectModal.classList.remove('modal-active');
        });
    });

    closeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            if (resumeModal) resumeModal.classList.remove('modal-active');
            if (projectModal) projectModal.classList.remove('modal-active');
        });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (resumeModal) resumeModal.classList.remove('modal-active');
            if (projectModal) projectModal.classList.remove('modal-active');
        }
    });

    // Export CV print layout trigger
    const printBtn = document.getElementById('resume-print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Export PDF file trigger
    const downloadBtn = document.getElementById('resume-download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Generate raw data copy download
            const element = document.createElement('a');
            const resumeContent = document.querySelector('.resume-sheet').innerText;
            const file = new Blob([resumeContent], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = "Sai_Sankeerth_Anchuru_Resume.txt";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }

    /* --------------------------------------------------------------------------
       13. INTERACTIVE CONTACT FORM DISPATCH PROTOCOL
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('cyber-contact-form');
    const feedbackLog = document.getElementById('form-feedback-log');
    
    if (contactForm && feedbackLog) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('form-submit-btn');
            if (submitBtn) submitBtn.setAttribute('disabled', 'true');
            
            feedbackLog.innerHTML = `<span class="text-glow-cyan">&gt; Initiating mail payload serialization...</span>`;
            
            setTimeout(() => {
                feedbackLog.innerHTML += `<br><span class="text-glow-cyan">&gt; Connecting SMTP mail gateway tunnel...</span>`;
                
                setTimeout(() => {
                    feedbackLog.innerHTML += `<br><span class="text-glow-green">&gt; Dispatch successful. Operational query cached!</span>`;
                    contactForm.reset();
                    if (submitBtn) submitBtn.removeAttribute('disabled');
                }, 1000);
            }, 1000);
        });
    }

    /* --------------------------------------------------------------------------
       14. CAL.COM INTEGRATED DIALOGUE CALLS
       -------------------------------------------------------------------------- */
    const calBookingTrigger = document.getElementById('cal-booking-trigger');
    if (calBookingTrigger) {
        calBookingTrigger.addEventListener('click', () => {
            // Inject direct scheduling redirection
            window.open('https://cal.com', '_blank');
        });
    }

    /* --------------------------------------------------------------------------
       15. MOBILE NAVIGATION CONTROLLER
       -------------------------------------------------------------------------- */
    const mobToggle = document.querySelector('.mobile-nav-toggle');
    const mobOverlay = document.querySelector('.mobile-menu-overlay');
    const mobLinks = document.querySelectorAll('.mobile-nav-item');

    if (mobToggle && mobOverlay) {
        mobToggle.addEventListener('click', () => {
            mobOverlay.classList.toggle('menu-active');
            mobToggle.classList.toggle('toggle-active');
        });

        mobLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobOverlay.classList.remove('menu-active');
                mobToggle.classList.remove('toggle-active');
            });
        });
    }

    /* --------------------------------------------------------------------------
       16. VIEWPORT TRIGGERED VIEWPORT REVEALS
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Unobserve after showing
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Update active nav indicators on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSec = "";
        
        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.clientHeight;
            if (window.scrollY >= (secTop - 200)) {
                currentSec = sec.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSec) {
                item.classList.add('active');
            }
        });

        // Toggle scrolled styles on navbar
        const header = document.querySelector('.hud-navbar');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('nav-scrolled');
            } else {
                header.classList.remove('nav-scrolled');
            }
        }
    });

});
