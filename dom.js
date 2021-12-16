const UNCOMPLETED_BOOK_ID = 'incompleteBookshelfList';
const COMPLETED_BOOK_ID = 'completeBookshelfList';
const BOOK_ITEMID = "bookId"



function addBook() {
    const uncompletedAddBook = document.getElementById(UNCOMPLETED_BOOK_ID);
    const completedAddBook = document.getElementById(COMPLETED_BOOK_ID);
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;
    const book = makeBook(bookTitle, bookAuthor, bookYear, isCompleted);


    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, isCompleted);
    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    if (isCompleted) {
        completedAddBook.append(book);
    } else {
        uncompletedAddBook.append(book);
    }

    updateDataToStorage();
};

function makeBook(bookTitle, bookAuthor, bookYear, isCompleted) {

    const textTitle = document.createElement("h2");
    textTitle.classList.add("judul");
    textTitle.innerText = bookTitle;

    const textAuthor = document.createElement("h4");
    textAuthor.innerHTML = `Penulis : <span id="bookAuthor">` + bookAuthor + `</span>`;

    const textYear = document.createElement("p");
    textYear.innerHTML = `Tahun Terbit : <span id="bookYear">` + bookYear + `</span>`;

    const textContainer = document.createElement("div");
    textContainer.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(textTitle, textAuthor, textYear);

    container.append(textContainer);

    if (isCompleted) {
        textContainer.append(createUndoButton(),
            createDeleteButton());

        container.append(textContainer)
    } else {
        textContainer.append(createCheckButton(),
            createDeleteButton());
    }
    container.append(textContainer);

    return container;

};


function createButton(buttonTypeClass, eventListener, text) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = text;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });

    return button;
};


function addBookToCompleted(bookElement) {
    const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

    const bookTitle = bookElement.querySelector(".book_item > h2").innerText;
    const bookAuthor = bookElement.querySelector("span#bookAuthor").innerHTML;
    const bookYear = bookElement.querySelector("span#bookYear").innerHTML;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;


    bookCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
};

function removeBookFromCompleted(bookElement) {

    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
};

function undoBookFromCompleted(bookElement) {
    const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_ID);

    const bookTitle = bookElement.querySelector(".book_item > h2").innerText;
    const bookAuthor = bookElement.querySelector("span#bookAuthor").innerHTML;
    const bookYear = bookElement.querySelector("span#bookYear").innerHTML;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    uncompletedBook.append(newBook);
    bookElement.remove();


    updateDataToStorage();
};

function createCheckButton() {
    return createButton("green", function (event) {
        addBookToCompleted(event.target.parentElement.parentElement);
    }, "Selesai Dibaca");
};

function createDeleteButton() {
    return createButton("red", function (event) {
        removeBookFromCompleted(event.target.parentElement.parentElement);
    }, "Hapus Buku");
};

function createUndoButton() {
    return createButton("green", function (event) {
        undoBookFromCompleted(event.target.parentElement.parentElement);
    }, "Belum kelar dibaca");
}