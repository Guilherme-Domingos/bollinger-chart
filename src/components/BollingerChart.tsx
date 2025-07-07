import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BollingerChartProps {
  data: Array<{
    Data: string;
    Consumo: number;
    'Média Móvel': number;
    'Banda Sup 3': number;
    'Banda Sup 2': number;
    'Banda Sup 1': number;
    'Banda Inf 1': number;
    'Banda Inf 2': number;
    'Banda Inf 3': number;
  }>;
}

export const BollingerChart: React.FC<BollingerChartProps> = ({ data }) => {
  // Preparar os dados para o gráfico
  const labels = data.map(item => {
  const [year, month, day] = item.Data.split('-').map(Number);
  const date = new Date(year, month - 1, day); // mês começa do zero!
  return date.toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' });
});

  const consumo = data.map(item => item.Consumo);
  const mediaMovel = data.map(item => item['Média Móvel']);
  const bandaSup3 = data.map(item => item['Banda Sup 3']);
  const bandaSup2 = data.map(item => item['Banda Sup 2']);
  const bandaSup1 = data.map(item => item['Banda Sup 1']);
  const bandaInf1 = data.map(item => item['Banda Inf 1']);
  const bandaInf2 = data.map(item => item['Banda Inf 2']);
  const bandaInf3 = data.map(item => item['Banda Inf 3']);

  // Identificar pontos especiais baseados na classificação
  const pontosBaixoNormal = data.map((item) => 
    item.Consumo < item['Banda Inf 1'] ? item.Consumo : null
  );
  const pontosAcimaNormal = data.map((item) => 
    item.Consumo > item['Banda Sup 1'] ? item.Consumo : null
  );

  const chartData = {
    labels,
    datasets: [
      // Linha superior (Banda Sup 3) - só para definir o limite superior
      {
        label: '',
        data: bandaSup3,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 0,
      },
      // Banda Muito Alto (preenchimento até a linha anterior)
      {
        label: 'Muito alto',
        data: bandaSup2,
        borderColor: 'transparent',
        backgroundColor: 'rgba(255, 182, 193, 0.5)',
        fill: '-1',
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 0,
      },
      // Banda Alto
      {
        label: 'Alto',
        data: bandaSup1,
        borderColor: 'transparent',
        backgroundColor: 'rgba(255, 218, 185, 0.5)',
        fill: '-1',
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 0,
      },
      // Banda Normal (área entre Banda Inf 1 e Banda Sup 1)
      {
        label: 'Normal',
        data: bandaInf1,
        borderColor: 'transparent',
        backgroundColor: 'rgba(144, 238, 144, 0.5)',
        fill: '-1',
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 0,
      },
      // Banda Baixo
      {
        label: 'Baixo',
        data: bandaInf2,
        borderColor: 'transparent',
        backgroundColor: 'rgba(255, 255, 224, 0.5)',
        fill: '-1',
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 0,
      },
      // Banda Muito Baixo
      {
        label: 'Muito baixo',
        data: bandaInf3,
        borderColor: 'transparent',
        backgroundColor: 'rgba(255, 182, 193, 0.5)',
        fill: '-1',
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 0,
      },
      // Linha da média móvel
      {
        label: 'Média Móvel (30d)',
        data: mediaMovel,
        borderColor: 'rgba(255, 165, 0, 0.5)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
      // Linha do consumo
      {
        label: 'Consumo',
        data: consumo,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
      // Pontos especiais - Abaixo do Normal
      {
        label: 'Abaixo do Normal',
        data: pontosBaixoNormal,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.1,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 0,
        showLine: false,
      },
      // Pontos especiais - Acima do normal
      {
        label: 'Acima do Normal',
        data: pontosAcimaNormal,
        borderColor: 'rgb(253, 38, 84, 1)',
        backgroundColor: 'rgba(253, 38, 84, 1)',
        fill: false,
        tension: 0.1,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 0,
        showLine: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 11,
          },
          filter: function(legendItem: any) {
            // Ocultar datasets auxiliares vazios
            return legendItem.text !== '';
          },
        },
      },
      title: {
        display: true,
        text: 'Gráfico de classificação de consumo com bandas de Bollinger',
        font: {
          size: 16,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            if (label === 'Consumo' || label === 'Média Móvel (30d)') {
              return `${label}: ${context.parsed.y.toFixed(2)}`;
            }
            return undefined;
          },
        },
        filter: function(tooltipItem: any) {
          return tooltipItem.dataset.label === 'Consumo' || 
                 tooltipItem.dataset.label === 'Média Móvel (30d)' ||
                 tooltipItem.dataset.label === 'Abaixo do Normal' ||
                 tooltipItem.dataset.label === 'Desperdício';
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Data',
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Consumo',
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        min: -250,
        max: 550,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.1,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};
