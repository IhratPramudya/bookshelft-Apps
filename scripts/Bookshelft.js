const Data_Buku = "Data_Buku";
const RENDER = "RENDER_EVENT";

window.addEventListener('load', function(){
    if(checkStorage()){
        books = JSON.parse(localStorage.getItem(Data_Buku)) || [];
    }
    
    const inputBookTitle = document.getElementById('title');
    const inputBookAuthor = document.getElementById('write');
    const inputBookYear = document.getElementById('year');
    const inputBookIsComplete = document.getElementById('check');
    const formInputBook = document.getElementById('form-input-book');


    formInputBook.addEventListener('submit', function(event){
        event.preventDefault();
        const bookDataObjek = {
            title: inputBookTitle.value,
            author: inputBookAuthor.value,
            year: inputBookYear.value,
            complete: inputBookIsComplete.checked,
            id: generatedId(),
        }

        books.push(bookDataObjek);
        formInputBook.reset()
        
        saveDataStorage(books);
        // removeDataStorage(books);
        makeBook()
    })
makeBook()
})

function generatedId(){
    return +new Date()
}

function getDataStorage(){
    return JSON.parse(localStorage.getItem(Data_Buku));
}

function saveDataStorage(BookData){
    localStorage.setItem(Data_Buku, JSON.stringify(BookData))
}

function removeDataStorage(bookData){
    localStorage.removeItem(bookData);
}

function checkStorage(){
    if(typeof(Storage) != 'undefined'){
        return true;
    }else{
        alert("Maaf browser anda tidak mendukung web storage");
        return false;
    }
}




function makeBook(){
    const bookListComplete = document.getElementById('book-list-complete');
    bookListComplete.innerText = '';
    const bookListUncomplete = document.getElementById('book-list-uncomplete');
    bookListUncomplete.innerText = '';
    for(let bookItem of books){
        let bookList = addBookList(bookItem)
        if(bookItem.complete == true){
            bookListComplete.append(bookList);
        }else{
            bookListUncomplete.append(bookList);
        }
    }

}

function addBookList(bookItem){
    const elementTitle = document.createElement('h2');
    elementTitle.classList.add('title-book')
    elementTitle.innerHTML = bookItem.title;
    const elementAuthor = document.createElement('p');
    elementAuthor.innerHTML = '<span>Penulis : </span>' + bookItem.author;

    const containerElement = document.createElement('div');
    containerElement.classList.add('inner');
    containerElement.setAttribute('id',`todo->${bookItem.id}`)
    containerElement.append(elementTitle,elementAuthor);
    const elementYear = document.createElement('p');
    elementYear.innerHTML = '<span>Tahun : </span>' + bookItem.year;
    containerElement.appendChild(elementYear);



    if(bookItem.complete == true){
        const buttonUnDone = document.createElement('button');
        buttonUnDone.classList.add('button-undone');
        buttonUnDone.innerText = "Sudah selesai di baca"
        const iconElement = document.createElement('span');
        iconElement.classList.add('material-symbols-outlined');
        iconElement.innerText = 'unarchive';
        buttonUnDone.append(iconElement);
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('button-delete');

        const iconDelete = document.createElement('span')
        iconDelete.classList.add('material-symbols-outlined')
        iconDelete.innerText = 'delete'
        buttonDelete.append(iconDelete);

        const containerButton = document.createElement('div')
        containerButton.classList.add('button-uncomplete');
        containerButton.append(buttonUnDone,buttonDelete);
        containerElement.appendChild(containerButton);
        buttonUnDone.addEventListener('click', function(){
            undoCheck(bookItem.id);
        })

        buttonDelete.addEventListener('click', function(){
            deleteContent(bookItem.id);
        })
    }else{
        const buttonDone = document.createElement('button');
        buttonDone.classList.add('button-done');
        buttonDone.innerText = "Belum Selesai di baca"
        const iconElement = document.createElement('span');
        iconElement.classList.add('material-symbols-outlined');
        iconElement.innerText = 'done';
        buttonDone.append(iconElement);
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('button-delete');

        const iconDelete = document.createElement('span')
        iconDelete.classList.add('material-symbols-outlined')
        iconDelete.innerText = 'delete'
        buttonDelete.append(iconDelete);

        const containerButton = document.createElement('div')
        containerButton.classList.add('button-uncomplete');
        containerButton.append(buttonDone,buttonDelete);
        containerElement.appendChild(containerButton);

        buttonDone.addEventListener('click', function(){
           checkComplete(bookItem.id);
        })

        buttonDelete.addEventListener('click', function(){
                deleteContent(bookItem.id);
        })
    }


    return containerElement;
}



// function deleteContent(bookId){
//     let find = findIndex(bookId);
//     // for(let index in books){
//     //     if(index == find){

//     //     }
//     // }
//     // books = getDataStorage()

//     books.splice(find, 1);
//     // removeDataStorage()
//     saveDataStorage(books);
//     document.dispatchEvent(new Event(RENDER));
// }

