
const galleryAlbums = {
    
    'my-story': [
        
        { thumb: 'images/abc1.jpg', full: 'images/abc1.jpg', caption: '' },
        { thumb: 'images/abc3.jpg', full: 'images/abc3.jpg', caption: '' },
        { thumb: 'images/cnn.jpg', full: 'images/cnn.jpg', caption: '' },
        { thumb: 'images/ccc3.jpg', full: 'images/ccc3.jpg', caption: '' },
        { thumb: 'images/cnt.jpg', full: 'images/cnt.jpg', caption: '' },
        { thumb: 'images/mmm1.jpg', full: 'images/mmm1.jpg', caption: '' },
        { thumb: 'images/mnn3.jpg', full: 'images/mnn3.jpg', caption: '' },
        { thumb: 'images/nmm3.jpg', full: 'images/nmm3.jpg', caption: '' },
        { thumb: 'images/ccnn.jpg', full: 'images/ccnn.jpg', caption: '' },
        { thumb: 'images/ccnn1.jpg', full: 'images/ccnn1.jpg', caption: '' }
    ],

    
    'my-family': [
        { thumb: 'images/abc7.jpg', full: 'images/abc7.jpg', caption: '' },
        { thumb: 'images/abc8.jpg', full: 'images/abc8.jpg', caption: '' },
         { thumb: 'images/abc9.jpg', full: 'images/abc9.jpg', caption: '' },
          { thumb: 'images/ccc1.jpg', full: 'images/ccc1.jpg', caption: '' },
           { thumb: 'images/ccc2.jpg', full: 'images/ccc2.jpg', caption: '' },
            { thumb: 'images/ccc4.jpg', full: 'images/ccc4.jpg', caption: '' },
             { thumb: 'images/mnn.jpg', full: 'images/mnn.jpg', caption: '' },
              { thumb: 'images/nmm.jpg', full: 'images/nmm.jpg', caption: '' },
               { thumb: 'images/nmm1.jpg', full: 'images/nmm.jpg', caption: '' },
                { thumb: 'images/nmm4.jpg', full: 'images/nmm4.jpg', caption: '.' },
                 { thumb: 'images/nmm5.jpg', full: 'images/nmm5.jpg', caption: '' }
    ],
    
    
    'my-friends': [
        { thumb: 'images/nnn5.jpg', full: 'images/nnn5.jpg', caption: '' },
        { thumb: 'images/abc5.jpg', full: 'images/abc5.jpg', caption: '' },
        { thumb: 'images/nnn6.jpg', full: 'images/nnn6.jpg', caption: '' },
        { thumb: 'images/nnn5.jpg', full: 'images/nnn5.jpg', caption: '' },
        { thumb: 'images/nnn4.jpg', full: 'images/nnn4.jpg', caption: '' },
        { thumb: 'images/nnn3.jpg', full: 'images/nnn3.jpg', caption: '' },
        { thumb: 'images/nnn2.jpg', full: 'images/nnn2.jpg', caption: '' },
        { thumb: 'images/nnn1.jpg', full: 'images/nnn1.jpg', caption: '' }
    ]
};


let currentAlbumImages = []; // Stores the array of the currently selected album
let currentImageIndex = 0;   // Stores the index of the image visible in the modal


const albumRoot = document.getElementById('album-selection-root');
const galleryRoot = document.getElementById('gallery-root');
//The specific container for the thumbnails
const thumbnailGridContent = document.getElementById('thumbnail-grid-content'); 


const modal = document.getElementById('image-modal'); 
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');



// Helper to convert 'my-story' into 'My Story'
function formatTitle(key) {
    const parts = key.split('-');
    return parts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Generates the initial selection cards for the Albums
function generateAlbumCards() {
    // Clear the existing content and prepare the album grid
    albumRoot.innerHTML = '<h1>Photo Albums</h1><div class="album-grid"></div>';
    const albumGrid = albumRoot.querySelector('.album-grid');
    
    let albumHTML = '';

    for (const key in galleryAlbums) {
        // Get the first image of the album to use as a 'cover' thumbnail
        const coverImage = galleryAlbums[key][0].thumb; 
        const title = formatTitle(key);
        
        albumHTML += `
            <div class="album-card" onclick="selectAlbum('${key}')">
                <img src="${coverImage}" alt="${title} Album Cover">
                <h2>${title}</h2>
                <p>${galleryAlbums[key].length} Photos</p>
            </div>
        `;
    }
    albumGrid.innerHTML = albumHTML;
}

// Switches the view from Album Selection to the Thumbnail Grid
function selectAlbum(albumKey) {
    // 1. Set the global state for the selected album
    currentAlbumImages = galleryAlbums[albumKey];

    // 2. Hide Album Selection View, Show Gallery View
    albumRoot.classList.add('hidden');
    galleryRoot.classList.remove('hidden');

    // 3. Generate Thumbnails for this specific album
    let galleryHTML = '';
    currentAlbumImages.forEach((image, index) => {
        galleryHTML += `
            <div class="gallery-item" onclick="openModal(${index})">
                <img src="${image.thumb}" alt="${image.caption}">
            </div>
        `;
    });
    galleryRoot.querySelector('.gallery-container').innerHTML = galleryHTML;
}

// Shows the initial Album Selection View
function showAlbumSelection(event) {
    if (event) event.preventDefault();
    galleryRoot.classList.add('hidden');
    albumRoot.classList.remove('hidden');
    // Clear the thumbnails when going back
    galleryRoot.innerHTML = '<a href="#" onclick="showAlbumSelection(event)" class="back-link">&leftarrow; Back to Albums</a>';
}

// Opens the modal when a thumbnail is clicked
function openModal(index) {
    currentImageIndex = index;
    showSlides(currentImageIndex);
    
    modal.style.display = "block"; 
    document.body.style.overflow = "hidden";
}

// Closes the modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Moves the slide index (n = 1 for next, n = -1 for previous)
function plusSlides(n, event) {
    // Stops the click event from closing the modal
    event.stopPropagation(); 
    
    currentImageIndex += n;
    showSlides(currentImageIndex);
}

// Displays the image at the given index
function showSlides(index) {
    let newIndex = index;
    const totalImages = currentAlbumImages.length; // Uses the active album's length!

    // Handle wrap-around logic
    if (newIndex >= totalImages) {
        newIndex = 0;
    } 
    if (newIndex < 0) {
        newIndex = totalImages - 1;
    }
    
    currentImageIndex = newIndex; 
    
    // Get image data from the currently selected album
    const image = currentAlbumImages[currentImageIndex]; 

    modalImage.src = image.full;
    modalCaption.textContent = image.caption;
}


document.addEventListener('DOMContentLoaded', () => {
    generateAlbumCards(); 
    
    // Extra Feature: Close on ESC key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});


function selectAlbum(albumKey) {
    currentAlbumImages = galleryAlbums[albumKey];

    //  Switch views
    albumRoot.classList.add('hidden');
    galleryRoot.classList.remove('hidden');

    //  Generate new Thumbnails for this specific album
    let thumbnailsHTML = '';
    currentAlbumImages.forEach((image, index) => {
        thumbnailsHTML += `
            <div class="gallery-item" onclick="openModal(${index})">
                <img src="${image.thumb}" alt="${image.caption}">
            </div>
        `;
    });
    
    //Insert HTML into the new inner container
    thumbnailGridContent.innerHTML = thumbnailsHTML; 
}