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
			currentPlayerIsBlack: true
		};
	}
	
	handleClick(row, col) {
		let currentValue = this.state.boardStatus[row][col];
		if (currentValue === null) {
			console.log('handleClick: ' + row + ' ' + col);
			const boardStatusRows = this.state.boardStatus.slice();
			const boardStatusCols = boardStatusRows[row].slice();
			boardStatusCols[col] = this.state.currentPlayerIsBlack ? 'B' : 'W';
			boardStatusRows[row] = boardStatusCols;
			this.setState({boardStatus: boardStatusRows});
			// Change current player
			this.setState({currentPlayerIsBlack: !this.state.currentPlayerIsBlack});
		}
	}
	
	renderSquare(row, col) {
		return <Square onClick={() => this.handleClick(row, col)} value={this.state.boardStatus[row][col]} />;
	}

	render() {
		const status = 'Current player: ' + (this.state.currentPlayerIsBlack ? 'B' : 'W');

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
