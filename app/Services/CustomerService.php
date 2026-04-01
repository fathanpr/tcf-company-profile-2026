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
            $data = $this->handleLogoInput($data);

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
            $data = $this->handleLogoInput($data);

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

    private function handleLogoInput(array $data): array
    {
        if (isset($data['logo']) && is_string($data['logo'])) {
            $logo = trim($data['logo']);
            $logo = preg_replace('/^[\\\\\/]+(https?:\\/\\/)/i', '$1', $logo);
            $data['logo'] = $logo;
        }

        if (!isset($data['logo']) || !($data['logo'] instanceof \Illuminate\Http\UploadedFile)) {
            return $data;
        }

        $directory = public_path('img/customers');

        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $filename = time() . '_' . uniqid() . '_' . $data['logo']->getClientOriginalName();
        $data['logo']->move($directory, $filename);
        $data['logo'] = 'img/customers/' . $filename;

        return $data;
    }
}
