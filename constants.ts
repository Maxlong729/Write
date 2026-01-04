
import { Phase, Chapter, WorkloadItem } from './types';

export const PHASES: Phase[] = [
  { id: 1, name: '第一阶段', range: '1月3日-1月19日', days: 17, task: '完成前言、第一篇（第1-3章）、第二篇（第4章）', color: 'blue' },
  { id: 2, name: '第二阶段', range: '1月20日-2月2日', days: 14, task: '完成第二篇（第4-5章）、第三篇（前期准备）', color: 'indigo' },
  { id: 3, name: '第三阶段', range: '2月3日-2月23日', days: 21, task: '完成第三篇（第7-11章）、案例素材整理', color: 'purple' },
  { id: 4, name: '第四阶段', range: '2月24日-3月9日', days: 14, task: '完成第四篇（第12-13章）、全书统一调整', color: 'pink' },
  { id: 5, name: '第五阶段', range: '3月10日-3月16日', days: 7, task: '最终审稿、排版、交稿', color: 'emerald' },
];

export const CHAPTERS: Chapter[] = [
  {
    id: 'intro', phase: 1, title: '前言与导读', dateRange: '1月3日-1月5日', days: 3, targetWords: '3000-4000',
    coreContent: ['开篇钩子：为什么谈工作流', '教你建立系统而非单纯工具', '认知→做事方式→身份感的变化', '每章交付物与15分钟练习指南'],
    rhythm: ['Day 1: 完成初稿（3500字）', 'Day 2: 修改调整确保冲击力', 'Day 3: 最终定稿'],
    deliverables: ['书籍导读', '产品平台简介']
  },
  {
    id: 'ch1', phase: 1, title: '第1章 重新认识AI与工作流', dateRange: '1月6日-1月8日', days: 3, targetWords: '5000-6000',
    coreContent: ['能力底座→角色机制→任务路径', 'AI使用方式决定产出上限', 'Agent产品与开发平台区别', '主流开发平台选型'],
    rhythm: ['Day 1: 1.1-1.2初稿', 'Day 2: 1.3-1.4初稿', 'Day 3: 全章修改与案例补充'],
    deliverables: ['个人任务清单标注']
  },
  {
    id: 'ch2', phase: 1, title: '第2章 Agent与工具的本质区别', dateRange: '1月9日-1月11日', days: 3, targetWords: '5500-6500',
    coreContent: ['工具到角色的切换', '多Agent协作拆分', '人类与Agent责任边界', '走向流程化路径'],
    rhythm: ['Day 1: 2.1-2.2初稿', 'Day 2: 2.3-2.4初稿', 'Day 3: 补充会议案例'],
    deliverables: ['角色型Agent definition']
  },
  {
    id: 'ch3', phase: 1, title: '第3章 用流程图把工作结构化', dateRange: '1月12日-1月14日', days: 3, targetWords: '5000-6000',
    coreContent: ['流程图提升效率逻辑', '基础流程图绘制', '可用性判断准则', '流程设计者思维切换'],
    rhythm: ['Day 1: 3.1-3.2初稿', 'Day 2: 3.3-3.4初稿', 'Day 3: 补充示例图'],
    deliverables: ['v1流程图实物']
  },
  {
    id: 'ch4', phase: 1, title: '第4章 工作流五步法', dateRange: '1月15日-1月17日', days: 3, targetWords: '5500-6500',
    coreContent: ['目标与成果物明确', '拆解关键操作步骤', '输入输出标注', '执行方式明确', '沉淀复用资产'],
    rhythm: ['Day 1: 4.1-4.3初稿', 'Day 2: 4.4-4.5初稿', 'Day 3: 五步法模板'],
    deliverables: ['工作流五步法模板']
  },
  {
    id: 'ch5', phase: 2, title: '第5章 给Agent写"岗位说明书"', dateRange: '1月20日-1月23日', days: 4, targetWords: '7000-8000',
    coreContent: ['岗位定义四要素', '设计不同类型Agent', '拆分原则与关键词检测', '万能模板与实例'],
    rhythm: ['Day 1: 基于样章优化', 'Day 2: 优化5.3-5.4', 'Day 3: 咒语/员工/补丁实战', 'Day 4: 全章定稿'],
    deliverables: ['岗位说明书案例']
  },
  {
    id: 'ch6', phase: 2, title: '第6章 流程试跑与演进', dateRange: '1月24日-1月27日', days: 4, targetWords: '5500-6500',
    coreContent: ['正确试跑第一版', '设置检查点与密度', '建立出错日志与复盘', 'v1到v3的升级路径'],
    rhythm: ['Day 1: 6.1-6.2初稿', 'Day 2: 6.3-6.4初稿', 'Day 3: 试跑案例补充', 'Day 4: 定稿'],
    deliverables: ['流程试跑记录表']
  },
  {
    id: 'ch7', phase: 3, title: '第7章 短视频从业者工作流', dateRange: '2月3日-2月7日', days: 5, targetWords: '6000-7000',
    coreContent: ['视频十步法拆解', 'Agent适合环节', '日更标准工作流', 'IP稳定更新案例'],
    rhythm: ['Day 1: 7.1-7.2初稿', 'Day 2: 7.3-7.4初稿', 'Day 3: 创作者案例', 'Day 4: 流程图补充', 'Day 5: 定稿'],
    deliverables: ['日更视频流程图']
  },
  {
    id: 'ch8', phase: 3, title: '第8章 电商从业者工作流', dateRange: '2月8日-2月12日', days: 5, targetWords: '6500-7500',
    coreContent: ['商品图与换装方案', '评价挖掘与痛点', '上新固定流程', '一人三店运营案例'],
    rhythm: ['Day 1: 8.1-8.2初稿', 'Day 2: 8.3-8.4初稿', 'Day 3: 实操案例', 'Day 4: 使用指南', 'Day 5: 定稿'],
    deliverables: ['上新流程清单']
  },
  {
    id: 'ch9', phase: 3, title: '第9章 教育工作者工作流', dateRange: '2月13日-2月17日', days: 5, targetWords: '6000-7000',
    coreContent: ['教学目标到内容流', '成套题制作流程', '批改反馈结构化', '节省60%时间案例'],
    rhythm: ['Day 1: 9.1-9.2初稿', 'Day 2: 9.3-9.4初稿', 'Day 3: 教学案例补充', 'Day 4: 题目生成模板', 'Day 5: 定稿'],
    deliverables: ['教学反馈模板']
  },
  {
    id: 'ch10', phase: 3, title: '第10章 职场人士工作流', dateRange: '2月18日-2月20日', days: 3, targetWords: '5500-6500',
    coreContent: ['开会工作流', '周报填空化', '跨部门沟通结构', '个人职场中控台'],
    rhythm: ['Day 1: 10.1-10.2初稿', 'Day 2: 10.3-10.4初稿', 'Day 3: 定稿'],
    deliverables: ['职场三模板']
  },
  {
    id: 'ch11', phase: 3, title: '第11章 创业者管理者工作流', dateRange: '2月21日-2月23日', days: 3, targetWords: '5500-6500',
    coreContent: ['信息收集流', '多版本决策方案', '未来场景推演', '管理决策流程案例'],
    rhythm: ['Day 1: 11.1-11.2初稿', 'Day 2: 11.3-11.4初稿', 'Day 3: 定稿'],
    deliverables: ['决策模板']
  },
  {
    id: 'ch12', phase: 4, title: '第12章 个人工作系统构建', dateRange: '2月24日-2月27日', days: 4, targetWords: '5500-6500',
    coreContent: ['流程盘点与标签', '统一任务入口', '设定固定节奏', 'Agent角色长期嵌入'],
    rhythm: ['Day 1: 12.1-12.2初稿', 'Day 2: 12.3-12.4初稿', 'Day 3: 案例补充', 'Day 4: 定稿'],
    deliverables: ['主流程清单']
  },
  {
    id: 'ch13', phase: 4, title: '第13章 拥有自己的工作方式', dateRange: '2月28日-3月3日', days: 4, targetWords: '5000-6000',
    coreContent: ['默认工作方式形成', '持续优化小动作', '影响他人的输出', '方法论的留存'],
    rhythm: ['Day 1: 13.1-13.2初稿', 'Day 2: 13.3-13.4初稿', 'Day 3: 故事补充', 'Day 4: 定稿'],
    deliverables: ['2.0宣言']
  }
];

export const WORKLOAD_DATA: WorkloadItem[] = [
  { phase: '第一阶段', words: 2500, hours: 5, desc: '建立框架，不求完美' },
  { phase: '第二阶段', words: 2500, hours: 5, desc: '完善方法论' },
  { phase: '第三阶段', words: 2500, hours: 5, desc: '案例最丰富' },
  { phase: '第四阶段', words: 1800, hours: 4, desc: '系统化整合' },
  { phase: '第五阶段', words: 0, hours: 3, desc: '最后冲刺' },
];

export const QUALITY_LIST = [
  "开篇有冲击力（前3页见分晓）",
  "落地有案例（抽象概念必有场景）",
  "交付有模板（必须可复用）",
  "练习有价值（15分钟即刻上手）"
];

export const RISKS = [
  { type: "进度落后", action: "保证1,2,4篇，第3篇可删减深度。" },
  { type: "内容空泛", action: "重写或删除，宁缺毋滥。" },
  { type: "案例缺失", action: "优先样章，其次真实故事，最后假设。" }
];
