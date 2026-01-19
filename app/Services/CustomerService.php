<?php

namespace App\Services;

use App\Repositories\Contracts\CustomerRepositoryInterface;

class CustomerService extends BaseService
{
    /**
     * @var CustomerRepositoryInterface
     */
    protected $repository;

    /**
     * CustomerService constructor.
     * Generate by Antigravity
     */
    public function __construct(CustomerRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get list of customers for display
     * Generate by Antigravity
     */
    public function getCustomerList($limit = 10, $search = null)
    {
        return $this->repository->getPaginatedActive($limit, $search);
    }
}
