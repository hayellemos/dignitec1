document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form); // envia todos os campos + arquivo

    try {
      const response = await fetch('http://localhost:3000/anuncios', {
        method: 'POST',
        body: formData // não coloca headers aqui
      });

      const result = await response.json();
      alert(result.message);
      form.reset();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar o anúncio.');
    }
  });
});

async function pegarDados() {
  try {
    const resposta = await fetch("http://localhost:3000/anuncios");
    const conteudo = await resposta.json();
    const container = document.querySelector("#lista-anuncios");

    container.innerHTML = conteudo.map(anuncio => `
      <div class="anuncio">
        ${anuncio.imagemCapa ? `<img class="img-anuncio" src="http://localhost:3000/uploads/${anuncio.imagemCapa}" width="200">` : ''}
        <h2 class="nomeProjeto">${anuncio.nomeProjeto}</h2>
        <p><strong>Localizção: </strong>${anuncio.localizacao}</p>
        <p class"descricao">${anuncio.descricao}</p>
        <button class"contatos"> ${anuncio.contato}</p></button>
      </div>
    `).join("");
  } catch (error) {
    console.error("Erro ao buscar anúncios:", error);
  }
}

pegarDados();
