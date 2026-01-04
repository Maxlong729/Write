
import React, { useState, useMemo, useEffect } from 'react';
import { PHASES, CHAPTERS, WORKLOAD_DATA, QUALITY_LIST, RISKS } from './constants';
import { Phase, Chapter } from './types';

const App: React.FC = () => {
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(CHAPTERS[0]?.id || null);
  
  // 使用 Set 存储已完成的章节 ID，并从 localStorage 初始化
  const [completedChapterIds, setCompletedChapterIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completed_chapters');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // 持久化保存
  useEffect(() => {
    localStorage.setItem('completed_chapters', JSON.stringify(Array.from(completedChapterIds)));
  }, [completedChapterIds]);

  const totalDays = 73;
  // 写作进度计算：已完成章节数 / 总章节数
  const totalChaptersCount = CHAPTERS.length;
  const completedCount = completedChapterIds.size;
  const progressPercent = totalChaptersCount > 0 ? (completedCount / totalChaptersCount) * 100 : 0;

  const remainingDays = 73; // 暂时固定

  const activePhase = useMemo(() => PHASES.find(p => p.id === activePhaseId), [activePhaseId]);
  const phaseChapters = useMemo(() => CHAPTERS.filter(c => c.phase === activePhaseId), [activePhaseId]);
  const selectedChapter = useMemo(() => CHAPTERS.find(c => c.id === selectedChapterId), [selectedChapterId]);

  const toggleCompletion = (id: string) => {
    const newSet = new Set(completedChapterIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCompletedChapterIds(newSet);
  };

  const isCompleted = (id: string) => completedChapterIds.has(id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased transition-colors duration-500">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-200 text-white transform transition-transform hover:scale-105">
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
              <span>完成章节: {completedCount}/{totalChaptersCount} ({progressPercent.toFixed(0)}%)</span>
              <span>写作总进度</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex relative">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 shadow-sm transition-all duration-700 ease-out" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">写作阶段</h2>
            </div>
            <div className="p-2">
              {PHASES.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => {
                    setActivePhaseId(phase.id);
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
                  <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] flex-shrink-0">✓</div>
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
              {phaseChapters.map((ch) => {
                const completed = isCompleted(ch.id);
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`group p-5 rounded-2xl text-left transition-all border-2 flex flex-col justify-between h-full relative overflow-hidden ${
                      selectedChapterId === ch.id
                        ? 'bg-blue-50 border-blue-500 ring-4 ring-blue-50'
                        : completed 
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
                    }`}
                  >
                    {completed && (
                      <div className="absolute top-0 right-0 p-2 text-emerald-500 animate-in fade-in zoom-in">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedChapterId === ch.id ? 'text-blue-600' : 'text-slate-400'}`}>
                          {ch.dateRange}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          {completed ? '已完成' : `${ch.days}天`}
                        </span>
                      </div>
                      <h3 className={`font-bold leading-tight mb-2 ${selectedChapterId === ch.id ? 'text-blue-900' : completed ? 'text-emerald-900' : 'text-slate-800'}`}>
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
                );
              })}
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
              <div className={`p-6 text-white transition-colors duration-500 ${isCompleted(selectedChapter.id) ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold mb-1">{selectedChapter.title}</h2>
                      {isCompleted(selectedChapter.id) && (
                        <span className="bg-emerald-400/30 text-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-400/50 uppercase">已完成</span>
                      )}
                    </div>
                    <p className="text-blue-100 text-sm">{selectedChapter.dateRange} | 共{selectedChapter.days}天 | 目标 {selectedChapter.targetWords} 字</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleCompletion(selectedChapter.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all transform active:scale-95 ${
                        isCompleted(selectedChapter.id)
                          ? 'bg-white text-emerald-600 hover:bg-emerald-50'
                          : 'bg-emerald-500 text-white hover:bg-emerald-400'
                      }`}
                    >
                      {isCompleted(selectedChapter.id) ? (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                          任务已完成
                        </>
                      ) : (
                        '标记为已完成'
                      )}
                    </button>
                  </div>
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
