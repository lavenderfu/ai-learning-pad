/**
 * 智创平台 - 主逻辑文件
 * 根据 config.js 配置动态渲染页面内容
 */

// ==================== 渲染函数 ====================

/**
 * 渲染顶部公告栏
 */
function renderNotices() {
    const marqueeContainer = document.getElementById('marquee-text');
    const noticeBar = document.getElementById('notice-bar');
    if (!marqueeContainer || !noticeBar) return;

    const notices = CONFIG.notices || [];

    if (notices.length === 0) {
        noticeBar.style.display = 'none';
        return;
    }

    if (notices.length === 1) {
        marqueeContainer.classList.add('static-notice');
        const notice = notices[0];
        marqueeContainer.innerHTML = `<span class="marquee-item" onclick="handleNoticeClick('${notice.link}')">${notice.text}</span>`;
        return;
    }

    // 复制第一条到最后以实现无缝滚动
    marqueeContainer.classList.remove('static-notice');
    const rollingNotices = [...notices, notices[0]];
    const content = rollingNotices.map(notice =>
        `<span class="marquee-item" onclick="handleNoticeClick('${notice.link}')">${notice.text}</span>`
    ).join('');

    marqueeContainer.innerHTML = content;
    startNoticeRoll(marqueeContainer, rollingNotices.length);
}

let noticeInterval;
function startNoticeRoll(container, totalCount) {
    let currentIndex = 0;
    const itemHeight = 36;

    const roll = () => {
        noticeInterval = setInterval(() => {
            currentIndex++;
            container.style.transition = 'transform 0.5s ease-in-out';
            container.style.transform = `translateY(-${currentIndex * itemHeight}px)`;

            if (currentIndex === totalCount - 1) {
                setTimeout(() => {
                    container.style.transition = 'none';
                    container.style.transform = `translateY(0)`;
                    currentIndex = 0;
                }, 500);
            }
        }, 3000);
    };

    roll();
    container.addEventListener('mouseenter', () => clearInterval(noticeInterval));
    container.addEventListener('mouseleave', roll);
}

function handleNoticeClick(link) {
    if (link && link !== '#') {
        window.location.href = link;
    }
}

function closeNotice() {
    const noticeBar = document.getElementById('notice-bar');
    if (noticeBar) {
        noticeBar.style.display = 'none';
    }
    if (noticeInterval) {
        clearInterval(noticeInterval);
    }
}

/**
 * 渲染顶部Header操作按钮
 */
function renderHeaderActions() {
    const container = document.querySelector('.header-actions');
    if (!container || !CONFIG.header) return;

    const actions = CONFIG.header.actions || [];
    container.innerHTML = actions.map(action => {
        switch (action.type) {
            case 'hover-qr':
                return `
                    <div class="action-item cs-hover-wrap">
                        ${action.icon}
                        <span>${action.text}</span>
                        <div class="cs-dropdown">
                            <div class="qr-placeholder-sm">
                                <svg viewBox="0 0 24 24" width="80" height="80"><path fill="#cfd8dc" d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13-2h3v2h-3zm-5 0h3v2h-3zm0 3h3v2h-3zm3 0h3v2h-3zm-3 3h3v2h-3zm3 0h3v2h-3z"/></svg>
                            </div>
                            <p>${action.qrText}</p>
                        </div>
                    </div>
                `;
            case 'signin':
                return `
                    <div class="action-item sign-in" id="signin-btn" onclick="handleSignIn()">
                        ${action.icon}
                        <span id="signin-text">${action.text} +${action.points}点</span>
                    </div>
                `;
            case 'login':
                return `
                    <div class="action-item login-btn">
                        <span>${action.text}</span>
                    </div>
                `;
            default:
                return '';
        }
    }).join('');
}

/**
 * 渲染左侧菜单
 */
function renderSideMenu() {
    const container = document.querySelector('.fixed-side-nav ul');
    if (!container) return;

    const menu = CONFIG.sideMenu || [];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    container.innerHTML = menu.map(item => {
        let isActive = false;

        if (currentPage === 'index.html' || currentPage === '') {
            // 首页时，默认只选中"首页"菜单项
            isActive = item.id === 'home';
        } else {
            // 其他页面，根据 href 判断
            isActive = item.href === currentPage;
        }

        const disabledClass = !item.enabled ? 'disabled-nav' : '';
        const activeClass = isActive ? 'active' : '';

        if (!item.enabled) {
            return `
                <li class="${disabledClass}">
                    <a href="javascript:void(0)">
                        ${item.icon}
                        ${item.text}
                    </a>
                </li>
            `;
        }

        const href = item.anchor ? item.anchor : item.href;
        const dataTarget = item.anchor ? 'data-target="anchor"' : '';

        return `
            <li class="${activeClass}">
                <a href="${href}" ${dataTarget}>
                    ${item.icon}
                    ${item.text}
                </a>
            </li>
        `;
    }).join('');
}

