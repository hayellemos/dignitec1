function enviar() {
  const categoria = document.getElementById("categoria").value;
  const valor = document.getElementById("valor").value;
  const data = document.getElementById("data").value;

  // Salvando os valores no localStorage
  localStorage.setItem("categoriaGasto", categoria);
  localStorage.setItem("valorGasto", valor);
  localStorage.setItem("dataGasto", data);

  // Redireciona para o painel
  window.location.href = "painel.html";
}
