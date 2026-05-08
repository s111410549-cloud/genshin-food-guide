# 美食札記

### 
* **學生姓名**：張家愷
* **學號**：111410549
* **開發工具**：Visual Studio Code
* **技術**：Firebase Firestore, JavaScript (ES6), HTML5, CSS3, GitHub Pages

---

##  一、 開發動機
在遊戲《原神》中，料理系統是深受玩家喜愛的特色之一。本專案旨在打造一個「數位食譜札記」，透過雲端資料庫串接，讓使用者能透過網頁即時瀏覽、分類並管理提瓦特大陸的各種美食，將遊戲體驗轉化為實質的 Web 應用開發練習。

---

## 二、 核心技術架構

### 1. 前端開發 (Frontend)
* **佈局設計**：使用 **CSS Grid** 實現響應式卡片排列，確保不同裝置下的視覺一致性；並利用 **Flexbox** 處理介面元件的對齊與分布。
* **動態互動**：
    * **拍立得特效**：使用 `cubic-bezier` 貝氏曲線製作卡片懸停動畫。卡片具備隨機傾斜角度，滑鼠移入時會校正並放大，模擬真實手帳的互動感。
    * **粒子跟隨**：利用 JavaScript 監聽 `mousemove` 事件，實作動態的「✨」粒子跟隨效果，提升網頁視覺趣味性。
    * **對話氣泡**：透過 `position: absolute` 與 `opacity` 切換，實作看板娘（派蒙、雷電將軍）的滑鼠懸停對話框。

### 2. 後端與資料庫 (Backend / Database)
* **Firebase Firestore**：採用 NoSQL 資料庫模型，利用 `onSnapshot` 監聽器實現**即時 (Real-time)** 資料同步，達成新增或刪除資料時，頁面無需刷新即可更新。
* **資料模型設計**：
    ```json
    {
      "name": "料理名稱",
      "category": "主食 / 飲品 / 點心",
      "intro": "料理描述文字",
      "image": "圖片 URL",
      "createdAt": "時間戳記"
    }
    ```

---

##  三、 專案功能

### 1. 智慧過濾系統
使用者可透過下拉選單，根據「主食」、「飲品」、「點心」即時篩選顯示內容，系統會動態過濾資料庫陣列並重新渲染 DOM，流程流暢且不需重整頁面。

### 2. 管理員權限切換
本專案利用 URL 參數進行簡易的角色權限管理：
* **一般使用者**：僅能瀏覽美食資訊。
* **管理員模式**：在網址後方加上 `?mode=admin` 參數後，網頁會觸發隱藏邏輯，顯示「收錄表單」以及卡片上的「撕掉此頁（刪除）」按鈕，具備完整的資料管理能力。
### 3. 即時互動留言系統
* **無縫同步**：留言後無需重新整理頁面，透過監聽技術即時更新留言板。

---

##  四、 網址連結
* **瀏覽者網址**：[點此開啟](https://s111410549-cloud.github.io/genshin-food-guide/)
* **管理者網址**：[點此開啟管理模式](https://s111410549-cloud.github.io/genshin-food-guide/?mode=admin)

---

##  免責聲明
本專案所使用之遊戲圖像與素材版權均歸 **米哈遊 (miHoYo / HoYoverse)** 所有。本網頁僅作為課程作業之學術用途，不作任何商業化使用。


[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript)



## 五、 資料安全與架構 (Firebase Security Rules)
專案採用 Cloud Firestore 進行資料管理，並針對安全性設定了細緻的規則，以防範未經授權的資料修改：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 1. 全域讀取權限：讓所有冒險者都能查閱美食內容
    match /{document=**} {
      allow read: if true;
    }
    
    // 2. 留言區規則：允許任何人新增留言，但刪除操作需具備 admin 身分
    match /comments/{commentId} {
      allow create: if true;
      allow delete: if request.query.mode == "admin";
    }
    
    // 3. 核心美食資料：僅限管理員模式進行寫入/更新
    match /foods/{foodId} {
      allow write: if request.query.mode == "admin";
    }
  }
}
