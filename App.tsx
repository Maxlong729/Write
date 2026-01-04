
import React, { useState, useMemo } from 'react';
import { PHASES, CHAPTERS, WORKLOAD_DATA, QUALITY_LIST, RISKS } from './constants';
import { Phase, Chapter } from './types';

const App: React.FC = () => {
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  // 初始加载默认选中第一个章节
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(CHAPTERS[0]?.id || null);

  const totalDays = 73;
  // Current date is 2026-01-03, start is also 2026-01-03, so 0 days elapsed
  const elapsedDays = 0; 
  const remainingDays = totalDays - elapsedDays;
  const progressPercent = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

  const activePhase = useMemo(() => PHASES.find(p => p.id === activePhaseId), [activePhaseId]);
  const phaseChapters = useMemo(() => CHAPTERS.filter(c => c.phase === activePhaseId), [activePhaseId]);
  const selectedChapter = useMemo(() => CHAPTERS.find(c => c.id === selectedChapterId), [selectedChapterId]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-200 text-white">
              ✍️
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                畅销书《效率倍增的 AI Agent 工作流》写作计划
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                目标交付：2026年3月16日 | <span className="font-semibold text-blue-600">剩余 {remainingDays} 天</span>
              </p>
            </div>
          </div>
          <div className="flex-1 max-w-md w-full">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              <span>写作进度: {progressPercent.toFixed(1)}%</span>
              <span>1月3日 - 3月16日</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-blue-500 shadow-sm transition-all duration-1000" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Phases & Quality */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">写作阶段 (Phases)</h2>
            </div>
            <div className="p-2">
              {PHASES.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => {
                    setActivePhaseId(phase.id);
                    // 点击阶段时，自动选中该阶段的第一个章节
                    const firstChapterOfPhase = CHAPTERS.find(c => c.phase === phase.id);
                    if (firstChapterOfPhase) {
                      setSelectedChapterId(firstChapterOfPhase.id);
                    } else {
                      setSelectedChapterId(null);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-xl mb-1 transition-all group relative ${
                    activePhaseId === phase.id 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${activePhaseId === phase.id ? 'bg-white' : 'bg-slate-300'}`} />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{phase.name}</span>
                      <span className={`text-[10px] ${activePhaseId === phase.id ? 'text-blue-100' : 'text-slate-400'}`}>
                        {phase.range} ({phase.days}天)
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">质量控制清单</h3>
            <ul className="space-y-3">
              {QUALITY_LIST.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-600 items-start">
                  <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </div>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-amber-50 rounded-2xl shadow-sm border border-amber-100 p-5 space-y-4">
            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest border-b border-amber-200 pb-2">风险预案</h3>
            <div className="space-y-4">
              {RISKS.map((risk, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-xs font-bold text-amber-800">{risk.type}</p>
                  <p className="text-[11px] text-amber-700 leading-relaxed">{risk.action}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Center: Phase Chapters */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                  当前阶段任务
                </span>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                  {activePhase?.task}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 shrink-0">
                <div className="px-3 py-2 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">目标字数/天</p>
                  <p className="text-sm font-bold text-slate-800">{WORKLOAD_DATA[activePhaseId-1]?.words}</p>
                </div>
                <div className="px-3 py-2 bg-slate-50 rounded-lg text-center border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">工作时长/天</p>
                  <p className="text-sm font-bold text-slate-800">{WORKLOAD_DATA[activePhaseId-1]?.hours}h</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phaseChapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`group p-5 rounded-2xl text-left transition-all border-2 flex flex-col justify-between h-full ${
                    selectedChapterId === ch.id
                      ? 'bg-blue-50 border-blue-500 ring-4 ring-blue-50'
                      : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedChapterId === ch.id ? 'text-blue-600' : 'text-slate-400'}`}>
                        {ch.dateRange}
                      </span>
                      <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                        {ch.days}天
                      </span>
                    </div>
                    <h3 className={`font-bold leading-tight mb-2 ${selectedChapterId === ch.id ? 'text-blue-900' : 'text-slate-800'}`}>
                      {ch.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {ch.coreContent[0]}...
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-400">
                      目标: {ch.targetWords} 字
                    </span>
                    <span className={`text-xs font-bold ${selectedChapterId === ch.id ? 'text-blue-600' : 'text-slate-300 group-hover:text-blue-400'}`}>
                      查看详情 →
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {activePhaseId === 5 && phaseChapters.length === 0 && (
               <div className="mt-8 p-12 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                  <div className="text-4xl mb-4 text-emerald-500">🎉</div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">冲刺交付阶段</h3>
                  <p className="text-emerald-700 max-w-md mx-auto leading-relaxed">
                    本阶段重点为全书校对、出版社对接及排版，无固定章节写作任务。保持专注，迎接最终发布！
                  </p>
               </div>
            )}
          </div>

          {/* Chapter Details Section */}
          {selectedChapter ? (
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="bg-blue-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedChapter.title}</h2>
                    <p className="text-blue-100 text-sm">{selectedChapter.dateRange} | 共{selectedChapter.days}天 | 目标 {selectedChapter.targetWords} 字</p>
                  </div>
                  <button 
                    onClick={() => setSelectedChapterId(null)}
                    className="p-2 bg-blue-500 rounded-lg hover:bg-blue-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                    <span className="w-1 h-4 bg-blue-500 rounded-full" />
                    核心内容
                  </h4>
                  <ul className="space-y-2">
                    {selectedChapter.coreContent.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-blue-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                    <span className="w-1 h-4 bg-indigo-500 rounded-full" />
                    写作节奏
                  </h4>
                  <div className="space-y-3">
                    {selectedChapter.rhythm.map((step, i) => (
                      <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-700 leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                    <span className="w-1 h-4 bg-emerald-500 rounded-full" />
                    交付物
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedChapter.deliverables.map((d, i) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 text-xs font-bold">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : activePhaseId !== 5 ? (
            <div className="bg-slate-100/50 rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
              <div className="text-4xl mb-3 opacity-20">🖱️</div>
              <p className="text-slate-400 font-medium">请选择上方章节以查看详细写作计划</p>
            </div>
          ) : null}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 p-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs">
          <p>© 2026 书籍写作计划系统 - 《效率倍增的 AI Agent 工作流》项目组</p>
          <div className="flex gap-6 font-medium">
            <span>总周期: 73天</span>
            <span>总字数预期: 7.5w - 9w</span>
            <span>截止日期: 2026/03/16</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
