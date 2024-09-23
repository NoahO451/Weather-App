class CurrentForcast {
    constructor(unit, lat, long) {
        this.unit = unit;
        this.lat = lat;
        this.long = long;
    }

    get _apiKey() {
        return "Insert your API KEY";
    }

    async getCurrentWeatherData() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=${this.unit}&lat=${this.lat}&lon=${this.long}&appid=${this._apiKey}`, { mode: 'cors' });
            return await response.json();
        } catch (error) {
            console.error(error, "Failed to get the current weather data.")
        } finally {
            console.warn(`This block runs no matter what, success or fail for logging errors.`);
        }
    }
}

export { CurrentForcast };