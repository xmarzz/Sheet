import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";

const rows = 10;
const cols = 10;

const Spreadsheet: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: { raw: string; display: string } }>(
    JSON.parse(localStorage.getItem("spreadsheet") || "{}")
  );
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  useEffect(() => {
    const savedData = localStorage.getItem("spreadsheet");
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error loading spreadsheet data:", e);
      }
    }
  }, []);

  const cellToKey = (cellRef: string): string | null => {
    const match = cellRef.match(/^([A-Z])([0-9]+)$/);
    if (!match) return null;
    const colIndex = match[1].charCodeAt(0) - 65;
    const rowIndex = parseInt(match[2], 10) - 1;
    return `${rowIndex}-${colIndex}`;
  };

  const evaluateFormula = (formula: string, currentData: typeof data): string => {
    if (!formula.startsWith("=")) return formula;

    try {
      const expression = formula.substring(1);
      const parsedExpression = expression.replace(/[A-Z][0-9]+/g, (match) => {
        const key = cellToKey(match);
        if (!key || !currentData[key]) return "0";
        return currentData[key].display;
      });
      return evaluate(parsedExpression).toString();
    } catch (error) {
      console.error("Formula evaluation error:", error);
      return "ERROR";
    }
  };

  const recalculateAll = (newData: typeof data): typeof data => {
    const updatedData = { ...newData };
    for (const key in updatedData) {
      if (updatedData[key].raw.startsWith("=")) {
        updatedData[key].display = evaluateFormula(updatedData[key].raw, updatedData);
      }
    }
    return updatedData;
  };

  const handleCellSelect = (key: string) => {
    setSelectedCell(key);
    const cellData = data[key];
    setEditValue(cellData ? cellData.raw : "");
  };

  const handleEditChange = (value: string) => {
    setEditValue(value);
  };

  const handleEditComplete = () => {
    if (!selectedCell) return;

    const newData = { ...data };
    const raw = editValue.trim();
    let display = raw;

    if (raw.startsWith("=")) {
      display = evaluateFormula(raw, newData);
    }

    newData[selectedCell] = { raw, display };
    const finalData = recalculateAll(newData);
    setData(finalData);
    setEditValue(raw);
    localStorage.setItem("spreadsheet", JSON.stringify(finalData));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditComplete();
      if (selectedCell) {
        const [row, col] = selectedCell.split("-").map(Number);
        const nextKey = `${row + 1}-${col}`;
        if (row + 1 < rows) setSelectedCell(nextKey);
      }
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="w-full p-2 border mb-2"
        value={editValue}
        onChange={(e) => handleEditChange(e.target.value)}
        onBlur={handleEditComplete}
        onKeyPress={handleKeyPress}
        placeholder="Enter formula or value"
      />
      <table className="border-collapse border border-gray-500 w-full">
        <thead>
          <tr>
            <th className="border p-1"></th>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <th key={colIndex} className="border p-1 bg-gray-100">
                {String.fromCharCode(65 + colIndex)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border p-1 bg-gray-100 font-medium text-center">
                {rowIndex + 1}
              </td>
              {Array.from({ length: cols }).map((_, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                const cellData = data[cellKey];
                return (
                  <td key={cellKey} className="border p-1">
                    <input
                      type="text"
                      className="w-full p-1 outline-none focus:ring-2 focus:ring-blue-500"
                      value={
                        selectedCell === cellKey && editValue !== ""
                          ? editValue
                          : cellData
                          ? cellData.display
                          : ""
                      }
                      onChange={(e) => handleEditChange(e.target.value)}
                      onFocus={() => handleCellSelect(cellKey)}
                      onBlur={handleEditComplete}
                      onKeyPress={handleKeyPress}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;