提瓦特美食札記-專案報告
111410549 張家愷
環境： Visual Studio Code, Firebase Firestore, GitHub Pages

 一、 開發動機
在遊戲《原神》中，料理系統是深受玩家喜愛的特色之一。本專案旨在打造一個「數位食譜札記」，讓使用者能透過網頁瀏覽、分類提瓦特大陸的各種美食。

 二、 核心技術架構
1. 前端開發 (Frontend)
佈局設計： 使用 CSS Grid 實現響應式卡片排列，並利用 Flexbox 處理介面對齊。

動態互動： * 使用 cubic-bezier 貝氏曲線製作「拍立得」卡片的懸停校正與放大特效。

利用 JavaScript 監聽 mousemove 事件，實作動態的粒子（✨）跟隨效果。

透過 position: absolute 與 opacity 切換實作看板娘的氣泡對話框。

2. 後端與資料庫 (Backend / Database)
Firebase Firestore： 採用 NoSQL 資料庫模型，實現即時（Real-time）資料同步。

資料模型設計：

JSON
{
  "name": "料理名稱",
  "category": "主食/飲品/點心",
  "intro": "料理描述文字",
  "image": "圖片 URL",
  "createdAt": "時間戳記"
}
三、 專案功能
過濾系統
使用者可透過下拉選單，根據「主食」、「飲品」、「點心」即時篩選顯示內容，不需重新整理頁面。

管理員權限切換
一般使用者： 僅能瀏覽美食資訊。

管理員模式： 在網址後方加上 ?mode=admin 參數後，網頁會觸發隱藏邏輯，顯示「收錄表單」與卡片上的「撕掉此頁（刪除）」按鈕。



四、網址
管理者網址:https://s111410549-cloud.github.io/genshin-food-guide/?mode=admin
瀏覽者網址:https://s111410549-cloud.github.io/genshin-food-guide/


⚠️ 免責聲明
本專案所使用之遊戲圖像與素材版權均歸 米哈遊 (miHoYo / HoYoverse) 所有，本網頁僅作為學術作業用途，不作任何商業化使用。
