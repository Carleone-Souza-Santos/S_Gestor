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

  let preco = parseFloat(document.getElementById("preco").value) || 0;
  let taxa = parseFloat(document.getElementById("taxa").value) || 0;
  let transporte = parseFloat(document.getElementById("transporte").value) || 0;
  let materiais = parseFloat(document.getElementById("materiais").value) || 0;
  let cafe = parseFloat(document.getElementById("cafe").value) || 0;
  let aluguel = parseFloat(document.getElementById("aluguel").value) || 0;
  let trafegoPago = parseFloat(document.getElementById("trafegoPago").value) || 0;
  let quantidadeParticipantes = parseInt(document.getElementById("quantidadeParticipantes").value) || 1;

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


