export const Abreviation = async (colName: string): Promise<string> => {
    var newStr = "",
        count = 0,
        i;
        
    for (i = 0; i < colName.length; i++) {
        if (colName[i] === " " || colName[i] === "-") {
            if (count > 0) {
                newStr += count > 3 ? count - 2 : colName[i - 2];
                newStr += colName[i - 1];
            }
            newStr += colName[i];
            count = 0;
            continue;
        }
        if (count === 0) {
            newStr += colName[i];
        }
        count++;
    }
    if (count > 0) {
        newStr += count > 3 ? count - 2 : colName[i - 2];
        newStr += colName[i - 1];
    }
    return newStr;
}