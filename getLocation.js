async function getLocation() {
    if (navigator.geolocation) {
        return await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

    } else {
        console.warn("Geolocation is not supported by current browser.");
        return null; 
    }
}

export { getLocation };