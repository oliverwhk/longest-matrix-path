function LongestMatrixPath(strArr) { 
    var matrix = GetMatrixFromStringInput(strArr);
  
    const yLength = matrix.length;
    const xLength = matrix[0].length;
  
    // Loop thru each integer, and find the next possible increasing path
    const paths = [];
    for (x=0; x < xLength; x++) {
      for (y=0; y < yLength; y++) {
        const eachNumber = matrix[y][x];
        const path = [eachNumber];
        FindNextIncrementalNumber(matrix, paths, path, x, y);
        paths.push(path);
      }
    }
  
    const longestPath = paths.reduce(longestPathReducer);
    return longestPath;
  }
  
  const longestPathReducer = (longestPath, currentPath) => {
    return (longestPath.length > currentPath.length) ? longestPath : currentPath;
  };
  
  function FindNextIncrementalNumber(matrix, paths, path, x, y) {
    const biggestNumber = path[path.length - 1];
  
    // Navigate up
    if (IsValidCoordinate(matrix, x, y-1) && 
        IsNewNumberBigger(matrix, x, y-1, biggestNumber)) {
        const newPath = [...path];
        newPath.push(matrix[y-1][x]);
        paths.push(newPath);
        FindNextIncrementalNumber(matrix, paths, newPath, x, y-1);
    }
  
    // Navigate down
    if (IsValidCoordinate(matrix, x, y+1) &&
        IsNewNumberBigger(matrix, x, y+1, biggestNumber)) {
        const newPath = [...path];
        newPath.push(matrix[y+1][x]);
        paths.push(newPath);
        FindNextIncrementalNumber(matrix, paths, newPath, x, y+1);
    }
  
    // Navigate left
    if (IsValidCoordinate(matrix, x-1, y) &&
        IsNewNumberBigger(matrix, x-1, y, biggestNumber)) {
        const newPath = [...path];
        newPath.push(matrix[y][x-1]);
        paths.push(newPath);
        FindNextIncrementalNumber(matrix, paths, newPath, x-1, y);
    }
  
    // Navigate right
    if (IsValidCoordinate(matrix, x+1, y) &&
        IsNewNumberBigger(matrix, x+1, y, biggestNumber)) {
        const newPath = [...path];
        newPath.push(matrix[y][x+1]);
        paths.push(newPath);
        FindNextIncrementalNumber(matrix, paths, newPath, x+1, y);
    }
  }
  
  // Turn the input string into 2-dimentional arrays
  function GetMatrixFromStringInput(strArr) {
    const rows = strArr.map(row => {
      const columns = row.split("");
      return columns.map(c => parseInt(c));
    })
  
    return rows;
  }
  
  function IsValidCoordinate(matrix, x, y) {
    if (x < 0 || y < 0) return false;
  
    const yLength = matrix.length;
    const xLength = matrix[0].length;
  
    if (x >= xLength || y >= yLength) return false;
  
    return true;
  }
  
  function IsNewNumberBigger(matrix, x, y, biggestNumber) {
    return matrix[y][x] > biggestNumber;
  }

  const nums = ['994', '668', '211'];
  const longestPath = LongestMatrixPath(nums);
  console.log('Longest increasing path: ' + longestPath.length);
  console.log(longestPath);