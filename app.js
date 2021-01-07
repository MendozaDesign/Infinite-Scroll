const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount=20;
const apiKey='Your API Key;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}&query=pugs`;

function updateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}&query=pugs`;
}

// Check if all images were loaded
function imageLoaded (){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    } 
}

//Helper Funciton to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}
// Create elements For Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages =photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //Create <a> to Link To Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finsihed laoding
        img.addEventListener('load',imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get Photos From Usplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad) {
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
    }catch(error){
        // Catch Errors here
    }
}

//Check to see if scrollin near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        getPhotos();
        ready = false;
    }
});

// On Load 
getPhotos();
