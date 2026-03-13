// ==================== 数据和状态 ====================
const state = {
  currentStep: 1,
  inputContent: '',
  pageCount: 'auto',
  outline: null,
  selectedStyle: 'business',
  slides: [],
  currentSlide: 0
};

// PPT 风格数据
const styles = [
  { id: 'business', name: '商务简约', color: '#1e3a5f', recommended: true },
  { id: 'tech', name: '科技感', color: '#0f172a', recommended: false },
  { id: 'fresh', name: '清新文艺', color: '#059669', recommended: false },
  { id: 'academic', name: '学术严谨', color: '#374151', recommended: false },
  { id: 'creative', name: '创意活泼', color: '#f59e0b', recommended: false },
  { id: 'minimal', name: '极简黑白', color: '#000000', recommended: false },
  { id: 'gradient', name: '渐变现代', color: '#8b5cf6', recommended: false },
  { id: 'chinese', name: '中国风', color: '#b91c1c', recommended: false },
  { id: 'nature', name: '自然清爽', color: '#10b981', recommended: false },
  { id: 'warm', name: '暖色温馨', color: '#ea580c', recommended: false }
];

// ==================== DOM 元素 ====================
const elements = {
  // 步骤指示器
  steps: document.querySelectorAll('.step'),
  pages: document.querySelectorAll('.page'),

  // 步骤1
  contentInput: document.getElementById('contentInput'),
  charCount: document.getElementById('charCount'),
  pageCount: document.getElementById('pageCount'),
  generateOutlineBtn: document.getElementById('generateOutlineBtn'),

  // 步骤2
  originalContent: document.getElementById('originalContent'),
  outlineEditor: document.getElementById('outlineEditor'),
  regenerateOutlineBtn: document.getElementById('regenerateOutlineBtn'),
  backToInputBtn: document.getElementById('backToInputBtn'),
  toStyleBtn: document.getElementById('toStyleBtn'),

  // 步骤3
  outlinePreview: document.getElementById('outlinePreview'),
  toggleOutlinePreview: document.getElementById('toggleOutlinePreview'),
  styleGrid: document.getElementById('styleGrid'),
  pageCountConfirm: document.getElementById('pageCountConfirm'),
  backToOutlineBtn: document.getElementById('backToOutlineBtn'),
  generatePptBtn: document.getElementById('generatePptBtn'),

  // 步骤4
  slidesList: document.getElementById('slidesList'),
  slidePreview: document.getElementById('slidePreview'),
  backToStyleBtn: document.getElementById('backToStyleBtn'),
  downloadBtn: document.getElementById('downloadBtn'),

  // 弹窗和侧边栏
  loginBtn: document.getElementById('loginBtn'),
  loginModal: document.getElementById('loginModal'),
  closeLoginModal: document.getElementById('closeLoginModal'),
  historyBtn: document.getElementById('historyBtn'),
  historySidebar: document.getElementById('historySidebar'),
  closeHistorySidebar: document.getElementById('closeHistorySidebar'),

  // Loading
  loadingOverlay: document.getElementById('loadingOverlay'),
  loadingText: document.getElementById('loadingText')
};

// ==================== 工具函数 ====================
function showLoading(text) {
  elements.loadingText.textContent = text;
  elements.loadingOverlay.classList.add('active');
}

function hideLoading() {
  elements.loadingOverlay.classList.remove('active');
}

function goToStep(step) {
  state.currentStep = step;

  // 更新步骤指示器
  elements.steps.forEach((el, index) => {
    el.classList.remove('active', 'completed');
    if (index + 1 < step) {
      el.classList.add('completed');
    } else if (index + 1 === step) {
      el.classList.add('active');
    }
  });

  // 更新页面显示
  elements.pages.forEach(page => {
    page.classList.remove('active');
    if (parseInt(page.dataset.page) === step) {
      page.classList.add('active');
    }
  });
}

