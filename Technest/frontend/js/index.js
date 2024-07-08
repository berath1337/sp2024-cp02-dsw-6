function resizeImageMap() {
    const img = document.getElementById('tech-nest-banner');
    const area = document.getElementById('shop-now-area');

    const originalWidth = 1200; // Original width of the image in pixels
    const originalHeight = 800; // Original height of the image in pixels

    const currentWidth = img.clientWidth;
    const currentHeight = img.clientHeight;

    // Calculate scaling factors
    const scaleX = currentWidth / originalWidth;
    const scaleY = currentHeight / originalHeight;

    // Define the original coordinates
    const originalCoords = [150, 600, 350, 650];

    // Adjust coordinates based on the scaling factors
    const adjustedCoords = originalCoords.map((coord, index) => {
        return index % 2 === 0 ? coord * scaleX : coord * scaleY;
    });

    // Set the adjusted coordinates to the area element
    area.coords = adjustedCoords.join(',');
}

window.addEventListener('resize', resizeImageMap);
window.addEventListener('load', resizeImageMap);
