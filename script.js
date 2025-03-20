document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById("book-form");
    const editBookForm = document.getElementById("edit-book-form");
    const bookList = document.getElementById("book-list");
    const editBookModal = new bootstrap.Modal(document.getElementById("editBookModal"));
    
    let books = [];

    // Display books in table
    function displayBooks() {
        bookList.innerHTML = "";
        books.forEach((book, index) => {
            bookList.innerHTML += `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>${book.availability}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">✏️ Edit</button>
                        <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">🗑 Delete</button>
                    </td>
                </tr>
            `;
        });
    }

    // Add a new book
    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        books.push({
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            isbn: document.getElementById("isbn").value,
            availability: document.getElementById("availability").value
        });
        displayBooks();
        bookForm.reset();
    });

    // Handle Edit/Delete actions
    bookList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        // Delete Book
        if (e.target.classList.contains("delete-btn")) {
            books.splice(index, 1);
            displayBooks();
        }

        // Edit Book
        if (e.target.classList.contains("edit-btn")) {
            const book = books[index];
            document.getElementById("edit-index").value = index;
            document.getElementById("edit-title").value = book.title;
            document.getElementById("edit-author").value = book.author;
            document.getElementById("edit-isbn").value = book.isbn;
            document.getElementById("edit-availability").value = book.availability;

            editBookModal.show();
        }
    });

    // Update Book
    editBookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const index = document.getElementById("edit-index").value;
        books[index] = {
            title: document.getElementById("edit-title").value,
            author: document.getElementById("edit-author").value,
            isbn: document.getElementById("edit-isbn").value,
            availability: document.getElementById("edit-availability").value
        };
        displayBooks();
        editBookModal.hide();
    });

    displayBooks();
});
