import { BollingerChart } from './components/BollingerChart';
import './App.css';

const labels = [
  '01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01', '08/01', '09/01', '10/01', 
  '11/01', '12/01', '13/01', '14/01', '15/01', '16/01', '17/01', '18/01', '19/01', '20/01', 
  '21/01', '22/01', '23/01', '24/01', '25/01', '26/01', '27/01', '28/01'
];

// Dados de consumo
const consumo = [0.04, 0.02, 0.20, 0.12, 0.14, 0.15, 0.26, 0.14, 0.08, 0.15, 0.20, 0.10, 0.38, 0.08, 0.14, 0.20, 0.07, 0.02, 0.10, 0.14, 0.16, 0.33, 0.14, 0.52, 0.10, 0.04, 0.20, 0.10];

// Média móvel de 7 dias
const mediaMovel = [0.10, 0.08, 0.10, 0.11, 0.13, 0.15, 0.16, 0.16, 0.15, 0.15, 0.15, 0.16, 0.15, 0.15, 0.17, 0.16, 0.15, 0.13, 0.14, 0.13, 0.15, 0.15, 0.14, 0.16, 0.17, 0.15, 0.18, 0.17];

// Bandas superiores
const bandaSuperior1 = [0.25, 0.32, 0.42, 0.38, 0.33, 0.31, 0.34, 0.33, 0.43, 0.33, 0.33, 0.40, 0.42, 0.56, 0.53, 0.56, 0.44, 0.42, 0.40, 0.41, 0.42, 0.49, 0.55, 0.64, 0.55, 0.42, 0.38, 0.40];
const bandaSuperior2 = [0.20, 0.27, 0.32, 0.31, 0.28, 0.27, 0.29, 0.30, 0.34, 0.30, 0.30, 0.33, 0.32, 0.42, 0.42, 0.44, 0.36, 0.35, 0.33, 0.34, 0.35, 0.40, 0.44, 0.50, 0.43, 0.35, 0.32, 0.35];
const bandaSuperior3 = [0.15, 0.20, 0.21, 0.22, 0.21, 0.21, 0.22, 0.23, 0.24, 0.22, 0.22, 0.25, 0.23, 0.30, 0.30, 0.32, 0.26, 0.25, 0.24, 0.24, 0.26, 0.30, 0.32, 0.40, 0.32, 0.26, 0.25, 0.25];

// Bandas inferiores
const bandaInferior1 = [0.05, 0.00, 0.00, 0.00, 0.05, 0.08, 0.08, 0.09, 0.08, 0.07, 0.08, 0.06, 0.05, 0.05, 0.06, 0.07, 0.06, 0.04, 0.05, 0.05, 0.06, 0.07, 0.07, 0.08, 0.08, 0.05, 0.08, 0.07];
const bandaInferior2 = [-0.05, -0.10, -0.10, -0.10, -0.05, -0.02, -0.03, -0.03, -0.05, -0.07, -0.05, -0.10, -0.12, -0.10, -0.10, -0.09, -0.10, -0.15, -0.12, -0.10, -0.08, -0.05, -0.10, -0.20, -0.07, -0.14, -0.05, -0.30];

export default function App() {
  return (
    <div className="container">
      <div className="dashboard-card">
        <div className="card-header">
          <h2>Gráfico de Classificação de Consumo</h2>
        </div>
        <div className="card-body">
          <div className="chart-container">
            <BollingerChart
              labels={labels}
              consumo={consumo}
              mediaMovel={mediaMovel}
              bandaSuperior1={bandaSuperior1}
              bandaSuperior2={bandaSuperior2}
              bandaSuperior3={bandaSuperior3}
              bandaInferior1={bandaInferior1}
              bandaInferior2={bandaInferior2}
            />
          </div>
          
          <div className="chart-info">
            <div className="info-item">
              <div className="color-indicator excessive"></div>
              <span>Consumo Excessivo</span>
            </div>
            <div className="info-item">
              <div className="color-indicator high"></div>
              <span>Consumo Elevado</span>
            </div>
            <div className="info-item">
              <div className="color-indicator moderate"></div>
              <span>Consumo Moderado</span>
            </div>
            <div className="info-item">
              <div className="color-indicator efficient"></div>
              <span>Uso Eficiente</span>
            </div>
            <div className="info-item">
              <div className="color-indicator economy"></div>
              <span>Economia Máxima</span>
            </div>
          </div>
          
          <div className="chart-description">
            <p>Este gráfico classifica o consumo em diferentes categorias usando bandas de Bollinger para análise estatística. 
            Um <strong>consumo excessivo</strong> ultrapassa a banda superior, enquanto uma <strong>economia máxima</strong> fica abaixo da banda inferior. 
            A média móvel de 7 dias fornece a tendência central do consumo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
