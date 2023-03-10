const generateBtn = document.querySelector('#generate'),
    solutionBtn = document.querySelector('#solution');
let ipBinArray = [],
    subnetMaskDecArray = [],
    wildcardBinArray = [],
    subnetMaskBinArray = [],
    networkIDBinArr = [],
    brodcastBinArr = [];


solutionBtn.addEventListener('click', () => {
    const firstIpPart = document.querySelector('#firstIpPart').value,
        secondIpPart = document.querySelector('#secondIpPart').value,
        thirdIpPart = document.querySelector('#thirdIpPart').value,
        fourthIpPart = document.querySelector('#fourthIpPart').value,
        cidr = document.querySelector('#cidr').value;

    convertToBinary(firstIpPart, secondIpPart, thirdIpPart, fourthIpPart);
    generateSubnetMask(cidr);
    generateNetworkId(ipBinArray, subnetMaskBinArray);
    generateWildcard(subnetMaskBinArray);
    generateBrodcast(networkIDBinArr, wildcardBinArray);

    // - Number Of Devices
    document.querySelector('#numberOfDevices').textContent = Math.pow(2, 32 - cidr) - 2;


});

const convertToBinary = (a, b, c, d) => {
    a = (a >>> 0).toString(2);
    b = (b >>> 0).toString(2);
    c = (c >>> 0).toString(2);
    d = (d >>> 0).toString(2);
    checkTheLength(a, b, c, d);
};

const checkTheLength = (a,b,c, d) => {
    const arr = [a, b, c, d];
    ipBinArray = [];
    arr.forEach( item => {
        if(item.length != 8){
            const remainingLength = 8 - item.length;
            item = '0'.repeat(remainingLength) + item;
            ipBinArray.push(item);
        }
        else {
            ipBinArray.push(item);
        }
    });

    displayIpBin(ipBinArray);
};

const displayIpBin = arr => {
    document.querySelector('#ipBin1').textContent = arr[0];
    document.querySelector('#ipBin2').textContent = arr[1];
    document.querySelector('#ipBin3').textContent = arr[2];
    document.querySelector('#ipBin4').textContent = arr[3];
}

const generateSubnetMask = cidr => {
    let result = '1'.repeat(cidr) + '0'.repeat(32-cidr);
    subnetMaskBinArray = result.match(/.{1,8}/g);
    displaySubnetMask(subnetMaskBinArray);
};

const displaySubnetMask = arr => {

    arr.forEach(item => {
        // - Convert To Decimal
        subnetMaskDecArray.push(parseInt(item, 2));
    });

    document.querySelector('#subnetMaskDec1').textContent = subnetMaskDecArray[0];
    document.querySelector('#subnetMaskDec2').textContent = subnetMaskDecArray[1];
    document.querySelector('#subnetMaskDec3').textContent = subnetMaskDecArray[2];
    document.querySelector('#subnetMaskDec4').textContent = subnetMaskDecArray[3];
};

const generateNetworkId = (ipArr, subnetMaskArr) => {
    let resultArray = [];

    // - join as string then split to charachters
    ipArr = ipArr.join('').split('');
    subnetMaskArr = subnetMaskArr.join('').split('');
    // - compare 2 arrays
    ipArr.forEach((item, index) => {
        if(item == '1' && subnetMaskArr[index] == '1'){
            resultArray.push('1');
        } else {
            resultArray.push('0');
        }
    });
    displayNetworkId(resultArray);
};


const displayNetworkId = arr => {
    arr = arr.join('');

    arr = arr.match(/.{1,8}/g).join('.');
    networkIDBinArr = arr.split('.');

    // - show decimal
    document.querySelector('#networkIDDec1').textContent = parseInt(networkIDBinArr[0],2);
    document.querySelector('#networkIDDec2').textContent = parseInt(networkIDBinArr[1],2);
    document.querySelector('#networkIDDec3').textContent = parseInt(networkIDBinArr[2],2);
    document.querySelector('#networkIDDec4').textContent = parseInt(networkIDBinArr[3],2);

    // - show first IP address
    document.querySelector('#firstIPAddress1').textContent = parseInt(networkIDBinArr[0],2);
    document.querySelector('#firstIPAddress2').textContent = parseInt(networkIDBinArr[1],2);
    document.querySelector('#firstIPAddress3').textContent = parseInt(networkIDBinArr[2],2);
    document.querySelector('#firstIPAddress4').textContent = parseInt(networkIDBinArr[3],2) + 1;
};

const generateWildcard = arr => {

    let arrString = arr.join('');
    arr = arrString.split('');
    arr.forEach(item => {
        item == '0' ? wildcardBinArray.push('1') : wildcardBinArray.push('0');
    });

    // - create array of 4 elemnts (length = 8)
    arrString = wildcardBinArray.join('').match(/.{1,8}/g).join('.');
    wildcardBinArray = arrString.split('.');

};

const generateBrodcast = (networkIDArr, wildcardArr) => {
    brodcastBinArr = [];

    // - join as string then split to charachters
    networkIDArr = networkIDArr.join('').split('');
    wildcardArr = wildcardArr.join('').split('');
    // - compare 2 arrays
    networkIDArr.forEach((item, index) => {
        if(item == '0' && wildcardArr[index] == '0'){
            brodcastBinArr.push('0');
        } else {
            brodcastBinArr.push('1');
        }
    });
    displayBrodcast(brodcastBinArr);
};


const displayBrodcast = arr => {
    arr = arr.join('');

    arr = arr.match(/.{1,8}/g).join('.');
    brodcastBinArr = arr.split('.');

    // - show decimal
    document.querySelector('#brodcastDec1').textContent = parseInt(brodcastBinArr[0],2);
    document.querySelector('#brodcastDec2').textContent = parseInt(brodcastBinArr[1],2);
    document.querySelector('#brodcastDec3').textContent = parseInt(brodcastBinArr[2],2);
    document.querySelector('#brodcastDec4').textContent = parseInt(brodcastBinArr[3],2);

    // - show last IP address
    document.querySelector('#lastIPAddress1').textContent = parseInt(brodcastBinArr[0],2);
    document.querySelector('#lastIPAddress2').textContent = parseInt(brodcastBinArr[1],2);
    document.querySelector('#lastIPAddress3').textContent = parseInt(brodcastBinArr[2],2);
    document.querySelector('#lastIPAddress4').textContent = parseInt(brodcastBinArr[3],2) - 1;
};

// * Generate random IP Address
generateBtn.addEventListener('click', () => {
    let arr = ['#firstIpPart', '#secondIpPart', '#thirdIpPart', '#fourthIpPart'];
    arr.forEach(item => {
        document.querySelector(item).value = generateRandomNumber(1, 254);
    });

    document.querySelector('#cidr').value = generateRandomNumber(1, 30);
});

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min;
};

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})