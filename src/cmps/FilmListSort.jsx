import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button } from '@mui/material';

export function FilmListSort({ sort, onSort }) {
  return (
    <section className="film-list-sort flex space-between">
      <SortButton fieldName="release_date" displayName="Year" sort={sort} onSort={onSort} />
      <SortButton fieldName="episode_id" displayName="Episode" sort={sort} onSort={onSort} />
    </section>
  );
}

function SortButton({ fieldName, displayName, sort, onSort }) {
  let icon = <></>;
  if (sort[fieldName] === 1) {
    icon = <ArrowDownwardIcon fontSize="small" />;
  } else if (sort[fieldName] === -1) {
    icon = <ArrowUpwardIcon fontSize="small" />;
  }
  return (
    <Button onClick={() => onSort(fieldName)} color="inherit" endIcon={icon}>
      {displayName}
    </Button>
  );
}