// ==================== 步骤1: 输入页 ====================
elements.contentInput.addEventListener('input', (e) => {
  const text = e.target.value;
  const length = text.length;

  if (length > 5000) {
    e.target.value = text.slice(0, 5000);
    elements.charCount.textContent = '5000';
  } else {
    elements.charCount.textContent = length;
  }

  state.inputContent = e.target.value;
  elements.generateOutlineBtn.disabled = state.inputContent.trim().length === 0;
});

elements.pageCount.addEventListener('change', (e) => {
  state.pageCount = e.target.value;
});

elements.generateOutlineBtn.addEventListener('click', () => {
  generateOutline();
});

function generateOutline() {
  showLoading('AI 正在分析内容，整理思路...');

  // 模拟 AI 生成大纲
  setTimeout(() => {
    // 解析用户输入，生成模拟大纲
    state.outline = parseContentToOutline(state.inputContent);
    renderOutlineEditor();
    elements.originalContent.textContent = state.inputContent;
    elements.pageCountConfirm.value = state.pageCount;
    hideLoading();
    goToStep(2);
  }, 2000);
}

function parseContentToOutline(content) {
  // 模拟 AI 分析内容生成大纲
  const lines = content.split('\n').filter(line => line.trim());
  const title = lines[0] || '演示文稿';

  return {
    title: title,
    sections: [
      {
        title: '项目背景',
        points: ['市场现状分析', '用户需求洞察', '机会与挑战']
      },
      {
        title: '工作成果',
        points: ['核心数据指标', '关键里程碑', '团队协作亮点']
      },
      {
        title: '经验总结',
        points: ['成功经验', '改进空间', '方法论沉淀']
      },
      {
        title: '未来规划',
        points: ['短期目标', '中长期战略', '资源需求']
      }
    ]
  };
}

