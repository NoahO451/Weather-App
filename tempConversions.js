function convertFahren(temp) {
    let fahrenCon = (temp - 273.15) * 1.8 + 32;
    return fahrenCon;
}

export { convertFahren };