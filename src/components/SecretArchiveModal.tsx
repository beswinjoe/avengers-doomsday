import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECRET_ARCHIVE_ENTRIES } from '../data/secretArchive';
import { SecretArchiveEntry } from '../types';
import { sound } from '../utils/audio';

interface SecretArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretArchiveModal: React.FC<SecretArchiveModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [inputPasscode, setInputPasscode] = useState('');
  const [unlockedEntries, setUnlockedEntries] = useState<SecretArchiveEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<SecretArchiveEntry | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'SYSTEM INITIALIZED. S.W.O.R.D. ORBITAL RETICULE OS v9.4',
    'ALL SATELLITE COMMS SUBJECT TO LATVERIAN DEEP SURVEILLANCE.',
    'TYPE "help" FOR AVAILABLE COMMANDS OR ENTER A PASSCODE TO DECRYPT CIPHERS.',
    'TRY PASSCODES: "LATVERIA", "RICHARDS", "BATTLEWORLD", "616", "VICTOR"'
  ]);
  const [activeFrequency, setActiveFrequency] = useState('104.7 MHZ');
  const [isStaticPlaying, setIsStaticPlaying] = useState(false);

  // Auto-unlock the first entry for immediate discovery
  useEffect(() => {
    if (unlockedEntries.length === 0 && SECRET_ARCHIVE_ENTRIES.length > 0) {
      setUnlockedEntries([SECRET_ARCHIVE_ENTRIES[0]]);
      setActiveEntry(SECRET_ARCHIVE_ENTRIES[0]);
    }
  }, [unlockedEntries.length]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputPasscode.trim().toUpperCase();
    if (!query) return;

    sound.playClick(1300);

    if (query === 'HELP') {
      setTerminalLogs(prev => [
        ...prev,
        '> HELP',
        'COMMANDS:',
        '  ls                 - List known cipher files and clues',
        '  decrypt <PASSCODE> - Attempt decryption of classified cipher',
        '  radio <FREQ>       - Tune audio receptor (e.g., radio 104.7)',
        '  clear              - Wipe terminal screen buffer',
        '  status             - Report incursion integrity score'
      ]);
      setInputPasscode('');
      return;
    }

    if (query === 'CLEAR') {
      setTerminalLogs(['TERMINAL BUFFER PURGED.']);
      setInputPasscode('');
      return;
    }

    if (query === 'LS') {
      const list = SECRET_ARCHIVE_ENTRIES.map(e => `[${e.passcode}] ${e.title.slice(0, 45)}... (Clue: ${e.clue})`);
      setTerminalLogs(prev => [...prev, '> LS', ...list]);
      setInputPasscode('');
      return;
    }

    if (query === 'STATUS') {
      setTerminalLogs(prev => [
        ...prev,
        '> STATUS',
        'INCURSION INTEGRITY: 14.2% (CRITICAL FAILURE)',
        'UNIVERSES BOUND: EARTH-616, EARTH-828, EARTH-10005',
        'LATVERIAN SIPHON: 98.7% CHARGE'
      ]);
      setInputPasscode('');
      return;
    }

    // Passcode decryption check
    const cleanCode = query.startsWith('DECRYPT ') ? query.replace('DECRYPT ', '').trim() : query;
    const match = SECRET_ARCHIVE_ENTRIES.find(entry => entry.passcode.toUpperCase() === cleanCode);

    if (match) {
      sound.playAccessGranted();
      if (!unlockedEntries.some(e => e.id === match.id)) {
        setUnlockedEntries(prev => [...prev, match]);
      }
      setActiveEntry(match);
      setTerminalLogs(prev => [
        ...prev,
        `> DECRYPT ${cleanCode}`,
        `[SUCCESS] SECURITY HASH CRACKED. OPENING "${match.title}"`,
        `CLEARANCE: ${match.clearance}`
      ]);
    } else {
      sound.playClick(400);
      setTerminalLogs(prev => [
        ...prev,
        `> ${query}`,
        `[ACCESS DENIED] INVALID CIPHER HASH. RE-CHECK CLUES VIA "ls" COMMAND.`
      ]);
    }

    setInputPasscode('');
  };

  const handleTuneRadio = (freq: string) => {
    sound.playStaticBurst();
    setActiveFrequency(freq);
    setIsStaticPlaying(true);
    setTimeout(() => setIsStaticPlaying(false), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-void/95 backdrop-blur-lg"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 25 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-charcoal border border-hairline-doom shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col h-[90vh] overflow-hidden"
          >
            {/* Top Terminal Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-hairline bg-void">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 bg-doom-glow rounded-full animate-ping" />
                <span className="font-mono text-xs sm:text-sm text-silver-bright font-semibold tracking-wider">
                  S.W.O.R.D. DEEP CIPHER TERMINAL // [SEC-ARCHIVE-616]
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="font-mono text-[10px] text-silver-dim hidden sm:inline">
                  UNLOCKED: {unlockedEntries.length} / {SECRET_ARCHIVE_ENTRIES.length}
                </span>
                <button
                  onClick={onClose}
                  className="px-2.5 py-1 border border-hairline hover:border-white font-mono text-xs text-silver-dim hover:text-white transition-all"
                >
                  [EXIT ESC]
                </button>
              </div>
            </div>

            {/* Split Interior: Sidebar of Unlocked Files & Main Console / Reader */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Left Sidebar: Unlocked Ciphers & Radio Frequencies */}
              <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-hairline bg-void/60 p-4 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="font-mono text-[10px] text-silver-dim tracking-widest uppercase mb-3">
                    DISCOVERED ARCHIVES:
                  </div>

                  <div className="space-y-2 mb-6">
                    {SECRET_ARCHIVE_ENTRIES.map((entry) => {
                      const isUnlocked = unlockedEntries.some(e => e.id === entry.id);
                      const isSelected = activeEntry?.id === entry.id;

                      return (
                        <button
                          key={entry.id}
                          disabled={!isUnlocked}
                          onClick={() => {
                            if (isUnlocked) {
                              sound.playClick(1000);
                              setActiveEntry(entry);
                            }
                          }}
                          className={`w-full text-left p-2.5 font-mono text-xs border transition-all ${
                            isSelected
                              ? 'border-doom-glow bg-doom-dark/30 text-doom-bright'
                              : isUnlocked
                              ? 'border-hairline bg-charcoal/50 text-silver-muted hover:text-silver-bright hover:border-white/30'
                              : 'border-hairline/30 bg-void/30 text-silver-dim/40 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[9px] mb-1">
                            <span>{entry.passcode}</span>
                            <span>{isUnlocked ? '[UNLOCKED]' : '[ENCRYPTED]'}</span>
                          </div>
                          <div className="truncate text-xs font-semibold">
                            {isUnlocked ? entry.title : `LOCKED // ${entry.clue}`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-Space Radio Receiver */}
                <div className="pt-4 border-t border-hairline">
                  <div className="font-mono text-[10px] text-silver-dim tracking-widest uppercase mb-2 flex items-center justify-between">
                    <span>RADIO INTERCEPTOR</span>
                    <span className={isStaticPlaying ? 'text-crimson-glow animate-pulse' : 'text-doom-glow'}>
                      {activeFrequency}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
                    {['88.3 MHZ', '99.1 MHZ', '104.7 MHZ', '142.0 MHZ'].map((freq) => (
                      <button
                        key={freq}
                        onClick={() => handleTuneRadio(freq)}
                        className={`p-1.5 border transition-all ${
                          activeFrequency === freq
                            ? 'border-doom-glow bg-doom-dark/40 text-doom-bright'
                            : 'border-hairline bg-void text-silver-dim hover:text-silver-bright'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Active Document Display & Command Line */}
              <div className="flex-1 flex flex-col justify-between overflow-hidden bg-charcoal/30">
                
                {/* Active Document View */}
                <div className="flex-1 p-6 overflow-y-auto font-mono text-xs text-silver-bright leading-relaxed">
                  {activeEntry ? (
                    <div>
                      <div className="p-3 bg-void border border-hairline mb-4 font-mono text-[11px] text-silver-dim space-y-1">
                        <div>TITLE: <span className="text-white font-semibold">{activeEntry.title}</span></div>
                        <div>ORIGIN: <span className="text-doom-glow">{activeEntry.sender}</span></div>
                        <div>TARGET: <span className="text-silver-bright">{activeEntry.recipient}</span></div>
                        <div>TIMELOCK: <span className="text-silver-bright">{activeEntry.timestamp}</span></div>
                        <div>CLEARANCE: <span className="text-crimson-glow">{activeEntry.clearance}</span></div>
                      </div>

                      <div className="whitespace-pre-line font-space text-sm sm:text-base leading-relaxed bg-void/40 p-5 border border-hairline-doom">
                        {activeEntry.content}
                      </div>
                    </div>
                  ) : (
                    <div className="text-silver-dim text-center py-20">
                      NO DECRYPTED ARCHIVE SELECTED. ENTER A PASSCODE BELOW.
                    </div>
                  )}

                  {/* Terminal Log Console */}
                  <div className="mt-6 pt-4 border-t border-hairline text-[11px] font-mono text-silver-dim space-y-1">
                    {terminalLogs.slice(-6).map((log, idx) => (
                      <div key={idx} className={log.includes('[SUCCESS]') ? 'text-doom-bright' : log.includes('[ACCESS DENIED]') ? 'text-crimson-glow' : 'text-silver-dim'}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive CLI Input Bar */}
                <form onSubmit={handleCommandSubmit} className="p-4 bg-void border-t border-hairline flex items-center space-x-3">
                  <span className="font-mono text-xs text-doom-glow">S.W.O.R.D.:&gt;</span>
                  <input
                    type="text"
                    value={inputPasscode}
                    onChange={(e) => setInputPasscode(e.target.value)}
                    placeholder="Enter command or passcode (e.g., LATVERIA, RICHARDS, BATTLEWORLD, help)..."
                    className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-silver-bright placeholder:text-silver-dim outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 border border-hairline-doom hover:border-doom-glow bg-doom-dark/30 hover:bg-doom-dark font-mono text-xs text-silver-bright transition-all"
                  >
                    EXECUTE
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
