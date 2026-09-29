# 📁 llms-collaborator - Project Structure

*Generated on: 23/09/2026, 15:39:13*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 70 |
| 📁 Total Folders | 12 |
| 🌳 Max Depth | 3 levels |
| 🛠️ Tech Stack | CSS, Node.js |

## ⭐ Important Files

- 🟡 🔒 **package-lock.json** - Dependency lock
- 🔴 📦 **package.json** - Package configuration
- 🟡 🔒 **package-lock.json** - Dependency lock
- 🔴 📦 **package.json** - Package configuration
- 🔴 📖 **README.md** - Project documentation
- 🟡 🔒 **package-lock.json** - Dependency lock
- 🔴 📦 **package.json** - Package configuration

## 📊 File Statistics

### By File Type

- 📜 **.js** (JavaScript files): 52 files (74.3%)
- ⚙️ **.json** (JSON files): 6 files (8.6%)
- 📄 **.sql** (Other files): 6 files (8.6%)
- 🌐 **.html** (HTML files): 2 files (2.9%)
- 📖 **.md** (Markdown files): 2 files (2.9%)
- 📄 **.example** (Other files): 1 files (1.4%)
- 🎨 **.css** (Stylesheets): 1 files (1.4%)

### By Category

- **JavaScript**: 52 files (74.3%)
- **Other**: 7 files (10.0%)
- **Config**: 6 files (8.6%)
- **Web**: 2 files (2.9%)
- **Docs**: 2 files (2.9%)
- **Styles**: 1 files (1.4%)

### 📁 Largest Directories

- **root**: 70 files
- **orchestrator**: 31 files
- **orchestrator/src**: 26 files
- **frontend**: 22 files
- **frontend/src**: 19 files

## 🌳 Directory Structure

```
llms-collaborator/
├── 📂 backend/
│   ├── 📄 .env.example
│   ├── 📜 db.js
│   ├── 📂 middleware/
│   │   └── 📜 auth.js
│   ├── 🟡 🔒 **package-lock.json**
│   ├── 🔴 📦 **package.json**
│   ├── 📂 routes/
│   │   ├── 📜 auth.js
│   │   ├── 📜 bookmarks.js
│   │   ├── 📜 folders.js
│   │   └── 📜 tags.js
│   ├── 📜 server.js
│   └── 📂 sql/
│   │   ├── 📄 001_users.sql
│   │   ├── 📄 002_folders.sql
│   │   ├── 📄 003_bookmarks.sql
│   │   ├── 📄 004_tags.sql
│   │   ├── 📄 005_bookmark_tags.sql
│   │   └── 📄 006_bookmark_folders.sql
├── 📂 frontend/
│   ├── 🟡 🔒 **package-lock.json**
│   ├── 🔴 📦 **package.json**
│   ├── 🌐 public/
│   │   └── 🌐 index.html
│   └── 📁 src/
│   │   ├── 📜 api.js
│   │   ├── 📜 App.js
│   │   ├── 🧩 components/
│   │   │   ├── 📜 Auth.js
│   │   │   ├── 📜 AuthContext.js
│   │   │   ├── 📜 BookmarkFilter.js
│   │   │   ├── 📜 BookmarkList.js
│   │   │   ├── 📜 Bookmarks.js
│   │   │   ├── 📜 FavoriteToggle.js
│   │   │   ├── 📜 FolderList.js
│   │   │   ├── 📜 FolderManagement.js
│   │   │   ├── 📜 Folders.js
│   │   │   ├── 📜 Header.js
│   │   │   ├── 📜 Login.js
│   │   │   ├── 📜 Register.js
│   │   │   ├── 📜 Search.js
│   │   │   └── 📜 TagManagement.js
│   │   ├── 📜 index.js
│   │   ├── 🎨 styles.css
│   │   └── 🔧 utils/
│   │   │   └── 📜 api.js
├── 📂 orchestrator/
│   ├── 🟡 🔒 **package-lock.json**
│   ├── 🔴 📦 **package.json**
│   ├── 🌐 public/
│   │   └── 🌐 index.html
│   ├── 🔴 📖 **README.md**
│   ├── 📁 src/
│   │   ├── 📜 activityLog.js
│   │   ├── 📜 agentRegistry.js
│   │   ├── 📜 agents.js
│   │   ├── 📜 appRunner.js
│   │   ├── 📜 backendAgent.js
│   │   ├── 📜 completenessCheck.js
│   │   ├── 📜 contentGuard.js
│   │   ├── 📜 contributions.js
│   │   ├── 📜 fileWatcher.js
│   │   ├── 📜 frontendAgent.js
│   │   ├── 📜 genericAgent.js
│   │   ├── 📜 groqProvider.js
│   │   ├── 📜 groqRetry.js
│   │   ├── 📜 jsonToolCalls.js
│   │   ├── 📜 llmProvider.js
│   │   ├── 📜 modelClients.js
│   │   ├── 📜 orchestrator.js
│   │   ├── 📜 projectValidator.js
│   │   ├── 📜 retry.js
│   │   ├── 📜 rolePrompts.js
│   │   ├── 📜 scaffold.js
│   │   ├── 📜 server.js
│   │   ├── 📜 taskStore.js
│   │   ├── 📜 techStack.js
│   │   ├── 📜 tools.js
│   │   └── 📜 writeGuard.js
│   └── 📜 test-flow.js
└── 📖 project_structure.md
```

## 📖 Legend

### File Types
- 📄 Other: Other files
- 📜 JavaScript: JavaScript files
- ⚙️ Config: JSON files
- 🌐 Web: HTML files
- 🎨 Styles: Stylesheets
- 📖 Docs: Markdown files

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
