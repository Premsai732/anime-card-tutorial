const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalDetails = document.getElementById('modalDetails');
const closeBtn = document.getElementsByClassName('close')[0];
const loading = document.getElementById('loading');

async function fetchAnimeData() {
    loading.style.display = 'flex';
    try {
        const response = await fetch('http://localhost:3000/api/anime');
        const data = await response.json();
        createAnimeCards(data);
    } catch (error) {
        console.error('Error fetching anime data:', error);
    } finally {
        loading.style.display = 'none';
    }
}

function createAnimeCards(animeData) {
    gallery.innerHTML = '';
    animeData.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'card';
        console.log(anime.image)
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="card-content">
                <div class="card-header">
                    <h3>${anime.title}</h3>
                    <span class="rating">${anime.rating}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => showModal(anime));
        gallery.appendChild(card);
    });
}

async function showModal(anime) {
    loading.style.display = 'flex';
    try {
        const response = await fetch(`http://localhost:3000/api/anime/${anime.id}`);
        const detailedAnime = await response.json();
        modalImage.src = detailedAnime.image;
        modalDetails.innerHTML = `
            <h2>${detailedAnime.title}</h2>
            <p><strong>Rating:</strong> ${detailedAnime.rating}</p>
            <p><strong>Description:</strong> ${detailedAnime.description}</p>
            <p><strong>Genre:</strong> ${detailedAnime.genre}</p>
            <p><strong>Episodes:</strong> ${detailedAnime.episodes}</p>
        `;
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching detailed anime data:', error);
    } finally {
        loading.style.display = 'none';
    }
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

fetchAnimeData();
