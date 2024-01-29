import express from 'express';
import mysql from 'mysql2';

const connect = mysql.createConnection({
})
const app = express();
const PORT = 3017;

app.use(express.json());

app.post('/api/tables', async (req, res, next) => {
    const { tableName } = req.body;

    await connect.promise().query(`
    CREATE TABLE ${tableName}
    (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name varchar(255) NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    `);
    return res.status(201).json({ messaage: "테이블 생성에 성공하였습니다." });
})

app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');
});
