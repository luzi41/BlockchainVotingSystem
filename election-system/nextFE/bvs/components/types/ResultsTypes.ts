export interface Candidate {
    name: string;
    partei: string;
    url: string;
    text: string;
}

export interface Party {
    name: string;
    shortname: string;
    url: string;
}

export interface ResultsTexts {
    resultsText: string;
    headline: string;
    selectView: string;
    viewDistricts: string;
    viewTotal: string;
    party: string;
    firstVotes: string;
    secondVotes: string;
    totalParties: string;
    answer: string;
    votes: string;
    title: string;
    details: string;
    errorElectronSettingsRpcURL: string;
    errorFetchData: string;
    errorLoadModule: string;
    errorProposals: string;
    errorNetwork: string;
    errorContractAddress: string;
    loadContract: string;
}