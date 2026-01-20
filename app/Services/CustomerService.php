<?php

namespace App\Services;

use App\Repositories\Contracts\CustomerRepositoryInterface;
use Illuminate\Support\Facades\DB;

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

    /**
     * Admin methods
     * Generate by Antigravity
     */
    public function getAllCustomers($perPage = 10, $search = null)
    {
        return $this->repository->paginate($perPage, $search);
    }

    public function getCustomerById($id)
    {
        return $this->repository->find($id);
    }

    public function createCustomer(array $data)
    {
        return DB::transaction(function () use ($data) {
            $customer = $this->repository->create($data);

            activity()
                ->performedOn($customer)
                ->causedBy(auth()->user())
                ->log("Created customer: {$customer->name}");

            return $customer;
        });
    }

    public function updateCustomer($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $customer = $this->repository->update($id, $data);

            activity()
                ->performedOn($customer)
                ->causedBy(auth()->user())
                ->log("Updated customer: {$customer->name}");

            return $customer;
        });
    }

    public function deleteCustomer($id)
    {
        return DB::transaction(function () use ($id) {
            $customer = $this->repository->find($id);
            $name = $customer->name;

            $this->repository->delete($id);

            activity()
                ->causedBy(auth()->user())
                ->log("Deleted customer: {$name}");

            return true;
        });
    }
}
