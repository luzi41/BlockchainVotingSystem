export interface ElectionDistrict {
  name: string;
  nummer: number;
  publicKey: string;
}
export interface Candidate {
  name: string;
  partei: string;
  url: string;
}

export interface Party {
  name: string;
  shortname: string;
}

export interface Proposal {
  text: string;
  answer1: string;
  answer2: string;
}

export interface VoteFormTexts {
  yourToken: string;
  token: string;
  yourElectionDistrict: string;
  firstVote: string;
  secondVote: string;
  survey: string;
  btnSend: string;
}
