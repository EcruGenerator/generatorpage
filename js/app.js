// App Logic
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const detailId = urlParams.get('id');

    fetch('data/generators.json')
        .then(response => response.json())
        .then(data => {
            if (detailId) {
                renderDetailPage(data, detailId);
            } else {
                renderGallery(data);
            }
        })
        .catch(error => console.error('Error loading data:', error));
});

function renderGallery(generators) {
    const grid = document.getElementById('generator-grid');
    if (!grid) return;

    grid.innerHTML = generators.map(gen => {
        // Resolve Thumbnail URL
        let thumbUrl;
        if (gen.images && gen.images.length > 0) {
            thumbUrl = `generators/${gen.id}/${gen.images[0]}`;
        } else {
            const ext = gen.imageExtension || 'jpg';
            thumbUrl = `generators/${gen.id}/001.${ext}`;
        }

        return `
            <a href="detail.html?id=${gen.id}" class="card">
                <img src="${thumbUrl}" alt="${gen.title}" class="card-image" onerror="this.src='https://placehold.co/600x400?text=No+Image'">
                <div class="card-content">
                    <h2 class="card-title">${gen.title}</h2>
                    <div class="card-price">${gen.price}</div>
                    <div class="card-desc-short">${gen.description}</div>
                </div>
            </a>
        `;
    }).join('');
}

function renderDetailPage(generators, id) {
    const container = document.getElementById('detail-container');
    if (!container) return;

    const gen = generators.find(g => g.id === id);
    if (!gen) {
        container.innerHTML = '<h1>Generator not found</h1><p><a href="index.html">Back to Gallery</a></p>';
        return;
    }

    // Set page title
    document.title = `${gen.title} - Generator Sales`;

    // Determine Images
    let imageUrls = [];
    if (gen.images && Array.isArray(gen.images)) {
        // Option A: Explicit list of filenames (allows mixed types like .png, .gif)
        imageUrls = gen.images.map(filename => `generators/${gen.id}/${filename}`);
    } else {
        // Option B: Auto-numbered (001, 002...) with optional extension
        const count = gen.imageCount || 0;
        const ext = gen.imageExtension || 'jpg'; // Default to jpg
        for (let i = 1; i <= count; i++) {
            const num = String(i).padStart(3, '0');
            imageUrls.push(`generators/${gen.id}/${num}.${ext}`);
        }
    }

    if (imageUrls.length === 0) {
        imageUrls.push(`https://placehold.co/800x600?text=No+Images`);
    }

    // Main Image is the first one
    const mainImageUrl = imageUrls[0];

    // Generate Thumbnails
    let thumbsHtml = imageUrls.map((url, index) => `
        <img src="${url}" 
             class="thumb ${index === 0 ? 'active' : ''}" 
             onclick="changeMainImage('${url}', this)"
             onerror="this.style.display='none'">
    `).join('');

    // Generate Specs HTML
    const specsHtml = gen.specs ?
        `<ul class="specs-list">${gen.specs.map(spec => `<li>${spec}</li>`).join('')}</ul>` :
        '';

    container.innerHTML = `
        <div class="detail-layout">
            <div class="image-gallery">
                <img id="main-image" src="${mainImageUrl}" class="main-image" onerror="this.src='https://placehold.co/800x600?text=No+Image'">
                <div class="thumbnails">
                    ${thumbsHtml}
                </div>
            </div>
            <div class="product-info">
                <a href="index.html" class="back-link">← Back to Gallery</a>
                <h1>${gen.title}</h1>
                <div class="product-price">${gen.price}</div>
                <div class="product-description">
                    <p>${gen.description}</p>
                </div>
                ${specsHtml}
                <button class="contact-btn" onclick="alert('Contact feature coming soon!')">Contact for Inquiry</button>
            </div>
        </div>
    `;
}

// Global function for image switching
window.changeMainImage = function (url, thumbElement) {
    document.getElementById('main-image').src = url;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumbElement.classList.add('active');
};
