import { BollingerChart } from './components/BollingerChart';
import './App.css';
import dados from './dados.json'

export default function App() {
  return (
    <div className="container">
      <div className="dashboard-card">
        <div className="card-header">
          <h2>Gráfico de Classificação de Consumo</h2>
        </div>
        <div className="card-body">
          <div className="chart-container">
            <BollingerChart data={dados} />
          </div>
          
          <div className="chart-info">
            <div className="info-item">
              <div className="color-indicator excessive"></div>
              <span>Muito Alto</span>
            </div>
            <div className="info-item">
              <div className="color-indicator high"></div>
              <span>Alto</span>
            </div>
            <div className="info-item">
              <div className="color-indicator moderate"></div>
              <span>Normal</span>
            </div>
            <div className="info-item">
              <div className="color-indicator efficient"></div>
              <span>Baixo</span>
            </div>
            <div className="info-item">
              <div className="color-indicator economy"></div>
              <span>Muito Baixo</span>
            </div>
          </div>
          
          <div className="chart-description">
            <p>Este gráfico classifica o consumo em diferentes categorias usando bandas de Bollinger para análise estatística. </p>
          </div>
        </div>
      </div>
    </div>
  );
}
