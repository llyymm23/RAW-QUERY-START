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
    return res.status(201).json({ messaage : '테이블 생성에 성공하였습니다.' });
});

app.get('/api/tables',async(req,res,next)=>{
    const [tableList] = await connect.promise().query(`
    SHOW TABLES
    `)
    const tableName = tableList.map(table => Object.values(table)[0]);
    return res.status(200).json({message : tableName});
});

app.post('/api/tables/:tableName/items', async(req,res,next) => {
    const {tableName} = req.params;
    const {name} = req.body;

    await connect.promise().query(`
    INSERT INTO ${tableName} (name)
    VALUES ('${name}')
    `);

    return res.status(201).json({message : '데이터 생성에 성공하였습니다.'});
});

app.listen(PORT, () => {
    console.log(PORT, '포트로 서버가 열렸어요!');
});
