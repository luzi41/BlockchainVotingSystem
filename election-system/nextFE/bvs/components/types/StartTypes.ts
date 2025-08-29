// 0.29.7
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

export interface StartTexts {
  viewDistricts: string;
  description: string;
  title : string;
  details: string;
  errorElectronSettingsRpcURL: string;
  errorFetchData: string;
  titleRegistration: string;
  textRegistration: string;
  titleCandidates: string;
  titleParties: string;
  loadContract: string;    
}
