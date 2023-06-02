import { useState, useEffect } from 'react';
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import ThreadCard from './ThreadCard';



///////////////////////////////////////////////////////
function FilterableProductTable({ roster }) {
  const [filterText, setFilterText] = useState('');

  return (
    <div >
        <TextField id="outlined-basic" label="Search Thread..." variant="outlined" value = {filterText} onChange={(e) => setFilterText(e.target.value)}/>
      <div>
        <Typography sx={{fontFamily: 'circular-medium'}} padding={1} variant="h4" component="div">
           Results:
        </Typography>
      </div>
      <ForumRows roster={roster} filterText={filterText}/>
    </div>
  );
}

function ForumRows({filterText, roster}) {

  const rosterRows = [];
  roster.forEach((item) => {
    if (typeof item.title === 'string'){
      if (item.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
    }
    rosterRows.push(<ThreadCard thread = {item} key = {item.id}/>);
  });
  
  return (
    <>
        {rosterRows}
    </>
      
  );
}



export default function SearchBar({discussions}) {
  return <FilterableProductTable  roster={discussions} />;
}