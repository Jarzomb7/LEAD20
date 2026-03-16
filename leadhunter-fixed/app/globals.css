@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; }

body {
  background-color: #0b0f1a;
  color: white;
}

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: #0b0f1a; }
::-webkit-scrollbar-thumb { background: #1f2a44; border-radius: 100px; }
::-webkit-scrollbar-thumb:hover { background: #2e6cff; }

::selection { background: rgba(46,108,255,0.3); color: white; }

.bg-grid {
  background-image: linear-gradient(rgba(46,108,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(46,108,255,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}

.card-hover { transition: border-color 0.2s, box-shadow 0.2s; }
.card-hover:hover {
  border-color: rgba(46,108,255,0.3) !important;
  box-shadow: 0 0 20px rgba(46,108,255,0.06);
}

.gradient-text {
  background: linear-gradient(135deg, #fff 0%, #5aa2ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glow-blue { box-shadow: 0 0 30px rgba(46,108,255,0.2); }

@layer components {
  .input-base {
    @apply w-full bg-bg-primary border border-border-default rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors;
  }
  .btn-primary {
    @apply bg-accent-blue hover:bg-blue-600 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  .btn-secondary {
    @apply bg-bg-tertiary hover:bg-gray-700 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-colors flex items-center gap-2 border border-border-default;
  }
}
