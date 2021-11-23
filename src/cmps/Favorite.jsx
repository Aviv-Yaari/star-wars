import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

export function Favorite({ isFavorite, onClick }) {
  return (
    <IconButton
      className="btn-favorite"
      onClick={ev => {
        ev.stopPropagation();
        onClick();
      }}>
      {isFavorite ? <FavoriteIcon className="icon-favorite-filled" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}
