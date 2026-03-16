# API 接口文档

## 1. 生成题库接口

基于家长输入的主题，通过 LLM 动态生成适合 3 岁儿童的交互选择题。

- **URL**: `/api/generate-questions`
- **Method**: `POST`
- **Auth**: 无需认证（服务端配置了统一的 Anthropic API Key）

### Request Body

```json
{
  "topic": "string" // 例如: "认识数字 4，以及汉字 大和小"
}
```

### Response (200 OK)

```json
{
  "questions": [
    {
      "id": 1,
      "text": "哪个是数字 \"4\"？",
      "options": [
        { "id": 1, "value": "3", "isCorrect": false },
        { "id": 2, "value": "4", "isCorrect": true },
        { "id": 3, "value": "2", "isCorrect": false }
      ]
    }
  ]
}
```
