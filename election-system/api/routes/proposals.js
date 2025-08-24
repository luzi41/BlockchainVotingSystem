// routes/proposals.js
import express from "express";
import { ethers } from "ethers";
import ProposalsArtifact from "../artifacts/contracts/Proposals.sol/Proposals.json" assert { type: "json" };

const router = express.Router();

export default function createProposalsRoutes(provider, signer, proposalsAddress) {
  const contract = new ethers.Contract(proposalsAddress, ProposalsArtifact.abi, signer);

  // --- PublicKey
  router.get("/:electionId/publicKey", async (req, res) => {
    try {
      const { electionId } = req.params;
      const pubKey = await contract.getPublicKey(electionId);
      res.json({ electionId, publicKey: pubKey });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/:electionId/publicKey", async (req, res) => {
    try {
      const { electionId } = req.params;
      const { publicKey } = req.body;
      const tx = await contract.storePublicKey(electionId, publicKey);
      await tx.wait();
      res.json({ success: true, tx: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Proposal Registration (Single)
  router.post("/:electionId/proposal", async (req, res) => {
    try {
      const { electionId } = req.params;
      const input = req.body; // {name, text, url, qtype, answer1, answer2}
      const tx = await contract.registerProposal(electionId, input);
      await tx.wait();
      res.json({ success: true, tx: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Proposal Registration (Batch)
  router.post("/:electionId/proposalsBatch", async (req, res) => {
    try {
      const { electionId } = req.params;
      const items = req.body.items; // array of ProposalInput
      const tx = await contract.registerProposalsBatch(electionId, items);
      await tx.wait();
      res.json({ success: true, tx: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Get Proposals
  router.get("/:electionId/proposals", async (req, res) => {
    try {
      const { electionId } = req.params;
      const proposals = await contract.getProposals(electionId);
      res.json(proposals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Voting
  router.post("/:electionId/vote", async (req, res) => {
    try {
      const { electionId } = req.params;
      const { encryptedVote, token, district } = req.body;
      const tx = await contract.castEncryptedVote(electionId, encryptedVote, token, district);
      await tx.wait();
      res.json({ success: true, tx: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:electionId/votes/count", async (req, res) => {
    try {
      const { electionId } = req.params;
      const count = await contract.getNumberOfVotes(electionId);
      res.json({ electionId, count: count.toNumber() });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:electionId/votes/encrypted", async (req, res) => {
    try {
      const { electionId } = req.params;
      const votes = await contract.getEncryptedVotes(electionId);
      res.json(votes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Results
  router.post("/:electionId/results", async (req, res) => {
    try {
      const { electionId } = req.params;
      const { tally, signature, district } = req.body;
      const tx = await contract.storeVotingResult(electionId, tally, signature, district);
      await tx.wait();
      res.json({ success: true, tx: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:electionId/results/:district", async (req, res) => {
    try {
      const { electionId, district } = req.params;
      const results = await contract.getVotingResults(electionId, district);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
