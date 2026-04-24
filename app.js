const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// 【保險機制】自動檢查並建立必要的資料夾
const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 設定圖片上傳儲存的位置與檔名
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        // 使用時間戳記當檔名，避免重複
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 1. 取得所有食物
app.get('/get-foods', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.json(data);
});

// 2. 儲存新食物與圖片
app.post('/add-food', upload.single('foodImage'), (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    const newFood = {
        id: Date.now(), // 給每一道菜一個獨一無二的 ID，方便刪除
        name: req.body.name,
        category: req.body.category,
        intro: req.body.intro,
        image: req.file ? `/uploads/${req.file.filename}` : ''
    };
    data.push(newFood);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json({ message: '圖鑑更新成功！' });
});

// 3. 【新增】刪除食物的功能
app.post('/delete-food', (req, res) => {
    const foodId = req.body.id;
    let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    
    // 找出要刪除的那筆資料來刪除實體檔案 (選做，保持資料夾整潔)
    const foodToDelete = data.find(item => item.id === foodId);
    if (foodToDelete && foodToDelete.image) {
        const filePath = path.join(__dirname, 'public', foodToDelete.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath); 
    }

    // 過濾掉該 ID 的資料
    const filteredData = data.filter(item => item.id !== foodId);
    fs.writeFileSync('data.json', JSON.stringify(filteredData, null, 2));
    res.json({ message: '刪除成功！' });
});

app.listen(3000, () => console.log('伺服器在 http://localhost:3000'));