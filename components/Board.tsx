"use client";

import { useState } from "react";
import styles from "@/components/Board.module.css";

const Board = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const checkWinner = (board: string[][]) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ""
      ) {
        alert(`${board[i][0]} wins`);
      }
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== ""
      ) {
        alert(`${board[0][i]} wins`);
      }
    }
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      alert(`${board[0][0]} wins`);
    }
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      alert(`${board[0][2]} wins`);
    }
  };

  const handleClick = (row: number, col: number) => {
    if (board[row][col] === "") {
      const newBoard = board.map((rowArray, rowIndex) => {
        if (row === rowIndex) {
          return rowArray.map((cell, colIndex) => {
            if (col === colIndex) {
              return "X";
            }
            return cell;
          });
        }
        return rowArray;
      });
      setBoard(newBoard);
      checkWinner(newBoard);
    }
  };

  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={styles.cell}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
