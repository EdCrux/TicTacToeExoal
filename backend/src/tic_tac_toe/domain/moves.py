from dataclasses import dataclass

Position = tuple[int, int]



@dataclass
class Board:
   def empty(self, x :int, y:int ):
       """Wheter the filed is empty."""
       ...


def get_valid_moves(board : Board) -> list[Position]:
    print('Getting the the valid moves.')


def calculate_winner(board : Board) -> str:
    ...


    

