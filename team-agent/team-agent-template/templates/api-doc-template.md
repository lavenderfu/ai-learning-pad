# API 文档模板

本模板用于记录项目的 API 接口设计和说明。

---

## 文件输出位置

`2-build/docs/api.md`

---

## 模板结构

```markdown
# {项目名称} API 文档

> 更新日期：YYYY-MM-DD
> 版本：v1.0

## 概述

- **基础路径**：/api/v1（Web 应用）或 云函数名称（小程序）
- **响应格式**：JSON
- **认证方式**：{JWT / Session / 微信登录 / 无需认证}

## 通用响应格式

### 成功响应

```json
{
  "code": 0,
  "data": { ... },
  "message": "success"
}
```

### 错误响应

```json
{
  "code": <错误码>,
  "data": null,
  "message": "<错误描述>"
}
```

### 错误码说明

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 400 | 参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 接口列表

### 1. {接口名称}

**描述**：{接口用途}

**请求**

- **方法**：POST / GET
- **路径**：/api/v1/{path} 或 云函数名
- **认证**：需要 / 不需要

**请求参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| {param} | string | 是 | {说明} |

**请求示例**

```json
{
  "param1": "value1",
  "param2": "value2"
}
```

**响应参数**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| {field} | string | {说明} |

**响应示例**

```json
{
  "code": 0,
  "data": {
    "field1": "value1"
  },
  "message": "success"
}
```

---

### 2. {接口名称}

...（重复上述格式）
```

---

## 完整示例

以下是「校园二手交易」小程序的 API 文档示例：

```markdown
# 校园二手交易 API 文档

> 更新日期：2026-03-05
> 版本：v1.0

## 概述

- **基础路径**：微信云函数
- **响应格式**：JSON
- **认证方式**：微信登录（自动获取 openid）

## 通用响应格式

### 成功响应

```json
{
  "code": 0,
  "data": { ... },
  "message": "success"
}
```

### 错误响应

```json
{
  "code": <错误码>,
  "data": null,
  "message": "<错误描述>"
}
```

### 错误码说明

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 1001 | 参数缺失 |
| 1002 | 参数格式错误 |
| 2001 | 商品不存在 |
| 2002 | 无权限操作 |
| 3001 | AI 服务调用失败 |
| 5000 | 服务器内部错误 |

---

## 接口列表

### 1. getGoodsList - 获取商品列表

**描述**：分页获取商品列表，支持按分类筛选

**请求**

- **方法**：云函数调用
- **云函数名**：getGoodsList
- **认证**：不需要

**请求参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| category | string | 否 | 分类筛选，不传则返回全部 |
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |

**请求示例**

```javascript
wx.cloud.callFunction({
  name: 'getGoodsList',
  data: {
    category: '教材',
    page: 1,
    pageSize: 20
  }
})
```

**响应参数**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| list | array | 商品列表 |
| list[].id | string | 商品 ID |
| list[].title | string | 商品标题 |
| list[].price | number | 价格（元） |
| list[].coverImage | string | 封面图 URL |
| list[].sellerAvatar | string | 卖家头像 URL |
| total | number | 总数量 |
| hasMore | boolean | 是否有更多 |

**响应示例**

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": "goods_001",
        "title": "高等数学第七版 全新",
        "price": 25,
        "coverImage": "cloud://xxx/cover.jpg",
        "sellerAvatar": "cloud://xxx/avatar.jpg"
      }
    ],
    "total": 156,
    "hasMore": true
  },
  "message": "success"
}
```

---

### 2. publishGoods - 发布商品

**描述**：发布新商品

**请求**

- **方法**：云函数调用
- **云函数名**：publishGoods
- **认证**：需要（自动获取 openid）

**请求参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| title | string | 是 | 商品标题，最长 50 字符 |
| desc | string | 是 | 商品描述，最长 500 字符 |
| price | number | 是 | 价格，大于 0 |
| images | array | 是 | 图片 fileID 数组，1-9 张 |
| category | string | 是 | 分类 |

**请求示例**

```javascript
wx.cloud.callFunction({
  name: 'publishGoods',
  data: {
    title: '高等数学第七版 全新',
    desc: '大一买的，没怎么用，9成新...',
    price: 25,
    images: ['cloud://xxx/1.jpg', 'cloud://xxx/2.jpg'],
    category: '教材'
  }
})
```

**响应参数**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| goodsId | string | 新创建的商品 ID |

**响应示例**

```json
{
  "code": 0,
  "data": {
    "goodsId": "goods_002"
  },
  "message": "success"
}
```

---

### 3. aiGenerateDesc - AI 生成描述

**描述**：根据上传的商品图片，AI 自动生成标题、描述和建议价格

**请求**

- **方法**：云函数调用
- **云函数名**：aiGenerateDesc
- **认证**：需要

**请求参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| imageFileIDs | array | 是 | 图片 fileID 数组 |

**请求示例**

```javascript
wx.cloud.callFunction({
  name: 'aiGenerateDesc',
  data: {
    imageFileIDs: ['cloud://xxx/1.jpg']
  }
})
```

**响应参数**

| 参数名 | 类型 | 说明 |
|--------|------|------|
| title | string | AI 生成的标题 |
| desc | string | AI 生成的描述 |
| suggestPrice | number | AI 建议价格 |
| category | string | AI 识别的分类 |

**响应示例**

```json
{
  "code": 0,
  "data": {
    "title": "高等数学（第七版）同济大学",
    "desc": "经典高等数学教材，适合理工科本科生使用。书况良好，内页干净无笔记。",
    "suggestPrice": 20,
    "category": "教材"
  },
  "message": "success"
}
```
```

---

## 写作要点

1. **概述清晰**：说明基础路径、响应格式、认证方式
2. **错误码统一**：定义统一的错误码体系
3. **参数说明完整**：每个参数写清楚类型、是否必填、说明
4. **示例具体**：提供可直接使用的请求和响应示例
5. **保持更新**：接口变更时同步更新文档
