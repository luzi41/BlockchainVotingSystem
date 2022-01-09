<?php

namespace App\Entity;

use be\kunstmaan\multichain\MultichainClient;
use App\Repository\WalletRepository;
use App\Entity\Election;
use App\Entity\Address;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=WalletRepository::class)
 */
class Wallet 
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=56)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Address::class, mappedBy="wallet")
     */
    private $addresses;

    /**
     * @ORM\Column(type="string", length=12)
     */
    private $blockchain;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $rpcServerUrl;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $rpcUserName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $rpcUserPass;

    /**
     * @ORM\OneToMany(targetEntity=Election::class, mappedBy="wallet")
     */
    private $elections;

    private $balance = 0;

    
    public function __construct()
    {
        $this->elections = new ArrayCollection();
        $this->addresses = new ArrayCollection();
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

    public function getBlockchain(): ?string
    {
        return $this->blockchain;
    }

    public function setBlockchain(string $blockchain): self
    {
        $this->blockchain = $blockchain;

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

    public function getElections()
    {
        return $this->elections;
    }

    public function setElections($elections)
    {
        $this->elections = $elections;

        return $this;
    }

    public function getAddresses()
    {
        if ($this->getRpcServerUrl() && $this->getRpcServerUrl() !== '')
        {
            $this->multichain = new MultichainClient(
                $this->getRpcServerUrl(), 
                $this->getRpcUserName(), 
                $this->getRpcUserPass(), 3
            );
            
            $this->addresses = $this->multichain->setDebug(true)->getAddresses();
        }

        return $this->addresses;
    }

    public function setAddresses($addresses)
    {
        $this->addresses = $addresses;

        return $this;
    }

    public function getBalance(): int
    {
        if ($this->getRpcServerUrl() && $this->getRpcServerUrl() !== '')
        {
            $this->multichain = new MultichainClient(
                $this->getRpcServerUrl(), 
                $this->getRpcUserName(), 
                $this->getRpcUserPass(), 3
            );
            if ($balance = $this->multichain->setDebug(true)->getBalance())
                return $this->balance = $balance;
        }
        
        // @todo validate address

        return $this->balance;
    }
}
