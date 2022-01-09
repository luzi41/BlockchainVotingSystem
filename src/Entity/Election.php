<?php

namespace App\Entity;

use App\Model\Project;
use App\Entity\Category;
use App\Entity\Wallet;
use App\Entity\Status;

use App\Repository\ElectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ElectionRepository::class)
 */
class Election extends Project
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $startdate;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $enddate;

    /**
     * @ORM\OneToMany(targetEntity=Option::class, mappedBy="election")
     */
    private $options;    

    /**
     * @ORM\OneToMany(targetEntity=Candidate::class, mappedBy="election")
     */
    private $candidates;

    /**
     * @ORM\OneToMany(targetEntity=Voter::class, mappedBy="election")
     */
    private $voters;

    /**
     * @ORM\ManyToOne(targetEntity=Organisation::class, inversedBy="elections")
     */
    private $organisation;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="elections")
     */
    private $admin;

    /**
     * @ORM\Column(type="boolean")
     */
    private $open = false;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="elections")
     * @ORM\JoinColumn(nullable=true)
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=Wallet::class, inversedBy="elections")
     */
    private $wallet;
    

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $useAssets;

    /**
     * @ORM\Column(type="string", length=32, nullable=true)
     */
    private $assetCandidate;

    /**
     * @ORM\Column(type="string", length=32, nullable=true)
     */
    private $assetParty;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $stream;
    

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $ballotTextFirst;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $ballotTextFinish;

    /**
     * @ORM\OneToMany(targetEntity=Party::class, mappedBy="election")
     */
    private $parties;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $enddateVoterList;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $enddateCandidateList;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $startdateVoterList;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $startdateCandidateList;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $rpcServerUrl;

    /**
     * @ORM\Column(type="string", length=64, nullable=true)
     */
    private $rpcUserName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $rpcUserPass;

    /**
     * @ORM\OneToMany(targetEntity=VoterListCsv::class, mappedBy="election")
     */
    private $voterListCsv;

    /**
     * @ORM\OneToMany(targetEntity=VotingDistrict::class, mappedBy="election")
     */
    private $votingDistricts;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $bcAddress;

    /**
     * @ORM\OneToMany(targetEntity=Stream::class, mappedBy="election")
     */
    private $streams;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $status;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $numberOfSeats;

    public function __construct()
    {
        $this->options = new ArrayCollection();
        $this->candidates = new ArrayCollection();
        $this->voters = new ArrayCollection();
        $this->parties = new ArrayCollection();
        $this->voterListCsv = new ArrayCollection();
        $this->votingDistricts = new ArrayCollection();
        $this->streams = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getStartdate(): ?int
    {
        return $this->startdate;
    }

    public function setStartdate(?int $startdate): self
    {
        $this->startdate = $startdate;

        return $this;
    }

    public function getEnddate(): ?int
    {
        return $this->enddate;
    }

    public function setEnddate(?int $enddate): self
    {
        $this->enddate = $enddate;

        return $this;
    }

    /**
     * @return Collection|Candidate[]
     */
    public function getCandidates(): Collection
    {
        return $this->candidates;
    }

    public function addCandidate(Candidate $candidate): self
    {
        if (!$this->candidates->contains($candidate)) {
            $this->candidates[] = $candidate;
            $candidate->setElection($this);
        }

        return $this;
    }

    public function removeCandidate(Candidate $candidate): self
    {
        if ($this->candidates->removeElement($candidate)) {
            // set the owning side to null (unless already changed)
            if ($candidate->getElection() === $this) {
                $candidate->setElection(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection|Option[]
     */
    public function getOptions(): Collection
    {
        return $this->options;
    }

    public function addOption(Option $option): self
    {
        if (!$this->options->contains($option)) {
            $this->options[] = $option;
            $option->setElection($this);
        }

        return $this;
    }

    public function removeOption(Option $option): self
    {
        if ($this->candidates->removeElement($option)) {
            // set the owning side to null (unless already changed)
            if ($option->getElection() === $this) {
                $option->setElection(null);
            }
        }

        return $this;
    }    

    /**
     * @return Collection|Voter[]
     */
    public function getVoters(): Collection
    {
        return $this->voters;
    }

    public function addVoter(Voter $voter): self
    {
        if (!$this->voters->contains($voter)) {
            $this->voters[] = $voter;
            $voter->setElection($this);
        }

        return $this;
    }

    public function removeVoter(Voter $voter): self
    {
        if ($this->voters->removeElement($voter)) {
            // set the owning side to null (unless already changed)
            if ($voter->getElection() === $this) {
                $voter->setElection(null);
            }
        }

        return $this;
    }

    public function getOrganisation(): ?Organisation
    {
        return $this->organisation;
    }

    public function setOrganisation(?Organisation $organisation): self
    {
        $this->organisation = $organisation;

        return $this;
    }

    public function getAdmin(): ?User
    {
        return $this->admin;
    }

    public function setAdmin(?User $admin): self
    {
        $this->admin = $admin;

        return $this;
    }

    public function getOpen(): ?bool
    {
        return $this->open;
    }

    public function setOpen(bool $open): self
    {
        $this->open = $open;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }
    
    public function getWallet(): ?Wallet
    {
        return $this->wallet;
    }
    
    public function setWallet(?Wallet $wallet): self
    {
        $this->wallet = $wallet;

        return $this;
    }

    public function getUseAssets(): ?bool
    {
        return $this->useAssets;
    }

    public function setUseAssets(?bool $useAssets): self
    {
        $this->useAssets = $useAssets;

        return $this;
    }

    public function getAssetCandidate(): ?string
    {
        return $this->assetCandidate;
    }

    public function setAssetCandidate(?string $assetCandidate): self
    {
        $this->assetCandidate = $assetCandidate;

        return $this;
    }

    public function getAssetParty(): ?string
    {
        return $this->assetParty;
    }

    public function setAssetParty(?string $assetParty): self
    {
        $this->assetParty = $assetParty;

        return $this;
    }

    public function getStream(): ?string
    {
        return $this->stream;
    }

    public function setStream(?string $stream): self
    {
        $this->stream = $stream;

        return $this;
    }

    public function getBallotTextFirst(): ?string
    {
        return $this->ballotTextFirst;
    }

    public function setBallotTextFirst(?string $ballotTextFirst): self
    {
        $this->ballotTextFirst = $ballotTextFirst;

        return $this;
    }

    public function getBallotTextFinish(): ?string
    {
        return $this->ballotTextFinish;
    }

    public function setBallotTextFinish(?string $ballotTextFinish): self
    {
        $this->ballotTextFinish = $ballotTextFinish;

        return $this;
    }

    /**
     * @return Collection|Party[]
     */
    public function getParties(): Collection
    {
        return $this->parties;
    }

    public function addParty(Party $party): self
    {
        if (!$this->parties->contains($party)) {
            $this->parties[] = $party;
            $party->setElection($this);
        }

        return $this;
    }

    public function removeParty(Party $party): self
    {
        if ($this->parties->removeElement($party)) {
            // set the owning side to null (unless already changed)
            if ($party->getElection() === $this) {
                $party->setElection(null);
            }
        }

        return $this;
    }

    public function getEnddateVoterList(): ?int
    {
        return $this->enddateVoterList;
    }

    public function setEnddateVoterList(?int $enddateVoterList): self
    {
        $this->enddateVoterList = $enddateVoterList;

        return $this;
    }

    public function getEnddateCandidateList(): ?int
    {
        return $this->enddateCandidateList;
    }

    public function setEnddateCandidateList(?int $enddateCandidateList): self
    {
        $this->enddateCandidateList = $enddateCandidateList;

        return $this;
    }

    public function getStartdateVoterList(): ?int
    {
        return $this->startdateVoterList;
    }

    public function setStartdateVoterList(?int $startdateVoterList): self
    {
        $this->startdateVoterList = $startdateVoterList;

        return $this;
    }

    public function getStartdateCandidateList(): ?int
    {
        return $this->startdateCandidateList;
    }

    public function setStartdateCandidateList(?int $startdateCandidateList): self
    {
        $this->startdateCandidateList = $startdateCandidateList;

        return $this;
    }

    public function getRpcServerUrl(): ?string
    {
        return $this->rpcServerUrl;
    }

    public function setRpcServerUrl(?string $rpcServerUrl): self
    {
        $this->rpcServerUrl = $rpcServerUrl;

        return $this;
    }

    public function getRpcUserName(): ?string
    {
        return $this->rpcUserName;
    }

    public function setRpcUserName(?string $rpcUserName): self
    {
        $this->rpcUserName = $rpcUserName;

        return $this;
    }

    public function getRpcUserPass(): ?string
    {
        return $this->rpcUserPass;
    }

    public function setRpcUserPass(?string $rpcUserPass): self
    {
        $this->rpcUserPass = $rpcUserPass;

        return $this;
    }

    /**
     * @return Collection|VoterListCsv[]
     */
    public function getVoterListCsv(): Collection
    {
        return $this->voterListCsv;
    }

    public function addVoterListCsv(VoterListCsv $voterListCsv): self
    {
        if (!$this->voterListCsv->contains($voterListCsv)) {
            $this->voterListCsv[] = $voterListCsv;
            $voterListCsv->setElection($this);
        }

        return $this;
    }

    public function removeVoterListCsv(VoterListCsv $voterListCsv): self
    {
        if ($this->voterListCsv->removeElement($voterListCsv)) {
            // set the owning side to null (unless already changed)
            if ($voterListCsv->getElection() === $this) {
                $voterListCsv->setElection(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|VotingDistrict[]
     */
    public function getVotingDistricts(): Collection
    {
        return $this->votingDistricts;
    }

    public function addVotingDistrict(VotingDistrict $votingDistrict): self
    {
        if (!$this->votingDistricts->contains($votingDistrict)) {
            $this->votingDistricts[] = $votingDistrict;
            $votingDistrict->setElection($this);
        }

        return $this;
    }

    public function removeVotingDistrict(VotingDistrict $votingDistrict): self
    {
        if ($this->votingDistricts->removeElement($votingDistrict)) {
            // set the owning side to null (unless already changed)
            if ($votingDistrict->getElection() === $this) {
                $votingDistrict->setElection(null);
            }
        }

        return $this;
    }

    public function getBcAddress(): ?string
    {
        return $this->bcAddress;
    }

    public function setBcAddress(?string $bcAddress): self
    {
        $this->bcAddress = $bcAddress;

        return $this;
    }

    /**
     * @return Collection|Stream[]
     */
    public function getStreams(): Collection
    {
        return $this->streams;
    }

    public function addStream(Stream $stream): self
    {
        if (!$this->streams->contains($stream)) {
            $this->streams[] = $stream;
            $stream->setElection($this);
        }

        return $this;
    }

    public function removeStream(Stream $stream): self
    {
        if ($this->streams->removeElement($stream)) {
            // set the owning side to null (unless already changed)
            if ($stream->getElection() === $this) {
                $stream->setElection(null);
            }
        }

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(?int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getNumberOfSeats(): ?int
    {
        return $this->numberOfSeats;
    }

    public function setNumberOfSeats(?int $numberOfSeats): self
    {
        $this->numberOfSeats = $numberOfSeats;

        return $this;
    }
}
