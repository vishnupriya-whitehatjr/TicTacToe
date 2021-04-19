import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons as Icons } from "react-native-vector-icons";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    };
  }
  componentDidMount() {
    this.initializeGame();
  }
  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    });
  };
  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icons name="close" style={styles.tileX} />;
      case -1:
        return <Icons name="circle-outline" style={styles.tileO} />;

      default:
        return <View />;
    }
  };
  //returns 1 if the player 1 won, -1 if player 2 won, 0 if no one wins
  getWinner = () => {
    const NUM_TILES = 3;
    var sum;
    var arr = this.state.gameState;
    //check rows

    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    //check columns

    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    //check diagonals

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    return 0;
  };
  onTilePress = (row, col) => {
    //don't allow the tiles to change
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }
    var currentPlayer = this.state.currentPlayer;

    //set the correct tile
    var arr = this.state.gameState.slice();

    arr[row][col] = currentPlayer;
    console.log(arr);
    this.setState({
      gameState: arr,
    });
    //switch to the other variable
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //check winners
    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 is the winner");
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert("Player 2 is the winner");
      this.initializeGame();
    }
  };
  //for a new game
  newGame = () => {
    this.initializeGame();
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
            onPress={() => {
              this.onTilePress(0, 0);
            }}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, { borderTopWidth: 0 }]}
            onPress={() => {
              this.onTilePress(0, 1);
            }}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}
            onPress={() => {
              this.onTilePress(0, 2);
            }}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.tile, { borderLeftWidth: 0 }]}
            onPress={() => {
              this.onTilePress(1, 0);
            }}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tile}
            onPress={() => {
              this.onTilePress(1, 1);
            }}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, { borderRightWidth: 0 }]}
            onPress={() => {
              this.onTilePress(1, 2);
            }}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
            onPress={() => {
              this.onTilePress(2, 0);
            }}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, { borderBottomWidth: 0 }]}
            onPress={() => {
              this.onTilePress(2, 1);
            }}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}
            onPress={() => {
              this.onTilePress(2, 2);
            }}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 80,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.newGame();
            }}
          >
            <Text style={{ color: "blue", fontSize: 30 }}>New Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tile: {
    borderWidth: 8,
    width: 100,
    height: 100,
    padding: 10,
  },
  tileX: {
    color: "red",
    fontSize: 65,
  },
  tileO: {
    color: "green",
    fontSize: 65,
  },
});