/**
 * 渲染主功能卡片
 */
function renderMainFeatures() {
    const container = document.querySelector('.grid-main');
    if (!container) return;

    const features = CONFIG.mainFeatures || [];
    container.innerHTML = features.map(feature => {
        const imgContent = feature.image
            ? `<img src="${feature.image}" alt="${feature.title}" style="width:100%;height:100%;object-fit:cover;">`
            : `<div style="background: #e2e8f0; display: flex; align-items: center; justify-content: center; width:100%; height:100%;"><svg viewBox="0 0 24 24" width="48" height="48"><path fill="#94a3b8" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg></div>`;

        const cardClickHandler = feature.cardLink && feature.cardLink !== '#'
            ? `onclick="window.location.href='${feature.cardLink}'"`
            : '';
        const cardStyle = feature.cardLink && feature.cardLink !== '#' ? 'cursor: pointer;' : '';

        return `
            <div class="card-hero" ${cardClickHandler} style="${cardStyle}">
                <div class="card-img placeholder-img">
                    ${imgContent}
                </div>
                <div class="card-info">
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                    <button class="btn-primary" onclick="event.stopPropagation(); window.location.href='${feature.buttonLink}'">${feature.buttonText}</button>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * 渲染特色功能卡片
 */
function renderExtraFeatures() {
    const container = document.querySelector('.grid-features');
    if (!container) return;

    const features = CONFIG.extraFeatures || [];
    container.innerHTML = features.map(feature => `
        <div class="card-feature" onclick="window.location.href='${feature.link}'">
            <div class="feat-icon" style="background: ${feature.iconBg};">
                ${feature.icon}
            </div>
            <div class="feat-info">
                <h4>${feature.title}</h4>
                <p>${feature.description}</p>
            </div>
        </div>
    `).join('');
}

/**
 * 渲染灵感广场Tab
 */
function renderInspirationTabs() {
    const container = document.querySelector('#section-inspiration .tabs');
    if (!container) return;

    const tabs = CONFIG.inspirationTabs || [];
    container.innerHTML = tabs.map(tab => `
        <button class="tab-btn ${tab.active ? 'active' : ''}" onclick="switchTab('${tab.id}')">${tab.text}</button>
    `).join('');
}

/**
 * 渲染灵感广场作品
 */
function renderInspirationWorks() {
    const container = document.querySelector('.masonry-grid');
    if (!container) return;

    const works = CONFIG.inspirationWorks || [];
    container.innerHTML = works.map(work => `
        <div class="masonry-item" onclick="openWorkDetail()" data-category="${work.category}">
            <div class="img-wrapper" style="padding-bottom: ${work.height}; background: ${work.bgColor};"></div>
            <div class="item-meta">${work.title}</div>
        </div>
    `).join('');
}

/**
 * 渲染如何赚钱悬浮按钮
 */
function renderMoneyFloatingButton() {
    const container = document.querySelector('.floating-right');
    if (!container || !CONFIG.moneyGuide) return;

    const btn = CONFIG.moneyGuide.floatingButton;
    container.innerHTML = `
        <div class="float-icon-large" style="background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);">
            ${btn.icon}
        </div>
        <span>${btn.text}</span>
    `;
}

/**
 * 渲染如何赚钱弹窗内容
 */
function renderMoneyModal() {
    const modal = document.getElementById('money-modal');
    if (!modal || !CONFIG.moneyGuide) return;

    const guide = CONFIG.moneyGuide;

    // 渲染标题
    const titleEl = modal.querySelector('.modal-header h3');
    if (titleEl) titleEl.textContent = guide.modalTitle;

    // 渲染Tab
    const tabsContainer = modal.querySelector('.money-tabs');
    if (tabsContainer) {
        tabsContainer.innerHTML = guide.tabs.map(tab => `
            <button class="m-tab-btn ${tab.active ? 'active' : ''}" onclick="switchMoneyTab('${tab.id}')">${tab.text}</button>
        `).join('');
    }

    // 渲染内容
    const bodyEl = modal.querySelector('.modal-body');
    if (bodyEl) {
        const tabsHtml = guide.tabs.map(tab => `
            <button class="m-tab-btn ${tab.active ? 'active' : ''}" onclick="switchMoneyTab('${tab.id}')">${tab.text}</button>
        `).join('');

        const contentHtml = Object.entries(guide.content).map(([id, items]) => `
            <div id="${id}" class="m-tab-content" style="display: ${guide.tabs.find(t => t.id === id)?.active ? 'block' : 'none'};">
                <ul class="guide-list">
                    ${items.map((item, index) => `
                        <li>
                            <span class="step-num">${index + 1}</span>
                            <div>
                                <h4>${item.title}</h4>
                                <p>${item.description}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        bodyEl.innerHTML = `
            <div class="money-tabs">${tabsHtml}</div>
            ${contentHtml}
        `;
    }
}

/**
 * 渲染创作点规则弹窗
 */
function renderPointsRulesModal() {
    const modal = document.getElementById('rule-modal');
    if (!modal || !CONFIG.pointsRules) return;

    const rules = CONFIG.pointsRules;

    // 渲染标题
    const titleEl = modal.querySelector('.modal-header h3');
    if (titleEl) titleEl.textContent = rules.modalTitle;

    // 渲染内容
    const bodyEl = modal.querySelector('.modal-body');
    if (bodyEl) {
        bodyEl.innerHTML = rules.sections.map(section => {
            let contentHtml = '';
            if (section.content) {
                contentHtml = `<p style="margin-bottom: 24px; color: var(--text-muted);">${section.content}</p>`;
            }
            if (section.list) {
                contentHtml = `
                    <ul style="margin-bottom: 24px; color: var(--text-muted); padding-left: 20px; list-style-type: disc;">
                        ${section.list.map(item => `
                            <li style="margin-bottom: 8px;"><strong>${item.label}</strong> ${item.text}</li>
                        `).join('')}
                    </ul>
                `;
            }
            return `
                <h4 style="font-size: 16px; margin-bottom: 12px; color: var(--primary-color);">${section.title}</h4>
                ${contentHtml}
            `;
        }).join('');
        bodyEl.style.cssText = 'padding: 32px; font-size: 15px; color: var(--text-main); line-height: 1.8;';
    }
}

/**
 * 渲染充值弹窗
 */
function renderRechargeModal() {
    const modal = document.getElementById('recharge-modal');
    if (!modal || !CONFIG.recharge) return;

    const recharge = CONFIG.recharge;

    // 渲染标题
    const titleEl = modal.querySelector('.modal-header h3');
    if (titleEl) titleEl.textContent = recharge.modalTitle;

    // 渲染充值档位
    const gridContainer = modal.querySelector('.recharge-grid');
    if (gridContainer) {
        gridContainer.innerHTML = recharge.packages.map((pkg, index) => {
            const isSelected = index === 0;
            const bonusHtml = pkg.bonus > 0 ? `
                <span style="font-size: 13px; color: #10b981; font-weight: 600; background: #d1fae5; padding: 2px 6px; border-radius: 4px; white-space: nowrap;">+${pkg.bonus}</span>
            ` : '';

            return `
                <div class="recharge-item ${isSelected ? 'selected' : ''}"
                     style="background: ${isSelected ? '#fff7ed' : 'var(--white)'};
                            border: ${isSelected ? '2px solid var(--primary-color)' : '1px solid var(--border-color)'};
                            border-radius: var(--radius-md); padding: 20px 8px; text-align: center; cursor: pointer; position: relative;"
                     onclick="selectRechargeItem(this)">
                    <div style="margin-bottom: 8px; color: var(--text-main); display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 4px;">
                        <div style="display: flex; align-items: center;">
                            <svg viewBox="0 0 24 24" width="18" height="18" style="margin-right: 4px;"><path fill="#f97316" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-3h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/></svg>
                            <span style="font-size: 26px; font-weight: 700;">${pkg.points}</span>
                        </div>
                        ${bonusHtml}
                    </div>
                    <div style="font-size: 15px; color: ${isSelected ? 'var(--primary-color)' : 'var(--text-muted)'}; font-weight: 500;">￥${pkg.price}</div>
                </div>
            `;
        }).join('');
    }

    // 渲染温馨提示
    const tipsContainer = modal.querySelector('.recharge-tips');
    if (tipsContainer) {
        tipsContainer.innerHTML = `
            ${recharge.tips}
            <a href="#" style="color: var(--primary-color); text-decoration: underline; margin-left: 12px;" onclick="closeModal(event, 'recharge-modal', true); openModal('rule-modal')">创作点规则</a>
        `;
    }

    // 渲染按钮文字
    const btnEl = modal.querySelector('.recharge-btn');
    if (btnEl) {
        btnEl.textContent = recharge.buttonText;
    }

    // 渲染活动角标
    const badgeEl = modal.querySelector('.activity-badge');
    if (badgeEl) {
        if (recharge.activityBadge) {
            badgeEl.textContent = recharge.activityBadge;
            badgeEl.style.display = 'block';
        } else {
            badgeEl.style.display = 'none';
        }
    }
}

/**
 * 渲染作品详情弹窗
 */
function renderWorkDetailModal() {
    const modal = document.getElementById('work-modal');
    if (!modal || !CONFIG.workDetail) return;

    const detail = CONFIG.workDetail;
    const work = detail.defaultWork;

    // 渲染标题
    const titleEl = modal.querySelector('.modal-header h3');
    if (titleEl) titleEl.textContent = detail.modalTitle;

    // 渲染作品信息
    const workTitleEl = modal.querySelector('.work-title');
    if (workTitleEl) workTitleEl.textContent = work.title;

    const tagsContainer = modal.querySelector('.work-meta');
    if (tagsContainer) {
        tagsContainer.innerHTML = work.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    }

    const promptBox = modal.querySelector('.prompt-box');
    if (promptBox) {
        promptBox.innerHTML = `
            <h5>${work.promptTitle}</h5>
            <p>${work.prompt}</p>
        `;
    }

    const actionBox = modal.querySelector('.action-box');
    if (actionBox) {
        actionBox.innerHTML = `
            <p>${work.ctaText}</p>
            <button class="btn-primary w-full">${work.buttonText}</button>
        `;
    }
}

// ==================== 交互函数 ====================

function handleSignIn() {
    const btn = document.getElementById('signin-btn');
    const textSpan = document.getElementById('signin-text');

    if (!btn.classList.contains('signed')) {
        btn.classList.add('signed');
        textSpan.innerText = '已签到';

        btn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(event, modalId, force = false) {
    if (force || event.target.id === modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

function openWorkDetail() {
    openModal('work-modal');
}

function switchMoneyTab(tabId) {
    document.querySelectorAll('.m-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    document.querySelectorAll('.m-tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}

function switchTab(tabId) {
    document.querySelectorAll('#section-inspiration .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // 模拟加载不同分类数据
    const container = document.querySelector('.masonry-grid');
    if (!container) return;

    const items = Array.from(container.children);
    items.sort(() => Math.random() - 0.5);

    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = '';
        items.forEach(item => container.appendChild(item));
        container.style.opacity = '1';
        container.style.transition = 'opacity 0.3s';
    }, 150);
}

function selectRechargeItem(element) {
    const items = document.querySelectorAll('.recharge-item');
    items.forEach(item => {
        item.style.background = 'var(--white)';
        item.style.border = '1px solid var(--border-color)';
        const priceEl = item.querySelector('div:last-child');
        if (priceEl) priceEl.style.color = 'var(--text-muted)';
    });

    element.style.background = '#fff7ed';
    element.style.border = '2px solid var(--primary-color)';
    const priceEl = element.querySelector('div:last-child');
    if (priceEl) priceEl.style.color = 'var(--primary-color)';
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.fixed-side-nav a[data-target="anchor"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const y = targetSection.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            const effectiveCurrent = current === '#section-features' ? '#section-hero' : current;
            if (link.getAttribute('href') === effectiveCurrent) {
                link.parentElement.classList.add('active');
            }
        });
    });
}

// ==================== 初始化 ====================

function initPage() {
    // 首页相关渲染
    if (document.querySelector('.grid-main')) {
        renderMainFeatures();
    }
    if (document.querySelector('.grid-features')) {
        renderExtraFeatures();
    }
    if (document.querySelector('#section-inspiration')) {
        renderInspirationTabs();
        renderInspirationWorks();
    }

    // 通用渲染
    renderNotices();
    renderHeaderActions();
    renderSideMenu();
    renderMoneyFloatingButton();
    renderMoneyModal();
    renderWorkDetailModal();

    // 账户页相关渲染
    if (document.getElementById('rule-modal')) {
        renderPointsRulesModal();
    }
    if (document.getElementById('recharge-modal')) {
        renderRechargeModal();
    }

    // 初始化滚动监听
    initScrollSpy();
}

document.addEventListener('DOMContentLoaded', initPage);
