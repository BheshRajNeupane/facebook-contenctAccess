# Facebook Page Analytics Platform

A comprehensive web application that analyzes Facebook pages, posts, and comments using Meta Graph API. The platform helps businesses and organizations gain valuable insights from their social media presence through advanced data analysis and visualization.

## Overview

This application allows users to:
- View all Facebook pages linked to their account
- Access and analyze posts from each page
- Monitor and analyze comments on each post
- Pagination (comments)


## Technology Stack

**Frontend:**
- React.js for UI components
- Axios for API requests
- TailwindCSS for styling

**Backend:**
- Node.js 
- Express.js framework
- Meta Graph API integration


## Getting Started

### Prerequisites
- Node.js v14 or higher
- Facebook Developer Account
- Meta Graph API access credentials

### Installation


```

1. Install backend dependencies
```bash
cd backend
npm install
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Configure environment variables:

Create `backend/.env`:
```env
META_URL = 'https://graph.facebook.com'
GRAPH_VERSION = 'v21.0'
Your_FB_Access_Token='erfsf...............'

```
**List of all pages**
![fb-1](https://github.com/user-attachments/assets/039f32ce-ecf4-482d-bcef-b0de579f9670)

**Specific Page Content**
![fb-2](https://github.com/user-attachments/assets/61c5a7e1-35e1-4e90-aefc-4b0458b021c5)

![fb-3](https://github.com/user-attachments/assets/53019c30-6214-4c80-9921-d9322f6bb78c)



