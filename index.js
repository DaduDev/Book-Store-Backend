import express from 'express';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

let bookData = [];
let nextId = 1;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Book Store');
})
// To insert a newBook
app.post('/book', (req, res) => {
    const{title, author} = req.body;
    const newBook = {
        id: nextId++,
        title,
        author
    }
    bookData.push(newBook)
    res.status(201).send(newBook)
})
//To get Book Data
app.get('/book', (req, res) => {
    res.status(200).send(bookData)
})
//To get Book by ID
app.get("/book/:id", (req, res) => {
    const book = bookData.find(b => b.id === parseInt(req.params.id))
    if(!book) {
        res.status(404).send('Book not found')
    }
    res.status(200).send(book)
})
//To update Book Data
app.put('/book/:id', (req, res) => {
    const book = bookData.find(b => b.id === parseInt(req.params.id))
    if(!book) {
        res.status(404).send('Book not found')
    }
    const {title, author} = req.body;
    book.title = title;
    book.author = author;
    res.status(200).send(book)
})
//To delete Book Data
app.delete('/book/:id', (req, res) => {
    const bookIndex = bookData.findIndex(b => b.id === parseInt(req.params.id))
    if(bookIndex === -1) {
        res.status(404).send('Book not found')
    }
    bookData.splice(bookIndex, 1)
    res.status(204).send()
})