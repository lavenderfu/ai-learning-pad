project: {项目名称}
description: {一句话描述}
current_stage: 1
role: pm
started_at: {YYYY-MM-DD}
stage_history:
  - stage: 1
    started: {YYYY-MM-DD}
    completed: null

# 阶段1检查清单（全部完成才能进入阶段2）
stage_1_checklist:
  spec_completed: false           # spec.md 已填写完整
  spec_info_sufficient: false     # spec 信息充足度「必须满足」全部达成
  spec_reviewed: false            # spec 已经过三角色确认
  prototype_runnable: false       # 原型页面可运行，覆盖核心流程

# 阶段2检查清单（全部完成才能进入阶段3）
stage_2_checklist:
  core_feature_done: false        # 核心功能开发完成
  ai_integration_done: false      # AI 能力集成完成
  api_documented: false           # API 文档已生成
  code_reviewed: false            # 代码已 Review

# 阶段3检查清单（全部完成才能标记 done）
stage_3_checklist:
  ui_polished: false              # UI 已打磨完善
  integration_tested: false       # 联调测试通过
  deployed: false                 # 已部署上线
  handover_done: false            # 交接文档已完成
