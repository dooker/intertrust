const Config = {
    endPoint: 'http://api.planetos.com/v1/datasets',
    // apiKey: '0e589dd9b7b348bcbbc8f6f2fb571e44',
    apiKey: '4d40032a9f2549f7927414be1293d0b1',
    // apiKey: 'c206be3776c5465e99d68c5f478155d3',
    resultsLimit: 3,
    dataRefreshRate: 10*1000,
    weatherRefreshRate: 5*60*1000,
    rounding: 1,
    fakeDataEndPoint: 'https://my.api.mockaroo.com/',
    fakeDataKey: '?key=f9261860',
    voltWattJSON: 'volt-watt.json'
}

export default Config
