import React, { useState } from "react";
import "./BoxViewer.css";

const boxesData = {
  box1: {
    pedidosDentro: [
      { numero: "001", oms: ["OM12345", "OM54321"] },
      { numero: "002", oms: ["OM98765"] },
    ],
    pedidosFaltando: [
      { numero: "003", oms: ["OM77777", "OM88888", "OM99999"] },
    ],
  },
  box2: {
    pedidosDentro: [
      { numero: "004", oms: ["OM22222"] },
    ],
    pedidosFaltando: [
      { numero: "005", oms: ["OM33333", "OM44444"] },
    ],
  },
  box3: {
    pedidosDentro: [
      { numero: "006", oms: ["OM55555"] }
    ],
    pedidosFaltando: [],
  },
  box4: {
    pedidosDentro: [],
    pedidosFaltando: [
      { numero: "007", oms: ["OM66666"] }
    ],
  },
  box5: {
    pedidosDentro: [
      { numero: "008", oms: ["OM77777", "OM88888"] }
    ],
    pedidosFaltando: [],
  },
  box6: {
    pedidosDentro: [
      { numero: "009", oms: ["OM99999"] }
    ],
    pedidosFaltando: [
      { numero: "010", oms: ["OM00000"] }
    ],
  },
};

export default function BoxViewer() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [selectedPedidoStatus, setSelectedPedidoStatus] = useState(null); // "dentro" ou "faltando"

  const handleBoxClick = (box) => {
    setSelectedBox(box);
    setSelectedPedido(null);
    setSelectedPedidoStatus(null);
  };

  const handlePedidoClick = (pedido, status) => {
    setSelectedPedido(pedido);
    setSelectedPedidoStatus(status);
  };

  const handleBackToBoxes = () => {
    setSelectedBox(null);
    setSelectedPedido(null);
    setSelectedPedidoStatus(null);
  };

  const handleBackToPedidos = () => {
    setSelectedPedido(null);
    setSelectedPedidoStatus(null);
  };

  return (
    <div className="container">
      <h1 className="title">Visualizador de Boxes</h1>

      {!selectedBox && (
        <div className="grid-boxes">
          {Object.keys(boxesData).map((boxKey, index) => (
            <div
              key={boxKey}
              onClick={() => handleBoxClick(boxKey)}
              className="box yellow"
            >
              Box {index + 1}
            </div>
          ))}
        </div>
      )}

      {selectedBox && !selectedPedido && (
        <>
          <button onClick={handleBackToBoxes} className="btn-back">
            ← Voltar
          </button>
          <h2 className="subtitle">Pedidos no {selectedBox.toUpperCase()}</h2>

          <div className="pedidos-container">
            {/* Pedidos dentro - verdes */}
            {boxesData[selectedBox].pedidosDentro.length > 0 && (
              <>
                <h3 className="pedidos-title green">Pedidos Dentro</h3>
                <div className="pedidos-list">
                  {boxesData[selectedBox].pedidosDentro.map((pedido, i) => (
                    <div
                      key={i}
                      className="pedido green"
                      onClick={() => handlePedidoClick(pedido, "dentro")}
                    >
                      Pedido {pedido.numero}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Pedidos faltando - vermelhos */}
            {boxesData[selectedBox].pedidosFaltando.length > 0 && (
              <>
                <h3 className="pedidos-title red">Pedidos Faltando</h3>
                <div className="pedidos-list">
                  {boxesData[selectedBox].pedidosFaltando.map((pedido, i) => (
                    <div
                      key={i}
                      className="pedido red"
                      onClick={() => handlePedidoClick(pedido, "faltando")}
                    >
                      Pedido {pedido.numero}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {selectedPedido && (
        <div className={`oms-container oms-${selectedPedidoStatus}`}>
          <button onClick={handleBackToPedidos} className="btn-back">
            ← Voltar para Pedidos
          </button>
          <h2 className="subtitle">
            OMs do Pedido {selectedPedido.numero} ({selectedPedidoStatus})
          </h2>
          <ul className="oms-list">
            {selectedPedido.oms.map((om, i) => (
              <li key={i} className="om-item">
                {om}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