// ==================== 步骤2: 大纲编辑 ====================
function renderOutlineEditor() {
  const outline = state.outline;
  let html = `
    <div class="outline-main-title">
      <input type="text" class="section-title" value="${outline.title}" style="font-size: 18px; font-weight: 700; margin-bottom: 16px; width: 100%;">
    </div>
  `;

  outline.sections.forEach((section, sIndex) => {
    html += `
      <div class="outline-section" data-section="${sIndex}" draggable="true">
        <div class="outline-section-header">
          <span class="drag-handle">⋮⋮</span>
          <input type="text" class="section-title" value="${section.title}" data-section="${sIndex}">
          <div class="section-actions">
            <button class="action-btn" onclick="addPoint(${sIndex})" title="添加要点">+</button>
            <button class="action-btn" onclick="deleteSection(${sIndex})" title="删除章节">&times;</button>
          </div>
        </div>
        <div class="outline-points" data-section="${sIndex}">
    `;

    section.points.forEach((point, pIndex) => {
      html += `
        <div class="outline-point" data-point="${pIndex}" draggable="true">
          <span class="drag-handle">⋮</span>
          <span class="point-bullet"></span>
          <input type="text" class="point-text" value="${point}" data-section="${sIndex}" data-point="${pIndex}">
          <div class="point-actions">
            <button class="action-btn" onclick="deletePoint(${sIndex}, ${pIndex})" title="删除">&times;</button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  html += `
    <button class="btn-secondary" style="margin-top: 16px;" onclick="addSection()">+ 添加章节</button>
  `;

  elements.outlineEditor.innerHTML = html;
  initDragAndDrop();
}

function addSection() {
  state.outline.sections.push({
    title: '新章节',
    points: ['要点1']
  });
  renderOutlineEditor();
}

function deleteSection(sIndex) {
  state.outline.sections.splice(sIndex, 1);
  renderOutlineEditor();
}

function addPoint(sIndex) {
  state.outline.sections[sIndex].points.push('新要点');
  renderOutlineEditor();
}

function deletePoint(sIndex, pIndex) {
  state.outline.sections[sIndex].points.splice(pIndex, 1);
  renderOutlineEditor();
}

function initDragAndDrop() {
  const sections = document.querySelectorAll('.outline-section');

  sections.forEach(section => {
    section.addEventListener('dragstart', (e) => {
      e.target.querySelector('.outline-section-header').classList.add('dragging');
      e.dataTransfer.setData('text/plain', section.dataset.section);
      e.dataTransfer.effectAllowed = 'move';
    });

    section.addEventListener('dragend', (e) => {
      e.target.querySelector('.outline-section-header').classList.remove('dragging');
    });

    section.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });

    section.addEventListener('drop', (e) => {
      e.preventDefault();
      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
      const toIndex = parseInt(section.dataset.section);

      if (fromIndex !== toIndex) {
        const [moved] = state.outline.sections.splice(fromIndex, 1);
        state.outline.sections.splice(toIndex, 0, moved);
        renderOutlineEditor();
      }
    });
  });
}

elements.regenerateOutlineBtn.addEventListener('click', () => {
  showLoading('AI 正在重新生成大纲...');
  setTimeout(() => {
    state.outline = parseContentToOutline(state.inputContent);
    renderOutlineEditor();
    hideLoading();
  }, 1500);
});

elements.backToInputBtn.addEventListener('click', () => {
  goToStep(1);
});

elements.toStyleBtn.addEventListener('click', () => {
  // 保存大纲编辑结果
  saveOutlineEdits();
  renderOutlinePreview();
  renderStyleGrid();
  goToStep(3);
});

function saveOutlineEdits() {
  // 保存主标题
  const mainTitleInput = elements.outlineEditor.querySelector('.outline-main-title input');
  if (mainTitleInput) {
    state.outline.title = mainTitleInput.value;
  }

  // 保存章节标题和要点
  const sectionTitleInputs = elements.outlineEditor.querySelectorAll('.outline-section-header .section-title');
  sectionTitleInputs.forEach((input) => {
    const sIndex = parseInt(input.dataset.section);
    state.outline.sections[sIndex].title = input.value;
  });

  const pointInputs = elements.outlineEditor.querySelectorAll('.outline-point .point-text');
  pointInputs.forEach((input) => {
    const sIndex = parseInt(input.dataset.section);
    const pIndex = parseInt(input.dataset.point);
    state.outline.sections[sIndex].points[pIndex] = input.value;
  });
}

// ==================== 步骤3: 风格选择 ====================
function renderOutlinePreview() {
  let html = '';
  state.outline.sections.forEach(section => {
    html += `
      <div class="outline-preview-section">
        <div class="outline-preview-title">${section.title}</div>
        <div class="outline-preview-points">
          ${section.points.map(p => `<div>• ${p}</div>`).join('')}
        </div>
      </div>
    `;
  });
  elements.outlinePreview.innerHTML = html;
}

function renderStyleGrid() {
  let html = '';
  styles.forEach(style => {
    const isSelected = style.id === state.selectedStyle;
    html += `
      <div class="style-card ${isSelected ? 'selected' : ''}" data-style="${style.id}" onclick="selectStyle('${style.id}')">
        ${style.recommended ? '<span class="ai-badge">AI 推荐</span>' : ''}
        <div class="style-card-thumb" style="background: linear-gradient(135deg, ${style.color} 0%, ${adjustColor(style.color, 30)} 100%);">
          <div class="mock-slide">
            <div class="mock-title"></div>
            <div class="mock-line"></div>
            <div class="mock-line"></div>
            <div class="mock-line"></div>
          </div>
        </div>
        <div class="style-card-name">${style.name}</div>
      </div>
    `;
  });
  elements.styleGrid.innerHTML = html;
}

function selectStyle(styleId) {
  state.selectedStyle = styleId;
  document.querySelectorAll('.style-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.style === styleId);
  });
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

elements.toggleOutlinePreview.addEventListener('click', () => {
  const preview = elements.outlinePreview;
  const btn = elements.toggleOutlinePreview;
  if (preview.classList.contains('collapsed')) {
    preview.classList.remove('collapsed');
    btn.textContent = '收起 ▲';
  } else {
    preview.classList.add('collapsed');
    btn.textContent = '展开 ▼';
  }
});

elements.backToOutlineBtn.addEventListener('click', () => {
  goToStep(2);
});

elements.generatePptBtn.addEventListener('click', () => {
  generatePpt();
});

// ==================== 步骤4: PPT编辑 ====================
function generatePpt() {
  showLoading('AI 正在生成精美 PPT...');

  setTimeout(() => {
    // 模拟生成 PPT 页面
    state.slides = generateSlidesFromOutline();
    state.currentSlide = 0;
    renderSlidesList();
    renderSlidePreview();
    hideLoading();
    goToStep(4);
  }, 3000);
}

function generateSlidesFromOutline() {
  const slides = [];

  // 封面页
  slides.push({
    type: 'cover',
    title: state.outline.title,
    content: ''
  });

  // 目录页
  slides.push({
    type: 'toc',
    title: '目录',
    content: state.outline.sections.map(s => s.title)
  });

  // 内容页
  state.outline.sections.forEach(section => {
    slides.push({
      type: 'content',
      title: section.title,
      content: section.points
    });
  });

  // 结尾页
  slides.push({
    type: 'end',
    title: '感谢聆听',
    content: ''
  });

  return slides;
}

function renderSlidesList() {
  let html = '';
  state.slides.forEach((slide, index) => {
    const isActive = index === state.currentSlide;
    html += `
      <div class="slide-thumb ${isActive ? 'active' : ''}" data-slide="${index}" onclick="selectSlide(${index})">
        <button class="slide-regen-btn" onclick="event.stopPropagation(); regenerateSlide(${index})" title="重新生成此页">🔄</button>
        <div class="slide-thumb-inner">
          <div class="slide-thumb-title">${slide.title}</div>
          <div class="slide-thumb-content">
            ${Array.isArray(slide.content) ? slide.content.slice(0, 2).join(', ') + '...' : slide.content}
          </div>
        </div>
        <span class="slide-number">${index + 1}</span>
      </div>
    `;
  });
  elements.slidesList.innerHTML = html;
}

function selectSlide(index) {
  state.currentSlide = index;
  document.querySelectorAll('.slide-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
  renderSlidePreview();
}

function renderSlidePreview() {
  const slide = state.slides[state.currentSlide];
  const styleClass = `style-${state.selectedStyle}`;

  let contentHtml = '';
  if (Array.isArray(slide.content)) {
    contentHtml = `<ul>${slide.content.map(p => `<li>${p}</li>`).join('')}</ul>`;
  } else {
    contentHtml = slide.content;
  }

  elements.slidePreview.innerHTML = `
    <div class="slide-canvas ${styleClass}">
      <div class="slide-title" contenteditable="true">${slide.title}</div>
      <div class="slide-content" contenteditable="true">${contentHtml}</div>
    </div>
  `;
}

function regenerateSlide(index) {
  showLoading('AI 正在重新设计此页...');
  setTimeout(() => {
    hideLoading();
    // 模拟重新生成
    alert('此页已重新生成');
  }, 1500);
}

elements.backToStyleBtn.addEventListener('click', () => {
  goToStep(3);
});

elements.downloadBtn.addEventListener('click', () => {
  showLoading('正在生成 PPTX 文件...');
  setTimeout(() => {
    hideLoading();
    alert('PPT 下载成功！\n\n（原型演示：实际产品将生成真实的 .pptx 文件）');
  }, 1500);
});

// ==================== 弹窗和侧边栏 ====================
elements.loginBtn.addEventListener('click', () => {
  elements.loginModal.classList.add('active');
});

elements.closeLoginModal.addEventListener('click', () => {
  elements.loginModal.classList.remove('active');
});

document.querySelector('.modal-backdrop')?.addEventListener('click', () => {
  elements.loginModal.classList.remove('active');
});

elements.historyBtn.addEventListener('click', () => {
  elements.historySidebar.classList.add('active');
});

elements.closeHistorySidebar.addEventListener('click', () => {
  elements.historySidebar.classList.remove('active');
});

// ==================== 初始化 ====================
function init() {
  // 初始化风格选择
  renderStyleGrid();
}

init();
