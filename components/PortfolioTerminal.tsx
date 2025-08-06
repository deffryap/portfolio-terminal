"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Coffee, MapPin, Calendar, User, X, Mail, Sun, Moon, Menu } from 'lucide-react';
import ProfileCard from './ProfileCard';

interface PortfolioTerminalProps {
  onExit: () => void;
}

interface Command {
  input: string;
  output: React.ReactNode;
  timestamp: string;
}

const PortfolioTerminal: React.FC<PortfolioTerminalProps> = ({ onExit }) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mode, setMode] = useState<'dark' | 'light'>('dark');
  const [accent, setAccent] = useState<'green' | 'orange' | 'white'>('green');
  const [placeholder, setPlaceholder] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Tambahkan state ini
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const placeholderTexts = ["Type a command...", "Try typing 'help'", "Use 'light' or 'dark' to switch modes"];
  
  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const type = () => {
      const currentText = placeholderTexts[textIndex];
      if (isDeleting) {
        setPlaceholder(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setPlaceholder(currentText.substring(0, charIndex + 1));
        charIndex++;
      }
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        timeoutId = setTimeout(type, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % placeholderTexts.length;
        timeoutId = setTimeout(type, 500);
      } else {
        timeoutId = setTimeout(type, isDeleting ? 50 : 150);
      }
    };
    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const themes = {
    dark: {
      green: {
        '--terminal-bg': '#010400', '--sidebar-bg': '#0D110C', '--main-color': '#39D353',
        '--accent-light': '#91F4A8', '--accent-dark': '#235223', '--muted-color': '#6A8A6D',
        '--shadow-dark': '#080a07', '--shadow-light': '#121811', '--text-color-primary': '#FFFFFF',
        '--output-color': '#39D353', '--text-shadow-color': 'rgba(57, 211, 83, 0.4)',
        '--glow-color': '#39D353', '--glow-color-transparent': 'hsla(135, 73%, 57%, 0.7)',
      },
      orange: {
        '--terminal-bg': '#0a0400', '--sidebar-bg': '#140c05', '--main-color': '#FFA500',
        '--accent-light': '#FFD700', '--accent-dark': '#8B4513', '--muted-color': '#D2691E',
        '--shadow-dark': '#0f0701', '--shadow-light': '#1a1106', '--text-color-primary': '#FFFFFF',
        '--output-color': '#FFA500', '--text-shadow-color': 'rgba(255, 165, 0, 0.4)',
         '--glow-color': '#FFA500', '--glow-color-transparent': 'hsla(39, 100%, 50%, 0.7)',
      },
      white: {
        '--terminal-bg': '#010400', '--sidebar-bg': '#0D110C', '--main-color': '#E6EDF3',
        '--accent-light': '#FFFFFF', '--accent-dark': '#8B949E', '--muted-color': '#8B949E',
        '--shadow-dark': '#080a07', '--shadow-light': '#121811', '--text-color-primary': '#FFFFFF',
        '--output-color': '#E6EDF3', '--text-shadow-color': 'rgba(230, 237, 243, 0.4)',
        '--glow-color': '#E6EDF3', '--glow-color-transparent': 'hsla(207, 14%, 92%, 0.7)',
      }
    },
    light: {
      green: {
        '--terminal-bg': '#f0fdf4', '--sidebar-bg': '#dcfce7', '--main-color': '#15803d',
        '--accent-light': '#16a34a', '--accent-dark': '#86efac', '--muted-color': '#22c55e',
        '--shadow-dark': '#bbf7d0', '--shadow-light': '#f0fdf4', '--text-color-primary': '#000000',
        '--output-color': '#14532d', '--text-shadow-color': 'rgba(22, 163, 74, 0.2)',
        '--glow-color': '#16a34a', '--glow-color-transparent': 'hsla(145, 63%, 42%, 0.7)',
      },
      orange: {
        '--terminal-bg': '#fff7ed', '--sidebar-bg': '#ffedd5', '--main-color': '#c2410c',
        '--accent-light': '#f97316', '--accent-dark': '#fed7aa', '--muted-color': '#fb923c',
        '--shadow-dark': '#fed7aa', '--shadow-light': '#fff7ed', '--text-color-primary': '#000000',
        '--output-color': '#c2410c', '--text-shadow-color': 'rgba(249, 115, 22, 0.2)',
        '--glow-color': '#f97316', '--glow-color-transparent': 'hsla(24, 94%, 53%, 0.7)',
      },
      white: {
        '--terminal-bg': '#EAEAEA', '--sidebar-bg': '#DCDCDC', '--main-color': '#333333',
        '--accent-light': '#555555', '--accent-dark': '#B0B0B0', '--muted-color': '#888888',
        '--shadow-dark': '#C0C0C0', '--shadow-light': '#F5F5F5', '--text-color-primary': '#000000',
        '--output-color': '#333333', '--text-shadow-color': 'rgba(51, 51, 51, 0.2)',
        '--glow-color': '#555555', '--glow-color-transparent': 'hsla(0, 0%, 33%, 0.7)',
      },
    },
  };

  const currentThemeStyle = themes[mode][accent];
  const dynamicBehindGradient = `radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), ${currentThemeStyle['--glow-color-transparent']} 4%, hsla(0, 0%, 0%, 0) 100%)`;

  const welcomeMessage = () => (
    <div className="space-y-2">
      <div className="font-mono text-[var(--main-color)]">
        <pre className="text-sm leading-tight whitespace-pre-wrap">
{`[----------------------------------------------------------]
|                                                          |
|               WELCOME TO DEFFRY'S PORTFOLIO              |
|                         TERMINAL                         |
|                                                          |
[----------------------------------------------------------]`}
        </pre>
      </div>
      <div className="mt-2 text-[var(--muted-color)]">Type 'help' to see available commands.</div>
    </div>
  );

  const helpCommands = () => (
    <div className="font-mono space-y-1 text-sm text-[var(--accent-light)]">
      <div>Available commands:</div>
      <div className="ml-4 space-y-1">
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">help</span> - <span className="text-[var(--muted-color)]">Show this help message</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">about</span> - <span className="text-[var(--muted-color)]">Learn about me</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">skills</span> - <span className="text-[var(--muted-color)]">View my technical skills</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">projects</span> - <span className="text-[var(--muted-color)]">See my featured projects</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">contact</span> - <span className="text-[var(--muted-color)]">Get my contact information</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">cv</span> - <span className="text-[var(--muted-color)]">Download my resume</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">clear</span> - <span className="text-[var(--muted-color)]">Clear the terminal</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">dark</span> - <span className="text-[var(--muted-color)]">Switch to dark mode</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">light</span> - <span className="text-[var(--muted-color)]">Switch to light mode</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">green</span> - <span className="text-[var(--muted-color)]">Set accent to green</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">orange</span> - <span className="text-[var(--muted-color)]">Set accent to orange</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">white</span> - <span className="text-[var(--muted-color)]">Set accent to white</span></div>
        <div><span className="text-[var(--main-color)]">*</span> <span className="text-[var(--accent-light)]">exit</span> - <span className="text-[var(--muted-color)]">Return to sleek portfolio</span></div>
      </div>
    </div>
  );
  
  const aboutInfo = () => (
    <div className="font-mono space-y-2 text-sm text-[var(--accent-light)]">
      <div>============ ABOUT DEFFRY ABHIRAMA PUTRA ============</div>
      <div>Role: Full-Stack Developer</div>
      <div>Experience: 3+ years in software development</div>
      <div>Location: Yogyakarta, Indonesia, Earth, Milky Way</div>
      <div>Education: Informatics, UIN Sunan Kalijaga</div>
    </div>
  );

  const skillsInfo = () => (
    <div className="font-mono space-y-2 text-sm text-[var(--accent-light)]">
      <div>============ TECHNICAL SKILLS ============</div>
      <div>Frontend: React, Next.js, Vue.js, TypeScript, Tailwind CSS</div>
      <div>Backend: Node.js, Express.js </div>
      <div>Database & Cloud: PostgreSQL, MongoDB</div>
    </div>
  );

  const projectsInfo = () => (
    <div className="font-mono space-y-2 text-sm text-[var(--accent-light)]">
      <div>============ FEATURED PROJECTS ============</div>
      <div>[1] <a href="https://fintrack-financial.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--main-color)] hover:underline cursor-pointer">FinTrack - https://fintrack-financial.netlify.app/</a></div>
      <div>[2] <a href="https://katalog-film-fe.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[var(--main-color)] hover:underline cursor-pointer">Katalog-Film - https://katalog-film-fe.netlify.app/</a></div>
      <div>[3] <a href="https://github.com/deffryap/NMJ-FE" target="_blank" rel="noopener noreferrer" className="text-[var(--main-color)] hover:underline cursor-pointer">NMJ - https://github.com/deffryap/NMJ-FE</a></div>
    </div>
  );

  const contactInfo = () => (
    <div className="font-mono space-y-2 text-sm text-[var(--accent-light)]">
      <div>============ CONTACT INFORMATION ============</div>
      <div>Email: <a href="mailto:deffryap@gmail.com" className="text-[var(--main-color)] hover:underline cursor-pointer">deffryap@gmail.com</a></div>
      <div>LinkedIn: <a href="https://www.linkedin.com/in/deffryap" target="_blank" rel="noopener noreferrer" className="text-[var(--main-color)] hover:underline cursor-pointer">www.linkedin.com/in/deffryap</a></div>
      <div>GitHub: <a href="https://github.com/deffryap" target="_blank" rel="noopener noreferrer" className="text-[var(--main-color)] hover:underline cursor-pointer">github.com/deffryap</a></div>
    </div>
  );

  const processCommand = (input: string): React.ReactNode => {
    const command = input.toLowerCase().trim();
    switch (command) {
      case 'help': return helpCommands();
      case 'about': return aboutInfo();
      case 'skills': return skillsInfo();
      case 'projects': return projectsInfo();
      case 'contact': return contactInfo();
      case 'cv': return <div>Downloading...</div>;
      case 'clear': return 'clear';
      case 'light': setMode('light'); return <div style={{color: themes.light[accent]['--output-color']}}>Mode changed to light</div>;
      case 'dark': setMode('dark'); return <div style={{color: themes.dark[accent]['--output-color']}}>Mode changed to dark</div>;
      case 'green': setAccent('green'); return <div style={{color: themes[mode].green['--output-color']}}>Accent changed to green</div>;
      case 'orange': setAccent('orange'); return <div style={{color: themes[mode].orange['--output-color']}}>Accent changed to orange</div>;
      case 'white': setAccent('white'); return <div style={{color: themes[mode].white['--output-color']}}>Accent changed to white</div>;
      case 'exit': onExit(); return <div>Exiting...</div>;
      default: return <div>Command not found: {input}</div>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const output = processCommand(currentInput);
    if (output !== 'clear') {
      setCommands(prev => [...prev, { input: currentInput, output, timestamp }]);
    } else {
      setCommands([]);
    }
    setCommandHistory(prev => [currentInput, ...prev]);
    setCurrentInput('');
    setHistoryIndex(-1);
  };

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  const handleTerminalClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }
    inputRef.current?.focus();
  };

  useEffect(() => {
    setCommands([{ input: '', output: welcomeMessage(), timestamp: '' }]);
  }, []);

  return (
    <div style={currentThemeStyle as React.CSSProperties} className="min-h-screen bg-[var(--terminal-bg)] font-mono terminal-container">
      <div className="grid lg:grid-cols-[320px_1fr] h-screen">
        {/* Sidebar Desktop */}
        <motion.div className="bg-[var(--sidebar-bg)] p-6 overflow-y-auto hidden lg:block" initial={{ x: -100 }} animate={{ x: 0 }}>
          <div className="space-y-8">
            <ProfileCard 
              name="Deffry Abhirama Putra" 
              title="Full-Stack Developer" 
              avatarUrl="profile.png" 
              onContactClick={() => processCommand('contact')} 
              behindGradient={dynamicBehindGradient} 
              accentColor={currentThemeStyle['--accent-light']} // accent untuk dot status
            />
            <div className="space-y-4 text-[var(--accent-light)] text-base">
              {/* System Status: Online with green glowing dot */}
              <div className="flex items-center space-x-3">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: currentThemeStyle['--accent-light'], opacity: 0.6 }}></span>
                  <span className="relative inline-flex rounded-full h-5 w-5" style={{ background: currentThemeStyle['--accent-light'] }}></span>
                </span>
                <span className="font-mono text-[var(--main-color)]">Online</span>
              </div>
              <div className="flex items-center space-x-3"><Calendar className="w-4 h-4" /><span>Experience: 3+ years</span></div>
              <div className="flex items-center space-x-3"><Coffee className="w-4 h-4" /><span>Coffee Consumed: ∞</span></div>
              <div className="flex items-center space-x-3"><MapPin className="w-4 h-4" /><span>Location: Yogyakarta, Indonesia</span></div>
            </div>
            <div className="space-y-4 text-[var(--accent-light)] text-base">
              <h4 className="text-base text-[var(--accent-light)]">Theme Options</h4>
              <div className="flex items-center justify-between">
                <label className="text-[var(--muted-color)]">Mode</label>
                <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} className="relative inline-flex h-7 w-14 items-center rounded-full" style={{ background: 'var(--accent-dark)'}}>
                  <motion.span className="absolute flex h-5 w-5 items-center justify-center rounded-full" style={{ background: 'var(--accent-light)'}} animate={{ x: mode === 'dark' ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                    {mode === 'dark' ? <Moon className="w-3 h-3" style={{ color: 'var(--sidebar-bg)' }} /> : <Sun className="w-3 h-3" style={{ color: 'var(--sidebar-bg)' }} />}
                  </motion.span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-[var(--muted-color)]">Accent</label>
                <div className="flex space-x-2">
                  <button onClick={() => setAccent('green')} className={`w-5 h-5 rounded-full bg-[#39D353] ${accent === 'green' ? 'ring-2 ring-offset-2 ring-offset-[var(--sidebar-bg)] ring-[#39D353]' : ''}`} />
                  <button onClick={() => setAccent('orange')} className={`w-5 h-5 rounded-full bg-[#FFA500] ${accent === 'orange' ? 'ring-2 ring-offset-2 ring-offset-[var(--sidebar-bg)] ring-[#FFA500]' : ''}`} />
                  <button onClick={() => setAccent('white')} className={`w-5 h-5 rounded-full bg-[#E6EDF3] border border-gray-500 ${accent === 'white' ? 'ring-2 ring-offset-2 ring-offset-[var(--sidebar-bg)] ring-[#E6EDF3]' : ''}`} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Mobile/Tablet Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 z-40 flex lg:hidden"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {sidebarOpen && (
                <div
                  className="fixed inset-0 left-72 z-30 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close sidebar overlay"
                />
              )}
              {/* Sidebar */}
              <div className="relative w-72 max-w-full bg-[var(--sidebar-bg)] p-6 overflow-y-auto z-50">
                {/* HAPUS tombol X/exit di sidebar */}
                <div className="space-y-8">
                  <ProfileCard 
                    name="Deffry Abhirama Putra" 
                    title="Full-Stack Developer" 
                    avatarUrl="profile.png" 
                    onContactClick={() => processCommand('contact')} 
                    behindGradient={dynamicBehindGradient} 
                    accentColor={currentThemeStyle['--accent-light']} // accent untuk dot status
                  />
                  <div className="space-y-4 text-[var(--accent-light)] text-base">
                    <div className="flex items-center space-x-3">
                      <span className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: currentThemeStyle['--accent-light'], opacity: 0.6 }}></span>
                        <span className="relative inline-flex rounded-full h-5 w-5" style={{ background: currentThemeStyle['--accent-light'] }}></span>
                      </span>
                      <span className="font-mono text-[var(--main-color)]">Online</span>
                    </div>
                    <div className="flex items-center space-x-3"><Calendar className="w-4 h-4" /><span>Experience: 3+ years</span></div>
                    <div className="flex items-center space-x-3"><Coffee className="w-4 h-4" /><span>Coffee Consumed: ∞</span></div>
                    <div className="flex items-center space-x-3"><MapPin className="w-4 h-4" /><span>Location: Yogyakarta, Indonesia</span></div>
                  </div>
                  <div className="space-y-4 text-[var(--accent-light)] text-base">
                    <h4 className="text-base text-[var(--accent-light)]">Theme Options</h4>
                    <div className="flex items-center justify-between">
                      <label className="text-[var(--muted-color)]">Mode</label>
                      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} className="relative inline-flex h-7 w-14 items-center rounded-full" style={{ background: 'var(--accent-dark)'}}>
                        <motion.span className="absolute flex h-5 w-5 items-center justify-center rounded-full" style={{ background: 'var(--accent-light)'}} animate={{ x: mode === 'dark' ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                          {mode === 'dark' ? <Moon className="w-3 h-3" style={{ color: 'var(--sidebar-bg)' }} /> : <Sun className="w-3 h-3" style={{ color: 'var(--sidebar-bg)' }} />}
                        </motion.span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-[var(--muted-color)]">Accent</label>
                      <div className="flex space-x-2">
                        <button onClick={() => setAccent('green')} className={`w-5 h-5 rounded-full bg-[#39D353] ${accent === 'green' ? 'ring-2 ring-offset-2 ring-offset-[var(--sidebar-bg)] ring-[#39D353]' : ''}`} />
                        <button onClick={() => setAccent('orange')} className={`w-5 h-5 rounded-full bg-[#FFA500] ${accent === 'orange' ? 'ring-2 ring-offset-2 ring-offset-[var(--sidebar-bg)] ring-[#FFA500]' : ''}`} />
                        <button onClick={() => setAccent('white')} className={`w-5 h-5 rounded-full bg-[#E6EDF3] border border-gray-500 ${accent === 'white' ? 'ring-2 ring-offset-2 ring-offset-[var(--sidebar-bg)] ring-[#E6EDF3]' : ''}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Terminal Area */}
        <motion.div className="flex flex-col h-screen border-l" style={{borderColor: 'var(--accent-dark)'}} initial={{ x: 100 }} animate={{ x: 0 }}>
          <div className="flex items-center justify-between w-full px-4 py-2 bg-[var(--terminal-bg)] border-b" style={{ borderColor: 'var(--main-color)' }}>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-base text-[var(--main-color)] ml-4">deffryap@portfolio:~$</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Hamburger menu icon, only on mobile/tablet */}
              <button
                className="lg:hidden text-base text-[var(--muted-color)] hover:text-[var(--accent-light)]"
                aria-label="Open menu"
                type="button"
                onClick={() => setSidebarOpen(true)}
                disabled={sidebarOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
              {/* Exit button: SELALU tampil */}
              <button onClick={onExit} className="text-base text-[var(--muted-color)] hover:text-[var(--accent-light)]">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto space-y-4 relative" onClick={handleTerminalClick}>
            <AnimatePresence>
              {commands.map((command, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  {command.input && (
                    <div className="flex items-center space-x-2 text-base">
                      <span className="font-bold text-[var(--main-color)]">deffryap@portfolio:~$</span>
                      <span className="text-[var(--accent-light)]">{command.input}</span>
                      <span className="text-sm text-[var(--muted-color)] ml-auto">{command.timestamp}</span>
                    </div>
                  )}
                  <div className="pl-1 text-base" style={{color: 'var(--output-color)'}}>{command.output}</div>
                </motion.div>
              ))}
            </AnimatePresence>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 text-base">
              <span className="font-bold text-[var(--main-color)]">deffryap@portfolio:~$</span>
              <input 
                ref={inputRef} 
                type="text" 
                value={currentInput} 
                onChange={(e) => setCurrentInput(e.target.value)} 
                onKeyDown={handleKeyDown} 
                className="flex-1 bg-transparent outline-none text-[var(--accent-light)] caret-[var(--main-color)]" 
                placeholder={placeholder} 
                autoComplete="off" 
              />
              <span className="animate-blink text-[var(--main-color)] text-xl">█</span>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioTerminal;