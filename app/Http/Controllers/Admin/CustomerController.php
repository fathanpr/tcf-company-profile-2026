<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Class CustomerController
 * Generate by Antigravity
 */
class CustomerController extends Controller
{
    protected $service;

    public function __construct(CustomerService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/Customers/Index', [
            'customers' => $this->service->getAllCustomers(10, $request->search),
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Customers/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'website' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        $this->service->createCustomer($request->all());

        return redirect()->route('admin.customers.index')
            ->with('success', 'Customer created successfully.');
    }

    public function edit($id)
    {
        $customer = $this->service->getCustomerById($id);

        if (!$customer) {
            return redirect()->route('admin.customers.index')
                ->with('error', 'Customer not found.');
        }

        return Inertia::render('Admin/Customers/Edit', [
            'customer' => $customer,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'website' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        $this->service->updateCustomer($id, $request->all());

        return redirect()->route('admin.customers.index')
            ->with('success', 'Customer updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->deleteCustomer($id);

        return redirect()->route('admin.customers.index')
            ->with('success', 'Customer deleted successfully.');
    }
}
