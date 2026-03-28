require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const { autenticarToken } = require('./middleware/autenticacion_middleware');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ username, password: hashedPassword }]);

        if (error) {
            console.error('Error al insertar usuario:', error);
            return res.status(500).json({ error: 'Error al registrar usuario' });
        }

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Server error', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const { data: users, error } = await supabase
            .from('usuarios')
            .select('password')
            .eq('username', username)
            .single();

        if (error || !users) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, users.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { username: username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Server error', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// ✅ Fuera del login
app.get('/recurso-protegido', autenticarToken, (req, res) => {
    res.json({
        message: 'Este es un recurso protegido, solo accesible con un token válido',
        data: 'Esta información es confidencial y solo debe ser vista por usuarios autenticados'
    });
});