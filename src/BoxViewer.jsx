import React, { useState } from "react";
import "./BoxViewer.css";

const boxesData = {
  box1: {
    inside: ["Produto A", "Produto B"],
    missing: ["Produto C", "Produto D"],
  },
  box2: {
    inside: ["Produto E"],
    missing: ["Produto F", "Produto G", "Produto H"],
  },
  box3: {
    inside: ["Produto I", "Produto J", "Produto K"],
    missing: [],
  },
  box4: {
    inside: [],
    missing: ["Produto L", "Produto M"],
  },
  box5: {
    inside: ["Produto N"],
    missing: ["Produto O"],
  },
  box6: {
    inside: ["Produto P", "Produto Q"],
    missing: ["Produto R"],
  },
};

export default function BoxViewer() {
  const [selectedBox, setSelectedBox] = useState(null);

  const handleClick = (box) => {
    setSelectedBox(box);
  };

  const handleBack = () => {
    setSelectedBox(null);
  };

  return (
    <div className="outer-container">
      <h1 className="title">Visualizador de Boxes</h1>

      {!selectedBox && (
        <div className="grid-boxes">
          {Object.keys(boxesData).map((boxKey, index) => (
            <div
              key={boxKey}
              className="box yellow"
              onClick={() => handleClick(boxKey)}
            >
              Box {index + 1}
            </div>
          ))}
        </div>
      )}

      {selectedBox && (
        <div>

          <button className="btn-back" onClick={handleBack}>
            ← Voltar
          </button>
          

          <h2 className="subtitle">Produtos no {selectedBox.toUpperCase()}</h2>

          <div className="products-list">
            {boxesData[selectedBox].inside.map((prod, i) => (
              <div key={i} className="product green">
                {prod} (Dentro)
              </div>
            ))}
            {boxesData[selectedBox].missing.map((prod, i) => (
              <div key={i + 100} className="product red">
                {prod} (Faltando)
              </div>
            ))}
          </div>
        </div>
        
      )}
    </div>
  );
}
