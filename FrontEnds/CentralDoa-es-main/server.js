// Importa os pacotes
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer'); // <--- novo 
const path = require('path');

// Cria o app Express
const app = express();
const port = process.env.PORT || 3000;


// Habilita a pasta "uploads" para acesso público
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configura o Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nome único
  }
});
const upload = multer({ storage }); 

app.use(cors());
app.use(express.json());

// Configura a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mateus",
  database: "dignitec",
  port: 3306
});

db.connect((err) => {
  if (err) console.error('Erro ao conectar ao MySQL:', err);
  else console.log('Conectado ao MySQL com sucesso!');
});

// rota form de doações
app.post('/doacao', upload.single('imagemCapa'), (req, res) => {
  console.log("ufa entrei na função");

  const { instituicao, descricao, localizacao } = req.body;

  const imagemCapa = req.file ? req.file.filename : null; 

  console.log("Isso aí, peguei os dados");

  const sql = 'INSERT INTO doacao (instituicao, descricao, localizacao, imagemCapa) VALUES (?, ?, ?, ?)';
  const values = [instituicao, descricao, localizacao, imagemCapa];
  
  console.log("se cheguei aqui o eero é no index")

  db.query(sql, values, (err) => {
    if (err) {
      console.error('Erro ao inserir:', err);
      res.status(500).json({ message: 'Erro ao cadastrar doação.' });
    } else {
      res.status(201).json({ message: 'Doação cadastrada com sucesso!' });
    }
  });
});

// Listar ongs/instituição de doação
app.get('/doacao', (req, res) => {
  db.query('SELECT * FROM doacao', (err, results) => {
    if (err) res.status(500).json({ message: 'Erro ao buscar doações.' });
    else res.json(results);
  });
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
