# Spreadsheet App - Functionalities

A simple web spreadsheet built with [React](https://reactjs.org/), mimicking Google Sheets basics.

## Functionalities

- **Grid Layout**:
  - 10x10 cells (rows 1-10, columns A-J).
  - Click any cell to select and edit.

- **Data Input**:
  - Type numbers (e.g., `2` in `A1`, `3` in `B1`) or text directly into cells.
  - Values save to your browser and reload on refresh.

- **Formula Bar**:
  - Shows the selected cell’s value or formula (e.g., `=SUM(A1:B1)`).
  - Edit here or in the cell; press Enter or click away to save.

- **Mathematical Functions**:
  - `=SUM(A1:B1)`: Sums a horizontal (e.g., `A1` to `B1`) or vertical (e.g., `A1:A3`) range.
    - Example: `2` in `A1`, `3` in `B1`, `=SUM(A1:B1)` in `C1` → `5`.
  - `=AVERAGE(A1:B1)`: Averages values in a range.
  - `=MAX(A1:B1)`: Finds the highest value in a range.
  - `=MIN(A1:B1)`: Finds the lowest value in a range.
  - `=COUNT(A1:B1)`: Counts numeric values in a range.

- **Basic Formulas**:
  - Supports simple math (e.g., `=A1+B1` or `=A1*2`).
  - Updates when referenced cells change.

- **Navigation**:
  - Press Enter to move to the cell below (e.g., `A1` to `A2`).

## How to Run

1. **Install**:
   - Clone the repo and run:
     ```bash
     npm install
     npm install mathjs
     ```

2. **Start**:
   - Launch with:
     ```bash
     npm start
     ```
   - Open `http://localhost:3000`.

## Tech Used

- **[React](https://reactjs.org/)**: For the interactive UI.
- **TypeScript**: For type safety.
- **mathjs**: Powers formula calculations.
- **Local Storage**: Saves your data.

## Notes

- Only horizontal (e.g., `A1:B1`) or vertical (e.g., `A1:A3`) ranges work for functions.
- Errors show as "ERROR" in cells.

---

This focuses on what your app does, links to React for context, and includes just enough setup info. Save it as `README.md`. If you want to add deployment steps (e.g., Vercel) or tweak the tone, let me know!
