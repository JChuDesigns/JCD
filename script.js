const projectGalleries = {
    project1: ['pro1.jpg', 'pro2.jpg', 'pro3.jpg'], // Tacloban Project
    project2: ['pro2a.jfif', 'pro2b.jfif'], // Deca Homes Project
    project3: ['project3_1.jpg', 'project3_2.jpg'], // Vergara Residences
    project4: ['project4_1.jpg'], // Lotto Stall Project
    project5: ['project5_1.jpg', 'project5_2.jpg'], // Chinatown Project
    project6: ['pro6a.jpg', 'pro6b.jpg', 'pro6c.jpg', 'pro6d.jpg', 'pro6e.jfif'], // Project 6
    project7: ['pro7a.jpg', 'pro7b.jpg', 'pro7c.jpg' , 'pro7d.jpg' ], // Project 7
    project8: ['pro8a.jfif', 'pro8b.jfif'], // Project 8
    project9: ['pro9a.jfif', 'pro9b.jfif', 'pro9c.jfif'], // Project 9
};

let currentProject = '';
let currentImageIndex = 0; // To track the current image being displayed

function showGallery(project, index) {
    currentProject = project;
    const images = projectGalleries[project];
    currentImageIndex = index; // Set to the clicked image index
    updateGallery(images);
    document.getElementById('gallery-modal').style.display = 'flex';
}

function closeGallery() {
    document.getElementById('gallery-modal').style.display = 'none';
}

function updateGallery(images) {
    const galleryImg = document.getElementById('gallery-img');
    const newImage = new Image(); // Preload the new image
    newImage.src = images[currentImageIndex];
    
    galleryImg.style.transition = 'opacity 0.5s ease-in-out'; // Smooth opacity transition
    galleryImg.style.opacity = '0'; // Start with opacity 0

    // Preload next and previous images
    document.getElementById('prev-image').src = images[(currentImageIndex - 1 + images.length) % images.length];
    document.getElementById('next-image').src = images[(currentImageIndex + 1) % images.length];

    void galleryImg.offsetWidth; // Trigger reflow for smoother transition

    setTimeout(() => {
        galleryImg.src = newImage.src; // Update main image source
        galleryImg.style.opacity = '1'; // Fade in
    }, 50); // Short delay for transition to apply
}

function nextPhoto() {
    const images = projectGalleries[currentProject];
    currentImageIndex = (currentImageIndex + 1) % images.length; // Loop back to the first image
    updateGallery(images);
}

function prevPhoto() {
    const images = projectGalleries[currentProject];
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length; // Loop to the last image
    updateGallery(images);
}

function filterProjects() {
    const year = document.getElementById('year').value;
    const type = document.getElementById('type').value;
    const projects = document.querySelectorAll('.project-item');

    projects.forEach(project => {
        const matchesYear = year ? project.getAttribute('data-year') === year : true;
        const matchesType = type ? project.getAttribute('data-type') === type : true;
        project.style.display = (matchesYear && matchesType) ? 'block' : 'none';
    });
}
