<?php

namespace App\Http\Controllers\Api;

use App\Services\CustomerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends BaseController
{
    protected $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    public function index(Request $request)
    {
        $customers = $this->customerService->getAllCustomers($request->get('limit', 10), $request->get('search'));
        return response()->json($customers);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'website' => 'nullable|string|max:255',
            'logo' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $customer = $this->customerService->createCustomer($request->all());
        return response()->json($customer, 201);
    }

    public function show($id)
    {
        $customer = $this->customerService->getCustomerById($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
        return response()->json($customer);
    }

    public function update(Request $request, $id)
    {
        $customer = $this->customerService->getCustomerById($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'website' => 'nullable|string|max:255',
            'logo' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $updatedCustomer = $this->customerService->updateCustomer($id, $request->all());
        return response()->json($updatedCustomer);
    }

    public function destroy($id)
    {
        $customer = $this->customerService->getCustomerById($id);
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }

        $this->customerService->deleteCustomer($id);
        return response()->json(null, 204);
    }
}
