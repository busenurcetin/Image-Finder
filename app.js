const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#search-button");
const clearButton = document.querySelector("#clear-button");
const ImageListWrapper = document.querySelector(".image-list-wrapper");

runEventListeners();

function runEventListeners(){
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}

function clear(){
    searchInput.value="";
    Array.from(ImageListWrapper.children).forEach((child)=> child.remove())
}

function search(e){

    const value = searchInput.value.trim();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET" ,
        headers: {
            Authorization : "Client-ID S4VRKM4DomJ3UQmRYPnke5aGDI8EbyILsZFiBLKglPw"
        }
    })

    .then((res)=> res.json())
    .then((data)=> {
        Array.from(data.results).forEach((image, index)=> {
            addImagetoUI(image.urls.small, index)
            })
    })

    .catch((err)=> console.log(err)); 

    // 401 hatasını HTTP isteklerinde alıyorsak yetkisiz olduğumuz anlamına gelir.
    // 401 hatası alıyorsak API keyimizi kontrol etmeliyiz.


    e.preventDefault();
}

function addImagetoUI(url, index){

    const div = ImageListWrapper.children[index];
    div.className="card";

    const img = div.children[0];
    img.setAttribute("src", url);
    img.width= "400";
    img.height= "400";
}