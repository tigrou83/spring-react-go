function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			boardStatus: Array(19).fill(Array(19).fill(null)),
			currentPlayer: 'X'
		};
	}
	
	handleClick(row, col) {
		let currentValue = this.state.boardStatus[row][col];
		if (currentValue === null) {
			console.log('handleClick: ' + row + ' ' + col);
			const boardStatusRows = this.state.boardStatus.slice();
			const boardStatusCols = boardStatusRows[row].slice();
			boardStatusCols[col] = this.state.currentPlayer;
			boardStatusRows[row] = boardStatusCols;
			this.setState({boardStatus: boardStatusRows});
			// Change current player
			let newCurrentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
			this.setState({currentPlayer: newCurrentPlayer});
		}
	}
	
	renderSquare(row, col) {
		return <Square onClick={() => this.handleClick(row, col)} value={this.state.boardStatus[row][col]} />;
	}

	render() {
		const status = 'Current player: ' + this.state.currentPlayer;

	    var nbOfRows = 19;
	    var nbOfColums = 19;
	    var rows = [];
	    for (var i=0;i<nbOfRows;i++) {
	      var columns = [];
	      for (var j=0;j<nbOfColums;j++) {
	        columns.push(this.renderSquare(i, j));
	      }
	      rows.push(<div className="board-row">{columns}</div>);
	    }
	
	    return (
	      <div>
	        <div className="status">{status}</div>
	        {rows}
	      </div>
	    );
	}
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
