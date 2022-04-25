<script setup lang="ts">
import { ref, watch } from "vue";
import Square from "@/components/Square.vue";
import { parseSquare, playSound, createBoard } from "@/utils";
import { Color } from "@/types";
import Server from "@/server";
import moveAudio from "../assets/move.webm";
import captureAudio from "../assets/capture.webm";
import checkAudio from "../assets/move-check.webm";

const props = defineProps<{
  server?: Server;
  gameId?: string;
  perspective?: Color;
}>();

const inCheck = ref(false);
const board = ref(createBoard());
const selectedPiece = ref(null);
const availableMoves = ref([]);
const playing = ref(props.perspective == Color.White);

watch(
  () => props.perspective,
  (perspective) => {
    playing.value = perspective == Color.White;
  }
);

if (props.server) {
  props.server.on("start_turn", function (payload) {
    playing.value = true;
    const { from, to } = payload;
    const captured = board.value.move(from, to);

    if (captured) {
      playSound(captureAudio);
    } else {
      playSound(moveAudio);
    }
  });
}

function showAvailableMoves() {
  const { piece, square } = selectedPiece.value;

  if (piece && square) {
    let moves = piece.movement.getAvailableMoves(square, board.value).flat();

    // make it as if the piece was not there so that threats go through to the
    // squares behind, preventing the piece from moving and exposing the king
    // by filtering out the moves that are not within the threatened squares
    const king = board.value.find("K", piece.color);
    const threats = board.value.getThreatsAgainst(king, piece.color, [square]);

    if (threats.length > 0 && piece.notation !== "K") {
      moves = moves.filter((square: Square) => {
        for (const threat of threats.flat()) {
          if (square.col === threat.col && square.row === threat.row) {
            return true;
          }
        }
        return false;
      });
    }

    availableMoves.value = moves;
  }
}

function selectedSquare({ piece, square }) {
  if (!playing.value) {
    return;
  }
  if (selectedPiece.value && selectedPiece.value.piece) {
    if (!piece || piece.color != selectedPiece.value.piece.color) {
      Move(selectedPiece.value.square, square);
      clearSelected();
    } else {
      selectedPiece.value = { piece, square };
      showAvailableMoves();
    }
  } else if (piece && piece.color == props.perspective) {
    selectedPiece.value = { piece, square };
    showAvailableMoves();
  }
}

function clearSelected() {
  selectedPiece.value = null;
  availableMoves.value = [];
}

function Move(source: Square, dest: Square) {
  const available = availableMoves.value.find(
    (square: Square) => square.col == dest.col && square.row == dest.row
  );

  if (available) {
    const captured = board.value.move(parseSquare(source), parseSquare(dest));

    if (props.server && props.gameId) {
      playing.value = false;
      props.server.send("move_piece", {
        from: parseSquare(source),
        to: parseSquare(dest),
        game_id: props.gameId,
      });
    }

    checkForCheck(selectedPiece.value.piece.color);

    if (!inCheck.value) {
      if (captured) {
        playSound(captureAudio);
      } else {
        playSound(moveAudio);
      }
    }
  }
}

function checkForCheck(color: Color) {
  inCheck.value = false;

  if (color === Color.White) {
    color = Color.Black;
  } else {
    color = Color.White;
  }

  const king = board.value.find("K", color);
  const threats = board.value.getThreatsAgainst(king, color);

  if (threats.length > 0) {
    inCheck.value = true;
    playSound(checkAudio);
  }
}
</script>

<template>
  <div
    :class="['board', props.perspective]"
    @contextmenu.prevent="clearSelected"
  >
    <div
      class="row"
      v-for="(row, idx) in board.squares()"
      :key="idx"
      :data-row="idx + 1"
    >
      <Square
        v-for="(piece, col) in row"
        :key="`${col}${idx}`"
        :piece="piece"
        :col="col"
        :row="idx"
        :availableMoves="availableMoves"
        @selected="selectedSquare"
      />
    </div>
  </div>
</template>

<style scoped>
.board {
  margin: auto;
  display: flex;
  flex-direction: column-reverse;
}
.board.black {
  flex-direction: column;
}
.board.black .row {
  flex-direction: row-reverse;
}
.row {
  display: flex;
  background: #eee;
  position: relative;
}
.row:first-of-type .square:after {
  bottom: 5px;
  right: 5px;
  z-index: 1;
  color: #444;
  display: block;
  font-weight: bold;
  position: absolute;
  content: attr(data-square);
}
.row:before {
  top: 5px;
  left: 5px;
  z-index: 1;
  color: #444;
  display: block;
  font-weight: bold;
  position: absolute;
  content: attr(data-row);
}
.row:nth-child(odd) .square:nth-child(odd),
.row:nth-child(even) .square:nth-child(even) {
  background: #76adb7;
}
</style>
