// Função para criar o gráfico de pizza
function criarGraficoPizza(gastos) {
  
  const Grafic = document.getElementById("graficoPizza").getContext("2d");

  if (window.meuGraficoPizza) {
      window.meuGraficoPizza.destroy();
  }

  // Criando o gráfico de pizza
  window.meuGraficoPizza = new Chart(Grafic, {
      type: "pie",
      data: {
          
        datasets: [
          {
              data: gastos, // Valores dos gastos
              backgroundColor: [
                  "rgba(54, 162, 235, 0.7)", // Azul (Transporte)
                  "rgba(128, 0, 128, 0.7)",  // Roxo (Tráfego Pago)
                  "rgba(76, 175, 80, 0.7)",  // Verde (Material Investido)
                  "rgba(139, 69, 19, 0.7)",  // Marrom (Café da Manhã)
                  "rgba(255, 152, 0, 0.7)"   // Laranja (Aluguel do Espaço)
              ],
              borderColor: [
                  "#3680eb",  
                  "#800080",  
                  "#4caf50",  
                  "#8b4513",  
                  "#ff9800"  
              ],
              borderWidth: 2
          }
      ]
  
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
      },
  });
}



function calcularTotal() {
    let preco = parseFloat(document.getElementById("preco").value);
    let taxa = parseFloat(document.getElementById("taxa").value);
    let transporte = parseFloat(document.getElementById("transporte").value);
    let materiais = parseFloat(document.getElementById("materiais").value);
    let cafe = parseFloat(document.getElementById("cafe").value);
    let aluguel = parseFloat(document.getElementById("aluguel").value);
    let trafegoPago = parseFloat(document.getElementById("trafegoPago").value);
    let quantidadeParticipantes = parseInt(document.getElementById("quantidadeParticipantes").value);
  
    // Verificar se todos os valores são números válidos
    if (isNaN(preco) || isNaN(taxa) || isNaN(transporte) || isNaN(materiais) || isNaN(cafe) || isNaN(aluguel) || isNaN(trafegoPago) || isNaN(quantidadeParticipantes)) {
      alert("Por favor, insira apenas números válidos em todos os campos.");
      return; // Se houver um campo inválido, interrompe a execução da função
    }
  
    // Definir valores padrão caso o campo seja vazio ou inválido
    preco = preco || 0;
    taxa = taxa || 0;
    transporte = transporte || 0;
    materiais = materiais || 0;
    cafe = cafe || 0;
    aluguel = aluguel || 0;
    trafegoPago = trafegoPago || 0;
    quantidadeParticipantes = quantidadeParticipantes || 1;
  
    // Calcular o total de gastos antes do tráfego
    let somaGastos = transporte + materiais * quantidadeParticipantes + cafe * quantidadeParticipantes + aluguel;
    let somaGastosComTrafego = somaGastos + trafegoPago;
  
    // Calcular o total pago por todos os participantes
    let totalPago = preco * quantidadeParticipantes;
  
    // Calcular a taxa retirada, considerando a taxa por participante
    let taxaRetirada = ((preco * taxa) / 100) * quantidadeParticipantes;
  
    // Calcular a falta a receber
    let faltaReceber = totalPago -  taxaRetirada ;
  
    // Calcular o valor por participante, considerando o tráfego pago
    let gastoPorParticipante = somaGastosComTrafego / quantidadeParticipantes;
  
    // Calcular o lucro
    let lucro = (taxaRetirada + faltaReceber) - somaGastosComTrafego;
  
    // Exibir os resultados
    document.getElementById("transporteRetirado").innerText = `R$ ${transporte.toFixed(2)}`;
    document.getElementById("materiaisRetirados").innerText = `R$ ${(materiais * quantidadeParticipantes).toFixed(2)}`;
    document.getElementById("cafeRetirado").innerText = `R$ ${(cafe * quantidadeParticipantes).toFixed(2)}`;
    document.getElementById("aluguelRetirado").innerText = `R$ ${aluguel.toFixed(2)}`;
    document.getElementById("trafegoPagoRetirado").innerText = `R$ ${trafegoPago.toFixed(2)}`;
    document.getElementById("somaGastos").innerText = `R$ ${somaGastosComTrafego.toFixed(2)}`;
    document.getElementById("taxaRetirada").innerText = `R$ ${taxaRetirada.toFixed(2)}`;
    document.getElementById("resultado").innerText = `R$ ${faltaReceber.toFixed(2)}`;
    document.getElementById("gastoPorParticipante").innerText = `R$ ${gastoPorParticipante.toFixed(2)}`;
    document.getElementById("Lucro").innerText = `R$ ${lucro.toFixed(2)}`;
    document.getElementById("qtdParticipantes").innerText = quantidadeParticipantes;
  
    // Gerar gráfico
    criarGraficoPizza([transporte, trafegoPago, materiais, cafe, aluguel]);
  }
  

