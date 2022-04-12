const baseUrl =
    "https://waterinfo.rws.nl/api/point/latestmeasurements/";


// async api call to get data
export const getData = async (parameter) => {
    return fetch(
        baseUrl + parameter, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'origin': 'http://localhost:8080/',
        },
    }
    )
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
};
