
function removeDuplicateLines(lines) {
    const uniqueLines = [];
    const duplicates = {};
  
    for (const line of lines) {
      const key = `${line.minutes}-${line.hours}`;
  
      if (!duplicates[key]) {
        duplicates[key] = true;
        uniqueLines.push(line);
      }
    }
  
    for (let i = 0; i < uniqueLines.length; i++) {
      uniqueLines[i].id = i + 1;
    }
  
    return uniqueLines;
}

export default removeDuplicateLines;