function calcular() {
    // Captura dos valores
    const custoFixo = Number(document.getElementById('CustoFixo').value);
    const qtdServicoMes = Number(document.getElementById('qtdServicoMes').value);
    const custoVariavel = Number(document.getElementById('CustoVariavel').value);
    const margemLucro = Number(document.getElementById('margemLucro').value);

    // 1 - Cálculo do custo fixo por serviço
    const custoFixoUnitario = custoFixo / qtdServicoMes;

    // 2 - Custo total por unidade
    const custoTotalUnitario = custoFixoUnitario + custoVariavel;

    // 3 - Preço de venda
    const total = custoTotalUnitario * (1 + margemLucro / 100);

    document.getElementById('PrecoInteligente').innerHTML =
        "R$ " + total.toFixed(2).replace('.', ',');
}