// function findIndex(bookId){
//     for(let index in books){
//         if(books[index].id == bookId){
//             return index;
//         }
//     }
// }



function checkComplete(id){
    let find = findBook(id);
    if(find == null){
        return;
    }

    find.complete = true;
    saveDataStorage(books)
    makeBook()
    document.dispatchEvent(new Event(RENDER));
}

function findBook(id){
    for(let bookItem of books){
        if(bookItem.id == id){
            return bookItem
        }
    }
    return null
}


function deleteContent(id){
    let find = findIndex(id)
    if(find == -1){
        return;
    }
    books.splice(find,1);
    saveDataStorage(books);
    makeBook()
    document.dispatchEvent(new Event(RENDER));
}

function findIndex(id){
    for(let index in books){
        if(books[index].id == id){
            return index;
        }
    }
    return -1
}


function undoCheck(id){
    let find = findBook(id);
    find.complete = false;
    saveDataStorage(books)
    makeBook()
    document.dispatchEvent(new Event(RENDER));
}



const searchBook = document.getElementById('form-input-search');

searchBook.addEventListener('submit', function(event){
    event.preventDefault()
    const inputSearch = document.getElementById('search');

    let inputTitleSearch = inputSearch.value;
    let title = document.querySelectorAll('.title-book');

    let loweCase = inputTitleSearch.toLowerCase();

    for(let titelBookItem of title){
        const titleItem = titelBookItem.textContent.toLocaleLowerCase()
        if(titleItem.includes(loweCase)){
            titelBookItem.parentElement.style.display = "block";
        }else{
            titelBookItem.parentElement.style.display = "none";
        }
    }

    if(inputTitleSearch == ''){
        titelBookItem.parentElement.style.display = "none";
    }
})






















































































// function makeBook(bookItem){
//         const elementTitle = document.createElement('h2');
//         elementTitle.classList.add('title-book')
//         elementTitle.innerHTML = bookItem.title;
//         const elementAuthor = document.createElement('p');
//         elementAuthor.innerHTML = '<span>Penulis : </span>' + bookItem.author;
    
//         const containerElement = document.createElement('div');
//         containerElement.classList.add('inner');
//         containerElement.setAttribute('id',`todo->${bookItem.bookId}`)
//         containerElement.append(elementTitle,elementAuthor);
//         const elementYear = document.createElement('p');
//         elementYear.innerHTML = '<span>Tahun : </span>' + bookItem.year;
//         containerElement.setAttribute('id', `${bookItem.bookId}`)
//         containerElement.appendChild(elementYear);
    
    
    
//         if(bookItem.isComplete){
//             const buttonUnDone = document.createElement('button');
//             buttonUnDone.classList.add('button-undone');
//             buttonUnDone.innerText = "Sudah selesai di baca"
//             const iconElement = document.createElement('span');
//             iconElement.classList.add('material-symbols-outlined');
//             iconElement.innerText = 'unarchive';
//             buttonUnDone.append(iconElement);
//             const buttonDelete = document.createElement('button');
//             buttonDelete.classList.add('button-delete');
    
//             const iconDelete = document.createElement('span')
//             iconDelete.classList.add('material-symbols-outlined')
//             iconDelete.innerText = 'delete'
//             buttonDelete.append(iconDelete);
    
//             const containerButton = document.createElement('div')
//             containerButton.classList.add('button-uncomplete');
//             containerButton.append(buttonUnDone,buttonDelete);
//             containerElement.appendChild(containerButton);
//             buttonUnDone.addEventListener('click', function(){
//                 console.log(checkComplete(bookItem.bookId));
//             })
    
//             buttonDelete.addEventListener('click', function(){
//                 console.log(deleteContent(bookItem.bookId));
//             })
//         }else{
//             const buttonDone = document.createElement('button');
//             buttonDone.classList.add('button-done');
//             buttonDone.innerText = "Belum Selesai di baca"
//             const iconElement = document.createElement('span');
//             iconElement.classList.add('material-symbols-outlined');
//             iconElement.innerText = 'done';
//             buttonDone.append(iconElement);
//             const buttonDelete = document.createElement('button');
//             buttonDelete.classList.add('button-delete');
    
//             const iconDelete = document.createElement('span')
//             iconDelete.classList.add('material-symbols-outlined')
//             iconDelete.innerText = 'delete'
//             buttonDelete.append(iconDelete);
    
//             const containerButton = document.createElement('div')
//             containerButton.classList.add('button-uncomplete');
//             containerButton.append(buttonDone,buttonDelete);
//             containerElement.appendChild(containerButton);
    
//             buttonDone.addEventListener('click', function(){
//                 console.log(checkComplete(bookItem.bookId));
//             })
    
//             buttonDelete.addEventListener('click', function(){
//                 console.log(deleteContent(bookItem.bookId));
//             })
//         }
    
    
//         return containerElement;
//     }