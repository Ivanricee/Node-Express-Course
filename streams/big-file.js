const fs = require('fs');
const file = fs.createWriteStream('./big')
for(let i = 0; i<= 1e6; i++){
    file.write('As a young girlLouis Vuitton With your mother On a sandy lawnAs a sophomore With reggaeton And the linens')
}
file.end