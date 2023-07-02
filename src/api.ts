const url = 'https://geolog.azurewebsites.net/api/GetLogs';

export async function fetchLocations({ timeRange, latitudeRange, longitudeRange, num }) {
    return fetch(url + '?code='+process.env.REACT_APP_AZ_FUNC_CODE + '&' + new URLSearchParams({
        minTimestamp: timeRange[0] || 0,
        maxTimestamp: timeRange[1] || Date.now(),
        minLatitude: latitudeRange[0] || -90,
        maxLatitude: latitudeRange[1] || 90,
        minLongitude: longitudeRange[0] || -180,
        maxLongitude: longitudeRange[1] || 180,
        num: num || 10,
    }), {
        method: 'GET', //Request Type
        headers: {
            //Header Defination
            'Content-Type': 'application/json;charset=UTF-8',
        },
    })
        .then((response) => {
            console.log("Reponse: " + response);
            console.log("Reponse: " + JSON.stringify(response));
            return response.json()
        })
        //If response is not in json then in error
        .catch((error) => {
            console.error("Got error");
            console.error(error);

        });
}