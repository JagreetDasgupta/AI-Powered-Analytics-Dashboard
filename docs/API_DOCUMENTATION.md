# API Documentation

## 📡 Overview

This document outlines the API structure and endpoints for the ADmyBRAND Analytics Dashboard. The API follows RESTful conventions and returns JSON responses.

**Base URL**: `https://api.admybrand.com/v1`  
**Authentication**: Bearer Token  
**Content-Type**: `application/json`

## 🔐 Authentication

### Login
```http
POST /auth/login
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "plan": "pro"
    }
  }
}
```

## 📊 Dashboard Endpoints

### Get Dashboard Data
```http
GET /dashboard
```

**Query Parameters**:
- `dateRange`: `7days` | `30days` | `90days` | `custom`
- `startDate`: ISO date string (required if dateRange is custom)
- `endDate`: ISO date string (required if dateRange is custom)

**Response**:
```json
{
  "success": true,
  "data": {
    "metrics": {
      "revenue": 128429,
      "users": 28942,
      "conversions": 3827,
      "growth": 18.2
    },
    "charts": {
      "revenue": [...],
      "users": [...],
      "campaigns": [...]
    },
    "notifications": [
      {
        "id": 1,
        "title": "Campaign Alert",
        "message": "Holiday Sale campaign is performing above expectations",
        "type": "success",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

## 🎯 Campaign Endpoints

### Get All Campaigns
```http
GET /campaigns
```

**Response**:
```json
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "id": 1,
        "name": "Holiday Sale 2024",
        "status": "active",
        "budget": 15000,
        "spent": 8420,
        "impressions": 2400000,
        "clicks": 45200,
        "conversions": 1240,
        "ctr": 1.88
      }
    ]
  }
}
```

## 👥 Audience Endpoints

### Get Audience Segments
```http
GET /audiences
```

## 📈 Analytics Endpoints

### Get Analytics Data
```http
GET /analytics
```

## 📄 Reports Endpoints

### Get All Reports
```http
GET /reports
```

### Download Report
```http
GET /reports/:id/download
```

## ⚙️ Settings Endpoints

### Get User Profile
```http
GET /user/profile
```

### Update User Profile
```http
PUT /user/profile
```

## 💳 Subscription Endpoints

### Get Current Subscription
```http
GET /subscription
```

### Upgrade Subscription
```http
POST /subscription/upgrade
```