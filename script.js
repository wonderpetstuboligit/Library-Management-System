document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("book-form");
    const bookList = document.getElementById("book-list");

    let books = [];

    // Function to display books
    function displayBooks() {
        bookList.innerHTML = "";
        books.forEach((book, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.availability}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm delete" data-index="${index}">Delete</button>
                </td>
            `;
            bookList.appendChild(row);
        });
    }

    // Add a new book
    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newBook = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            isbn: document.getElementById("isbn").value,
            availability: document.getElementById("availability").value
        };

        books.push(newBook);
        displayBooks();
        bookForm.reset();
    });

    // Edit or Delete Book
    bookList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains("delete")) {
            books.splice(index, 1);
            displayBooks();
        }

        if (e.target.classList.contains("edit")) {
            const book = books[index];
            document.getElementById("title").value = book.title;
            document.getElementById("author").value = book.author;
            document.getElementById("isbn").value = book.isbn;
            document.getElementById("availability").value = book.availability;

            books.splice(index, 1); // Remove the book from list to allow updating
            displayBooks();
        }
    });

    displayBooks(); // Load existing books on page load
});
