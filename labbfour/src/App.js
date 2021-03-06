import React from 'react';
import './App.css';



  class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        board: [],
        over: false,
        message: '',
        firstplayer: 1,
        secplayer: 2,
        currentP: null,
      };

      this.play = this.play.bind(this);
    }



      Playertar() {
        return (this.state.currentP === this.state.firstplayer) ? this.state.secplayer : this.state.firstplayer;
      }

        // fixa.
    CheckL(board) {
      for (let first = 3; first < 6; first++) {
        for (let sec = 3; sec < 7; sec++) {
          if (board[first][sec]) {
            if (board[first][sec] === board[first - 1][sec - 1] &&
                board[first][sec] === board[first - 2][sec - 2] &&
                board[first][sec] === board[first - 3][sec - 3]) {
        return board[first][sec];
          }
        }
      }
    }
    }

    CheckV(board) {
      for (let first = 3; first < 6; first++) {
        for (let sec = 0; sec < 7; sec++) {
          if (board[first][sec]) {
            if (board[first][sec] === board[first - 1][sec] &&
                board[first][sec] === board[first - 2][sec] &&
                board[first][sec] === board[first - 3][sec]) {
        return board[first][sec];
            }
          }
        }
      }
    }

    CheckR(board) {
      // console.log(board) // varför visas inte arrayn?
      for (let first = 3; first < 6; first++) {
        for (let sec = 0; sec < 4; sec++) {
          if (board[first][sec]) {
            if (board[first][sec] === board[first - 1][sec + 1] &&
                board[first][sec] === board[first - 2][sec + 2] &&
                board[first][sec] === board[first - 3][sec + 3]) {
        return board[first][sec];
            }
          }
        }
      }
    }

    CheckH(board) {
      for (let first = 0; first < 6; first++) {
        for (let sec = 0; sec < 4; sec++) {
          if (board[first][sec]) {
            if (board[first][sec] === board[first][sec + 1] &&
                board[first][sec] === board[first][sec + 2] &&
                board[first][sec] === board[first][sec + 3]) {
          return board[first][sec];

          // fixa H
             }
           }
         }
       }
     }

    play(sec) {
      if (!this.state.over) {
        let board = this.state.board;
        for (let first = 5; first >= 0; first--) {
          if (!board[first][sec]) {
            board[first][sec] = this.state.currentP;
            break;
          }
        }

        // kolla vem som vann

        let result = this.Call(board);
        if (result === this.state.firstplayer) {
          this.setState({ board, over: true, message: 'First Player Wins!' });
        } else if (result === this.state.secplayer) {
          this.setState({ board, over: true, message: 'Second Player Wins' });
        } else if (result === 'draw') {
          this.setState({ board, over: true, message: 'Draw' });
        } else {
          this.setState({ board, currentP: this.Playertar() });
        }
      } else {
        this.setState({ message: 'Its over, start a new game' });
      }
    }

    // Startar ett nytt spel
    newGame() {
      let board = [];
      // console.log(board)
      for (let first = 0; first < 6; first++) {
        console.log(first)
        let row = [];
        for (let sec = 0; sec < 7; sec++) { row.push(null) }
        board.push(row);
      }

      this.setState({
        board,
        over: false,
        currentP: this.state.firstplayer,
        message: ''
      });
    }


    Draw(board) {
      // console.log(board)
      for (let first = 0; first < 6; first++) {
        for (let sec = 0; sec < 7; sec++) {
          if (board[first][sec] === null) {
            return null;
          }
        }
      }

      return 'draw';
    }

    Call(board) {
      return  this.CheckL(board) || this.CheckH(board) || this.Draw(board) || this.CheckV(board) || this.CheckR(board);
    }

    componentWillMount() {
      this.newGame();
    }

    render() {
      return (
        <div>
          <button className="button" onClick={() => {this.newGame()}}>Play Again</button>
          <table>
            <thead>
            </thead>
            <tbody>
              {this.state.board.map((row, i) => (<Around row={row} play={this.play} />))}
            </tbody>
          </table>

          <p className="message">{this.state.message}</p>
        </div>
      );
    }
  }

  const Around = ({ row, play }) => {
    console.log(row) // löst?, vad gör jag fel här?
    return (
      <tr>
        {row.map((cell, i) => <Back  value={cell} ind={i} play={play} />)}
      </tr>

    );
  };

  const Back = ({ value, ind, play }) => {
    let circles = 'empty';
    console.log(ind)
    if (value === 1) {
      circles = 'firstplayer';
    } else if (value === 2) {
      circles = 'secondplayer';
    }





    return (
      <td>
        <div className="head-div" onClick={() => {play(ind)}}>
          <div className={circles}></div>
        </div>
      </td>
    );
};


export default App;
