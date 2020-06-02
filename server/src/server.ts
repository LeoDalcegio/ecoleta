import express from 'express';

const PORT = 3333 || process.env.PORT;

const app = express();

app.get('/users', () => {
    console.log('List')
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));