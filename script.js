// Dados mock
const movies = [
  { id:1, title:'O Poderoso Chefão', year:1972, rating:8.7, poster:"img/poderosochefao.jpg", genres:['Ação','Drama'] },
  { id:2, title:'Noite de Estrelas', year:2023, rating:7.9, poster:'', genres:['Romance'] },
  { id:3, title:'Fuga Lunar', year:2025, rating:9.1, poster:'', genres:['Ficção','Aventura'] },
  { id:4, title:'Sombras do Passado', year:2021, rating:6.4, poster:'', genres:['Thriller'] },
  { id:5, title:'Cidade Contra o Tempo', year:2022, rating:8.2, poster:'', genres:['Ação','Sci-Fi'] },
  { id:6, title:'O Último Ato', year:2019, rating:5.7, poster:'', genres:['Drama'] },
  { id:7, title:'Riso Imprudente', year:2020, rating:7.3, poster:'', genres:['Comédia'] },
  { id:8, title:'Caminho da Areia', year:2018, rating:8.9, poster:'', genres:['Drama','Histórico'] }
];

// Cria card de filme
function createCard(movie) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.id = movie.id;

  // Criar o contêiner do pôster (agora com <img>)
  const posterDiv = document.createElement('div');
  posterDiv.className = 'poster';

  const img = document.createElement('img');
  img.alt = movie.title;
  img.loading = 'lazy'; // boa prática para performance

  if (movie.poster) {
    img.src = movie.poster;
    img.onerror = () => {
      // Fallback caso a imagem não carregue
      img.style.display = 'none';
      posterDiv.textContent = 'Sem imagem';
      posterDiv.style.display = 'flex';
      posterDiv.style.alignItems = 'center';
      posterDiv.style.justifyContent = 'center';
      posterDiv.style.color = 'rgba(255,255,255,0.3)';
      posterDiv.style.fontWeight = '700';
    };
  } else {
    // Se não houver poster, mostra fallback
    posterDiv.textContent = 'Sem imagem';
    posterDiv.style.display = 'flex';
    posterDiv.style.alignItems = 'center';
    posterDiv.style.justifyContent = 'center';
    posterDiv.style.color = 'rgba(255,255,255,0.3)';
    posterDiv.style.fontWeight = '700';
  }

  posterDiv.appendChild(img);

  // Conteúdo do card (título, ano, gêneros, nota)
  const content = document.createElement('div');
  content.className = 'content';

  const left = document.createElement('div');
  left.style.flex = '1';
  const title = document.createElement('div');
  title.className = 'meta-title';
  title.textContent = movie.title;
  const sub = document.createElement('div');
  sub.className = 'meta-sub';
  sub.textContent = `${movie.year} • ${movie.genres.join('/')}`;
  left.appendChild(title);
  left.appendChild(sub);

  const rating = document.createElement('div');
  rating.className = 'rating';
  rating.textContent = `${movie.rating.toFixed(1)}/10`;
  if (movie.rating >= 8.5) rating.classList.add('high');
  else if (movie.rating >= 7) rating.classList.add('mid');
  else rating.classList.add('low');

  content.appendChild(left);
  content.appendChild(rating);

  card.appendChild(posterDiv);
  card.appendChild(content);

  card.addEventListener('click', () => {
    alert(`Você clicou em: ${movie.title}`);
  });

  return card;
}

// Renderiza lista
function renderMovies(list){
  const grid = document.getElementById('moviesGrid');
  grid.innerHTML = '';
  if(list.length === 0){
    const empty = document.createElement('div');
    empty.textContent = 'Nenhum filme encontrado.';
    empty.style.color = 'var(--muted)';
    grid.appendChild(empty);
    return;
  }
  list.forEach(m=> grid.appendChild(createCard(m)));
}

// Busca
function searchMovies(query){
  if(!query) return movies.slice();
  query = query.trim().toLowerCase();
  return movies.filter(m => (
    m.title.toLowerCase().includes(query) ||
    String(m.year).includes(query) ||
    m.genres.join(' ').toLowerCase().includes(query)
  ));
}

// Inicialização
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('year').textContent = new Date().getFullYear();
  renderMovies(movies);

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  searchInput.addEventListener('keydown', e=>{
    if(e.key === 'Enter'){ renderMovies(searchMovies(searchInput.value)); }
  });

  searchBtn.addEventListener('click', ()=>{ renderMovies(searchMovies(searchInput.value)); });

  let debounceTimer;
  searchInput.addEventListener('input', ()=>{
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(()=>{
      renderMovies(searchMovies(searchInput.value));
    }, 300);
  });

  // Carrossel dinâmico
  // Carrossel dinâmico
const carouselTrack = document.getElementById('carouselTrack');
carouselTrack.innerHTML = '';

movies.slice(0, 3).forEach(m => {
  const item = document.createElement('article');
  item.className = 'carousel-item';

  // Criar o mini pôster
  const posterMini = document.createElement('div');
  posterMini.className = 'poster-mini';
  posterMini.setAttribute('aria-hidden', 'true');

  if (m.poster) {
    const img = document.createElement('img');
    img.src = m.poster;
    img.alt = '';
    img.loading = 'lazy';

    // Tratamento de erro (fallback)
    img.onerror = () => {
      posterMini.textContent = 'Sem\nimagem';
      posterMini.classList.add('fallback');
    };

    posterMini.appendChild(img);
  } else {
    posterMini.textContent = 'Sem\nimagem';
    posterMini.classList.add('fallback');
  }

  // Criar a parte de metadados
  const meta = document.createElement('div');
  meta.className = 'meta';

  const title = document.createElement('h3');
  title.textContent = m.title;

  const genre = m.genres.length > 0 ? m.genres[0] : '';
  const yearGenre = document.createElement('p');
  yearGenre.textContent = `${m.year} • ${genre}`;

  meta.appendChild(title);
  meta.appendChild(yearGenre);

  // Montar o item
  item.appendChild(posterMini);
  item.appendChild(meta);
  carouselTrack.appendChild(item);
});


});
