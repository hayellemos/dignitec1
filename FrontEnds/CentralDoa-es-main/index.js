document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-doacao');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form); // envia todos os campos + arquivo

    try {
      const response = await fetch('http://localhost:3000/doacao', {
        method: 'POST',
        body: formData // não coloca headers aqui
      });

      const result = await response.json();
      alert(result.message);
      form.reset();
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar instiuição.');
    }
  });
});

async function pegarDados() {
  try {
    const resposta = await fetch("http://localhost:3000/doacao");
    const conteudo = await resposta.json();
    const container = document.querySelector("#lista-doacao");

    container.innerHTML = conteudo.map(doacao => `
      <div class="anuncio">
         ${doacao.imagemCapa ? `<img class="img-anuncio" src="http://localhost:3000/uploads/${doacao.imagemCapa}" width="200">` : ''}
        <h2 class="nomeProjeto">${doacao.instituicao}</h2>
        <p class="localizacao"><strong>Localizção: </strong>${doacao.localizacao}</p>
        <p class="descricao">${doacao.descricao}</p> <br> 
      </div>
    `).join("");
  } catch (error) {
    console.error("Erro ao buscar as instituições:", error);
  }
}

pegarDados();
