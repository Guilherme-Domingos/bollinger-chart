import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

interface Props {
  labels: string[];
  consumo: number[];
  mediaMovel: number[];
  bandaSuperior1: number[]; // Consumo Excessivo
  bandaSuperior2: number[]; // Consumo Elevado
  bandaSuperior3: number[]; // Consumo Moderado
  bandaInferior1: number[]; // Uso Eficiente
  bandaInferior2: number[]; // Economia Máxima
}

export const BollingerChart: React.FC<Props> = ({
  labels,
  consumo,
  mediaMovel,
  bandaSuperior1,
  bandaSuperior2,
  bandaSuperior3,
  bandaInferior1,
  bandaInferior2
}) => {
  const outliersExcessivos = consumo.map((val, i) =>
    val > bandaSuperior1[i] ? val : null
  );
  
  const outliersEconomia = consumo.map((val, i) =>
    val < bandaInferior2[i] ? val : null
  );  const data = {
    labels,
    datasets: [
      // Área de Consumo Excessivo (acima da banda superior 1)
      {
        label: 'Consumo Excessivo',
        data: bandaSuperior1,
        borderColor: 'rgba(255, 99, 132, 0.3)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        fill: '+1',
        pointRadius: 0,
        borderDash: [5, 5],
      },
      // Área de Consumo Elevado (entre bandas superior 1 e 2)
      {
        label: 'Consumo Elevado',
        data: bandaSuperior2,
        borderColor: 'rgba(255, 159, 64, 0.3)',
        backgroundColor: 'rgba(255, 159, 64, 0.3)',
        fill: '+1',
        pointRadius: 0,
        borderDash: [5, 5],
      },
      // Área de Consumo Moderado (entre bandas superior 2 e 3)
      {
        label: 'Consumo Moderado',
        data: bandaSuperior3,
        borderColor: 'rgba(255, 205, 86, 0.3)',
        backgroundColor: 'rgba(255, 205, 86, 0.3)',
        fill: '+1',
        pointRadius: 0,
        borderDash: [5, 5],
      },
      // Área de Uso Eficiente (entre média móvel e banda inferior 1)
      {
        label: 'Uso Eficiente',
        data: bandaInferior1,
        borderColor: 'rgba(75, 192, 192, 0.3)',
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        fill: '+1',
        pointRadius: 0,
        borderDash: [5, 5],
      },
      // Área de Economia Máxima (abaixo da banda inferior 2)
      {
        label: 'Economia Máxima',
        data: bandaInferior2,
        borderColor: 'rgba(134, 229, 134, 0.3)',
        backgroundColor: 'rgba(134, 229, 134, 0.3)',
        fill: false,
        pointRadius: 0,
        borderDash: [5, 5],
      },      // Linha de Consumo
      {
        label: 'Consumo',
        data: consumo,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
        zIndex: 10,
      },
      // Média móvel
      {
        label: 'Média Móvel (7d)',
        data: mediaMovel,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointRadius: 0,
        zIndex: 9,
      },
      // Outliers - Consumo Excessivo
      {
        label: 'Excessivo',
        data: outliersExcessivos,
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
        fill: false,
        zIndex: 11,
      },
      // Outliers - Economia Máxima
      {
        label: 'Economia Máxima',
        data: outliersEconomia,
        backgroundColor: 'rgba(0, 0, 255, 0.8)',
        borderColor: 'rgba(0, 0, 255, 1)',
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
        fill: false,
        zIndex: 11,
      }
    ]
  };  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 30,
        top: 20,
        bottom: 10
      }
    },    plugins: {
      legend: {
        display: false, // Escondendo a legenda já que temos nossa própria legenda customizada
      },      title: {
        display: false, // Escondemos o título já que temos um no card
      },      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'white', // Garantindo cor clara para o título em fundo escuro
        bodyColor: 'white', // Garantindo cor clara para o conteúdo em fundo escuro
        titleFont: {
          size: 13
        },
        bodyFont: {
          size: 12
        },
        padding: 10,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2);
            }
            return label;
          }
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },    scales: {      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        },        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45,
          maxTicksLimit: 10,
          font: {
            size: 10
          },
          color: '#333' // Escurecendo mais a cor do texto para melhorar o contraste
        },        title: {
          display: true,
          text: 'Data',
          color: '#333', // Escurecendo mais a cor do texto para melhorar o contraste
          font: {
            size: 12
          }
        }
      },      y: {
        beginAtZero: false,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        },        ticks: {
          callback: function(value: any) {
            return value.toLocaleString();
          },
          font: {
            size: 10
          },
          color: '#333' // Escurecendo mais a cor do texto para melhorar o contraste
        },        title: {
          display: true,
          text: 'Consumo',
          color: '#333', // Escurecendo mais a cor do texto para melhorar o contraste
          font: {
            size: 12
          }
        }
      }
    }
  };
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Line data={data} options={options} />
    </div>
  );
};
